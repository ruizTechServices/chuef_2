import { ChatbotInput } from "@/components/application/chatbot/input";

export default function Chatbot() {


    return (
        <>
            <ChatbotInput onSubmit={function (prompt: string): void {
                throw new Error("Function not implemented.");
            } } />
            
        </>
    );
}
