import { ChatbotInputWrapper } from "@/components/application/chatbot/behavior/chatbotInputWrapper";
import { ChatHistorySidebar } from "@/components/application/chatbot/ui/chatHistorySidebar";

export default function Chatbot() {

    return (
        <div className="flex justify-around align-center items-center">
            <ChatHistorySidebar />
            <ChatbotInputWrapper />{/* Ingestion */}
        </div>
    );
}
