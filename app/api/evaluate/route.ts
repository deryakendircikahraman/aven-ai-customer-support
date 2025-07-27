import { NextRequest, NextResponse } from 'next/server';
import { evaluationQuestions, evaluateAnswer, generateEvaluationSummary } from '@/lib/evaluation';
import { getAnswerFromRAG } from '@/lib/rag';

export async function POST(req: NextRequest) {
  try {
    const { questionIds, runAll } = await req.json();

    let questionsToEvaluate = evaluationQuestions;

    // If specific question IDs are provided, filter to those
    if (questionIds && questionIds.length > 0 && !runAll) {
      questionsToEvaluate = evaluationQuestions.filter(q => questionIds.includes(q.id));
    }

    const results = [];

    // Evaluate each question
    for (const question of questionsToEvaluate) {
      try {
        // Get AI response
        const aiResult = await getAnswerFromRAG(question.question);
        const actualAnswer = aiResult.answer;

        // Evaluate the response
        const evaluation = evaluateAnswer(question, actualAnswer);

        results.push({
          ...evaluation,
          guardrailResult: aiResult.guardrailResult
        });

        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

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
          feedback: 'Error occurred during evaluation',
          error: true
        });
      }
    }

    // Generate summary
    const summary = generateEvaluationSummary(results);

    return NextResponse.json({
      results,
      summary,
      totalQuestions: questionsToEvaluate.length,
      evaluatedQuestions: questionsToEvaluate.length
    });

  } catch (error) {
    console.error('Error in /api/evaluate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Return available questions for evaluation
    const questions = evaluationQuestions.map(q => ({
      id: q.id,
      question: q.question,
      category: q.category,
      difficulty: q.difficulty
    }));

    return NextResponse.json({
      questions,
      totalQuestions: evaluationQuestions.length,
      categories: ['product', 'technical', 'billing', 'account', 'general'],
      difficulties: ['easy', 'medium', 'hard']
    });

  } catch (error) {
    console.error('Error in /api/evaluate GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 