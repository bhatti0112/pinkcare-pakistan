import { BenchmarkCase, BenchmarkResult } from '../types';

export async function runBenchmark(
  cases: BenchmarkCase[],
  warmupIterations = 5,
  measuredIterations = 50
): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];

  for (const bCase of cases) {
    try {
      const fn = new Function(`
        "use strict";
        return (function() {
          ${bCase.code}
        });
      `)();

      // Warmup phase for JIT optimization
      for (let i = 0; i < warmupIterations; i++) {
        fn();
      }

      // Timed execution
      const t0 = performance.now();
      for (let i = 0; i < measuredIterations; i++) {
        fn();
      }
      const t1 = performance.now();

      const totalTimeMs = Math.max(t1 - t0, 0.001);
      const meanMs = totalTimeMs / measuredIterations;
      const opsPerSec = Math.round((measuredIterations / totalTimeMs) * 1000);

      results.push({
        name: bCase.name,
        opsPerSec,
        meanMs,
        iterations: measuredIterations,
      });
    } catch (err: any) {
      results.push({
        name: bCase.name,
        opsPerSec: 0,
        meanMs: 0,
        iterations: 0,
      });
    }
  }

  // Mark the fastest
  let maxOps = -1;
  let fastestIndex = -1;
  results.forEach((r, idx) => {
    if (r.opsPerSec > maxOps) {
      maxOps = r.opsPerSec;
      fastestIndex = idx;
    }
  });

  if (fastestIndex !== -1 && maxOps > 0) {
    results[fastestIndex].isFastest = true;
  }

  return results;
}
