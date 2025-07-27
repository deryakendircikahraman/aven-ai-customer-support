'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar } from 'lucide-react';
import axios from 'axios';
import { MeetingRequest, MeetingSlot } from '@/lib/scheduler';

// message type for chat
type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  meetingRequest?: MeetingRequest;
  availableSlots?: MeetingSlot[];
};

export function Chat() {
  // state management
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Aven support assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMeetingSlots, setShowMeetingSlots] = useState(false);
  const [currentMeetingRequest, setCurrentMeetingRequest] = useState<MeetingRequest | null>(null);
  const [availableSlots, setAvailableSlots] = useState<MeetingSlot[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // scroll to bottom when new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowMeetingSlots(false);

    try {
      // send to API
      const apiResponse = await axios.post('/api/chat/query', {
        question: userMsg.content
      });

      // create assistant response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: apiResponse.data.answer || 'Sorry, I couldn\'t process your request.',
        role: 'assistant',
        timestamp: new Date(),
        meetingRequest: apiResponse.data.meetingRequest,
        availableSlots: apiResponse.data.availableSlots
      };

      setMessages(prev => [...prev, botResponse]);

      // check if meeting slots available
      if (apiResponse.data.meetingRequest && apiResponse.data.availableSlots) {
        setCurrentMeetingRequest(apiResponse.data.meetingRequest);
        setAvailableSlots(apiResponse.data.availableSlots);
        setShowMeetingSlots(true);
      }

    } catch (error) {
      console.error('Error:', error);
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your Aven support assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setShowMeetingSlots(false);
    setCurrentMeetingRequest(null);
    setAvailableSlots([]);
  };

  const handleSlotSelection = (selectedSlot: MeetingSlot) => {
    if (!currentMeetingRequest) return;

    const confirmationMsg: Message = {
      id: (Date.now() + 1).toString(),
      content: `Great! I've scheduled your ${currentMeetingRequest.meetingType} meeting for ${selectedSlot.date} at ${selectedSlot.time}. You'll get an email confirmation soon.`,
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, confirmationMsg]);
    setShowMeetingSlots(false);
    setCurrentMeetingRequest(null);
    setAvailableSlots([]);
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[600px]">
      {/* header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Aven Assistant</h3>
            <p className="text-xs text-gray-500">Smart Support</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
        >
          Clear
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <Bot className="w-4 h-4 text-blue-600 mt-1" />
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <User className="w-4 h-4 text-blue-200 mt-1" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* meeting slots */}
      {showMeetingSlots && availableSlots.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-blue-900">Available Slots</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {availableSlots
              .filter(slot => slot.available)
              .slice(0, 4)
              .map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelection(slot)}
                  className="p-2 text-sm bg-white border border-blue-200 rounded-lg hover:bg-blue-50"
                >
                  <div className="font-medium text-blue-900">{slot.date}</div>
                  <div className="text-blue-600">{slot.time}</div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* input area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything or schedule a meeting..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
