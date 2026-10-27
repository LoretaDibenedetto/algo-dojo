import { World, Exercise } from '../types';
import { world1Exercises } from './worlds/world1';
import { world2Exercises } from './worlds/world2';
import { world3Exercises } from './worlds/world3';
import { world4Exercises } from './worlds/world4';
import { world5Exercises } from './worlds/world5';
import { world6Exercises } from './worlds/world6';
import { world7Exercises } from './worlds/world7';
import { world10Exercises } from './worlds/world10';

export const worldsData: World[] = [
  {
    id: 1,
    title: 'Mondo 1: Indici e Array',
    subtitle: 'Off-by-one, estremi, scorrimento e inversioni',
    icon: '🎯',
    color: 'from-amber-500 to-orange-600',
    description: 'Impara a dominare la trappola numero uno dei programmatori: indici che partono da 0, length - 1 e traversal sicuro.',
    exercises: world1Exercises
  },
  {
    id: 2,
    title: 'Mondo 2: Stringhe',
    subtitle: 'Palindromi, anagrammi, frequenze e finestre',
    icon: '🔤',
    color: 'from-blue-500 to-indigo-600',
    description: 'Le stringhe come array immutabili di caratteri: matching, dizionari di frequenze e finestre scorrevoli.',
    exercises: world2Exercises
  },
  {
    id: 3,
    title: 'Mondo 3: Complessità',
    subtitle: 'Big O, abbattere i cicli O(n²) e contare le operazioni',
    icon: '⚡',
    color: 'from-emerald-500 to-teal-600',
    description: 'Capire perché un codice è lento: trasformare loop nidificati in soluzioni lineari O(n) e costanti O(1).',
    exercises: world3Exercises
  },
  {
    id: 4,
    title: 'Mondo 4: Ricerca',
    subtitle: 'Ricerca lineare vs Ricerca binaria O(log n)',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
    description: 'Dimezzare lo spazio di ricerca: come non sbagliare mai il calcolo di mid con (left + right) / 2.',
    exercises: world4Exercises
  },
  {
    id: 5,
    title: 'Mondo 5: Ordinamento',
    subtitle: 'Bubble sort, Selection sort, Insertion sort e Merge sort',
    icon: '📊',
    color: 'from-violet-500 to-purple-600',
    description: 'Dalle basi quadratiche O(n²) agli algoritmi Divide et Impera O(n log n).',
    exercises: world5Exercises
  },
  {
    id: 6,
    title: 'Mondo 6: Hash Map e Set',
    subtitle: 'Accessi O(1), lookup tabelle e frequenze',
    icon: '🗝️',
    color: 'from-pink-500 to-rose-600',
    description: 'La struttura dati regina dello sviluppo backend: lookup immediati e cache.',
    exercises: world6Exercises
  },
  {
    id: 7,
    title: 'Mondo 7: Due Puntatori e Finestra Scorrevole',
    subtitle: 'Convergenza e finestre a dimensione fissa o dinamica',
    icon: '↔️',
    color: 'from-fuchsia-500 to-purple-600',
    description: 'Tecniche fondamentali per risolvere problemi complessi senza matrici o ricorsione.',
    exercises: world7Exercises
  },
  {
    id: 8,
    title: 'Mondo 8: Pile e Code (Stack & Queue)',
    subtitle: 'LIFO e FIFO per parser, parentesi e code di messaggi',
    icon: '🥞',
    color: 'from-orange-500 to-red-600',
    description: 'Gestione flussi backend: chiamate di funzioni, undo, code asincrone e validatori di sintassi.',
    exercises: [
      {
        id: 'w8-e1',
        worldId: 8,
        order: 1,
        title: 'Parentesi Bilanciate: Il Parser',
        slug: 'parentesi-bilanciate',
        difficulty: 'Facile',
        concept: 'Stack LIFO per abbinamento parentesi',
        story: 'Verifica se una stringa contenente le parentesi (), [] e {} è ben bilanciata e chiusa nell\'ordine corretto.',
        functionName: 'parentesiValide',
        signature: 'function parentesiValide(s)',
        parameters: [{ name: 's', type: 'string', description: 'Stringa con parentesi' }],
        returnType: 'boolean',
        targetComplexity: 'O(n)',
        starterCode: `function parentesiValide(s) {\n  const stack = [];\n  // Quando apri fai push(), quando chiudi fai pop() e confronta!\n  return stack.length === 0;\n}`,
        tests: [
          { id: 'w8-t1', input: ['()[]{}'], expected: true, visible: true },
          { id: 'w8-t2', input: ['(]'], expected: false, visible: true },
          { id: 'w8-t3', input: ['([)]'], expected: false, visible: true }
        ],
        hints: [
          { level: 1, text: 'L\'ultima parentesi aperta deve essere la prima ad essere chiusa (LIFO: Last In First Out).' },
          { level: 2, text: 'Metti le parentesi aperte in uno stack. Se trovi una chiusa, estrai (pop) l\'ultima aperta e controlla se corrispondono.' },
          { level: 3, text: 'Non dimenticare di controllare se alla fine lo stack è vuoto: se ci sono parentesi aperte rimaste spaiate, non è valida!' }
        ],
        solution: {
          code: `function parentesiValide(s) {\n  const stack = [];\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  for (const ch of s) {\n    if (ch === '(' || ch === '[' || ch === '{') {\n      stack.push(ch);\n    } else if (pairs[ch]) {\n      if (stack.pop() !== pairs[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
          explanation: 'Lo stack rispetta la gerarchia di annidamento. Ogni parentesi chiusa si confronta con la sua corrispettiva aperta più recente.',
          verificationQuestion: 'Cosa succede se la stringa inizia direttamente con una parentesi chiusa ")"?',
          verificationAnswer: 'stack.pop() su stack vuoto restituisce undefined, che è diverso da "(", ritornando subito false!'
        }
      }
    ]
  },
  {
    id: 9,
    title: 'Mondo 9: Ricorsione',
    subtitle: 'Caso base, stack di chiamate e alberi',
    icon: '🌀',
    color: 'from-indigo-500 to-purple-700',
    description: 'Scomporre problemi grandi in sottoproblemi identici: il caso base e il ritorno.',
    exercises: [
      {
        id: 'w9-e1',
        worldId: 9,
        order: 1,
        title: 'Calcolo Fattoriale Ricorsivo e Caso Base',
        slug: 'fattoriale-ricorsivo',
        difficulty: 'Facile',
        concept: 'Definizione di caso base n <= 1',
        story: 'Calcola il fattoriale di N ricorsivamente. N! = N * (N - 1)! con caso base 0! = 1.',
        functionName: 'fattoriale',
        signature: 'function fattoriale(n)',
        parameters: [{ name: 'n', type: 'number', description: 'Intero non negativo' }],
        returnType: 'number',
        targetComplexity: 'O(n)',
        starterCode: `function fattoriale(n) {\n  // ATTENZIONE: Se dimentichi il caso base, causerai Maximum call stack exceeded!\n}`,
        tests: [
          { id: 'w9-t1', input: [5], expected: 120, visible: true },
          { id: 'w9-t2', input: [0], expected: 1, visible: true },
          { id: 'w9-t3', input: [1], expected: 1, visible: true }
        ],
        hints: [
          { level: 1, text: 'Quando deve fermarsi la funzione ricorsiva per non chiamare numeri negativi all\'infinito?' },
          { level: 2, text: 'Se n <= 1 ritorna 1. Altrimenti ritorna n * fattoriale(n - 1).' },
          { level: 3, text: 'Senza la condizione di stop, la memoria dello stack di chiamate si esaurisce in Stack Overflow!' }
        ],
        solution: {
          code: `function fattoriale(n) {\n  if (n <= 1) return 1;\n  return n * fattoriale(n - 1);\n}`,
          explanation: 'Il caso base if (n <= 1) ferma la discesa ricorsiva e comincia a riavvolgere i prodotti.',
          verificationQuestion: 'Quanti frame di chiamata restano aperti in memoria per n = 5?',
          verificationAnswer: 'Restano aperti 5 frame di stack in contemporanea, per cui lo spazio di memoria è O(n)!'
        }
      }
    ]
  },
  {
    id: 10,
    title: 'Mondo 10: Matematica per Backend',
    subtitle: 'Divisibilità, resto, MCD di Euclide, numeri primi e percentuali',
    icon: '📐',
    color: 'from-amber-600 to-red-600',
    description: 'I concetti matematici indispensabili per ogni backend developer: algoritmi numerici senza trappole.',
    exercises: world10Exercises
  }
];

export function getAllExercises(): Exercise[] {
  return worldsData.flatMap(w => w.exercises);
}

export function getExerciseById(id: string): Exercise | undefined {
  return getAllExercises().find(e => e.id === id);
}

export function getWorldById(id: number): World | undefined {
  return worldsData.find(w => w.id === id);
}
