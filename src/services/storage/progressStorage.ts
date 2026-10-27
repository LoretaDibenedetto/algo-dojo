import { UserProgressState, ExerciseAttempt } from '../../types';

const STORAGE_KEY = 'algo_dojo_user_progress_v1';

export function calculateScore(attemptsCount: number, usedSolution: boolean): number {
  if (usedSolution) return 4.0;
  if (attemptsCount <= 1) return 10.0;
  if (attemptsCount === 2) return 9.5;
  if (attemptsCount === 3) return 9.0;
  if (attemptsCount <= 5) return 8.0;
  if (attemptsCount <= 8) return 7.0;
  if (attemptsCount <= 12) return 6.0;
  return 5.0;
}

export function calculateRank(xp: number): string {
  if (xp >= 3500) return '🥋 Sensei (Maestra del Backend)';
  if (xp >= 2500) return '⚫ Cintura Nera';
  if (xp >= 1600) return '🟤 Cintura Marrone';
  if (xp >= 900) return '🔵 Cintura Blu';
  if (xp >= 400) return '🟢 Cintura Verde';
  if (xp >= 150) return '🟡 Cintura Gialla';
  return '⚪ Cintura Bianca';
}

const defaultState: UserProgressState = {
  attempts: {},
  stats: {
    xp: 0,
    rank: '⚪ Cintura Bianca',
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    freeModeUnlocked: false
  },
  theme: 'system'
};

export function loadUserProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    
    // Aggiornamento serie di giorni
    const today = new Date().toISOString().split('T')[0];
    if (parsed.stats && parsed.stats.lastActiveDate !== today) {
      const last = new Date(parsed.stats.lastActiveDate);
      const diffDays = Math.round((new Date(today).getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        parsed.stats.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.stats.streakDays = 1;
      }
      parsed.stats.lastActiveDate = today;
    }

    return { ...defaultState, ...parsed };
  } catch (e) {
    console.error('Errore caricamento progresso da localStorage', e);
    return defaultState;
  }
}

export function saveUserProgress(state: UserProgressState): void {
  try {
    state.stats.rank = calculateRank(state.stats.xp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Errore salvataggio progresso', e);
  }
}

export function exportProgressJSON(state: UserProgressState): string {
  return JSON.stringify(state, null, 2);
}

export function importProgressJSON(jsonString: string): UserProgressState {
  const parsed = JSON.parse(jsonString);
  if (!parsed.attempts || !parsed.stats) {
    throw new Error('Formato backup JSON non valido.');
  }
  saveUserProgress(parsed);
  return parsed;
}

// Spaced repetition scheduler (1, 3, 7 giorni)
export function scheduleSpacedReview(attempt: ExerciseAttempt, success: boolean): ExerciseAttempt {
  const now = new Date();
  let step = attempt.reviewIntervalStep ?? 0;
  
  if (!success) {
    // Reset al primo step se ha fallito
    step = 0;
  } else {
    step = Math.min(step + 1, 2);
  }

  const daysToAdd = step === 0 ? 1 : step === 1 ? 3 : 7;
  const nextDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  return {
    ...attempt,
    reviewIntervalStep: step,
    nextReviewDate: nextDate.toISOString()
  };
}
