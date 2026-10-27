import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Lightbulb, 
  Eye, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise, ExecutionResult, ExerciseAttempt } from '../../types';
import { CodeEditor } from '../editor/CodeEditor';
import { ArrayVisualizer } from '../visualizer/ArrayVisualizer';
import { BigOQuizModal } from '../quiz/BigOQuizModal';
import { TracingChallenge } from '../tracing/TracingChallenge';
import { JavaScriptWorkerRunner } from '../../services/runner/JavaScriptRunner';
import { calculateScore, scheduleSpacedReview } from '../../services/storage/progressStorage';

interface ExerciseViewProps {
  exercise: Exercise;
  attempt?: ExerciseAttempt;
  onSaveProgress: (updatedAttempt: ExerciseAttempt, xpEarned: number) => void;
  onBack: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  exercise,
  attempt,
  onSaveProgress,
  onBack
}) => {
  // 1. Codice (bozza salvata o starter)
  const [code, setCode] = useState<string>(attempt?.savedCode || exercise.starterCode);
  
  // 2. Metodo "Prima di Scrivere"
  const [showPreWrite, setShowPreWrite] = useState<boolean>(!attempt?.preWriteCompleted);
  const [exampleHand, setExampleHand] = useState<string>('');
  const [threeSteps, setThreeSteps] = useState<string>('');
  const [expectedComplexity, setExpectedComplexity] = useState<string>(exercise.targetComplexity);
  const [preWriteDone, setPreWriteDone] = useState<boolean>(!!attempt?.preWriteCompleted);

  // 3. Esecuzione & Test
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [attemptsCount, setAttemptsCount] = useState<number>(attempt?.attemptsCount || 0);

  // 4. Suggerimenti
  const [unlockedHints, setUnlockedHints] = useState<number>(attempt?.unlockedHints || 0);

  // 5. Soluzione ufficiale
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [solutionUnlocked, setSolutionUnlocked] = useState<boolean>(!!attempt?.usedSolution);

  // 6. Big O Quiz e Tracing
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showTracing, setShowTracing] = useState<boolean>(false);
  const [followUpAnswerVisible, setFollowUpAnswerVisible] = useState<boolean>(false);

  // Autosalvataggio automatico della bozza ogni 3 secondi se modificata
  useEffect(() => {
    const timer = setTimeout(() => {
      if (code !== attempt?.savedCode) {
        onSaveProgress({
          exerciseId: exercise.id,
          completed: attempt?.completed || false,
          score: attempt?.score || 0,
          attemptsCount,
          usedSolution: solutionUnlocked,
          unlockedHints,
          preWriteCompleted: preWriteDone,
          savedCode: code,
          lastAttemptDate: new Date().toISOString()
        }, 0);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [code, attemptsCount, solutionUnlocked, unlockedHints, preWriteDone]);

  // Completamento "Prima di scrivere" (+15 XP bonus)
  const handleCompletePreWrite = () => {
    setPreWriteDone(true);
    setShowPreWrite(false);
    onSaveProgress({
      exerciseId: exercise.id,
      completed: attempt?.completed || false,
      score: attempt?.score || 0,
      attemptsCount,
      usedSolution: solutionUnlocked,
      unlockedHints,
      preWriteCompleted: true,
      savedCode: code,
      lastAttemptDate: new Date().toISOString()
    }, 15);
  };

  // Esecuzione tramite Web Worker Runner
  const handleRunCode = async () => {
    setIsRunning(true);
    setResult(null);

    const newAttemptsCount = attemptsCount + 1;
    setAttemptsCount(newAttemptsCount);

    const runner = new JavaScriptWorkerRunner(2000);
    const execResult = await runner.run(code, exercise);

    setResult(execResult);
    setIsRunning(false);

    if (execResult.success) {
      // Vittoria!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });

      const score = calculateScore(newAttemptsCount, solutionUnlocked);
      const earnedXp = Math.round(score * 15);

      const baseAttempt: ExerciseAttempt = {
        exerciseId: exercise.id,
        completed: true,
        score,
        attemptsCount: newAttemptsCount,
        usedSolution: solutionUnlocked,
        unlockedHints,
        preWriteCompleted: preWriteDone,
        savedCode: code,
        lastAttemptDate: new Date().toISOString()
      };

      const scheduled = scheduleSpacedReview(baseAttempt, true);
      onSaveProgress(scheduled, earnedXp);
    } else {
      // Fallito: programma ripasso per la Palestra
      const baseAttempt: ExerciseAttempt = {
        exerciseId: exercise.id,
        completed: attempt?.completed || false,
        score: attempt?.score || 0,
        attemptsCount: newAttemptsCount,
        usedSolution: solutionUnlocked,
        unlockedHints,
        preWriteCompleted: preWriteDone,
        savedCode: code,
        lastAttemptDate: new Date().toISOString()
      };
      const scheduled = scheduleSpacedReview(baseAttempt, false);
      onSaveProgress(scheduled, 0);
    }
  };

  // Sblocco suggerimento
  const handleUnlockHint = () => {
    if (unlockedHints < 3) {
      setUnlockedHints(prev => prev + 1);
    }
  };

  // Sblocco soluzione (costa XP, imposta voto 4)
  const handleConfirmSolution = () => {
    setShowSolutionModal(false);
    setSolutionUnlocked(true);
    const updated: ExerciseAttempt = {
      exerciseId: exercise.id,
      completed: attempt?.completed || false,
      score: 4.0,
      attemptsCount,
      usedSolution: true,
      unlockedHints: 3,
      preWriteCompleted: preWriteDone,
      savedCode: code,
      lastAttemptDate: new Date().toISOString()
    };
    onSaveProgress(updated, 0);
  };

  // Array da mostrare nel visualizzatore (dal primo test con array)
  const arrayTestInput = exercise.tests.find(t => Array.isArray(t.input[0]))?.input[0] || [1, 2, 3, 4, 5];

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-5 animate-in fade-in duration-150">
      {/* Barra superiore */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Torna ai Mondi</span>
        </button>

        <div className="flex items-center gap-2">
          {exercise.bigOQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all"
            >
              <Zap size={14} />
              <span>Quiz Big O (+30 XP)</span>
            </button>
          )}

          {exercise.tracingChallenge && (
            <button
              onClick={() => setShowTracing(!showTracing)}
              className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all"
            >
              <BookOpen size={14} />
              <span>{showTracing ? 'Nascondi Tracciamento' : 'Tracciamento a Mano'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. BIGLIETTO: Storia concreta e Firma */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
              {exercise.concept}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {exercise.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {exercise.difficulty}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
              Obiettivo: {exercise.targetComplexity}
            </span>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          {exercise.story}
        </p>

        {/* Firma richiesta */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-slate-500">Firma richiesta:</span>
          <code className="text-orange-600 dark:text-orange-400 font-bold">
            {exercise.signature}
          </code>
        </div>
      </div>

      {/* MODALITÀ TRACCIAMENTO (Opzionale) */}
      {showTracing && exercise.tracingChallenge && (
        <TracingChallenge
          codeToTrace={exercise.tracingChallenge.codeToTrace}
          steps={exercise.tracingChallenge.steps}
          onComplete={() => {
            onSaveProgress({
              exerciseId: exercise.id,
              completed: attempt?.completed || false,
              score: attempt?.score || 0,
              attemptsCount,
              usedSolution: solutionUnlocked,
              unlockedHints,
              preWriteCompleted: preWriteDone,
              savedCode: code,
              lastAttemptDate: new Date().toISOString()
            }, 25);
          }}
        />
      )}

      {/* 2. METODO "PRIMA DI SCRIVERE" (Bonus XP) */}
      <div className="bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-500" size={18} />
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200">
              Metodo "Prima di Scrivere" {preWriteDone ? '✅ (Completato +15 XP)' : '(Bonus +15 XP)'}
            </h3>
          </div>
          <button
            onClick={() => setShowPreWrite(!showPreWrite)}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            {showPreWrite ? 'Riduci' : 'Mostra / Compila'}
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
          Non buttarti subito sul codice: ragiona prima con carta e penna per evitare gli errori di indice.
        </p>

        {showPreWrite && (
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                1. Esempio a mano con numeri veri:
              </label>
              <textarea
                rows={2}
                value={exampleHand}
                onChange={(e) => setExampleHand(e.target.value)}
                placeholder={exercise.defaultPreWrite?.exampleHandPrompt || "es. con [10, 20], l'indice finale è 1..."}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                2. Piano in 3 passi (a parole):
              </label>
              <textarea
                rows={2}
                value={threeSteps}
                onChange={(e) => setThreeSteps(e.target.value)}
                placeholder="1) Controllo array vuoto; 2) Ciclo con indice da 0 a N-1; 3) Ritorno il risultato..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  3. Complessità attesa:
                </span>
                <select
                  value={expectedComplexity}
                  onChange={(e) => setExpectedComplexity(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-2 py-1 text-xs font-mono font-bold"
                >
                  <option value="O(1)">O(1) Tempo Costante</option>
                  <option value="O(log n)">O(log n) Logaritmico</option>
                  <option value="O(n)">O(n) Lineare</option>
                  <option value="O(n log n)">O(n log n)</option>
                  <option value="O(n^2)">O(n²) Quadratico</option>
                </select>
              </div>

              {!preWriteDone && (
                <button
                  onClick={handleCompletePreWrite}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Salva Piano (+15 XP)
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. EDITOR DI CODICE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Editor JavaScript (Web Worker Sandbox)
          </span>
          <button
            onClick={() => setCode(exercise.starterCode)}
            className="text-xs flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Ripristina codice iniziale"
          >
            <RotateCcw size={13} />
            <span>Ripristina</span>
          </button>
        </div>

        <CodeEditor value={code} onChange={setCode} />

        {/* Pulsanti Azione */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/30 active:scale-95 transition-all"
            >
              <Play size={16} fill="white" />
              <span>{isRunning ? 'Esecuzione in corso...' : 'Verifica Soluzione'}</span>
            </button>

            <span className="text-xs text-slate-400">
              Tentativi: <strong className="text-slate-200">{attemptsCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Suggerimenti a 3 livelli */}
            {unlockedHints < 3 && (
              <button
                onClick={handleUnlockHint}
                className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb size={14} className="text-amber-500" />
                <span>Suggerimento ({unlockedHints}/3)</span>
              </button>
            )}

            {/* Soluzione */}
            {!solutionUnlocked ? (
              <button
                onClick={() => setShowSolutionModal(true)}
                className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
              >
                Mostra Soluzione
              </button>
            ) : (
              <span className="text-xs text-rose-400 font-bold px-2 py-1 bg-rose-950/40 rounded border border-rose-900/50">
                Soluzione aperta (Voto 4)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 6. SUGGERIMENTI A 3 LIVELLI SBLOCCATI */}
      {unlockedHints > 0 && (
        <div className="space-y-2 pt-1">
          {exercise.hints.slice(0, unlockedHints).map((h) => (
            <div
              key={h.level}
              className="bg-amber-500/10 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs space-y-1 animate-in fade-in duration-200"
            >
              <div className="font-bold text-amber-500 flex items-center gap-1.5">
                <Lightbulb size={14} />
                <span>
                  {h.level === 1 ? 'Livello 1: Domanda per riflettere' : h.level === 2 ? 'Livello 2: Struttura a parole' : 'Livello 3: Controesempio concreto'}
                </span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 4. FEEDBACK & TEST RESULTS */}
      {result && (
        <div className="space-y-4 pt-2">
          {/* Banner esito */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            result.success 
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
              : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
          }`}>
            {result.success ? (
              <CheckCircle size={24} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle size={24} className="text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base">
                  {result.success ? '🎉 Grande! Tutti i test superati!' : 'Qualcosa è andato storto!'}
                </h4>
                {result.success && (
                  <span className="text-xs font-bold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                    Voto: {calculateScore(attemptsCount, solutionUnlocked)}/10
                  </span>
                )}
              </div>

              {result.error && (
                <p className="text-xs font-mono text-rose-300 bg-rose-950/60 p-2 rounded">
                  {result.error}
                </p>
              )}

              {/* Controllo Complessità */}
              {result.complexityAlert && (
                <div className="mt-2 p-2.5 bg-amber-950/60 border border-amber-500/50 rounded-lg text-xs text-amber-200 font-medium">
                  ⚠️ {result.complexityAlert}
                </div>
              )}
            </div>
          </div>

          {/* Dettaglio test case falliti o visibili */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Dettaglio Test:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {result.testResults.map((t, idx) => (
                <div
                  key={t.testId || idx}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                    t.passed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-rose-950/30 border-rose-800 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-sans">
                    <span className="font-bold flex items-center gap-1.5">
                      {t.passed ? <CheckCircle size={14} className="text-emerald-400" /> : <XCircle size={14} className="text-rose-400" />}
                      <span>Test #{idx + 1} {t.visible ? '(Visibile)' : '(Nascosto)'}</span>
                    </span>
                    {t.failedIndex !== undefined && !t.passed && (
                      <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                        Errore all'indice [{t.failedIndex}]
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Input:</span>
                      <span className="text-slate-300">{JSON.stringify(t.input)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Atteso:</span>
                      <span className="text-emerald-400">{JSON.stringify(t.expected)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Ottenuto:</span>
                      <span className={t.passed ? 'text-slate-300' : 'text-rose-400 font-bold'}>
                        {t.error ? `Errore: ${t.error}` : JSON.stringify(t.actual)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visualizzatore animato dopo la verifica */}
          <ArrayVisualizer
            initialArray={arrayTestInput}
            highlightIndex={result.testResults.find(t => !t.passed)?.failedIndex}
            title="Animazione Array & Posizione Errore"
          />

          {/* 8. DOPO IL SUCCESSO: Spiegazione "Perché funziona" e Domanda di verifica */}
          {result.success && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Award size={18} />
                <span>Perché Funziona (Backend Wisdom):</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {exercise.solution.explanation}
              </p>

              {/* Domanda di verifica finale */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-orange-400 flex items-center gap-1.5">
                  <HelpCircle size={14} />
                  <span>Domanda di verifica: {exercise.solution.verificationQuestion}</span>
                </div>
                {!followUpAnswerVisible ? (
                  <button
                    onClick={() => setFollowUpAnswerVisible(true)}
                    className="text-slate-400 hover:text-white underline text-xs"
                  >
                    Mostra risposta e spiegazione
                  </button>
                ) : (
                  <p className="text-emerald-300 font-mono text-xs bg-slate-950 p-2 rounded border border-slate-800">
                    {exercise.solution.verificationAnswer}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. SOLUZIONE UFFICIALE (se sbloccata) */}
      {solutionUnlocked && (
        <div className="bg-slate-900 border border-rose-900/60 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <Eye size={18} />
            <span>Codice Soluzione Ufficiale:</span>
          </div>
          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
            {exercise.solution.code}
          </pre>
          <p className="text-xs text-slate-300">
            {exercise.solution.explanation}
          </p>
        </div>
      )}

      {/* MODAL DI CONFERMA SBLOCCO SOLUZIONE */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-rose-400">
              Sei sicura di voler vedere la soluzione?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Aprire la soluzione ufficiale <strong>dimezza gli XP</strong>, <strong>azzera la serie del giorno</strong> e assegna d'ufficio un <strong>voto pari a 4</strong> per questo esercizio.
              <br /><br />
              Come futura backend developer impari molto di più ragionando ancora 5 minuti o sbloccando un suggerimento!
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSolutionModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-300"
              >
                Annulla, ci riprovo!
              </button>
              <button
                onClick={handleConfirmSolution}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-xs font-bold text-white shadow-lg shadow-rose-600/30"
              >
                Sblocca comunque
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BIG O QUIZ */}
      {showQuiz && exercise.bigOQuiz && (
        <BigOQuizModal
          quiz={exercise.bigOQuiz}
          onClose={() => setShowQuiz(false)}
          onSuccessXP={(bonus) => {
            onSaveProgress({
              exerciseId: exercise.id,
              completed: attempt?.completed || false,
              score: attempt?.score || 0,
              attemptsCount,
              usedSolution: solutionUnlocked,
              unlockedHints,
              preWriteCompleted: preWriteDone,
              savedCode: code,
              lastAttemptDate: new Date().toISOString()
            }, bonus);
          }}
        />
      )}
    </div>
  );
};
