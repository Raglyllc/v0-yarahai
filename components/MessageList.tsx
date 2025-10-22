import React from 'react';
import type { Message } from '../types';
import ModelResponseCard from './ModelResponseCard';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { YarahLogoIcon } from './icons/YarahLogoIcon';
import { UserIcon } from './icons/UserIcon';


interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, error }) => {

    if (messages.length === 0 && !isLoading && !error) {
        return (
            <div className="text-center text-slate-500 dark:text-slate-400 mt-16 flex flex-col items-center h-full justify-center">
                <YarahLogoIcon className="w-24 h-24 mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-sky-600 dark:text-sky-400">
                    YARAH AI
                </h1>
                <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400">
                    Scriptural study meets AI
                </p>
                <p className="mt-2">Ask a question below to begin your study.</p>
            </div>
        )
    }

  return (
    <div className="space-y-6 pb-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'user' && message.question && (
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex-1">
                     <p className="whitespace-pre-wrap">{message.question}</p>
                </div>
            </div>
          )}
          {message.role === 'model' && message.response && (
             <div className="flex items-start gap-4">
                 <div className="w-8 h-8 flex-shrink-0 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                    <YarahLogoIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="flex-1">
                    <ModelResponseCard response={message.response} />
                </div>
            </div>
          )}
        </div>
      ))}
       {isLoading && (
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                    <YarahLogoIcon className="w-6 h-6 text-sky-600 dark:text-sky-400 animate-pulse" />
                </div>
                <div className="flex-1">
                     <div className="flex flex-col items-start justify-center">
                        <div className="animate-pulse flex space-x-2">
                            <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 w-2"></div>
                            <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 w-2"></div>
                            <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 w-2"></div>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">YARAH is thinking...</p>
                    </div>
                </div>
            </div>
        )}
        {error && <p className="text-center text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default MessageList;
