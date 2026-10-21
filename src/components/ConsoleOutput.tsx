import React, { useState } from 'react';
import { ConsoleEntry, ExecutionResult, LogLevel } from '../types';
import { Terminal, AlertTriangle, AlertCircle, Info, Table as TableIcon, Trash2, Copy, Check, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';

interface ConsoleOutputProps {
  result: ExecutionResult | null;
  onClear: () => void;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ result, onClear }) => {
  const [filter, setFilter] = useState<'all' | 'log' | 'warn' | 'error' | 'table'>('all');
  const [activeTab, setActiveTab] = useState<'logs' | 'return' | 'table'>('logs');
  const [copied, setCopied] = useState(false);

  const logs = result?.logs || [];
  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.level === filter;
  });

  const tableLogs = logs.filter(log => log.tableData && log.tableData.length > 0);

  const handleCopyLogs = async () => {
    try {
      const text = logs.map(l => `[${l.level.toUpperCase()}] ${l.args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')}`).join('\n');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Console Output</span>
          </div>

          {result && (
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="text-slate-700">·</span>
              <span className={`flex items-center gap-1 ${result.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.success ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                <span>{result.success ? 'Success' : 'Runtime Error'}</span>
              </span>
              <span className="text-slate-700">·</span>
              <span className="font-mono tabular-nums text-slate-400">{result.executionTimeMs.toFixed(2)} ms</span>
            </div>
          )}
        </div>

        {/* View Tabs & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                activeTab === 'logs' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Logs ({logs.length})
            </button>
            <button
              onClick={() => setActiveTab('return')}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                activeTab === 'return' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Return Value
            </button>
            {tableLogs.length > 0 && (
              <button
                onClick={() => setActiveTab('table')}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                  activeTab === 'table' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Table View
              </button>
            )}
          </div>

          <button
            onClick={handleCopyLogs}
            disabled={logs.length === 0}
            title="Copy all logs"
            className="p-1.5 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-30 rounded transition-colors text-[11px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClear}
            title="Clear console"
            className="p-1.5 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors text-[11px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter sub-bar (when in logs tab) */}
      {activeTab === 'logs' && logs.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-950/40 border-b border-slate-800/60 text-[11px]">
          <span className="text-slate-500">Filter:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-0.5 rounded transition-colors ${filter === 'all' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            All ({logs.length})
          </button>
          <button
            onClick={() => setFilter('log')}
            className={`px-2 py-0.5 rounded transition-colors ${filter === 'log' ? 'text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Info/Log ({logs.filter(l => l.level === 'log' || l.level === 'info').length})
          </button>
          <button
            onClick={() => setFilter('warn')}
            className={`px-2 py-0.5 rounded transition-colors ${filter === 'warn' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Warnings ({logs.filter(l => l.level === 'warn').length})
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-2 py-0.5 rounded transition-colors ${filter === 'error' ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Errors ({logs.filter(l => l.level === 'error').length})
          </button>
        </div>
      )}

      {/* Output Content Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs space-y-2">
        {/* Runtime Error Banner if execution failed */}
        {result?.error && (
          <div className="p-3 bg-rose-950/30 border border-rose-800/60 rounded-lg text-rose-300">
            <div className="flex items-center gap-2 font-semibold text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.error.name}: {result.error.message}</span>
            </div>
            {result.error.stack && (
              <pre className="mt-2 text-[11px] text-rose-300/80 whitespace-pre-wrap font-mono overflow-auto max-h-32">
                {result.error.stack}
              </pre>
            )}
          </div>
        )}

        {/* Tab 1: Logs */}
        {activeTab === 'logs' && (
          <>
            {filteredLogs.length === 0 && !result?.error && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <Terminal className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                <p className="text-sm font-medium text-slate-400">Console is empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Run JavaScript code with console.log, console.table, or console.warn to view output here.
                </p>
              </div>
            )}

            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`py-1.5 px-2.5 rounded border ${
                  log.level === 'error'
                    ? 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                    : log.level === 'warn'
                    ? 'bg-amber-950/20 border-amber-900/40 text-amber-300'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5 opacity-60">
                    {log.level === 'error' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    ) : log.level === 'warn' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </span>

                  <div className="flex-1 overflow-x-auto space-y-1">
                    {log.args.map((arg, idx) => (
                      <div key={idx} className="inline-block mr-2 align-top">
                        <ValueInspector value={arg} />
                      </div>
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-600 shrink-0 font-mono tabular-nums">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Tab 2: Return Value */}
        {activeTab === 'return' && (
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
            <div className="text-slate-400 text-[11px] mb-2 font-sans font-medium">Evaluated Return Expression:</div>
            {result?.returnValue !== undefined ? (
              <ValueInspector value={result.returnValue} defaultExpanded={true} />
            ) : (
              <span className="text-slate-500 italic">undefined (no return value)</span>
            )}
          </div>
        )}

        {/* Tab 3: Table View */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            {tableLogs.map((log, idx) => (
              <div key={idx} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <TableIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>console.table output</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
                        <th className="px-3 py-1.5 font-medium border-r border-slate-800 w-12 text-slate-500">(index)</th>
                        {log.tableData && log.tableData.length > 0 &&
                          Object.keys(log.tableData[0]).map(colKey => (
                            <th key={colKey} className="px-3 py-1.5 font-medium border-r border-slate-800 text-slate-300">
                              {colKey}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {log.tableData?.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                          <td className="px-3 py-1.5 border-r border-slate-800 text-slate-500 font-mono tabular-nums">{rowIdx}</td>
                          {Object.keys(row).map(colKey => (
                            <td key={colKey} className="px-3 py-1.5 border-r border-slate-800 font-mono">
                              <ValueInspector value={row[colKey]} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Recursive Value Inspector for JavaScript primitives and objects
const ValueInspector: React.FC<{ value: any; defaultExpanded?: boolean; depth?: number }> = ({
  value,
  defaultExpanded = false,
  depth = 0,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || depth === 0 && Array.isArray(value) && value.length < 5);

  if (value === undefined) {
    return <span className="text-slate-500 italic">undefined</span>;
  }
  if (value === null) {
    return <span className="text-slate-500 italic">null</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="text-purple-400 font-semibold">{String(value)}</span>;
  }
  if (typeof value === 'number') {
    return <span className="text-amber-400 tabular-nums">{String(value)}</span>;
  }
  if (typeof value === 'string') {
    if (value.startsWith('[Function:')) {
      return <span className="text-emerald-400 italic">{value}</span>;
    }
    return <span className="text-sky-300">"{value}"</span>;
  }

  // Complex Objects & Arrays
  if (typeof value === 'object') {
    const isArray = Array.isArray(value);
    const keys = Object.keys(value);

    if (keys.length === 0) {
      return <span className="text-slate-400">{isArray ? '[]' : '{}'}</span>;
    }

    if (!expanded) {
      return (
        <span
          onClick={() => setExpanded(true)}
          className="inline-flex items-center gap-1 cursor-pointer hover:bg-slate-800 px-1 py-0.5 rounded text-slate-400 transition-colors"
        >
          <ChevronRight className="w-3 h-3 text-slate-500" />
          <span className="text-slate-500">{isArray ? `Array(${value.length})` : 'Object'}</span>
          <span className="text-slate-600">
            {isArray ? `[${keys.length} items]` : `{${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}}`}
          </span>
        </span>
      );
    }

    return (
      <div className="inline-block text-left">
        <span
          onClick={() => setExpanded(false)}
          className="inline-flex items-center gap-1 cursor-pointer hover:bg-slate-800 px-1 py-0.5 rounded text-slate-400 transition-colors"
        >
          <ChevronDown className="w-3 h-3 text-slate-500" />
          <span className="text-slate-500">{isArray ? `Array(${value.length})` : 'Object'}</span>
        </span>
        <div className="pl-4 border-l border-slate-800 my-1 space-y-1">
          {keys.map((key) => (
            <div key={key} className="flex items-start gap-1">
              <span className="text-slate-400 select-none">{key}:</span>
              <ValueInspector value={value[key]} depth={depth + 1} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <span>{String(value)}</span>;
};
