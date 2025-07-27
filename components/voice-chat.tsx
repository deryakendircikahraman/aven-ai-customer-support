"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, Volume2, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { VapiError, VapiMessage } from "../lib/types";

export function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isManualStop, setIsManualStop] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);

  // Check browser compatibility
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser doesn't support microphone access");
      setIsInitializing(false);
      return;
    }
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log("Microphone access granted");
        setIsInitializing(false);
        setConnectionStatus('idle');
      })
      .catch((err) => {
        console.error("Microphone access denied:", err);
        setError("Microphone access denied. Please allow microphone access and try again.");
        setIsInitializing(false);
        setConnectionStatus('error');
      });
  }, []);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser doesn't support microphone access");
      return;
    }
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log("Microphone access granted");
        
        const vapi = new Vapi('9f59a2ab-092d-4676-93c4-a33ba97e8c6d');
  
        vapiRef.current = vapi;
  
        // Event listeners
        vapi.on("call-start", () => {
          console.log("Call started");
          setIsListening(true);
          setConnectionStatus('connected');
        });
  
              vapi.on("call-end", () => {
        console.log("Call ended - updating state");
        setIsListening(false);
        setConnectionStatus('idle');
      });

      vapi.on("error", (error: VapiError | unknown) => {
        console.error("Vapi error:", error);
        setIsListening(false);
        setConnectionStatus('error');
        setError(`Voice chat error: ${JSON.stringify(error)}`);
      });
  
        vapi.on("message", (message: VapiMessage | string) => {
          console.log("Vapi message received:", message);
          console.log("Message type:", typeof message);
          console.log("Message keys:", Object.keys(message));
          console.log("Full message:", JSON.stringify(message, null, 2));
          
          // Handle different message formats
          if (typeof message === 'string') {
            // If message is a string, it's likely a transcript
            console.log("Setting transcript as string:", message);
            const correctedTranscript = message.replace(/Avon/gi, 'Aven');
            setTranscript(correctedTranscript);
          } else if (message && typeof message === 'object') {
            // Handle object messages
            if (message.transcript) {
              console.log("Setting transcript:", message.transcript);
              const correctedTranscript = message.transcript.replace(/Avon/gi, 'Aven');
              setTranscript(correctedTranscript);
            }
            if (message.response) {
              console.log("Setting response:", message.response);
              setResponse(message.response);
            }
            if (message.content) {
              console.log("Setting response from content:", message.content);
              setResponse(message.content);
            }
            if (message.text) {
              console.log("Setting response from text:", message.text);
              setResponse(message.text);
            }
          }
        });
  
        vapi.on("error", (e: unknown) => {
          console.error("Vapi error:", e);
          console.error("Error type:", typeof e);
          console.error("Error stringified:", JSON.stringify(e));
          setIsListening(false);
          setConnectionStatus('error');
          if (!e || (typeof e === "object" && Object.keys(e).length === 0)) {
            setError("Voice chat failed to start. Please check your Vapi API key, network connection, and browser permissions.");
          } else {
            setError("Voice chat error: " + JSON.stringify(e));
          }
        });
      })
      .catch((err) => {
        console.error("Microphone access denied:", err);
        setError("Microphone access denied. Please allow microphone access and try again.");
      });
  
    return () => {
      if (vapiRef.current) {
        vapiRef.current.removeAllListeners();
        vapiRef.current.stop();
      }
    };
  }, []);
  
  const startListening = () => {
    console.log("startListening called");
    setTranscript("");
    setResponse("");
    setError("");
    setIsManualStop(false); // Reset manual stop flag
    setConnectionStatus('connecting');
    
    // Ensure we have a valid Vapi instance
    if (!vapiRef.current) {
      console.log("Creating new Vapi instance for start");
      const newVapi = new Vapi('9f59a2ab-092d-4676-93c4-a33ba97e8c6d');
      
      // Set up event listeners
      newVapi.on("call-start", () => {
        console.log("Call started");
        setIsListening(true);
        setConnectionStatus('connected');
      });

      newVapi.on("call-end", () => {
        console.log("Call ended - updating state");
        // Only update state if we're not in the middle of a manual stop
        if (isListening && !isManualStop) {
          setIsListening(false);
          setConnectionStatus('idle');
        }
      });

      newVapi.on("error", (error: VapiError | unknown) => {
        console.error("Vapi error:", error);
        setIsListening(false);
        setConnectionStatus('error');
        setError(`Voice chat error: ${JSON.stringify(error)}`);
      });

      newVapi.on("message", (message: VapiMessage | string) => {
        console.log("Vapi message received:", message);
        
        if (typeof message === 'string') {
          console.log("Setting transcript as string:", message);
          const correctedTranscript = message.replace(/Avon/gi, 'Aven');
          setTranscript(correctedTranscript);
        } else if (message && typeof message === 'object') {
          if (message.transcript) {
            console.log("Setting transcript:", message.transcript);
            const correctedTranscript = message.transcript.replace(/Avon/gi, 'Aven');
            setTranscript(correctedTranscript);
          }
          if (message.response) {
            console.log("Setting response:", message.response);
            setResponse(message.response);
          }
          if (message.content) {
            console.log("Setting response from content:", message.content);
            setResponse(message.content);
          }
          if (message.text) {
            console.log("Setting response from text:", message.text);
            setResponse(message.text);
          }
        }
      });
      
      vapiRef.current = newVapi;
    }
    
    try {
      console.log("Calling vapiRef.current?.start()");
      vapiRef.current?.start('b546651f-c3c8-4697-982f-b850275256fa');
      console.log("vapiRef.current?.start() called successfully");
    } catch (error) {
      console.error("Error calling vapi.start():", error);
      setConnectionStatus('error');
    }
  };

  const stopListening = () => {
    console.log("stopListening called - MANUAL STOP");
    
    // Set manual stop flag to prevent automatic stopping
    setIsManualStop(true);
    
    // Immediately update UI state
    setIsListening(false);
    setConnectionStatus('idle');
    
    // Try to stop Vapi with multiple approaches
    try {
      if (vapiRef.current) {
        console.log("Attempting to stop Vapi...");
        
        // Method 1: Try the standard stop method
        if (typeof vapiRef.current.stop === 'function') {
          vapiRef.current.stop();
          console.log("Vapi stop() called successfully");
        }
        
        // Method 2: Try to remove all listeners
        if (typeof vapiRef.current.removeAllListeners === 'function') {
          vapiRef.current.removeAllListeners();
          console.log("Vapi removeAllListeners() called successfully");
        }
        
        // Method 3: Try to destroy the instance (if available)
        const vapiInstance = vapiRef.current as unknown as { destroy?: () => void };
        if (typeof vapiInstance.destroy === 'function') {
          vapiInstance.destroy();
          console.log("Vapi destroy() called successfully");
        }
        
        // Method 4: Set to null to force garbage collection
        vapiRef.current = null;
        console.log("Vapi instance set to null");
        
        // Method 5: Create a fresh instance for next use
        setTimeout(() => {
          const newVapi = new Vapi('9f59a2ab-092d-4676-93c4-a33ba97e8c6d');
          
          // Set up event listeners for the new instance
          newVapi.on("call-start", () => {
            console.log("Call started");
            setIsListening(true);
            setConnectionStatus('connected');
          });

          newVapi.on("call-end", () => {
            console.log("Call ended - updating state");
            // Only update state if we're not in the middle of a manual stop
            if (isListening && !isManualStop) {
              setIsListening(false);
              setConnectionStatus('idle');
            }
          });

          newVapi.on("error", (error: VapiError | unknown) => {
            console.error("Vapi error:", error);
            setIsListening(false);
            setConnectionStatus('error');
            setError(`Voice chat error: ${JSON.stringify(error)}`);
          });

          newVapi.on("message", (message: VapiMessage | string) => {
            console.log("Vapi message received:", message);
            
            if (typeof message === 'string') {
              console.log("Setting transcript as string:", message);
              const correctedTranscript = message.replace(/Avon/gi, 'Aven');
              setTranscript(correctedTranscript);
            } else if (message && typeof message === 'object') {
              if (message.transcript) {
                console.log("Setting transcript:", message.transcript);
                const correctedTranscript = message.transcript.replace(/Avon/gi, 'Aven');
                setTranscript(correctedTranscript);
              }
              if (message.response) {
                console.log("Setting response:", message.response);
                setResponse(message.response);
              }
              if (message.content) {
                console.log("Setting response from content:", message.content);
                setResponse(message.content);
              }
              if (message.text) {
                console.log("Setting response from text:", message.text);
                setResponse(message.text);
              }
            }
          });
          
          vapiRef.current = newVapi;
          console.log("New Vapi instance created successfully");
        }, 100);
        
        // Method 6: Force stop after 3 seconds if still listening
        setTimeout(() => {
          if (isListening) {
            console.log("Force stopping after timeout");
            setIsListening(false);
            setConnectionStatus('idle');
            vapiRef.current = null;
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Error stopping Vapi:", error);
      // Even if there's an error, ensure UI is updated
      setIsListening(false);
      setConnectionStatus('idle');
    }
  };

  const resetState = () => {
    setIsListening(false);
    setConnectionStatus('idle');
    setIsManualStop(false);
    setError("");
    setTranscript("");
    setResponse("");
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connecting':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Volume2 className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Error';
      default:
        return 'Ready to Connect';
    }
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Initializing Voice Chat</h3>
        <p className="text-gray-600">Setting up microphone and AI connection...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
      {/* Status Indicator */}
      <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-full">
        {getStatusIcon()}
        <span className="text-sm font-medium text-gray-700">{getStatusText()}</span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Connection Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Voice Button */}
      <div className="relative">
        <button
          onClick={() => {
            if (isListening) {
              stopListening();
            } else {
              startListening();
            }
          }}
          disabled={!!error || connectionStatus === 'connecting'}
          className={`
            relative w-32 h-32 rounded-full flex items-center justify-center text-white font-semibold text-lg
            transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
            bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-200 hover:shadow-xl
            ${error || connectionStatus === 'connecting' ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex flex-col items-center">
            <Mic className="w-8 h-8 mb-2" />
            <span className="text-sm">Start</span>
          </div>
        </button>


      </div>

      {/* Instructions */}
      <div className="text-center max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isListening ? 'Listening...' : 'Voice Chat'}
        </h3>
        <p className="text-gray-600 text-sm">
          {isListening 
            ? 'Speak clearly and naturally. Click the button to stop.'
            : 'Click the button above to start a voice conversation with our AI assistant.'
          }
        </p>
        {isListening && (
          <button
            onClick={resetState}
            className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            Force Stop
          </button>
        )}
      </div>

      {/* Conversation Display */}
      {(transcript || response) && (
        <div className="w-full max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Conversation</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {transcript && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-900">{transcript}</div>
                </div>
              )}
              {response && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-900">{response}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 