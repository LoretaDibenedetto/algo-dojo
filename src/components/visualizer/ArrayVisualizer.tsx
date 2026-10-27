import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

interface ArrayVisualizerProps {
  initialArray: any[];
  highlightIndex?: number;
  highlightSecondaryIndex?: number;
  title?: string;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  initialArray,
  highlightIndex,
  highlightSecondaryIndex,
  title = "Visualizzatore Array & Indici"
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(highlightIndex ?? 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (highlightIndex !== undefined) {
      setCurrentIndex(highlightIndex);
    }
  }, [highlightIndex]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= initialArray.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, initialArray.length]);

  if (!Array.isArray(initialArray) || initialArray.length === 0) {
    return (
      <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg text-center text-sm text-slate-500">
        Nessun array da visualizzare per questo test o array vuoto [].
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold text-sm">👁️ {title}</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
            Lunghezza N = {initialArray.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
            disabled={currentIndex === 0}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 text-slate-300"
            title="Precedente"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-2 py-1 bg-orange-600 hover:bg-orange-500 rounded text-xs font-bold flex items-center gap-1"
          >
            {isPlaying ? 'Pausa' : <><Play size={12} /> Play</>}
          </button>
          <button
            onClick={() => setCurrentIndex((p) => Math.min(initialArray.length - 1, p + 1))}
            disabled={currentIndex === initialArray.length - 1}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 text-slate-300"
            title="Successivo"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => { setIsPlaying(false); setCurrentIndex(0); }}
            className="p-1 rounded hover:bg-slate-800 text-slate-400"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Visualizzazione celle con indici */}
      <div className="flex items-end gap-2 overflow-x-auto py-3 px-1 scrollbar-thin">
        {initialArray.map((val, idx) => {
          const isCurrent = idx === currentIndex;
          const isSecondary = idx === highlightSecondaryIndex;
          const isLast = idx === initialArray.length - 1;

          return (
            <div key={idx} className="flex flex-col items-center flex-shrink-0">
              {/* Etichetta puntatore */}
              <div className="h-5 text-[10px] font-mono text-center">
                {isCurrent && <span className="text-orange-400 font-bold animate-bounce block">i ▼</span>}
                {!isCurrent && isSecondary && <span className="text-cyan-400 font-bold block">j ▼</span>}
              </div>

              {/* Scatola elemento */}
              <div
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-sm rounded-lg border-2 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 scale-105 shadow-lg shadow-orange-500/30'
                    : isSecondary
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
                }`}
              >
                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
              </div>

              {/* Indice numerico sotto */}
              <div className="mt-1 flex flex-col items-center">
                <span className={`text-[11px] font-mono ${isCurrent ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>
                  [{idx}]
                </span>
                {isLast && (
                  <span className="text-[9px] text-amber-500/90 font-mono">
                    N-1
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-2 flex justify-between items-center">
        <span>Indice selezionato: <strong className="text-orange-400 font-mono">i = {currentIndex}</strong></span>
        <span>Valore: <strong className="text-white font-mono">{String(initialArray[currentIndex])}</strong></span>
      </div>
    </div>
  );
};
