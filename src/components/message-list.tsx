"use client";

import type { UIMessage } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  messages: UIMessage[];
  isStreaming: boolean;
}

const NEAR_BOTTOM_PX = 120;

export function MessageList({ messages, isStreaming }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const lastScrollTopRef = useRef(0);

  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceFromBottom < NEAR_BOTTOM_PX;
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const currentTop = el.scrollTop;
    const prevTop = lastScrollTopRef.current;
    lastScrollTopRef.current = currentTop;

    if (currentTop < prevTop) {
      setPinnedToBottom(false);
      return;
    }
    setPinnedToBottom(isNearBottom());
  }, [isNearBottom]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!pinnedToBottom) return;
    messagesEndRef.current?.scrollIntoView({ behavior: isStreaming ? "auto" : "smooth" });
  }, [messages, pinnedToBottom, isStreaming]);

  return (
    <div className="relative h-full">
    <div
      ref={scrollRef}
      onScroll={handleScroll}
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
        <div ref={messagesEndRef} className="" />
      </div>
    </div>
      {!pinnedToBottom && (
        <button
          type="button"
          onClick={() => {
            scrollToBottom();
            setPinnedToBottom(true);
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-2 text-sm text-white shadow"
        >
          Jump to latest
        </button>
      )}
    </div>

  );
}
