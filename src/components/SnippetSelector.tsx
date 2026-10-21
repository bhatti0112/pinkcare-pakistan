import React from 'react';
import { Snippet } from '../types';
import { JAVASCRIPT_SNIPPETS } from '../data/snippets';
import { Code2, ChevronRight, Sparkles } from 'lucide-react';

interface SnippetSelectorProps {
  currentSnippetId: string;
  onSelectSnippet: (snippet: Snippet) => void;
}

export const SnippetSelector: React.FC<SnippetSelectorProps> = ({
  currentSnippetId,
  onSelectSnippet,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shrink-0">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
        <span className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          Curated JavaScript Snippets
        </span>
        <span className="text-[10px] text-slate-500 font-mono tabular-nums">{JAVASCRIPT_SNIPPETS.length} templates</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {JAVASCRIPT_SNIPPETS.map((snippet) => {
          const isSelected = snippet.id === currentSnippetId;
          return (
            <button
              key={snippet.id}
              onClick={() => onSelectSnippet(snippet)}
              className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-400/10 border-amber-500/40 text-slate-100 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold truncate text-slate-200">{snippet.title}</span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">{snippet.category}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 leading-snug">
                  {snippet.description}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-800/60">
                <span className="capitalize">{snippet.mode === 'canvas' ? 'Canvas View' : 'Console View'}</span>
                <span className="flex items-center gap-0.5 text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                  Load <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
