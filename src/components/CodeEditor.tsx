import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import { Copy, Check, RotateCcw, Download, Trash2, Wand2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onReset?: () => void;
  filename?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  filename = 'main.js',
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = code.split('\n');
  const lineCount = lines.length;

  // Sync scrolling between textarea, pre (highlighted code), and line numbers
  const handleScroll = () => {
    if (textareaRef.current && preRef.current && lineNumbersRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Keyboard navigation & indentation handling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // ⌘+Enter or Ctrl+Enter to execute
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Tab key indent
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = textareaRef.current;
      if (!target) return;

      const start = target.selectionStart;
      const end = target.selectionEnd;

      if (e.shiftKey) {
        // Shift+Tab: Unindent
        const currentLineStart = code.lastIndexOf('\n', start - 1) + 1;
        if (code.substring(currentLineStart, currentLineStart + 2) === '  ') {
          const newCode = code.substring(0, currentLineStart) + code.substring(currentLineStart + 2);
          onChange(newCode);
          setTimeout(() => {
            target.selectionStart = Math.max(start - 2, currentLineStart);
            target.selectionEnd = Math.max(end - 2, currentLineStart);
          }, 0);
        }
      } else {
        // Tab: Insert 2 spaces
        const newCode = code.substring(0, start) + '  ' + code.substring(end);
        onChange(newCode);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 2;
        }, 0);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFormat = () => {
    // Lightweight auto-formatter for indent levels
    try {
      const rawLines = code.split('\n');
      let indentLevel = 0;
      const formatted = rawLines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        // Decrement indent for closing brackets
        if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const indented = '  '.repeat(indentLevel) + trimmed;

        // Increment indent for opening brackets that don't immediately close on the same line
        const opens = (trimmed.match(/[{\[(]/g) || []).length;
        const closes = (trimmed.match(/[}\])]/g) || []).length;
        if (opens > closes) {
          indentLevel += (opens - closes);
        }

        return indented;
      }).join('\n');

      onChange(formatted);
    } catch {
      // ignore
    }
  };

  // Highlight code on change
  const highlightedCode = React.useMemo(() => {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }, [code]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-300 font-medium">{filename}</span>
          <span className="text-slate-600">·</span>
          <span className="font-mono tabular-nums text-slate-500">{lineCount} lines</span>
          <span className="text-slate-600">·</span>
          <span className="font-mono tabular-nums text-slate-500">{code.length} chars</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleFormat}
            title="Auto-format code indentation"
            className="p-1.5 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 text-[11px]"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Format</span>
          </button>

          {onReset && (
            <button
              onClick={onReset}
              title="Reset code to original snippet"
              className="p-1.5 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy JavaScript code"
            className="p-1.5 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 text-[11px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            title="Download .js file"
            className="p-1.5 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 text-[11px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => onChange('')}
            title="Clear editor"
            className="p-1.5 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors text-[11px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-[13px] leading-relaxed">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="w-12 select-none py-4 text-right pr-3 bg-slate-950/40 text-slate-600 border-r border-slate-800/80 overflow-hidden shrink-0 tabular-nums font-mono text-xs leading-relaxed"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Canvas Container */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Syntax Highlighted Presentation Layer */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 p-4 m-0 overflow-auto pointer-events-none whitespace-pre font-mono text-[13px] leading-relaxed text-slate-200"
            dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }}
          />

          {/* Interactive Input Layer */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="absolute inset-0 w-full h-full p-4 m-0 resize-none font-mono text-[13px] leading-relaxed text-transparent caret-amber-400 bg-transparent outline-none border-none whitespace-pre overflow-auto"
            placeholder="// Write or paste modern JavaScript here..."
          />
        </div>
      </div>
    </div>
  );
};
