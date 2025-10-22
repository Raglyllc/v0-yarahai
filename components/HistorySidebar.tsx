import React from 'react';
import type { Conversation } from '../types';
import { YarahLogoIcon } from './icons/YarahLogoIcon';

interface HistorySidebarProps {
  conversations: Conversation[];
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  currentConversationId: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isGuest: boolean;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ conversations, onNewChat, onSelectConversation, currentConversationId, isOpen, setIsOpen, isGuest }) => {
    
    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-950 p-4">
            <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <YarahLogoIcon className="w-8 h-8 text-slate-800 dark:text-slate-200" />
                    <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                        {isGuest ? 'Demo Mode' : 'History'}
                    </span>
                </div>
                 <button onClick={() => setIsOpen(false)} className="md:hidden p-2 -mr-2 text-slate-600 dark:text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <button
                onClick={onNewChat}
                className="w-full text-left px-4 py-2 mb-4 rounded-lg border-2 border-dashed border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
                + New Chat
            </button>
            <div className="flex-1 overflow-y-auto">
                {isGuest ? (
                     <div className="text-center text-sm text-slate-500 dark:text-slate-400 p-4 bg-slate-200 dark:bg-slate-800/50 rounded-lg">
                        <p className="font-semibold">Sign up to save!</p>
                        <p className="mt-1">Create a free account to save and revisit your conversations at any time.</p>
                    </div>
                ) : (
                     <nav className="space-y-1">
                        {conversations.map(convo => (
                            <a
                                key={convo.id}
                                href="#"
                                onClick={(e) => { e.preventDefault(); onSelectConversation(convo.id); }}
                                className={`block px-4 py-2 rounded-md text-sm truncate ${
                                    currentConversationId === convo.id
                                    ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-semibold'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                                }`}
                            >
                                {convo.title}
                            </a>
                        ))}
                    </nav>
                )}
            </div>
        </div>
    );

    return (
        <>
             {/* Overlay for mobile */}
            {isOpen && (
                <div
                className="fixed inset-0 bg-black/30 z-30 md:hidden"
                onClick={() => setIsOpen(false)}
                ></div>
            )}
            {/* Sidebar */}
            <aside className={`absolute md:relative z-40 md:z-auto w-72 h-full flex-shrink-0 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
               <SidebarContent />
            </aside>
        </>
    );
};

export default HistorySidebar;
