export interface BibleVerse {
  verse: string;
  text: string;
}

export interface CrossReference {
  text: string;
  verse: string;
  commentary: string;
}

export interface YarahAIResponse {
  answer: string;
  bibleVerses: BibleVerse[];
  crossReferences: CrossReference[];
  historicalContext: string;
}

// New types for authentication and chat history
export interface User {
    id: string;
    email: string;
    passwordHash: string; // In a real app, this would be a hash
}
  
export interface Message {
    id: string;
    role: 'user' | 'model';
    question?: string; // For user messages
    response?: YarahAIResponse; // For model messages
    timestamp: string;
}

export interface Conversation {
    id: string;
    userId: string;
    title: string;
    messages: Message[];
    createdAt: string;
}

export interface ChatHistoryItem {
    role: 'user' | 'model';
    content: string;
}
