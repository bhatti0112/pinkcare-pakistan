import { ConsoleEntry, ExecutionResult, LogLevel } from '../types';

export async function runJavaScript(code: string, domContainer?: HTMLElement | null): Promise<ExecutionResult> {
  const logs: ConsoleEntry[] = [];
  const timers = new Map<string, number>();

  const pushLog = (level: LogLevel, args: any[], tableData?: any[]) => {
    logs.push({
      id: Math.random().toString(36).substring(2, 9),
      level,
      timestamp: Date.now(),
      args: args.map(arg => sanitizeValue(arg)),
      tableData,
    });
  };

  const customConsole = {
    log: (...args: any[]) => pushLog('log', args),
    info: (...args: any[]) => pushLog('info', args),
    warn: (...args: any[]) => pushLog('warn', args),
    error: (...args: any[]) => pushLog('error', args),
    table: (tabularData: any) => {
      let formattedTable: any[] | undefined = undefined;
      try {
        if (Array.isArray(tabularData)) {
          formattedTable = tabularData.map(item =>
            typeof item === 'object' && item !== null ? { ...item } : { value: item }
          );
        } else if (typeof tabularData === 'object' && tabularData !== null) {
          formattedTable = Object.entries(tabularData).map(([key, val]) => ({
            key,
            value: typeof val === 'object' ? JSON.stringify(val) : String(val),
          }));
        }
      } catch (e) {
        // fallback
      }
      pushLog('table', [tabularData], formattedTable);
    },
    time: (label = 'default') => {
      timers.set(label, performance.now());
    },
    timeEnd: (label = 'default') => {
      const startTime = timers.get(label);
      if (startTime !== undefined) {
        const elapsed = performance.now() - startTime;
        pushLog('info', [`${label}: ${elapsed.toFixed(3)} ms`]);
        timers.delete(label);
      } else {
        pushLog('warn', [`Timer '${label}' does not exist`]);
      }
    },
    clear: () => {
      logs.length = 0;
    },
    dir: (...args: any[]) => pushLog('log', args),
  };

  const startTime = performance.now();
  let returnValue: any = undefined;

  try {
    // If DOM/Canvas container is provided, inject DOM helpers
    let targetCanvas: HTMLCanvasElement | null = null;
    if (domContainer) {
      domContainer.innerHTML = '';
      targetCanvas = document.createElement('canvas');
      targetCanvas.id = 'canvas';
      targetCanvas.width = 600;
      targetCanvas.height = 360;
      targetCanvas.className = 'w-full h-full object-contain rounded bg-slate-900 border border-slate-800';
      domContainer.appendChild(targetCanvas);
    }

    // Wrap in async IIFE so top-level await and return statements work seamlessly
    const wrappedCode = `
      return (async function(console, container, canvas) {
        "use strict";
        ${code}
      })(customConsole, domContainer, targetCanvas);
    `;

    // Execute via Function constructor (runs in browser context safely without exposing local closure)
    const runFn = new Function('customConsole', 'domContainer', 'targetCanvas', wrappedCode);
    const executionPromise = runFn(customConsole, domContainer, targetCanvas);

    // Timeout safeguard for promises (8 seconds max)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Script execution timed out (8 seconds limit reached).')), 8000)
    );

    const rawReturn = await Promise.race([executionPromise, timeoutPromise]);
    returnValue = sanitizeValue(rawReturn);

    const executionTimeMs = performance.now() - startTime;
    return {
      success: true,
      returnValue,
      logs,
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = performance.now() - startTime;
    return {
      success: false,
      returnValue: undefined,
      logs,
      executionTimeMs,
      error: {
        name: err.name || 'Error',
        message: err.message || String(err),
        stack: err.stack,
      },
    };
  }
}

function sanitizeValue(val: any): any {
  if (val === undefined) return 'undefined';
  if (val === null) return null;
  if (typeof val === 'function') return `[Function: ${val.name || 'anonymous'}]`;
  if (typeof val === 'symbol') return val.toString();
  if (typeof val === 'bigint') return `${val.toString()}n`;

  if (val instanceof Error) {
    return {
      __isError: true,
      name: val.name,
      message: val.message,
      stack: val.stack,
    };
  }

  if (val instanceof Map) {
    return {
      __type: 'Map',
      size: val.size,
      entries: Array.from(val.entries()),
    };
  }

  if (val instanceof Set) {
    return {
      __type: 'Set',
      size: val.size,
      values: Array.from(val.values()),
    };
  }

  if (val instanceof Promise) {
    return '[Promise]';
  }

  // Handle circular references and deep structures safely
  try {
    const seen = new WeakSet();
    const deepClone = (obj: any, depth = 0): any => {
      if (depth > 6) return '[Max Depth]';
      if (typeof obj !== 'object' || obj === null) return obj;
      if (seen.has(obj)) return '[Circular Reference]';
      seen.add(obj);

      if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item, depth + 1));
      }

      const res: Record<string, any> = {};
      for (const [k, v] of Object.entries(obj)) {
        res[k] = deepClone(v, depth + 1);
      }
      return res;
    };
    return deepClone(val);
  } catch {
    return String(val);
  }
}
