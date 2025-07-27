// API response
export interface ApiResponse {
  answer: string;
  meetingRequest?: MeetingRequest;
  availableSlots?: MeetingSlot[];
}

// meeting related types
export interface MeetingRequest {
  userEmail: string;
  meetingType: 'support' | 'demo' | 'consultation';
  preferredDate: string;
  preferredTime: string;
  description: string;
}

export interface MeetingSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface ScheduledMeeting {
  id: string;
  userEmail: string;
  meetingType: string;
  scheduledDate: string;
  scheduledTime: string;
  description: string;
  status: 'scheduled' | 'confirmed' | 'cancelled';
}

// voice chat types
export interface VapiError {
  type: string;
  message?: string;
  [key: string]: unknown;
}

export interface VapiMessage {
  transcript?: string;
  response?: string;
  content?: string;
  text?: string;
  [key: string]: unknown;
}

// chat message
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  meetingRequest?: MeetingRequest;
  availableSlots?: MeetingSlot[];
} 