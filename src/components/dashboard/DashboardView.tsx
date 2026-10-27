import React from 'react';
import { 
  Trophy, 
  Flame, 
  Dumbbell, 
  TrendingDown, 
  Unlock, 
  Lock, 
  CheckCircle2, 
  ChevronRight,
  Download,
  Upload,
  BrainCircuit,
  Calculator
} from 'lucide-react';
import { World, Exercise, UserProgressState } from '../../types';
import { worldsData, getAllExercises } from '../../data';
import { exportProgressJSON, importProgressJSON } from '../../services/storage/progressStorage';

interface DashboardViewProps {
  progress: UserProgressState;
  onSelectExercise: (exercise: Exercise) => void;
  onToggleFreeMode: () => void;
  onUpdateProgress: (newProgress: UserProgressState) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onSelectExercise,
  onToggleFreeMode,
  onUpdateProgress
}) => {
  const allExercises = getAllExercises();
  const completedExercisesCount = Object.values(progress.attempts).filter(a => a.completed).length;

  // Calcolo Voto Medio Complessivo
  const completedAttempts = Object.values(progress.attempts).filter(a => a.completed);
  const averageGrade = completedAttempts.length > 0
    ? (completedAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / completedAttempts.length).toFixed(1)
    : '--';

  // Palestra dei Punti Deboli: Esercizi con data ripasso scaduta o falliti
  const now = new Date().getTime();
  const reviewExercises = allExercises.filter(ex => {
    const attempt = progress.attempts[ex.id];
    if (!attempt) return false;
    // Se ha voto basso (< 7) oppure la data di ripasso spaziato è arrivata
    if (attempt.score < 7 && attempt.completed) return true;
    if (attempt.nextReviewDate && new Date(attempt.nextReviewDate).getTime() <= now) return true;
    return false;
  });

  // I 5 Esercizi Peggiori ("Dove perdi più punti")
  const worstExercises = [...allExercises]
    .filter(ex => progress.attempts[ex.id]?.attemptsCount > 0)
    .sort((a, b) => {
      const attA = progress.attempts[a.id];
      const attB = progress.attempts[b.id];
      // Più tentativi o voto più basso
      const scoreA = attA?.score ?? 0;
      const scoreB = attB?.score ?? 0;
      if (scoreA !== scoreB) return scoreA - scoreB;
      return (attB?.attemptsCount || 0) - (attA?.attemptsCount || 0);
    })
    .slice(0, 5);

  // Esportazione JSON
  const handleExport = () => {
    const dataStr = exportProgressJSON(progress);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algo-dojo-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Importazione JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = importProgressJSON(event.target?.result as string);
        onUpdateProgress(imported);
        alert('Progresso importato con successo!');
      } catch (err: any) {
        alert('Errore importazione: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-200">
      {/* HEADER HERO STATS */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-bold border border-orange-500/30">
                🥋 Algo Dojo - Allenamento Backend
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {progress.stats.rank}
            </h1>
            <p className="text-slate-400 text-sm max-w-lg">
              Allenamento mirato per aspiranti backend developer: padroneggia gli indici, sconfiggi l'off-by-one e impara la complessità con codice reale.
            </p>
          </div>

          {/* Badge Statistiche */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                <Trophy size={16} />
                <span className="text-xs font-bold">XP Totali</span>
              </div>
              <span className="text-xl font-black">{progress.stats.xp}</span>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                <Flame size={16} />
                <span className="text-xs font-bold">Serie</span>
              </div>
              <span className="text-xl font-black">{progress.stats.streakDays} gg</span>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <span className="text-xs font-bold">Voto Medio</span>
              </div>
              <span className="text-xl font-black">{averageGrade}</span>
            </div>
          </div>
        </div>

        {/* Barra di comando rapida: Import/Export/Free Mode */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFreeMode}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                progress.stats.freeModeUnlocked
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {progress.stats.freeModeUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
              <span>Modalità Libera: {progress.stats.freeModeUnlocked ? 'ATTIVA' : 'BLOCCATA'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download size={14} />
              <span>Esporta Dati</span>
            </button>

            <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
              <Upload size={14} />
              <span>Importa</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* PALESTRA DEI PUNTI DEBOLI (Ripasso Spaziato 1, 3, 7 giorni) */}
      {reviewExercises.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-500 text-white rounded-xl">
                <Dumbbell size={20} />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  Palestra dei Punti Deboli ({reviewExercises.length} in attesa)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Ripasso intelligente spaziato: gli esercizi dove hai faticato ritornano a distanza di 1, 3 e 7 giorni per fissarsi nella memoria a lungo termine.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {reviewExercises.slice(0, 3).map((ex) => (
              <div
                key={ex.id}
                onClick={() => onSelectExercise(ex)}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-orange-200 dark:border-slate-800 hover:border-orange-500 cursor-pointer shadow-sm transition-all"
              >
                <div className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {ex.concept}
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                  {ex.title}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Voto precedente: {progress.attempts[ex.id]?.score || 'N/A'}/10</span>
                  <span className="font-bold text-orange-500">Ripassa ora →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCHERMATA: "DOVE PERDI PIÙ PUNTI" */}
      {worstExercises.length > 0 && (
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
            <TrendingDown size={18} />
            <span>Dove perdi più punti (I 5 esercizi più tosti per te):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {worstExercises.map((ex, idx) => {
              const att = progress.attempts[ex.id];
              return (
                <div
                  key={ex.id}
                  onClick={() => onSelectExercise(ex)}
                  className="bg-white dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-400 cursor-pointer transition-all space-y-1"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    #{idx + 1} - Mondo {ex.worldId}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {ex.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Voto: <strong className="text-rose-400">{att?.score ?? 'N/A'}</strong></span>
                    <span>Tentativi: {att?.attemptsCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAPPA DEI 10 MONDI */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            I Mondi del Dojo ({completedExercisesCount}/{allExercises.length} completati)
          </h2>
          <span className="text-xs text-slate-500">
            Completali in sequenza o attiva la Modalità Libera
          </span>
        </div>

        <div className="space-y-4">
          {worldsData.map((world, worldIdx) => {
            // Un mondo è sbloccato se è il primo, se la modalità libera è attiva,
            // oppure se il mondo precedente ha almeno la metà degli esercizi completati
            const isUnlocked = progress.stats.freeModeUnlocked || worldIdx === 0 || (() => {
              const prevWorld = worldsData[worldIdx - 1];
              const prevCompleted = prevWorld.exercises.filter(e => progress.attempts[e.id]?.completed).length;
              return prevCompleted >= Math.ceil(prevWorld.exercises.length / 2);
            })();

            const worldCompletedCount = world.exercises.filter(e => progress.attempts[e.id]?.completed).length;
            const worldAverageScore = (() => {
              const grades = world.exercises
                .map(e => progress.attempts[e.id]?.score)
                .filter((s): s is number => typeof s === 'number');
              if (grades.length === 0) return null;
              return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
            })();

            return (
              <div
                key={world.id}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 sm:p-6 transition-all ${
                  isUnlocked
                    ? 'border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'border-slate-200/50 dark:border-slate-800/40 opacity-60'
                }`}
              >
                {/* Header Mondo */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                      {world.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-lg text-slate-900 dark:text-white">
                          {world.title}
                        </h3>
                        {!isUnlocked && <Lock size={14} className="text-slate-400" />}
                      </div>
                      <p className="text-xs text-slate-500">
                        {world.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {worldAverageScore && (
                      <span className="text-xs font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                        Media: {worldAverageScore}/10
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-400">
                      {worldCompletedCount} / {world.exercises.length} fatti
                    </span>
                  </div>
                </div>

                {/* Lista Esercizi del Mondo */}
                {isUnlocked ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {world.exercises.map((ex) => {
                      const att = progress.attempts[ex.id];
                      const isDone = att?.completed;

                      return (
                        <button
                          key={ex.id}
                          onClick={() => onSelectExercise(ex)}
                          className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                            isDone
                              ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500 dark:bg-emerald-950/20'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-orange-500'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block">
                              {ex.concept}
                            </span>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {ex.title}
                            </h4>
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-[10px] font-mono text-slate-400">
                                {ex.targetComplexity}
                              </span>
                              {isDone && (
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                  Voto {att.score}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-1">
                            {isDone ? (
                              <CheckCircle2 size={18} className="text-emerald-400" />
                            ) : (
                              <ChevronRight size={18} className="text-slate-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs text-slate-400 flex items-center justify-between">
                    <span>Mondo bloccato. Completa almeno la metà degli esercizi del mondo precedente o attiva la "Modalità Libera".</span>
                    <Lock size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
