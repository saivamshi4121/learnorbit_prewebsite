"use client";

import React, { useState, useEffect } from "react";
import { Rocket } from "lucide-react";

const MESSAGES = [
  "Waking up our servers...",
  "Securing your early access spot...",
  "Almost there...",
  "Finalizing your request..."
];

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTakingLong, setIsTakingLong] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0);
      setIsTakingLong(false);
      return;
    }

    // Message rotation every 3 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);

    // High demand timeout at 25 seconds
    const longWaitTimeout = setTimeout(() => {
      setIsTakingLong(true);
    }, 25000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(longWaitTimeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <div className="flex flex-col items-center w-full max-w-md px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Brand Logo / Icon */}
        <div className="mb-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
          <Rocket className="w-12 h-12 text-blue-400 animate-pulse" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Preparing Your Early Access...
        </h2>

        {/* Animated Progress Bar */}
        <div className="relative h-2 w-full mb-8 overflow-hidden rounded-full bg-white/10 flex-shrink-0">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-1/3 rounded-full animate-[progressLoop_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </div>

        {/* Dynamic Messages */}
        <div className="h-8 relative w-full overflow-hidden flex justify-center items-center">
            {MESSAGES.map((msg, index) => (
                <p
                  key={msg}
                  className={`absolute text-slate-300 text-lg md:text-xl font-medium transition-all duration-500 ease-in-out ${
                    index === messageIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4"
                  }`}
                >
                  {msg}
                </p>
            ))}
        </div>

        {/* High Demand Notice */}
        {isTakingLong && (
          <p className="mt-8 text-sm md:text-base font-medium text-yellow-300/90 animate-in fade-in slide-in-from-bottom-2 duration-500">
            Thanks for your patience — high demand today!
          </p>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progressLoop {
          0% {
            left: -33%;
          }
          100% {
            left: 100%;
          }
        }
      `}} />
    </div>
  );
}
