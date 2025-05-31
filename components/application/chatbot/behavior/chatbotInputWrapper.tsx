// components/application/chatbot/input-wrapper.tsx
'use client';
import { ChatbotInput } from "../ui/input";
import { ChatbotResponseDisplay } from "../ui/ChatbotResponseDisplay";
import React from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export function ChatbotInputWrapper() {
  const [chatHistory, setChatHistory] = React.useState<string[]>([]);
  const [response, setResponse] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Call embeddings endpoint concurrently with text-generation.
   * Keeping embedding logic here maintains separation of concerns:
   * UI components remain dumb while wrapper orchestrates side-effects.
   */
  async function handleSubmit(input: string, provider: string) {
    setIsLoading(true);

    // Build user prompt history with max length of 3
    // Keep only the most recent 2 items from history and add the new input
    const prompt = input;
    const promptHistory= chatHistory.length >= 3 
      ? [...chatHistory.slice(-2), input].join("\n") 
      : [...chatHistory, input].join("\n");
    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    // Persist via API (runs server-side, avoids fs in client bundle)
    fetch("/api/chat-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userMessage),
    }).catch(console.error);

    console.log(prompt,promptHistory);


    try {
      const [chatRes /* , embedRes */] = await Promise.all([
        fetch("/api/text-generation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, provider }),
        }),
        // Optional: Enable when embeddings are required
        // fetch("/api/embeddings", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ input }),
        // }),
      ]);

      const data = await chatRes.json();

      if (chatRes.ok) {
        setResponse(data.result);
        setChatHistory((prev) => [...prev, input]);

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.result,
          timestamp: Date.now(),
        };

        // Persist via API (runs server-side, avoids fs in client bundle)
        fetch("/api/chat-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assistantMessage),
        }).catch(console.error);
      } else {
        console.error("Text-generation error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container border-2 h-screen">
      <ChatbotResponseDisplay response={response} />
      <div className="position-fixed bottom-0">
        <ChatbotInput onSubmit={handleSubmit as any} disabled={isLoading} />
      </div>
    </div>
  );
}