import React, { useState, useEffect } from 'react';
import { Sun, Moon, Dumbbell, Trophy, BookOpen } from 'lucide-react';
import { Exercise, UserProgressState } from './types';
import { DashboardView } from './components/dashboard/DashboardView';
import { ExerciseView } from './components/exercise/ExerciseView';
import { loadUserProgress, saveUserProgress } from './services/storage/progressStorage';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Inizializzazione tema chiaro/scuro che segue il sistema o la preferenza
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (progress.theme === 'dark' || (progress.theme === 'system' && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, [progress.theme]);

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    const updated = { ...progress, theme: nextTheme as 'light' | 'dark' };
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleSaveProgress = (updatedAttempt: any, xpEarned: number) => {
    const newAttempts = {
      ...progress.attempts,
      [updatedAttempt.exerciseId]: updatedAttempt
    };

    const newStats = {
      ...progress.stats,
      xp: progress.stats.xp + xpEarned
    };

    const updatedState: UserProgressState = {
      ...progress,
      attempts: newAttempts,
      stats: newStats
    };

    setProgress(updatedState);
    saveUserProgress(updatedState);
  };

  const handleToggleFreeMode = () => {
    const updatedState: UserProgressState = {
      ...progress,
      stats: {
        ...progress.stats,
        freeModeUnlocked: !progress.stats.freeModeUnlocked
      }
    };
    setProgress(updatedState);
    saveUserProgress(updatedState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={() => setActiveExercise(null)}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="text-2xl">🥋</span>
            <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Algo Dojo
            </span>
            <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
              Backend Edition
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
              <Trophy size={14} className="text-orange-500" />
              <span>{progress.stats.xp} XP</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors"
              title="Cambia tema chiaro/scuro"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* CONTENUTO PRINCIPALE */}
      <main className="flex-1 pb-12">
        {activeExercise ? (
          <ExerciseView
            exercise={activeExercise}
            attempt={progress.attempts[activeExercise.id]}
            onSaveProgress={handleSaveProgress}
            onBack={() => setActiveExercise(null)}
          />
        ) : (
          <DashboardView
            progress={progress}
            onSelectExercise={(ex) => setActiveExercise(ex)}
            onToggleFreeMode={handleToggleFreeMode}
            onUpdateProgress={(newP) => {
              setProgress(newP);
              saveUserProgress(newP);
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-500">
        <p>Algo Dojo • Impara scrivendo codice • Nessun backend • Deployabile staticamente su Vercel</p>
      </footer>
    </div>
  );
};

export default App;
