import React, { useState } from 'react';
import { runBenchmark } from '../utils/benchmark';
import { BenchmarkCase, BenchmarkResult } from '../types';
import { Gauge, Play, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

const DEFAULT_BENCHMARKS: { title: string; cases: BenchmarkCase[] }[] = [
  {
    title: 'Array Iteration: For-Loop vs Reduce vs ForEach',
    cases: [
      {
        id: 'case-for',
        name: 'Traditional for (let i = 0...)',
        code: `const arr = Array.from({ length: 1000 }, (_, i) => i);
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
return sum;`,
      },
      {
        id: 'case-reduce',
        name: 'Array.prototype.reduce()',
        code: `const arr = Array.from({ length: 1000 }, (_, i) => i);
return arr.reduce((acc, curr) => acc + curr, 0);`,
      },
      {
        id: 'case-foreach',
        name: 'Array.prototype.forEach()',
        code: `const arr = Array.from({ length: 1000 }, (_, i) => i);
let sum = 0;
arr.forEach(val => { sum += val; });
return sum;`,
      },
    ],
  },
  {
    title: 'Deep Object Clone: structuredClone vs JSON.parse',
    cases: [
      {
        id: 'case-structured',
        name: 'structuredClone(obj)',
        code: `const source = { id: 1, name: "Sample", items: [1, 2, 3], nested: { flag: true } };
return structuredClone(source);`,
      },
      {
        id: 'case-json',
        name: 'JSON.parse(JSON.stringify(obj))',
        code: `const source = { id: 1, name: "Sample", items: [1, 2, 3], nested: { flag: true } };
return JSON.parse(JSON.stringify(source));`,
      },
    ],
  },
  {
    title: 'String Concatenation: Template Literal vs + Operator',
    cases: [
      {
        id: 'case-template',
        name: 'Template Literal (`${a} ${b}`)',
        code: `const first = "JavaScript";
const middle = "Engine";
const last = "V8";
return \`\${first} \${middle} \${last}\`;`,
      },
      {
        id: 'case-concat',
        name: 'Plus Operator (a + " " + b)',
        code: `const first = "JavaScript";
const middle = "Engine";
const last = "V8";
return first + " " + middle + " " + last;`,
      },
    ],
  },
];

export const BenchmarkPanel: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [cases, setCases] = useState<BenchmarkCase[]>(DEFAULT_BENCHMARKS[0].cases);
  const [iterations, setIterations] = useState<number>(200);
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const handleSelectPreset = (index: number) => {
    setSelectedPreset(index);
    setCases(DEFAULT_BENCHMARKS[index].cases);
    setResults(null);
  };

  const handleUpdateCaseCode = (caseId: string, newCode: string) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, code: newCode } : c));
  };

  const handleRunBenchmark = async () => {
    setIsBenchmarking(true);
    // Yield to UI update
    await new Promise(r => setTimeout(r, 50));
    try {
      const benchResults = await runBenchmark(cases, 5, iterations);
      setResults(benchResults);
    } finally {
      setIsBenchmarking(false);
    }
  };

  const maxOps = results ? Math.max(...results.map(r => r.opsPerSec), 1) : 1;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-slate-200">JavaScript Performance Benchmarking</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span>Cycles:</span>
            <select
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-slate-200 text-xs"
            >
              <option value={50}>50</option>
              <option value={200}>200</option>
              <option value={1000}>1,000</option>
              <option value={5000}>5,000</option>
            </select>
          </div>

          <button
            onClick={handleRunBenchmark}
            disabled={isBenchmarking}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Play className={`w-3 h-3 fill-current ${isBenchmarking ? 'animate-pulse' : ''}`} />
            <span>{isBenchmarking ? 'Running Benchmarks...' : 'Run Benchmark'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto text-xs">
        <span className="text-slate-500 whitespace-nowrap">Benchmarks:</span>
        {DEFAULT_BENCHMARKS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPreset(idx)}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap text-[11px] font-medium ${
              selectedPreset === idx
                ? 'bg-amber-400/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {preset.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Body: Cases & Results */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Results Graph if executed */}
        {results && (
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Benchmark Execution Results
              </span>
              <span className="text-[11px] text-slate-500 font-mono tabular-nums">{iterations} timed iterations</span>
            </div>

            <div className="space-y-3">
              {results.map((res, i) => {
                const percentage = Math.max(5, Math.round((res.opsPerSec / maxOps) * 100));
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-sans">{res.name}</span>
                        {res.isFastest && (
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Fastest
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-right">
                        <span className="text-slate-200 font-semibold tabular-nums">{res.opsPerSec.toLocaleString()}</span>
                        <span className="text-slate-500 text-[11px] ml-1">ops/sec</span>
                        <span className="text-slate-600 mx-1.5">·</span>
                        <span className="text-slate-400 tabular-nums">{res.meanMs.toFixed(4)} ms</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          res.isFastest ? 'bg-emerald-500' : 'bg-slate-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Code cases editor cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cases.map((bCase) => (
            <div key={bCase.id} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/40 flex flex-col">
              <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 text-xs font-medium text-slate-300">
                {bCase.name}
              </div>
              <textarea
                value={bCase.code}
                onChange={(e) => handleUpdateCaseCode(bCase.id, e.target.value)}
                spellCheck={false}
                className="w-full h-36 p-3 bg-transparent text-slate-300 font-mono text-xs leading-relaxed resize-none outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
