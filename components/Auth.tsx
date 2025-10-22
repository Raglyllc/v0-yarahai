import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { YarahLogoIcon } from './icons/YarahLogoIcon';

type AuthView = 'welcome' | 'login' | 'signup';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, signup, enterGuestMode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (view === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 w-full animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200 mb-6">
        {view === 'login' ? 'Welcome Back' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <div className="mt-1">
            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password"className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="mt-1">
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}
        <div>
          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900"
          >
            {loading ? 'Processing...' : (view === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setError(null); }} className="text-sm text-sky-600 dark:text-sky-400 hover:underline">
          {view === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
         <p className="mt-2">
            <button onClick={() => setView('welcome')} className="text-xs text-slate-500 hover:underline">
                Back to Welcome
            </button>
        </p>
      </div>
    </div>
  );

  const renderWelcome = () => (
     <div className="text-center animate-fade-in">
        <YarahLogoIcon className="w-20 h-20 mx-auto text-sky-600 dark:text-sky-400" />
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mt-4">
            Welcome to YARAH AI
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Your personal AI-powered assistant for deep and insightful scriptural study.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={enterGuestMode}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900"
            >
                Try the Demo
            </button>
            <button
                onClick={() => setView('signup')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900"
            >
                Create Free Account
            </button>
        </div>
         <p className="mt-6 text-sm">
            Already have an account?{' '}
            <button onClick={() => setView('login')} className="font-medium text-sky-600 dark:text-sky-400 hover:underline">
                Sign In
            </button>
        </p>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        {view === 'welcome' && renderWelcome()}
        {(view === 'login' || view === 'signup') && renderForm()}
      </div>
    </div>
  );
};

export default Auth;
