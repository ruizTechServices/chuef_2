'use client';

import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

// Local CodeProps type for code block renderer
interface CodeProps {
  inline?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface ChatbotResponseDisplayProps {
  response: string | null;
  className?: string;
}

const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-2xl font-bold my-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-xl font-bold my-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-lg font-semibold my-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="my-2 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside my-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside my-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  code({ inline, children, className, ...props }: CodeProps) {
    if (inline) {
      return (
        <code className="bg-gray-200 rounded px-1 py-0.5 text-sm" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto text-sm" {...props}>
        <code>{children}</code>
      </pre>
    );
  },
};

export const ChatbotResponseDisplay: React.FC<ChatbotResponseDisplayProps> = ({ response, className }) => {
  if (!response) {
    return (
      <div className={className || "text-center text-gray-400 italic my-20"}>
        <p>No response yet. Ask a question to get started.</p>
        <div className="flex flex-col gap-2 mt-3">
          <p className="text-xs text-gray-500">Try asking:</p>
          <ul className="list-none pl-5 text-sm">
            <li>"What are the best practices for React component design?"</li>
            <li>"How do I implement authentication in Next.js?"</li>
            <li>"Explain the difference between useMemo and useCallback"</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        className ||
        "prose prose-neutral mx-20 bg-gray-100 rounded p-6 my-10 text-gray-800 max-w-none"
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};
