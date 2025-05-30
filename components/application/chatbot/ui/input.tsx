/**
 * This is the pure, input component that handles text input from the user only. 
 * This component is used as an input component. 
 * It can be used in any component that requires a text input from the user.
 */

'use client';
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatbotInputProps {
  onSubmit: (prompt: string[]) => void;
}

export function ChatbotInput({ onSubmit }: ChatbotInputProps) {
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit([...chatHistory, input]);
    //todo: create a JSONL row with the input. 
    setChatHistory([...chatHistory, input]);
    //todo: send the JSONL row to the JSONL file and update it, or create a new file.
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button onClick={handleSubmit} disabled={isLoading}>Send</Button>
    </div>
  );
}
