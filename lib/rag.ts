import OpenAI from "openai";
import { getMatchesFromPinecone } from "./db";
import { detectMeetingRequest, findAvailableSlots } from "./scheduler";
import { MeetingSlot } from "./scheduler";
import { ScoredPineconeRecord } from "@pinecone-database/pinecone";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getAnswerFromRAG(question: string) {
  try {
    // Create embedding for the question
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });

    const questionEmbedding = embeddingResponse.data[0].embedding;

    // Query Pinecone for matches
    const matches = await getMatchesFromPinecone(questionEmbedding);

    // Build context from matches
    const context = matches.map((match: ScoredPineconeRecord) => match.metadata?.text || '').join('\n\n');

    // Create prompt with context
    const prompt = `You are a helpful customer support assistant for Aven, a financial technology company. 
    
Context information:
${context}

Question: ${question}

Please provide a helpful and accurate answer based on the context above. If the context doesn't contain enough information to answer the question, say so politely. Always be professional and helpful. Use "we" and "our" when referring to Aven. Never refer to the company as "Avon" - always use "Aven".`;

    // Get response from OpenAI
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support assistant for Aven, a financial technology company. Use 'we' and 'our' when referring to Aven. Never refer to the company as 'Avon' - always use 'Aven'. Be empathetic, professional, and actionable in your responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer = chatResponse.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Check for meeting requests
    const meetingRequest = detectMeetingRequest(question);
    let availableSlots: MeetingSlot[] = [];

    if (meetingRequest.isMeetingRequest) {
      availableSlots = findAvailableSlots();
    }

    return {
      answer,
      meetingRequest,
      availableSlots
    };

  } catch (err) {
    console.error('Error in RAG:', err);
    return {
      answer: 'I apologize, but I encountered an error while processing your request. Please try again.',
      meetingRequest: null,
      availableSlots: []
    };
  }
}



