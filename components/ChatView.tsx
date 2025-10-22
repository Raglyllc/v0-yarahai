import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import QuestionForm from './QuestionForm';
import MessageList from './MessageList';
import HistorySidebar from './HistorySidebar';
import { getAiResponse } from '../services/geminiService';
import * as db from '../services/db';
import { useAuth } from '../hooks/useAuth';
import type { Conversation, Message, YarahAIResponse } from '../types';
import { TreeOfLifeIcon } from './icons/TreeOfLifeIcon';

type Theme = 'light' | 'dark';

const ChatView: React.FC = () => {
  const { user, isGuest } = useAuth();
  const [theme, setTheme] = useState<Theme>('dark');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const loadConversations = useCallback(async () => {
    if (!user || isGuest) return;
    const convos = await db.getConversationsForUser(user.id);
    setConversations(convos);
  }, [user, isGuest]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  useEffect(() => {
    if (isGuest) return;
    setMessages(currentConversation?.messages || []);
  }, [currentConversationId, conversations, currentConversation, isGuest]);


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const handleNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
  };

  const handleSelectConversation = (id: string) => {
    if (isGuest) return;
    setCurrentConversationId(id);
    setSidebarOpen(false);
  }

  const handleQuestionSubmit = useCallback(async (question: string, context: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'user',
        question: question + (context ? `\n\nContext: ${context}`: ''),
        timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const aiResponse: YarahAIResponse = await getAiResponse(question, context);
      
      const modelMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'model',
        response: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, modelMessage]);

      // Save conversation only if logged in
      if (user && !isGuest) {
        if (currentConversation) {
            const updatedConversation = { ...currentConversation, messages: [...currentConversation.messages, userMessage, modelMessage] };
            await db.saveConversation(updatedConversation);
        } else {
            const newConversation = await db.createNewConversation(user.id, userMessage);
            const finalConversation = { ...newConversation, messages: [userMessage, modelMessage] };
            await db.saveConversation(finalConversation);
            setCurrentConversationId(finalConversation.id);
        }
        loadConversations();
      }

    } catch (err) {
      setError('An error occurred while fetching the response. Please try again.');
      console.error(err);
      // Remove the user message if AI fails
      setMessages(prev => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  }, [user, isGuest, currentConversation, loadConversations]);

  return (
     <div className="relative flex h-screen w-full overflow-hidden">
        {/* Background decorative element */}
        <TreeOfLifeIcon 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-auto text-slate-200 dark:text-slate-800 pointer-events-none opacity-50 md:opacity-100"
            style={{ zIndex: 0 }}
        />

        <HistorySidebar 
            conversations={conversations}
            onNewChat={handleNewChat}
            onSelectConversation={handleSelectConversation}
            currentConversationId={currentConversationId}
            isOpen={isSidebarOpen}
            setIsOpen={setSidebarOpen}
            isGuest={isGuest}
        />
        
        <div className="flex flex-col flex-1 h-screen relative" style={{ zIndex: 1 }}>
            <Header theme={theme} toggleTheme={toggleTheme} toggleSidebar={() => setSidebarOpen(true)} isGuest={isGuest} />
             <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-4xl mx-auto h-full">
                    <MessageList messages={messages} isLoading={isLoading} error={error} />
                </div>
            </main>
            <footer className="w-full p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto">
                    <QuestionForm onSubmit={handleQuestionSubmit} isLoading={isLoading} />
                </div>
            </footer>
        </div>
    </div>
  );
};

export default ChatView;
