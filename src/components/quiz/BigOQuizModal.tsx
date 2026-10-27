import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { BigOQuiz } from '../../types';

interface BigOQuizModalProps {
  quiz: BigOQuiz;
  onClose: () => void;
  onSuccessXP: (bonus: number) => void;
}

export const BigOQuizModal: React.FC<BigOQuizModalProps> = ({ quiz, onClose, onSuccessXP }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
    setIsAnswered(true);
    if (idx === quiz.correctIndex) {
      onSuccessXP(30); // 30 XP bonus per risposta esatta
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 text-orange-400 mb-3">
          <HelpCircle size={24} />
          <h3 className="font-bold text-lg">Sfida Flash: Qual è il Big O?</h3>
        </div>

        <p className="text-slate-200 text-sm mb-4 leading-relaxed">
          {quiz.question}
        </p>

        {quiz.codeSnippet && (
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-orange-300 mb-4 whitespace-pre-wrap">
            {quiz.codeSnippet}
          </div>
        )}

        <div className="space-y-2 mb-4">
          {quiz.options.map((opt, idx) => {
            const isCorrect = idx === quiz.correctIndex;
            const isChosen = idx === selectedIndex;

            let btnStyle = 'bg-slate-800 border-slate-700 hover:border-orange-500 text-slate-200';
            if (isAnswered) {
              if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
              else if (isChosen && !isCorrect) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
              else btnStyle = 'opacity-40 bg-slate-800/50 border-slate-800 text-slate-400';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3 rounded-xl border font-medium text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
              >
                <div>
                  <span className="font-bold font-mono mr-2 px-2 py-0.5 bg-slate-900/60 rounded">
                    {opt.complexity}
                  </span>
                  {opt.label}
                  {isAnswered && (isCorrect || isChosen) && (
                    <p className="text-xs mt-1.5 opacity-90 font-normal">
                      {opt.explanation}
                    </p>
                  )}
                </div>
                {isAnswered && isCorrect && <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />}
                {isAnswered && isChosen && !isCorrect && <XCircle className="text-rose-400 flex-shrink-0" size={18} />}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-lg text-slate-200 transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
