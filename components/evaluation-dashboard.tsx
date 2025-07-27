'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, BarChart3, CheckCircle, XCircle, AlertTriangle, Loader2, Filter, Download, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { GuardrailResult } from '../lib/types';

interface EvaluationQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: string;
}

interface EvaluationResult {
  questionId: string;
  question: string;
  expectedAnswer: string;
  actualAnswer: string;
  accuracy: number;
  helpfulness: number;
  citationQuality: number;
  overallScore: number;
  feedback: string;
  guardrailResult?: GuardrailResult;
  error?: boolean;
}

interface EvaluationSummary {
  totalQuestions: number;
  averageAccuracy: number;
  averageHelpfulness: number;
  averageCitationQuality: number;
  averageOverallScore: number;
  categoryBreakdown: Record<string, { count: number; averageScore: number }>;
  difficultyBreakdown: Record<string, { count: number; averageScore: number }>;
}

export function EvaluationDashboard() {
  const [questions, setQuestions] = useState<EvaluationQuestion[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [summary, setSummary] = useState<EvaluationSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoadingQuestions(true);
      const response = await axios.get('/api/evaluate');
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const runEvaluation = async (runAll: boolean = false) => {
    try {
      setIsLoading(true);
      setResults([]);
      setSummary(null);

      const response = await axios.post('/api/evaluate', {
        questionIds: runAll ? [] : selectedQuestions,
        runAll
      });

      setResults(response.data.results);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error running evaluation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestion = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const selectAllQuestions = () => {
    setSelectedQuestions(questions.map(q => q.id));
  };

  const clearSelection = () => {
    setSelectedQuestions([]);
  };

  const filteredQuestions = questions.filter(q => {
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 0.6) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-50 border-green-200';
    if (score >= 0.6) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const exportResults = () => {
    if (!results.length) return;
    
    const csvContent = [
      ['Question ID', 'Question', 'Expected Answer', 'Actual Answer', 'Accuracy', 'Helpfulness', 'Citation Quality', 'Overall Score', 'Feedback'].join(','),
      ...results.map(r => [
        r.questionId,
        `"${r.question}"`,
        `"${r.expectedAnswer}"`,
        `"${r.actualAnswer}"`,
        r.accuracy,
        r.helpfulness,
        r.citationQuality,
        r.overallScore,
        `"${r.feedback}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aven-ai-evaluation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Performance Evaluation</h1>
          <p className="text-gray-600 mt-1">Test and analyze AI responses with 50+ predefined questions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          {results.length > 0 && (
            <Button
              onClick={exportResults}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Filter Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="product">Product</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="account">Account</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-end space-x-3">
              <Button onClick={selectAllQuestions} variant="outline" size="sm">
                Select All
              </Button>
              <Button onClick={clearSelection} variant="outline" size="sm">
                Clear
              </Button>
              <Button onClick={loadQuestions} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Question Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Select Questions</h2>
            <p className="text-sm text-gray-600">
              {selectedQuestions.length} of {filteredQuestions.length} questions selected
            </p>
          </div>
        </div>

        {isLoadingQuestions ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading questions...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedQuestions.includes(question.id)
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => toggleQuestion(question.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                      {question.question}
                    </p>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.category === 'product' ? 'bg-blue-100 text-blue-800' :
                        question.category === 'technical' ? 'bg-purple-100 text-purple-800' :
                        question.category === 'billing' ? 'bg-green-100 text-green-800' :
                        question.category === 'account' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {question.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  {selectedQuestions.includes(question.id) && (
                    <CheckCircle className="w-5 h-5 text-blue-600 ml-2 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Run Evaluation */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => runEvaluation(false)}
            disabled={isLoading || selectedQuestions.length === 0}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run Evaluation ({selectedQuestions.length} questions)
          </Button>
          <Button
            onClick={() => runEvaluation(true)}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <BarChart3 className="w-4 h-4" />
            )}
            Run All Questions
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      {summary && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Evaluation Summary</h2>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {(summary.averageOverallScore * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-blue-700 font-medium">Overall Score</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {(summary.averageAccuracy * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-green-700 font-medium">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {(summary.averageHelpfulness * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-purple-700 font-medium">Helpfulness</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {(summary.averageCitationQuality * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-orange-700 font-medium">Citation Quality</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Performance by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(summary.categoryBreakdown).map(([category, data]) => (
                <div key={category} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-900 capitalize mb-1">{category}</div>
                  <div className="text-xl font-bold text-blue-600">
                    {(data.averageScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600">{data.count} questions</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Results */}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Results</h2>
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.questionId} className={`p-6 rounded-xl border ${getScoreBgColor(result.overallScore)}`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium text-gray-900 flex-1 mr-4">{result.question}</h3>
                  <div className="flex items-center gap-2">
                    {getScoreIcon(result.overallScore)}
                    <span className={`font-bold text-lg ${getScoreColor(result.overallScore)}`}>
                      {(result.overallScore * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Expected Answer</div>
                    <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                      {result.expectedAnswer}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">AI Response</div>
                    <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                      {result.actualAnswer}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Accuracy</div>
                    <div className={`font-bold ${getScoreColor(result.accuracy)}`}>
                      {(result.accuracy * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Helpfulness</div>
                    <div className={`font-bold ${getScoreColor(result.helpfulness)}`}>
                      {(result.helpfulness * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Citation Quality</div>
                    <div className={`font-bold ${getScoreColor(result.citationQuality)}`}>
                      {(result.citationQuality * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Feedback</div>
                  <div className="text-sm text-gray-600">{result.feedback}</div>
                </div>

                {result.guardrailResult && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800">Guardrail Triggered</div>
                    <div className="text-sm text-yellow-700">{result.guardrailResult.reason}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 