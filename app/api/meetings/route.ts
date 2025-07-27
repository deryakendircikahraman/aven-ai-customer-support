import { NextRequest, NextResponse } from 'next/server';
import { 
  detectMeetingRequest, 
  scheduleMeeting, 
  findAvailableSlots,
  getMeetingStats,
  getMeetingStatus,
  cancelMeeting,
  MeetingRequest
} from '@/lib/meeting-scheduler';

export async function POST(req: NextRequest) {
  try {
    const { action, ...data } = await req.json();

    switch (action) {
      case 'detect':
        const { text } = data;
        const detection = detectMeetingRequest(text);
        return NextResponse.json(detection);

      case 'schedule':
        const meetingRequest: MeetingRequest = data;
        const result = scheduleMeeting(meetingRequest);
        return NextResponse.json(result);

      case 'slots':
        const { preferredDate, preferredTime, duration } = data;
        const slots = findAvailableSlots(preferredDate, preferredTime, duration);
        return NextResponse.json({ slots });

      case 'cancel':
        const { meetingId, userId } = data;
        const cancelResult = cancelMeeting(meetingId, userId);
        return NextResponse.json(cancelResult);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in /api/meetings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'stats':
        const stats = getMeetingStats();
        return NextResponse.json(stats);

      case 'status':
        const meetingId = searchParams.get('meetingId');
        if (!meetingId) {
          return NextResponse.json({ error: 'meetingId is required' }, { status: 400 });
        }
        const meeting = getMeetingStatus(meetingId);
        return NextResponse.json({ meeting });

      case 'slots':
        const preferredDate = searchParams.get('date');
        const preferredTime = searchParams.get('time');
        const duration = parseInt(searchParams.get('duration') || '30');
        const slots = findAvailableSlots(preferredDate || undefined, preferredTime || undefined, duration);
        return NextResponse.json({ slots });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in /api/meetings GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 