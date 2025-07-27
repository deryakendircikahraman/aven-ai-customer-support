"use client";

import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    // setup vapi
    const vapi = new Vapi("9f59a2ab-092d-4676-93c4-a33ba97e8c6d");
    vapiRef.current = vapi;

    // event handlers
    vapi.on("call-start", () => {
      setIsListening(true);
      setError("");
    });

    vapi.on("call-end", () => {
      setIsListening(false);
    });

    vapi.on("error", (err) => {
      setIsListening(false);
      setError(`Voice chat error: ${JSON.stringify(err)}`);
    });

    vapi.on("message", (msg: { transcript?: string; response?: string }) => {
      if (msg.transcript) {
        setTranscript(msg.transcript);
      }
      if (msg.response) {
        setResponse(msg.response);
      }
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const startListening = () => {
    setTranscript("");
    setResponse("");
    setError("");
    
    try {
      vapiRef.current?.start("b546651f-c3c8-4697-982f-b850275256fa");
    } catch {
      setError("Failed to start voice chat");
    }
  };

  const stopListening = () => {
    try {
      vapiRef.current?.stop();
    } catch {
      setError("Failed to stop voice chat");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <button
        onClick={isListening ? stopListening : startListening}
        disabled={!!error}
        className={`
          w-32 h-32 rounded-full flex items-center justify-center text-white font-semibold
          transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
          bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg
          ${error ? 'opacity-50 cursor-not-allowed' : ''}
          ${isListening ? 'animate-pulse' : ''}
        `}
      >
        {isListening ? 'Stop' : 'Start'}
      </button>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Voice Chat
        </h3>
        <p className="text-gray-600 text-sm">
          Click the button to start a voice conversation
        </p>
      </div>

      {(transcript || response) && (
        <div className="w-full max-w-2xl space-y-4">
          {transcript && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-1">You said:</div>
              <div className="text-blue-800">{transcript}</div>
            </div>
          )}
          {response && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">Response:</div>
              <div className="text-gray-800">{response}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}