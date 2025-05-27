// components/application/chatbot/input-wrapper.tsx
'use client';
import { ChatbotInput } from '../ui/input';
import { ChatbotResponseDisplay } from '../ui/ChatbotResponseDisplay';
import React from 'react';

export function ChatbotInputWrapper() {
    const [response, setResponse] = React.useState<string | null>(null);

    async function handleSubmit(input: string) {
        // Log to console
        console.log(input);
        
        // Send to text-generation API
        try {
            const response = await fetch('/api/text-generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setResponse(data.result);
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }
    return (
        <div>
            <ChatbotInput onSubmit={handleSubmit} />
            <ChatbotResponseDisplay response={response} />
        </div>
    );
}