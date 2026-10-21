import React from 'react';
import { Eye, RefreshCw } from 'lucide-react';

interface PreviewCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onRerun: () => void;
  isRunning: boolean;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ containerRef, onRerun, isRunning }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-slate-300">Live Canvas & DOM Surface</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">canvas (600×360)</span>
        </div>

        <button
          onClick={onRerun}
          disabled={isRunning}
          className="p-1.5 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-50 rounded transition-colors flex items-center gap-1 text-[11px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          <span>Re-render</span>
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-950/60 overflow-auto">
        <div
          ref={containerRef}
          id="preview-canvas-container"
          className="w-full max-w-[620px] aspect-[5/3] flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 p-2 shadow-inner"
        >
          <div className="text-center text-slate-500 text-xs">
            <p className="font-medium text-slate-400">Canvas Ready</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Click &quot;Run Code&quot; to execute scripts that draw on the canvas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
