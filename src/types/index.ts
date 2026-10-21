export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'table';

export interface ConsoleEntry {
  id: string;
  level: LogLevel;
  timestamp: number;
  args: any[];
  tableData?: any[];
  executionTimeMs?: number;
}

export interface ExecutionResult {
  success: boolean;
  returnValue: any;
  logs: ConsoleEntry[];
  executionTimeMs: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

export interface Snippet {
  id: string;
  title: string;
  category: 'Modern ES6+' | 'Async & Promises' | 'Algorithms' | 'DOM & Canvas' | 'Functional JS' | 'Object & Prototypes';
  description: string;
  code: string;
  mode?: 'console' | 'canvas';
}

export interface BenchmarkCase {
  id: string;
  name: string;
  code: string;
}

export interface BenchmarkResult {
  name: string;
  opsPerSec: number;
  meanMs: number;
  iterations: number;
  isFastest?: boolean;
}

export interface CheatSheetEntry {
  category: string;
  title: string;
  syntax: string;
  description: string;
  example: string;
  complexity?: string;
}
