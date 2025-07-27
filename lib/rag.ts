import OpenAI from "openai";
import { getMatchesFromPinecone } from "./pinecone";
import { applyGuardrails, sanitizeText } from "./guardrails";
import { detectMeetingRequest, generateMeetingResponse, findAvailableSlots } from "./meeting-scheduler";
import { ApiResponse, MeetingRequest } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getAnswerFromRAG(question: string): Promise<ApiResponse> {
  // 1. Apply guardrails first
  const guardrailResult = applyGuardrails(question);
  
  if (guardrailResult.isBlocked) {
    return {
      answer: guardrailResult.suggestedResponse,
      guardrailResult
    };
  }

  // 2. Check for meeting requests
  const meetingDetection = detectMeetingRequest(question);
  
  if (meetingDetection.isMeetingRequest && meetingDetection.confidence > 0.3) {
    // Generate meeting response
    const availableSlots = findAvailableSlots();
    const meetingResponse = generateMeetingResponse(
      meetingDetection.extractedData as MeetingRequest,
      availableSlots
    );
    
    return {
      answer: meetingResponse,
      meetingRequest: meetingDetection.extractedData as MeetingRequest,
      availableSlots
    };
  }

  // 3. Sanitize the question to remove any personal data
  const sanitizedQuestion = sanitizeText(question);

  // 4. Get embedding
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: sanitizedQuestion,
  });

  const embedding = embeddingResponse.data[0].embedding;

  // 5. Query Pinecone for matches
  const matches = await getMatchesFromPinecone(embedding);
  const context = matches
    .map((m) => m.metadata?.text)
    .filter(Boolean)
    .join("\n\n");

  // 6. Use context to generate answer
  const chatResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful customer support agent for Aven. Answer using only the provided context. If asked about personal data, legal advice, or financial advice, politely decline and refer to appropriate professionals. If someone asks to schedule a meeting, call, or demo, help them with the scheduling process.",
      },
      {
        role: "user",
        content: `Answer the question using the context below. If the context doesn't help, say "I don't know".\n\nContext:\n${context}\n\nQuestion: ${sanitizedQuestion}`,
      },
    ],
  });

  const answer = chatResponse.choices[0].message.content ?? "Sorry, I couldn't find an answer.";
  return { answer };
}
