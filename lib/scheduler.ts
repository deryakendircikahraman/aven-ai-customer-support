// TODO: Add better error handling
// TODO: Integrate with real calendar system
// FIXME: Hardcoded slots need to be dynamic
// NOTE: This is a basic implementation, needs improvement

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

// Simple meeting detection - could be improved
export function detectMeetingRequest(question: string): {
  isMeetingRequest: boolean;
  confidence: number;
  extractedData?: MeetingRequest;
} {
  const questionLower = question.toLowerCase();
  
  // Basic keywords - might miss some cases
  const meetingKeywords = [
    'schedule', 'book', 'meeting', 'demo', 'call'
  ];
  
  const hasMeetingKeyword = meetingKeywords.some(keyword => 
    questionLower.includes(keyword)
  );
  
  if (!hasMeetingKeyword) {
    return { isMeetingRequest: false, confidence: 0 };
  }
  
  // Simple type detection
  let meetingType: 'support' | 'demo' | 'consultation' = 'support';
  if (questionLower.includes('demo')) {
    meetingType = 'demo';
  } else if (questionLower.includes('consultation')) {
    meetingType = 'consultation';
  }
  
  // TODO: Extract actual date/time from question
  const extractedData: MeetingRequest = {
    userEmail: 'user@example.com', // TODO: Get from session
    meetingType,
    preferredDate: '2024-01-15', // Hardcoded for now
    preferredTime: '10:00 AM',   // Hardcoded for now
    description: question
  };
  
  return {
    isMeetingRequest: true,
    confidence: 0.6, // Lower confidence
    extractedData
  };
}

// Generate some available slots - simplified
export function findAvailableSlots(): MeetingSlot[] {
  const slots: MeetingSlot[] = [];
  const today = new Date();
  
  // Only next 3 days for simplicity
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Fewer time slots
    const times = ['10:00 AM', '2:00 PM', '4:00 PM'];
    
    times.forEach(time => {
      slots.push({
        date: date.toISOString().split('T')[0],
        time,
        available: Math.random() > 0.5 // 50% chance
      });
    });
  }
  
  return slots;
}

// Simple response generation
export function generateMeetingResponse(
  meetingRequest: MeetingRequest,
  availableSlots: MeetingSlot[]
): string {
  const availableSlotsForType = availableSlots.filter(slot => slot.available);
  
  if (availableSlotsForType.length === 0) {
    return `Sorry, no available slots for ${meetingRequest.meetingType} meetings. Please contact support.`;
  }
  
  const suggestedSlot = availableSlotsForType[0];
  
  return `I can help you schedule a ${meetingRequest.meetingType} meeting. Available slot: ${suggestedSlot.date} at ${suggestedSlot.time}. Would you like to book this?`;
}

// Basic meeting scheduling
export function scheduleMeeting(
  userEmail: string,
  meetingType: string,
  date: string,
  time: string,
  description: string
): ScheduledMeeting {
  const meeting: ScheduledMeeting = {
    id: `meeting_${Date.now()}`,
    userEmail,
    meetingType,
    scheduledDate: date,
    scheduledTime: time,
    description,
    status: 'scheduled'
  };
  
  // TODO: Save to database
  console.log('Meeting scheduled:', meeting);
  
  return meeting;
}

// TODO: Add function to cancel meetings
// TODO: Add function to reschedule meetings
// TODO: Add email notifications 