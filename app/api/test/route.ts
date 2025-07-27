import { NextRequest, NextResponse } from 'next/server';
import { getAnswerFromRAG } from '@/lib/rag';
import { 
  evaluationQuestions,
  calculateAccuracy,
  calculateHelpfulness,
  calculateCitationQuality,
  calculateOverallScore,
  generateFeedback,
  type EvaluationResult,
  type EvaluationSummary
} from '@/lib/eval';

export async function POST(req: NextRequest) {
  try {
    const { runEvaluation, quickMode } = await req.json();

    if (!runEvaluation) {
      return NextResponse.json({ error: 'runEvaluation parameter is required' }, { status: 400 });
    }

    // Select questions based on mode
    let questionsToEvaluate = evaluationQuestions;
    if (quickMode) {
      // For quick mode, take first 20 questions (mix of categories)
      const realQuestions = evaluationQuestions.filter(q => q.id.startsWith('real-')).slice(0, 15);
      const otherQuestions = evaluationQuestions.filter(q => !q.id.startsWith('real-')).slice(0, 5);
      questionsToEvaluate = [...realQuestions, ...otherQuestions];
    }

    const results: EvaluationResult[] = [];
    let totalAccuracy = 0;
    let totalHelpfulness = 0;
    let totalCitationQuality = 0;
    let totalOverallScore = 0;

    // Run evaluation on selected questions
    for (let i = 0; i < questionsToEvaluate.length; i++) {
      const question = questionsToEvaluate[i];
      
      try {
        // Get AI response with timeout
        const response = await Promise.race([
          getAnswerFromRAG(question.question),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 30000) // 30 second timeout
          )
        ]) as any;
        
        const actualAnswer = response.answer;

        // Calculate scores
        const accuracy = calculateAccuracy(actualAnswer, question.expectedAnswer);
        const helpfulness = calculateHelpfulness(actualAnswer, question.question);
        const citationQuality = calculateCitationQuality(actualAnswer);
        const overallScore = calculateOverallScore(accuracy, helpfulness, citationQuality);
        const feedback = generateFeedback(accuracy, helpfulness, citationQuality);

        // Accumulate totals
        totalAccuracy += accuracy;
        totalHelpfulness += helpfulness;
        totalCitationQuality += citationQuality;
        totalOverallScore += overallScore;

        results.push({
          questionId: question.id,
          question: question.question,
          expectedAnswer: question.expectedAnswer,
          actualAnswer,
          accuracy,
          helpfulness,
          citationQuality,
          overallScore,
          feedback
        });

        // Add small delay to avoid rate limiting
        if (i < questionsToEvaluate.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

      } catch (error) {
        console.error(`Error evaluating question ${question.id}:`, error);
        
        results.push({
          questionId: question.id,
          question: question.question,
          expectedAnswer: question.expectedAnswer,
          actualAnswer: 'Error occurred during evaluation',
          accuracy: 0,
          helpfulness: 0,
          citationQuality: 0,
          overallScore: 0,
          feedback: 'Error occurred during evaluation'
        });
      }
    }

    const totalQuestions = questionsToEvaluate.length;

    // Calculate category breakdown
    const categoryBreakdown: Record<string, { count: number; averageScore: number }> = {};
    const difficultyBreakdown: Record<string, { count: number; averageScore: number }> = {};

    // Initialize breakdowns
    questionsToEvaluate.forEach(q => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { count: 0, averageScore: 0 };
      }
      if (!difficultyBreakdown[q.difficulty]) {
        difficultyBreakdown[q.difficulty] = { count: 0, averageScore: 0 };
      }
    });

    // Calculate breakdowns
    results.forEach(result => {
      const question = questionsToEvaluate.find(q => q.id === result.questionId);
      if (question) {
        categoryBreakdown[question.category].count++;
        categoryBreakdown[question.category].averageScore += result.overallScore;
        
        difficultyBreakdown[question.difficulty].count++;
        difficultyBreakdown[question.difficulty].averageScore += result.overallScore;
      }
    });

    // Calculate averages
    Object.keys(categoryBreakdown).forEach(category => {
      if (categoryBreakdown[category].count > 0) {
        categoryBreakdown[category].averageScore /= categoryBreakdown[category].count;
      }
    });

    Object.keys(difficultyBreakdown).forEach(difficulty => {
      if (difficultyBreakdown[difficulty].count > 0) {
        difficultyBreakdown[difficulty].averageScore /= difficultyBreakdown[difficulty].count;
      }
    });

    const summary: EvaluationSummary = {
      totalQuestions,
      averageAccuracy: totalAccuracy / totalQuestions,
      averageHelpfulness: totalHelpfulness / totalQuestions,
      averageCitationQuality: totalCitationQuality / totalQuestions,
      averageOverallScore: totalOverallScore / totalQuestions,
      categoryBreakdown,
      difficultyBreakdown
    };

    return NextResponse.json({ results, summary });

  } catch (error) {
    console.error('Error in evaluation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 