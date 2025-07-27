export interface MeetingRequest {
  userId: string;
  userEmail: string;
  userPhone?: string;
  meetingType: 'support' | 'demo' | 'consultation' | 'technical';
  preferredDate: string; // ISO date string
  preferredTime: string; // HH:MM format
  duration: number; // minutes
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

// Mock database for meetings (in production, this would be a real database)
const meetings: ScheduledMeeting[] = [];
const meetingSlots: MeetingSlot[] = [];

// Initialize some available slots
const initializeSlots = () => {
  const today = new Date();
  for (let i = 0; i < 14; i++) { // Next 2 weeks
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Business hours: 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      meetingSlots.push({
        date: dateStr,
        time: timeStr,
        available: true
      });
    }
  }
};

// Initialize slots on module load
initializeSlots();

export function detectMeetingRequest(text: string): {
  isMeetingRequest: boolean;
  confidence: number;
  extractedData?: Partial<MeetingRequest>;
} {
  const meetingKeywords = [
    'schedule', 'book', 'appointment', 'meeting', 'call', 'demo',
    'consultation', 'support call', 'technical call', 'discuss',
    'talk to someone', 'speak with', 'meet with', 'talk with',
    'talk to', 'speak to', 'team member', 'team', 'member'
  ];



  const urgencyKeywords = {
    high: ['urgent', 'asap', 'emergency', 'critical', 'immediately'],
    medium: ['soon', 'this week', 'next week'],
    low: ['when convenient', 'no rush', 'flexible']
  };

  const textLower = text.toLowerCase();
  
  // Check for meeting request indicators
  const hasMeetingKeywords = meetingKeywords.some(keyword => 
    textLower.includes(keyword)
  );
  


  // Special case for team member requests
  const hasTeamRequest = textLower.includes('team member') || textLower.includes('talk with') || textLower.includes('speak with');

  if (!hasMeetingKeywords && !hasTeamRequest) {
    return { isMeetingRequest: false, confidence: 0 };
  }

  let confidence = 0.3; // Base confidence
  const extractedData: Partial<MeetingRequest> = {};

  // Boost confidence for team member requests
  if (hasTeamRequest) {
    confidence += 0.3;
    extractedData.meetingType = 'support';
  }

  // Extract meeting type
  if (textLower.includes('demo') || textLower.includes('demonstration')) {
    extractedData.meetingType = 'demo';
    confidence += 0.2;
  } else if (textLower.includes('support') || textLower.includes('help') || textLower.includes('team member')) {
    extractedData.meetingType = 'support';
    confidence += 0.2;
  } else if (textLower.includes('consult') || textLower.includes('advice')) {
    extractedData.meetingType = 'consultation';
    confidence += 0.2;
  } else if (textLower.includes('technical') || textLower.includes('integration')) {
    extractedData.meetingType = 'technical';
    confidence += 0.2;
  }

  // Extract urgency
  if (urgencyKeywords.high.some(keyword => textLower.includes(keyword))) {
    extractedData.urgency = 'high';
    confidence += 0.2;
  } else if (urgencyKeywords.medium.some(keyword => textLower.includes(keyword))) {
    extractedData.urgency = 'medium';
    confidence += 0.1;
  } else {
    extractedData.urgency = 'low';
  }

  // Extract duration (default 30 minutes)
  if (textLower.includes('hour') || textLower.includes('60')) {
    extractedData.duration = 60;
  } else if (textLower.includes('15') || textLower.includes('quarter')) {
    extractedData.duration = 15;
  } else {
    extractedData.duration = 30; // Default
  }

  // Extract description
  const descriptionMatch = text.match(/(?:about|regarding|concerning|discuss)\s+(.+)/i);
  if (descriptionMatch) {
    extractedData.description = descriptionMatch[1].trim();
    confidence += 0.1;
  } else if (hasTeamRequest) {
    // For team member requests, use the full text as description
    extractedData.description = text;
    confidence += 0.1;
  }

  return {
    isMeetingRequest: confidence > 0.4,
    confidence: Math.min(confidence, 1.0),
    extractedData
  };
}

export function findAvailableSlots(
  preferredDate?: string,
  preferredTime?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  duration: number = 30
): MeetingSlot[] {
  let availableSlots = meetingSlots.filter(slot => slot.available);

  // Filter by preferred date if provided
  if (preferredDate) {
    availableSlots = availableSlots.filter(slot => slot.date === preferredDate);
  }

  // Filter by preferred time if provided
  if (preferredTime) {
    const preferredHour = parseInt(preferredTime.split(':')[0]);
    availableSlots = availableSlots.filter(slot => {
      const slotHour = parseInt(slot.time.split(':')[0]);
      return Math.abs(slotHour - preferredHour) <= 2; // Within 2 hours
    });
  }

  return availableSlots.slice(0, 10); // Return top 10 available slots
}

export function scheduleMeeting(meetingRequest: MeetingRequest): {
  success: boolean;
  meeting?: ScheduledMeeting;
  error?: string;
  availableSlots?: MeetingSlot[];
} {
  try {
    // Validate required fields
    if (!meetingRequest.userId || !meetingRequest.userEmail || !meetingRequest.preferredDate) {
      return {
        success: false,
        error: 'Missing required fields: userId, userEmail, and preferredDate are required'
      };
    }

    // Check if the requested slot is available
    const requestedSlot = meetingSlots.find(slot => 
      slot.date === meetingRequest.preferredDate && 
      slot.time === meetingRequest.preferredTime
    );

    if (!requestedSlot || !requestedSlot.available) {
      // Return available slots for the requested date
      const availableSlots = findAvailableSlots(meetingRequest.preferredDate);
      return {
        success: false,
        error: 'Requested time slot is not available',
        availableSlots
      };
    }

    // Create the meeting
    const meeting: ScheduledMeeting = {
      id: `meeting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...meetingRequest,
      status: 'scheduled',
      scheduledAt: new Date().toISOString(),
      meetingLink: `https://meet.aven.com/${Math.random().toString(36).substr(2, 9)}`
    };

    // Book the slot
    requestedSlot.available = false;
    requestedSlot.bookedBy = meetingRequest.userId;

    // Add to meetings list
    meetings.push(meeting);

    return {
      success: true,
      meeting
    };

  } catch (error) {
    return {
      success: false,
      error: `Failed to schedule meeting: ${error}`
    };
  }
}

export function getMeetingStatus(meetingId: string): ScheduledMeeting | null {
  return meetings.find(meeting => meeting.id === meetingId) || null;
}

export function cancelMeeting(meetingId: string, userId: string): {
  success: boolean;
  error?: string;
} {
  const meeting = meetings.find(m => m.id === meetingId);
  
  if (!meeting) {
    return { success: false, error: 'Meeting not found' };
  }

  if (meeting.userId !== userId) {
    return { success: false, error: 'Unauthorized to cancel this meeting' };
  }

  // Free up the slot
  const slot = meetingSlots.find(s => 
    s.date === meeting.preferredDate && 
    s.time === meeting.preferredTime
  );
  
  if (slot) {
    slot.available = true;
    slot.bookedBy = undefined;
  }

  // Update meeting status
  meeting.status = 'cancelled';

  return { success: true };
}

export function generateMeetingResponse(
  meetingRequest: MeetingRequest,
  availableSlots?: MeetingSlot[]
): string {
  if (availableSlots && availableSlots.length > 0) {
    const slotList = availableSlots
      .slice(0, 5)
      .map(slot => `${slot.date} at ${slot.time}`)
      .join(', ');
    
    return `I'd be happy to schedule a ${meetingRequest.meetingType} meeting for you! Here are some available time slots: ${slotList}. 

To confirm your meeting, please provide:
- Your preferred date and time from the options above
- A brief description of what you'd like to discuss
- Your contact information (email and phone)

I'll then schedule the meeting and send you a confirmation with the meeting link.`;
  }

  return `I'd be happy to schedule a ${meetingRequest.meetingType} meeting for you! 

To schedule your meeting, please provide:
- Your preferred date and time
- A brief description of what you'd like to discuss
- Your contact information (email and phone)

I'll check availability and confirm the meeting details with you.`;
}

export function getMeetingStats(): {
  totalMeetings: number;
  upcomingMeetings: number;
  completedMeetings: number;
  cancelledMeetings: number;
} {
  return {
    totalMeetings: meetings.length,
    upcomingMeetings: meetings.filter(m => 
      m.status === 'scheduled' || m.status === 'confirmed'
    ).length,
    completedMeetings: meetings.filter(m => m.status === 'completed').length,
    cancelledMeetings: meetings.filter(m => m.status === 'cancelled').length
  };
} 