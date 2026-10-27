import React, { useState } from 'react';
import { Table, Check, AlertCircle } from 'lucide-react';
import { TracingStep } from '../../types';

interface TracingChallengeProps {
  codeToTrace: string;
  steps: TracingStep[];
  onComplete: () => void;
}

export const TracingChallenge: React.FC<TracingChallengeProps> = ({ codeToTrace, steps, onComplete }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const currentStep = steps[currentStepIdx];
  const requiredVars = Object.keys(currentStep.variables);

  const handleInputChange = (varName: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [varName]: val }));
    setFeedback(null);
  };

  const handleVerifyStep = () => {
    // Verifica valori immessi per lo step corrente
    let allMatch = true;
    for (const v of requiredVars) {
      const expectedVal = String(currentStep.variables[v]).trim();
      const userVal = (userInputs[v] || '').trim();
      if (userVal !== expectedVal) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) {
      if (currentStepIdx + 1 < steps.length) {
        setFeedback('Ottimo! Passo corretto. Prosegui al prossimo step.');
        setCurrentStepIdx(prev => prev + 1);
        setUserInputs({});
      } else {
        setIsSuccess(true);
        setFeedback('Bravissima! Hai tracciato correttamente tutte le variabili e gli indici.');
        onComplete();
      }
    } else {
      setFeedback('Attenzione: uno o più valori inseriti non corrispondono allo stato reale delle variabili in questo passo. Ricontrolla con calma!');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white">
      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
        <Table size={18} />
        <span>Esercizio di Tracciamento: Compila la Tabella Passo-Passo</span>
      </div>

      <p className="text-xs text-slate-300 mb-3">
        Compila a mano i valori assunti dalle variabili e dagli indici. Questo allena la mente a non cadere nelle trappole di off-by-one!
      </p>

      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-orange-300 mb-3 whitespace-pre-wrap">
        {codeToTrace}
      </div>

      {/* Passo Corrente */}
      <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 mb-3">
        <div className="text-xs font-semibold text-cyan-400 mb-2">
          Passo {currentStep.step} di {steps.length}: {currentStep.description}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {requiredVars.map((v) => (
            <div key={v} className="flex items-center gap-2 bg-slate-900 p-2 rounded border border-slate-800">
              <span className="font-mono text-xs text-slate-300 font-bold min-w-20">{v} =</span>
              <input
                type="text"
                disabled={isSuccess}
                value={userInputs[v] || ''}
                onChange={(e) => handleInputChange(v, e.target.value)}
                placeholder="es. 0, 1, 'C'..."
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-amber-500 w-full"
              />
            </div>
          ))}
        </div>

        {!isSuccess && (
          <button
            onClick={handleVerifyStep}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded text-xs font-bold text-white transition-colors"
          >
            Verifica Passo
          </button>
        )}
      </div>

      {feedback && (
        <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
          feedback.includes('Attenzione') ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
        }`}>
          {feedback.includes('Attenzione') ? <AlertCircle size={16} /> : <Check size={16} />}
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
};
