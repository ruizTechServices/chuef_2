import { ChatbotInputWrapper } from "@/components/application/chatbot/behavior/chatbotInputWrapper";
import { ChatHistorySidebar } from "@/components/application/chatbot/ui/chatHistorySidebar";

export default function Chatbot() {

    return (
        <div className="flex border-2 border-red-500 justify-around align-center items-center">
            <ChatHistorySidebar />
            <ChatbotInputWrapper />{/* Ingestion */}
        </div>
    );
}
