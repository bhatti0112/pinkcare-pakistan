import React, { useState } from 'react';
import { JAVASCRIPT_CHEATSHEET } from '../data/cheatsheet';
import { BookOpen, Search, ArrowRight, Copy, Check } from 'lucide-react';

interface CheatsheetPanelProps {
  onLoadCode: (code: string) => void;
}

export const CheatsheetPanel: React.FC<CheatsheetPanelProps> = ({ onLoadCode }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(JAVASCRIPT_CHEATSHEET.map(c => c.category)))];

  const filtered = JAVASCRIPT_CHEATSHEET.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.syntax.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Header with Search and Categories */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-sm">JavaScript Reference & Idioms</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500 font-mono tabular-nums">{filtered.length} entries</span>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search syntax, methods, arrays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-amber-400/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of reference cards */}
      <div className="flex-1 overflow-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-950/50 border border-slate-800 rounded-lg flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-xs font-semibold text-slate-200">{item.title}</h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>{item.category}</span>
                  {item.complexity && (
                    <>
                      <span>·</span>
                      <span className="font-mono text-amber-400/80">{item.complexity}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="font-mono text-[11px] text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800/80 mb-2">
                {item.syntax}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {item.description}
              </p>

              <pre className="p-2.5 bg-slate-950 rounded border border-slate-800/60 text-[11px] font-mono text-sky-200/90 whitespace-pre-wrap overflow-x-auto">
                {item.example}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <button
                onClick={() => handleCopy(item.example, idx)}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px] transition-colors"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Example</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onLoadCode(`// ${item.title}\n${item.example}`)}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium text-[11px] transition-colors"
              >
                <span>Run in Editor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
