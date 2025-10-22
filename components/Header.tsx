import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { YarahLogoIcon } from './icons/YarahLogoIcon';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSidebar: () => void;
  isGuest: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar, isGuest }) => {
  const { user, logout, exitGuestMode } = useAuth();

  return (
    <header className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Hamburger menu for mobile */}
          <button onClick={toggleSidebar} className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <YarahLogoIcon className="w-8 h-8 text-slate-800 dark:text-slate-200" />
          <span className="hidden sm:inline text-xl font-semibold text-slate-800 dark:text-slate-200">YARAH AI</span>
        </div>
        <div className="flex items-center gap-4">
           {isGuest ? (
             <button
                onClick={exitGuestMode}
                className="text-sm font-medium px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700"
            >
                Sign Up / Login
            </button>
           ) : user && (
            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400 hidden md:inline">{user.email}</span>
                 <button
                    onClick={logout}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
                >
                    Logout
                </button>
            </div>
           )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
