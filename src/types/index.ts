export type ComplexityOrder = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n^2)' | 'O(2^n)';

export interface TestCase {
  id: string;
  name?: string;
  input: any[];
  expected: any;
  visible: boolean; // se visibile all'utente prima o solo dopo esecuzione
}

export interface Hint {
  level: 1 | 2 | 3; // 1: Domanda per ragionare, 2: Struttura a parole, 3: Controesempio concreto
  text: string;
}

export interface PreWrite {
  exampleHand: string; // Esempio a mano con numeri veri (compilato dall'utente)
  threeSteps: string;  // Piano in 3 passi
  expectedComplexity: ComplexityOrder; // Complessità attesa
}

export interface TracingStep {
  step: number;
  description: string;
  variables: Record<string, any>;
}

export interface BigOQuiz {
  question: string;
  codeSnippet: string;
  options: { label: string; complexity: ComplexityOrder; explanation: string }[];
  correctIndex: number;
}

export interface Exercise {
  id: string;
  worldId: number;
  order: number;
  title: string;
  slug: string;
  difficulty: 'Facile' | 'Medio' | 'Difficile';
  concept: string; // es: "Off-by-one", "Array indexing", "Modulo & divisibilità"
  
  // 1. Biglietto (storia concreta + signature)
  story: string;
  functionName: string;
  signature: string;
  parameters: { name: string; type: string; description: string }[];
  returnType: string;

  // Expected target complexity
  targetComplexity: ComplexityOrder;
  maxOperationsFactor?: number; // moltiplicatore ammesso rispetto a N per O(n) o O(n^2)

  // 2. Metodo "Prima di scrivere" suggerito/default
  defaultPreWrite?: {
    exampleHandPrompt: string;
    targetComplexity: ComplexityOrder;
  };

  // 3. Codice iniziale
  starterCode: string;

  // 4. Test visibili e nascosti
  tests: TestCase[];

  // 6. Suggerimenti a 3 livelli (MAI codice)
  hints: [Hint, Hint, Hint];

  // 7. Soluzione ufficiale
  solution: {
    code: string;
    explanation: string; // spiegazione in 3 righe del perché funziona
    verificationQuestion: string; // es: "Cosa succede se l'array è vuoto?"
    verificationAnswer: string;
  };

  // Opzionali: Tracing guidato e Big O quiz associato
  tracingChallenge?: {
    codeToTrace: string;
    input: any[];
    steps: TracingStep[];
  };
  bigOQuiz?: BigOQuiz;
}

export interface World {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  exercises: Exercise[];
}

// Stato utente e persistenza
export interface ExerciseAttempt {
  exerciseId: string;
  completed: boolean;
  score: number; // 10, 9.5, 9, 8, 7, 6, 5, 4
  attemptsCount: number;
  usedSolution: boolean;
  unlockedHints: number; // 0, 1, 2, 3
  preWriteCompleted: boolean;
  savedCode: string;
  lastAttemptDate: string; // ISO
  nextReviewDate?: string; // ISO per ripasso spaziato (1, 3, 7 gg)
  reviewIntervalStep?: number; // 0 (1d), 1 (3d), 2 (7d)
  isMemoryExerciseCompleted?: boolean;
}

export interface UserStats {
  xp: number;
  rank: string; // 'Cintura Bianca', 'Gialla', 'Verde', 'Blu', 'Marrone', 'Nera', 'Sensei'
  streakDays: number;
  lastActiveDate: string;
  freeModeUnlocked: boolean;
}

export interface UserProgressState {
  attempts: Record<string, ExerciseAttempt>;
  stats: UserStats;
  theme: 'light' | 'dark' | 'system';
}

export interface ExecutionResult {
  success: boolean;
  testResults: {
    testId: string;
    passed: boolean;
    visible: boolean;
    input: any[];
    expected: any;
    actual: any;
    error?: string;
    failedIndex?: number; // indice di array dove è fallito
  }[];
  operationsCount: number;
  inputSize: number;
  complexityAlert?: string; // messaggio se è O(n^2) invece di O(n)
  runtimeMs: number;
  error?: string;
}
