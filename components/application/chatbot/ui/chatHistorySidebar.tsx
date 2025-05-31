// components/application/chatbot/ui/chatHistorySidebar.tsx
'use client';

import * as React from "react";
import { HistoryIcon, SearchIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarTrigger,
  SidebarInput,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Mock data structure for chat history
interface ChatHistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  isActive?: boolean;
}

// Mock data for chat history
const mockChatHistory: ChatHistoryItem[] = [
  {
    id: "chat-1",
    title: "Project Requirements",
    preview: "Can you help me define the requirements for my new project?",
    date: "Today"
  },
  {
    id: "chat-2",
    title: "Code Review",
    preview: "I need feedback on my React component structure",
    date: "Yesterday"
  },
  {
    id: "chat-3",
    title: "Database Schema",
    preview: "What's the best way to structure my database for a chat app?",
    date: "3 days ago"
  },
  {
    id: "chat-4",
    title: "API Design",
    preview: "Help me design a RESTful API for user authentication",
    date: "Last week"
  },
  {
    id: "chat-5",
    title: "Deployment Strategy",
    preview: "What's the best way to deploy my Next.js application?",
    date: "2 weeks ago"
  }
];

export function ChatHistorySidebar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredHistory, setFilteredHistory] = React.useState<ChatHistoryItem[]>(mockChatHistory);
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);
  
  // Filter chat history based on search term
  React.useEffect(() => {
    if (!searchTerm) {
      setFilteredHistory(mockChatHistory);
      return;
    }
    
    const filtered = mockChatHistory.filter(
      chat => chat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHistory(filtered);
  }, [searchTerm]);

  // Function to fetch chat history from database
  const fetchChatHistory = React.useCallback(async () => {
    // TODO: Implement API call to fetch chat history
    // Example implementation:
    // try {
    //   const response = await fetch('/api/chat-history');
    //   if (response.ok) {
    //     const data = await response.json();
    //     setFilteredHistory(data);
    //   }
    // } catch (error) {
    //   console.error('Failed to fetch chat history:', error);
    // }
    
    // For now, we're using mock data
    setFilteredHistory(mockChatHistory);
  }, []);

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HistoryIcon className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Chat History</h2>
            </div>
            <SidebarTrigger />
          </div>
          <div className="mt-2 relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput 
              placeholder="Search conversations..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3 py-2">
          <SidebarGroup>
            <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
            <AnimatePresence>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SidebarMenuButton
                      className="w-full justify-start gap-2 text-left mb-1 hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md"
                      isActive={selectedChat === chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex flex-col w-full overflow-hidden">
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">{chat.title}</span>
                          <span className="text-xs text-muted-foreground">{chat.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                      </div>
                    </SidebarMenuButton>
                  </motion.div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No conversations found</p>
                </div>
              )}
            </AnimatePresence>
          </SidebarGroup>
          
          {filteredHistory.length > 0 && (
            <>
              <SidebarSeparator className="my-4" />
              <SidebarGroup>
                <SidebarGroupLabel>Actions</SidebarGroupLabel>
                <SidebarMenuButton
                  className="w-full justify-start text-left text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    // Implement clear history functionality
                    if (window.confirm("Are you sure you want to clear all chat history?")) {
                      setFilteredHistory([]);
                    }
                  }}
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Clear History
                </SidebarMenuButton>
              </SidebarGroup>
            </>
          )}
        </SidebarContent>
        
        <SidebarFooter className="p-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setSelectedChat(null);
              // Trigger new chat functionality
            }}
          >
            New Chat
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
