'use client';

import { useState } from 'react';
import { Chat } from '@/components/chat';
import { VoiceChat } from '@/components/voice-chat';
import { EvaluationDashboard } from '@/components/evaluation-dashboard';
import { MessageSquare, Mic, BarChart3, ChevronRight } from 'lucide-react';

export default function Home() {
  const [tab, setTab] = useState<'text' | 'voice' | 'evaluation'>('text');

  const tabs = [
    {
      id: 'text',
      label: 'Text Chat',
      icon: MessageSquare,
      description: 'Chat with our AI assistant via text'
    },
    {
      id: 'voice',
      label: 'Voice Chat',
      icon: Mic,
      description: 'Speak naturally with voice recognition'
    },
    {
      id: 'evaluation',
      label: 'AI Evaluation',
      icon: BarChart3,
      description: 'Test and analyze AI performance'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
          AI Assistant Ready
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Intelligent Support for Aven
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get instant answers to your questions about Aven&apos;s financial services, 
          powered by advanced AI technology with comprehensive safety measures.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon;
            const isActive = tab === tabItem.id;
            
            return (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id as 'text' | 'voice' | 'evaluation')}
                className={`
                  flex items-center justify-center sm:justify-start gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-200
                  ${isActive 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <div className="text-left">
                  <div className="font-semibold">{tabItem.label}</div>
                  <div className="text-xs opacity-75">{tabItem.description}</div>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          {tab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Text Chat</h2>
                  <p className="text-gray-600">Ask questions and get instant AI-powered responses</p>
                </div>
              </div>
              <Chat />
            </div>
          )}
          
          {tab === 'voice' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Voice Chat</h2>
                  <p className="text-gray-600">Speak naturally and get voice responses</p>
                </div>
              </div>
              <VoiceChat />
            </div>
          )}
          
          {tab === 'evaluation' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Evaluation</h2>
                  <p className="text-gray-600">Test and analyze AI performance with 50+ questions</p>
                </div>
              </div>
              <EvaluationDashboard />
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Smart Responses</h3>
          <p className="text-gray-600 text-sm">
            AI-powered answers based on comprehensive knowledge base
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mic className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Voice Recognition</h3>
          <p className="text-gray-600 text-sm">
            Natural voice interaction with real-time transcription
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Performance Analytics</h3>
          <p className="text-gray-600 text-sm">
            Comprehensive evaluation and quality metrics
          </p>
        </div>
      </div>
    </div>
  );
}
