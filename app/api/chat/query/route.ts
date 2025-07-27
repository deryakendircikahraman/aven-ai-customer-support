import { getAnswerFromRAG } from '@/lib/rag';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    console.log('Received question:', question); // Debug log

    if (!question) {
      console.log('No question provided'); // Debug log
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const result = await getAnswerFromRAG(question);
    console.log('RAG result:', { 
      hasAnswer: !!result.answer, 
      hasMeetingRequest: !!result.meetingRequest,
      hasSlots: !!result.availableSlots 
    }); // Debug log

    return NextResponse.json({ 
      answer: result.answer,
      meetingRequest: result.meetingRequest,
      availableSlots: result.availableSlots
    });
  } catch (error) {
    console.error('Error in /api/query:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// TODO: Add request logging
// TODO: Add rate limiting
// TODO: Add input validation
// TODO: Add response caching
