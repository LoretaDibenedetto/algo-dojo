import { Exercise } from '../../types';

// Mondo 10 dedicato specificamente a Matematica, Divisibilità, Resto, MCD, Primi
export const world10Exercises: Exercise[] = [
  {
    id: 'w10-e1',
    worldId: 10,
    order: 1,
    title: 'Il Resto è Tutto: Pari o Dispari Senza Trucchi',
    slug: 'resto-e-divisibilita',
    difficulty: 'Facile',
    concept: 'Operatore modulo % e numeri negativi',
    story: 'Stai sviluppando un server di gioco a turni. Devi stabilire se un numero intero di turno (positivo o negativo) è pari. In informatica il resto della divisione intera (% 2) può riservare sorprese con i numeri negativi!',
    functionName: 'isPari',
    signature: 'function isPari(n)',
    parameters: [{ name: 'n', type: 'number', description: 'Numero intero' }],
    returnType: 'boolean',
    targetComplexity: 'O(1)',
    starterCode: `function isPari(n) {
  // Attenzione: in JS, (-3) % 2 fa -1, NON 1!
  // Ma quanto fa (-4) % 2?
  
}
`,
    tests: [
      { id: 'w10-e1-t1', input: [4], expected: true, visible: true },
      { id: 'w10-e1-t2', input: [7], expected: false, visible: true },
      { id: 'w10-e1-t3', input: [0], expected: true, visible: true },
      { id: 'w10-e1-t4', input: [-8], expected: true, visible: true },
      { id: 'w10-e1-t5', input: [-5], expected: false, visible: true }
    ],
    hints: [
      {
        level: 1,
        text: 'Cosa hanno in comune TUTTI i numeri pari, sia positivi che negativi che lo zero, quando divisi per 2?'
      },
      {
        level: 2,
        text: 'La condizione è sempre n % 2 === 0. Non verificare mai "n % 2 === 1" per i dispari se ci sono numeri negativi!'
      },
      {
        level: 3,
        text: 'Controesempio: se controlli "if (n % 2 === 1) return false; else return true", per n = -3 n % 2 restituisce -1, quindi la tua funzione direbbe che -3 è pari!'
      }
    ],
    solution: {
      code: `function isPari(n) {
  return n % 2 === 0;
}`,
      explanation: 'Sia per i numeri positivi sia per quelli negativi, la divisione esatta per 2 lascia SEMPRE resto 0. Quindi n % 2 === 0 è l\'unico predicato sicuro e universale.',
      verificationQuestion: 'Quanto vale 0 % 2?',
      verificationAnswer: 'Vale 0 esatto, e infatti lo zero è a tutti gli effetti un numero pari!'
    }
  },
  {
    id: 'w10-e2',
    worldId: 10,
    order: 2,
    title: 'Massimo Comune Divisore: Algoritmo di Euclide',
    slug: 'mcd-euclide',
    difficulty: 'Medio',
    concept: 'MCD ricorsivo/iterativo con modulo: MCD(a, b) = MCD(b, a % b)',
    story: 'Due container merci hanno pesi A e B in kg. Devi impacchettare il contenuto in scatole identiche della massima capienza possibile che divida perfettamente entrambi i pesi senza alcun residuo. Calcola l\'MCD tra a e b usando l\'algoritmo di Euclide (senza scorrere tutti i numeri da 1 a N!).',
    functionName: 'calcolaMCD',
    signature: 'function calcolaMCD(a, b)',
    parameters: [
      { name: 'a', type: 'number', description: 'Primo numero positivo' },
      { name: 'b', type: 'number', description: 'Secondo numero positivo' }
    ],
    returnType: 'number',
    targetComplexity: 'O(log n)',
    starterCode: `function calcolaMCD(a, b) {
  // L'algoritmo di Euclide dice che finché b !== 0,
  // la nuova coppia diventa (b, a % b).
  
}
`,
    tests: [
      { id: 'w10-e2-t1', input: [48, 18], expected: 6, visible: true },
      { id: 'w10-e2-t2', input: [100, 25], expected: 25, visible: true },
      { id: 'w10-e2-t3', input: [17, 13], expected: 1, visible: true },
      { id: 'w10-e2-t4', input: [0, 5], expected: 5, visible: true },
      { id: 'w10-e2-t5', input: [270, 192], expected: 6, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se fai un ciclo da 1 a min(a,b) per provare tutti i divisori, cosa succede se a = 1.000.000.000?'
      },
      {
        level: 2,
        text: 'Usa un ciclo while (b !== 0). Calcola il resto = a % b. Poi assegna a = b e b = resto. Quando il ciclo finisce, restituisci a.'
      },
      {
        level: 3,
        text: 'Controesempio: se fai divisione per tentativi con a=10^9 e b=10^9 - 1 faresti un miliardo di iterazioni. Con Euclide bastano circa 5 passaggi logaritmici O(log(min(a,b)))!'
      }
    ],
    solution: {
      code: `function calcolaMCD(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const resto = a % b;
    a = b;
    b = resto;
  }
  
  return a;
}`,
      explanation: 'L\'algoritmo di Euclide si basa sul fatto che il divisore comune tra A e B divide anche la differenza o il resto A % B. A ogni passo la dimensione si dimezza almeno, con complessità O(log min(a, b)).',
      verificationQuestion: 'Cosa restituisce calcolaMCD(7, 0)?',
      verificationAnswer: 'Restituisce 7, poiché b è 0 fin dall\'inizio e qualsiasi numero divide 0!'
    }
  },
  {
    id: 'w10-e3',
    worldId: 10,
    order: 3,
    title: 'Numeri Primi: Fermati alla Radice Quadrata',
    slug: 'is-primo-radice',
    difficulty: 'Medio',
    concept: 'Ottimizzazione da O(n) a O(sqrt(n))',
    story: 'In un sistema crittografico devi convalidare se un numero intero positivo N è primo. Se provi a dividere N per tutti i numeri fino a N - 1, la verifica fallirà per numeri grandi. Ottimizza il controllo fermandoti a Math.sqrt(n).',
    functionName: 'isPrimo',
    signature: 'function isPrimo(n)',
    parameters: [{ name: 'n', type: 'number', description: 'Numero intero da verificare' }],
    returnType: 'boolean',
    targetComplexity: 'O(sqrt(n))' as any,
    starterCode: `function isPrimo(n) {
  // I numeri <= 1 non sono primi.
  // 2 è l'unico numero primo pari.
  // Fermati a i * i <= n!
  
}
`,
    tests: [
      { id: 'w10-e3-t1', input: [2], expected: true, visible: true },
      { id: 'w10-e3-t2', input: [3], expected: true, visible: true },
      { id: 'w10-e3-t3', input: [4], expected: false, visible: true },
      { id: 'w10-e3-t4', input: [1], expected: false, visible: true },
      { id: 'w10-e3-t5', input: [29], expected: true, visible: true },
      { id: 'w10-e3-t6', input: [100], expected: false, visible: false },
      { id: 'w10-e3-t7', input: [997], expected: true, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se un numero ha un divisore maggiore della sua radice quadrata, quale altro divisore deve necessariamente avere?'
      },
      {
        level: 2,
        text: 'I fattori si presentano sempre a coppie (es. per 36: 2*18, 3*12, 4*9, 6*6). Se non hai trovato divisori fino a sqrt(N), è impossibile trovarne dopo!'
      },
      {
        level: 3,
        text: 'Controesempio: per testare se 10.000.000.007 è primo, testare fino a N richiede 10 miliardi di cicli (secondi o minuti). Fermarsi alla radice quadrata richiede solo 100.000 cicli (frazioni di millisecondo)!'
      }
    ],
    solution: {
      code: `function isPrimo(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  
  return true;
}`,
      explanation: 'Scartando prima tutti i pari ed iterando solo sui dispari fino a i * i <= n, riduciamo i controlli a circa sqrt(n)/2 operazioni. Tempo O(sqrt(n)).',
      verificationQuestion: 'Perché 1 non è considerato un numero primo?',
      verificationAnswer: 'Per definizione matematica fondamentale (Teorema fondamentale dell\'aritmetica), un numero primo deve avere esattamente due divisori distinti: 1 e se stesso. Il numero 1 ne ha solo uno.'
    }
  }
];
