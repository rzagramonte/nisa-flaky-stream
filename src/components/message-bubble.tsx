"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: UIMessage;
  isStreaming: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  // Extract text content from parts
  const textContent =
    message.parts
      ?.filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("") || "";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`} data-testid={`message-${message.role}`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? "bg-primary text-white rounded-br-md" : "bg-slate-100 text-slate-800 rounded-bl-md"}`}>
        {isUser ?
          <p className="text-sm !text-white">{textContent}</p>
        : <div className="nisa-md">
            <Markdown remarkPlugins={[remarkGfm]}>{textContent}</Markdown>
            {isStreaming && (
              <div className="bouncing-loader mt-2">
                <div />
                <div />
                <div />
              </div>
            )}
          </div>
        }
      </div>

      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mt-1">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      )}
    </div>
  );
}
