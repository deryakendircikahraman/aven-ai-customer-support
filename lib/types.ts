// API Response Types
export interface ApiResponse {
  answer: string;
  guardrailResult?: GuardrailResult;
  meetingRequest?: MeetingRequest;
  availableSlots?: MeetingSlot[];
}

// Meeting Types
export interface MeetingRequest {
  userId: string;
  userEmail: string;
  userPhone?: string;
  meetingType: 'support' | 'demo' | 'consultation' | 'technical';
  preferredDate: string;
  preferredTime: string;
  duration: number;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface MeetingSlot {
  date: string;
  time: string;
  available: boolean;
  bookedBy?: string;
}

export interface ScheduledMeeting {
  id: string;
  userId: string;
  userEmail: string;
  userPhone?: string;
  meetingType: 'support' | 'demo' | 'consultation' | 'technical';
  preferredDate: string;
  preferredTime: string;
  duration: number;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  scheduledAt: string;
  meetingLink?: string;
  notes?: string;
}

// Guardrail Types
export interface GuardrailResult {
  isBlocked: boolean;
  category: 'personal_data' | 'legal_advice' | 'financial_advice' | 'toxicity' | 'misuse' | 'none';
  confidence: number;
  reason: string;
  suggestedResponse: string;
}

// Evaluation Types
export interface EvaluationQuestion {
  id: string;
  question: string;
  expectedAnswer: string;
  category: 'product' | 'technical' | 'billing' | 'account' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  requiresContext: boolean;
}

export interface EvaluationResult {
  questionId: string;
  question: string;
  expectedAnswer: string;
  actualAnswer: string;
  accuracy: number;
  helpfulness: number;
  citationQuality: number;
  overallScore: number;
  feedback: string;
  error?: boolean;
  guardrailResult?: GuardrailResult;
}

export interface EvaluationSummary {
  totalQuestions: number;
  averageAccuracy: number;
  averageHelpfulness: number;
  averageCitationQuality: number;
  averageOverallScore: number;
  categoryBreakdown: Record<string, {
    count: number;
    averageScore: number;
  }>;
  difficultyBreakdown: Record<string, {
    count: number;
    averageScore: number;
  }>;
}

// Vapi Types
export interface VapiError {
  type: string;
  stage?: string;
  error?: {
    message?: string;
    error?: string;
    statusCode?: number;
    data?: unknown;
  };
  totalDuration?: number;
  timestamp?: string;
  context?: {
    hasAssistant?: boolean;
    hasSquad?: boolean;
    hasWorkflow?: boolean;
    isMobile?: boolean;
  };
}

export interface VapiMessage {
  transcript?: string;
  response?: string;
  content?: string;
  text?: string;
  [key: string]: unknown;
}

export interface VapiEventHandlers {
  onCallStart: () => void;
  onCallEnd: () => void;
  onError: (error: VapiError | unknown) => void;
  onMessage: (message: VapiMessage | string) => void;
}

// Component Props Types
export interface MeetingSchedulerProps {
  meetingRequest: MeetingRequest | null;
  availableSlots: MeetingSlot[];
  onClose: () => void;
  onMeetingScheduled: (meeting: ScheduledMeeting) => void;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
} 