"use client";

import { useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { MessageList } from "./message-list";

export function Chat() {
  const { messages, status, sendMessage } = useChat();
  const [input, setInput] = useState("");

  // 🐛 BUG: No guard against submitting while already loading.
  //    No AbortController to cancel a previous stream.
  //    Rapidly clicking "Send" or hitting Enter multiple times
  //    starts concurrent streams that garble the message list.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const isStreaming = status === "streaming" || status === "submitted";

  return (
    <div className="flex flex-col h-full">
      {/* Message area */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src="/logos/nisa-chat-icon.svg"
              alt="Nisa"
              className="w-12 h-12 mb-4 opacity-60"
            />
            <h2 className="text-lg font-semibold text-slate-700 font-serif">
              Lesson Plan Generator
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md">
              Describe a topic and grade level, and I&apos;ll generate a
              detailed lesson plan for you.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {[
                "Photosynthesis for 5th graders",
                "Fractions for 3rd graders",
                "The water cycle for 4th graders",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    setInput(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <MessageList messages={messages} isStreaming={isStreaming} />
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-slate-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Photosynthesis for 5th graders..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                       placeholder:text-slate-400"
            data-testid="chat-input"
          />
          {/* 🐛 BUG: Button is NEVER disabled while streaming.
              Users can click Send multiple times during generation. */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5
                       text-sm font-medium text-white hover:bg-primary-hover
                       transition-colors cursor-pointer"
            data-testid="send-button"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
