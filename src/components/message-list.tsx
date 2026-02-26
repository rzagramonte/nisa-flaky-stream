"use client";

import type { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  messages: UIMessage[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🐛 BUG: Scrolls to bottom on EVERY token update during streaming.
  //    The `messages` array reference changes ~10 times per second while streaming.
  //    This means if a user scrolls UP to re-read the top of a lesson plan,
  //    they get jerked back to the bottom instantly. Very annoying UX.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={
              isStreaming &&
              message.id === messages[messages.length - 1]?.id &&
              message.role === "assistant"
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
