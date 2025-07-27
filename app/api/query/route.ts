import { getAnswerFromRAG } from '@/lib/rag';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const result = await getAnswerFromRAG(question);

    return NextResponse.json({ 
      answer: result.answer,
      guardrailResult: result.guardrailResult,
      meetingRequest: result.meetingRequest,
      availableSlots: result.availableSlots
    });
  } catch (error) {
    console.error('Error in /api/query:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
