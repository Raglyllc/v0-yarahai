import React from 'react';
import { useAuth } from './hooks/useAuth';
import Auth from './components/Auth';
import ChatView from './components/ChatView';


const App: React.FC = () => {
  const { user, isGuest } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      {user || isGuest ? <ChatView /> : <Auth />}
    </div>
  );
};

export default App;
