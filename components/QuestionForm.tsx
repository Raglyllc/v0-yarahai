import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { MinusCircleIcon } from './icons/MinusCircleIcon';

interface QuestionFormProps {
  onSubmit: (question: string, context: string) => void;
  isLoading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [showContext, setShowContext] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question, context);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Your Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., What is the significance of the Suffering Servant in Isaiah?"
          className="w-full p-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
          rows={3}
          required
        />
      </div>

      {showContext && (
        <div>
          <label htmlFor="context" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Optional Context
          </label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., Compare with the concept of messianic prophecy in the New Testament."
            className="w-full p-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
            rows={3}
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
            type="button"
            onClick={() => setShowContext(!showContext)}
            className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline focus:outline-none"
        >
            {showContext ? <MinusCircleIcon className="w-5 h-5" /> : <PlusCircleIcon className="w-5 h-5" />}
            {showContext ? 'Remove Context' : 'Add Context'}
        </button>
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
             <>
               Ask YARAH <SendIcon className="w-5 h-5 ml-2" />
             </>
          )}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
