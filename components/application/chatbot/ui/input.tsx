'use client';
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatbotInputProps {
  onSubmit: (prompt: string) => void;
}

export function ChatbotInput({ onSubmit }: ChatbotInputProps) {
  const [input, setInput] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    //todo: send input to the backend
    //todo: get response from the backend; getting the response from the backend should route to another component that displays the response to the frontend
    //todo: turn inputs into embeddings
    
    onSubmit(input);
    setInput("");
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
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
}
