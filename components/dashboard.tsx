'use client';

import { useState } from 'react';
import { Play, CheckCircle, XCircle, AlertTriangle, Loader2, Eye, EyeOff, Zap } from 'lucide-react';
import axios from 'axios';
import { EvaluationResult, EvaluationSummary, evaluationQuestions } from '@/lib/eval';

export function Dashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [isQuickRunning, setIsQuickRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [summary, setSummary] = useState<EvaluationSummary | null>(null);
  const [error, setError] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const runEvaluation = async (quickMode = false) => {
    if (quickMode) {
      setIsQuickRunning(true);
    } else {
      setIsRunning(true);
    }
    setError('');
    setResults([]);
    setSummary(null);
    setProgress(0);

    try {
      const apiResponse = await axios.post('/api/test', { 
        runEvaluation: true, 
        quickMode 
      });
      setResults(apiResponse.data.results);
      setSummary(apiResponse.data.summary);
    } catch (err) {
      console.error('Evaluation failed:', err);
      setError('Failed to run evaluation. Please try again.');
    } finally {
      setIsRunning(false);
      setIsQuickRunning(false);
      setProgress(0);
    }
  };

  // score color helper
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  // score icon helper
  const getScoreIcon = (score: number) => {
    if (score >= 0.7) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 0.5) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  // filter questions
  const filteredQuestions = evaluationQuestions.filter(q => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const categories = ['all', 'product', 'technical', 'billing', 'account', 'general'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Evaluation Dashboard</h2>
          <p className="text-gray-600">Test the system with {evaluationQuestions.length} realistic questions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowQuestions(!showQuestions)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            {showQuestions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showQuestions ? 'Hide Questions' : 'Show Questions'}
          </button>
          <button
            onClick={() => runEvaluation(true)}
            disabled={isRunning || isQuickRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isQuickRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {isQuickRunning ? 'Quick Test...' : 'Quick Test (20 Qs)'}
          </button>
          <button
            onClick={() => runEvaluation(false)}
            disabled={isRunning || isQuickRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isRunning ? 'Running...' : 'Full Evaluation'}
          </button>
        </div>
      </div>

      {/* progress bar */}
      {(isRunning || isQuickRunning) && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {isQuickRunning ? 'Quick Evaluation' : 'Full Evaluation'} in Progress...
            </span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This may take a few minutes. Please don't navigate away from this page.
          </p>
        </div>
      )}

      {/* error display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* questions list */}
      {showQuestions && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Questions ({filteredQuestions.length})</h3>
            
            {/* filters */}
            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Answer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{question.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{question.question}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.category === 'product' ? 'bg-blue-100 text-blue-800' :
                        question.category === 'technical' ? 'bg-green-100 text-green-800' :
                        question.category === 'billing' ? 'bg-yellow-100 text-yellow-800' :
                        question.category === 'account' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {question.expectedAnswer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* summary section */}
      {summary && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Summary</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summary.totalQuestions}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(summary.averageAccuracy)}`}>
                {(summary.averageAccuracy * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(summary.averageHelpfulness)}`}>
                {(summary.averageHelpfulness * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Average Helpfulness</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(summary.averageOverallScore)}`}>
                {(summary.averageOverallScore * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>

          {/* category breakdown */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Performance by Category</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(summary.categoryBreakdown).map(([category, { count, averageScore }]) => (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 capitalize">{category}</div>
                  <div className={`text-lg font-bold ${getScoreColor(averageScore)}`}>
                    {(averageScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600">{count} questions</div>
                </div>
              ))}
            </div>
          </div>

          {/* difficulty breakdown */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Performance by Difficulty</h4>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(summary.difficultyBreakdown).map(([difficulty, { count, averageScore }]) => (
                <div key={difficulty} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 capitalize">{difficulty}</div>
                  <div className={`text-lg font-bold ${getScoreColor(averageScore)}`}>
                    {(averageScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600">{count} questions</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* results table */}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Results</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accuracy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Helpfulness</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overall</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.questionId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {result.question}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(result.accuracy)}
                        <span className={getScoreColor(result.accuracy)}>
                          {(result.accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(result.helpfulness)}
                        <span className={getScoreColor(result.helpfulness)}>
                          {(result.helpfulness * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(result.overallScore)}
                        <span className={getScoreColor(result.overallScore)}>
                          {(result.overallScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {result.feedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 