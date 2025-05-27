import React from 'react';

interface ChatbotResponseDisplayProps {
  response: string | null;
  className?: string;
}

export const ChatbotResponseDisplay: React.FC<ChatbotResponseDisplayProps> = ({ response, className }) => {
  if (!response) {
    return (
      <div className={className || "text-center text-gray-400 italic mt-2"}>
        No response yet.
      </div>
    );
  }
  return (
    <div className={className || "mx-20 text-center bg-gray-100 rounded p-3 mt-2 text-gray-800"}>
      {response}
    </div>
  );
};
