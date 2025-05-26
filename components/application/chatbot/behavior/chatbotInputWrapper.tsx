// components/application/chatbot/input-wrapper.tsx
'use client';
import { ChatbotInput } from '../ui/input';
export function ChatbotInputWrapper() {
    function handleSubmit(input: string) {
        console.log(input);
    }
    return <ChatbotInput onSubmit={handleSubmit} />;
}