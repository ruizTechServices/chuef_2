/**
 * This is the pure, input component that handles text input from the user only. 
 * This component is used as an input component. 
 * It can be used in any component that requires a text input from the user.
 */

'use client';
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PROVIDERS = [
  "mistral",
  "openai",
  "gemini",
  "anthropic",
  "huggingface",
] as const;

type Provider = typeof PROVIDERS[number];

interface ChatbotInputProps {
  onSubmit: (prompt: string, provider: Provider) => void;
  disabled?: boolean;
}

export function ChatbotInput({ onSubmit, disabled = false }: ChatbotInputProps) {
  const [input, setInput] = React.useState("");
  const [provider, setProvider] = React.useState<Provider>("mistral");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim(), provider);
    setInput("");
  };

  return (
    <div className="flex gap-2">
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value as Provider)}
        className="border rounded px-2 py-1 text-sm mr-2 dark:bg-background"
        disabled={disabled}
      >
        {PROVIDERS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <Input
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type a message..."
        className="flex-1"
        disabled={disabled}
      />
      <Button onClick={handleSubmit} disabled={disabled}>Send</Button>
    </div>
  );
}
