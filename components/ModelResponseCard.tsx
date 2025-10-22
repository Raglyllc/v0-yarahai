import React from 'react';
import type { YarahAIResponse } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { LinkIcon } from './icons/LinkIcon';

interface ModelResponseCardProps {
  response: YarahAIResponse;
}

const ModelResponseCard: React.FC<ModelResponseCardProps> = ({ response }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Answer */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4">Answer</h2>
        <p className="text-base leading-relaxed whitespace-pre-wrap">{response.answer}</p>
      </section>

      {/* Bible Verses */}
      {response.bibleVerses && response.bibleVerses.length > 0 && (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-sky-500" />
            Relevant Scripture
          </h3>
          <div className="space-y-4">
            {response.bibleVerses.map((item, index) => (
              <blockquote key={index} className="pl-4 border-l-4 border-sky-500 dark:border-sky-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-r-lg">
                <p className="italic">"{item.text}"</p>
                <cite className="block text-right mt-2 not-italic font-semibold text-slate-600 dark:text-slate-400 text-sm">{item.verse}</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Cross References */}
      {response.crossReferences && response.crossReferences.length > 0 && (
         <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-sky-500" />
            Cross-References
          </h3>
          <div className="space-y-4">
            {response.crossReferences.map((ref, index) => (
              <div key={index} className="border-t border-slate-200 dark:border-slate-700 pt-4 first:border-t-0 first:pt-0">
                <p className="font-bold text-sm">{ref.text} - {ref.verse}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{ref.commentary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Historical Context */}
       {response.historicalContext && (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-sky-500" />
            Historical Context
            </h3>
            <p className="leading-relaxed whitespace-pre-wrap text-base">{response.historicalContext}</p>
        </section>
       )}
    </div>
  );
};

export default ModelResponseCard;
