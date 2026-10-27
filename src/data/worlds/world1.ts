import { Exercise } from '../../types';

export const world1Exercises: Exercise[] = [
  {
    id: 'w1-e1',
    worldId: 1,
    order: 1,
    title: 'L\'Ultimo Pacco',
    slug: 'ultimo-elemento',
    difficulty: 'Facile',
    concept: 'Off-by-one: array.length - 1',
    story: 'Nel centro smistamento pacchi, i pacchi arrivano su un nastro trasportatore ordinato. Il capo turno ti chiede di prelevare sempre l\'ultimo pacco arrivato sul nastro per la scansione finale. Se il nastro è vuoto, restituisci null.',
    functionName: 'ultimoPacco',
    signature: 'function ultimoPacco(nastro)',
    parameters: [{ name: 'nastro', type: 'any[]', description: 'Array di pacchi (numeri o stringhe)' }],
    returnType: 'any | null',
    targetComplexity: 'O(1)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se il nastro ha 3 pacchi [10, 20, 30], qual è la lunghezza? A quale indice si trova l\'ultimo elemento?',
      targetComplexity: 'O(1)'
    },
    starterCode: `function ultimoPacco(nastro) {
  // ATTENZIONE: Gli array in JS partono da indice 0!
  // Se un array ha lunghezza N, l'ultimo elemento NON è all'indice N.
  
}
`,
    tests: [
      { id: 'w1-e1-t1', input: [[10, 20, 30]], expected: 30, visible: true },
      { id: 'w1-e1-t2', input: [['A', 'B', 'C', 'D']], expected: 'D', visible: true },
      { id: 'w1-e1-t3', input: [[42]], expected: 42, visible: true },
      { id: 'w1-e1-t4', input: [[]], expected: null, visible: true },
      { id: 'w1-e1-t5', input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 99]], expected: 99, visible: false },
      { id: 'w1-e1-t6', input: [['pacco_speciale']], expected: 'pacco_speciale', visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se hai 3 elementi [A, B, C], i loro indici sono 0, 1 e 2. Quanto vale nastro.length? Qual è la relazione tra la lunghezza e l\'indice dell\'ultimo elemento?'
      },
      {
        level: 2,
        text: 'Prima controlla se l\'array è vuoto con nastro.length === 0. Poi accedi alla cella con indice pari alla lunghezza meno uno.'
      },
      {
        level: 3,
        text: 'Controesempio: se fai nastro[nastro.length], per un array di 3 elementi cercherai nastro[3], che non esiste e restituirà undefined!'
      }
    ],
    solution: {
      code: `function ultimoPacco(nastro) {
  if (nastro.length === 0) {
    return null;
  }
  return nastro[nastro.length - 1];
}`,
      explanation: 'Gli indici partono da 0, quindi per un array di lunghezza N l\'ultimo elemento valido si trova sempre all\'indice N - 1. Accedere direttamente tramite indice richiede tempo costante O(1).',
      verificationQuestion: 'Cosa restituirebbe nastro[nastro.length - 1] se non avessimo verificato che nastro.length > 0 e l\'array fosse vuoto []?',
      verificationAnswer: 'Restituirebbe undefined, perché proverebbe a leggere nastro[-1], che in JavaScript non solleva un errore ma restituisce undefined!'
    },
    tracingChallenge: {
      codeToTrace: 'const arr = ["A", "B", "C"]; const last = arr[arr.length - 1];',
      input: [["A", "B", "C"]],
      steps: [
        { step: 1, description: 'Valutazione arr.length', variables: { 'arr.length': 3 } },
        { step: 2, description: 'Calcolo indice ultimo', variables: { 'arr.length - 1': 2 } },
        { step: 3, description: 'Lettura elemento', variables: { 'arr[2]': 'C' } }
      ]
    }
  },
  {
    id: 'w1-e2',
    worldId: 1,
    order: 2,
    title: 'Scorrere Senza Uscire dai Binari',
    slug: 'somma-elementi',
    difficulty: 'Facile',
    concept: 'Condizione di arresto ciclo: i < length vs i <= length',
    story: 'Sei la cassiera di un supermercato. Ricevi lo scontrino con i prezzi dei singoli articoli in un array. Devi calcolare la somma totale degli articoli. Attenzione a non conteggiare elementi fantasma fuori dall\'array!',
    functionName: 'sommaSpesa',
    signature: 'function sommaSpesa(prezzi)',
    parameters: [{ name: 'prezzi', type: 'number[]', description: 'Array dei prezzi' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se prezzi = [5, 10, 15], quali valori deve assumere la variabile indice i? Da dove parte e dove deve fermarsi rigorosamente?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function sommaSpesa(prezzi) {
  let totale = 0;
  // Scrivi il ciclo for facendo attenzione alla condizione di stop!
  
  return totale;
}
`,
    tests: [
      { id: 'w1-e2-t1', input: [[5, 10, 15]], expected: 30, visible: true },
      { id: 'w1-e2-t2', input: [[]], expected: 0, visible: true },
      { id: 'w1-e2-t3', input: [[100]], expected: 100, visible: true },
      { id: 'w1-e2-t4', input: [[1, 2, 3, 4, 5]], expected: 15, visible: false },
      { id: 'w1-e2-t5', input: [[0, 0, 0, 0]], expected: 0, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se usi un ciclo for, l\'indice deve fermarsi prima o uguale a length? Ricorda quale indice ha l\'ultimo elemento.'
      },
      {
        level: 2,
        text: 'Inizializza una variabile totale a 0. Itera da i = 0 fino a i < prezzi.length con incremento i++. Aggiungi prezzi[i] a totale.'
      },
      {
        level: 3,
        text: 'Controesempio: se scrivi "i <= prezzi.length", all\'ultima iterazione proverai a sommare prezzi[prezzi.length], cioè undefined. In JS "totale + undefined" diventa NaN!'
      }
    ],
    solution: {
      code: `function sommaSpesa(prezzi) {
  let totale = 0;
  for (let i = 0; i < prezzi.length; i++) {
    totale += prezzi[i];
  }
  return totale;
}`,
      explanation: 'La condizione corretta è sempre i < prezzi.length. In questo modo l\'indice i tocca tutti gli elementi da 0 a length - 1 senza mai sforare su undefined. Complessità lineare O(n).',
      verificationQuestion: 'Cosa succederebbe se inizializzassi let i = 1 invece di let i = 0?',
      verificationAnswer: 'Salteresti completamente il primo elemento (all\'indice 0), causando un classico errore off-by-one!'
    }
  },
  {
    id: 'w1-e3',
    worldId: 1,
    order: 3,
    title: 'Trova il Record: Massimo e suo Indice',
    slug: 'trova-massimo-indice',
    difficulty: 'Facile',
    concept: 'Inizializzazione con primo elemento e tracciamento indice',
    story: 'In una gara podistica registri i punteggi di ciascun atleta in ordine di corsia. Devi trovare sia il punteggio più alto sia il numero di corsia (l\'indice) dell\'atleta che l\'ha conseguito. Restituisci un oggetto { max: number, indice: number }. Se l\'array è vuoto, restituisci null.',
    functionName: 'migliorAtleta',
    signature: 'function migliorAtleta(punteggi)',
    parameters: [{ name: 'punteggi', type: 'number[]', description: 'Array di punteggi interi' }],
    returnType: '{ max: number, indice: number } | null',
    targetComplexity: 'O(n)',
    starterCode: `function migliorAtleta(punteggi) {
  if (punteggi.length === 0) return null;

  // Inizializza il massimo col primo punteggio reale, non con 0!
  
}
`,
    tests: [
      { id: 'w1-e3-t1', input: [[10, 50, 30, 20]], expected: { max: 50, indice: 1 }, visible: true },
      { id: 'w1-e3-t2', input: [[]], expected: null, visible: true },
      { id: 'w1-e3-t3', input: [[-5, -2, -10]], expected: { max: -2, indice: 1 }, visible: true },
      { id: 'w1-e3-t4', input: [[99]], expected: { max: 99, indice: 0 }, visible: false },
      { id: 'w1-e3-t5', input: [[10, 20, 30, 40, 50]], expected: { max: 50, indice: 4 }, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Perché inizializzare "max = 0" è pericoloso se tutti i partecipanti hanno punteggi negativi (es. penalità)?'
      },
      {
        level: 2,
        text: 'Inizializza max con punteggi[0] e indiceMax con 0. Poi avvia il ciclo partendo da i = 1 fino a i < punteggi.length.'
      },
      {
        level: 3,
        text: 'Controesempio: se hai punteggi = [-10, -20, -5] e parti con max = 0, il tuo codice restituirà 0 come massimo, ma 0 non compare nemmeno nell\'array!'
      }
    ],
    solution: {
      code: `function migliorAtleta(punteggi) {
  if (punteggi.length === 0) return null;
  
  let max = punteggi[0];
  let indice = 0;
  
  for (let i = 1; i < punteggi.length; i++) {
    if (punteggi[i] > max) {
      max = punteggi[i];
      indice = i;
    }
  }
  
  return { max, indice };
}`,
      explanation: 'Inizializzare con punteggi[0] garantisce correttezza anche con numeri negativi. Partire con i = 1 risparmia un confronto inutile con se stesso.',
      verificationQuestion: 'Se ci sono due atleti con lo stesso punteggio massimo (es. [40, 50, 50]), quale indice viene restituito con il controllo ">"?',
      verificationAnswer: 'Viene restituito l\'indice del primo che ha raggiunto il massimo (indice 1), poiché 50 non è strettamente maggiore di 50. Se usassi ">=" restituiresti l\'ultimo!'
    }
  },
  {
    id: 'w1-e4',
    worldId: 1,
    order: 4,
    title: 'Inversione allo Specchio (In-Place)',
    slug: 'inverti-array-in-place',
    difficulty: 'Medio',
    concept: 'Due puntatori che si incontrano a metà: Math.floor(length / 2)',
    story: 'In un magazzino verticale automatizzato, i cassetti devono essere ribaltati sottosopra. Il motore dispone di pochissima memoria RAM e non può creare un nuovo array ausiliario: devi scambiare gli elementi direttamente nello stesso array (in-place) e restituirlo.',
    functionName: 'invertiCassetti',
    signature: 'function invertiCassetti(arr)',
    parameters: [{ name: 'arr', type: 'any[]', description: 'Array da invertire in-place' }],
    returnType: 'any[]',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se arr = [1, 2, 3, 4], quali coppie scambi? Dove deve fermarsi il puntatore sinistro per non riscambiare tutto di nuovo?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function invertiCassetti(arr) {
  // Scambia gli elementi agli estremi muovendoti verso il centro.
  // NON usare arr.reverse() nativo!
  
  return arr;
}
`,
    tests: [
      { id: 'w1-e4-t1', input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], visible: true },
      { id: 'w1-e4-t2', input: [[10, 20]], expected: [20, 10], visible: true },
      { id: 'w1-e4-t3', input: [[]], expected: [], visible: true },
      { id: 'w1-e4-t4', input: [['A', 'B', 'C', 'D']], expected: ['D', 'C', 'B', 'A'], visible: true },
      { id: 'w1-e4-t5', input: [[7]], expected: [7], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se continui a scambiare gli elementi per tutta la lunghezza dell\'array da 0 a length - 1, cosa succederà al contenuto finale?'
      },
      {
        level: 2,
        text: 'Usa due puntatori: "left = 0" e "right = arr.length - 1". Continua a scambiare mentre left < right, incrementando left e decrementando right.'
      },
      {
        level: 3,
        text: 'Controesempio: se fai un ciclo for da 0 a arr.length, scambierai la prima metà con la seconda, e poi la seconda metà di nuovo con la prima, ritrovandoti l\'array IDENTICO all\'inizio!'
      }
    ],
    solution: {
      code: `function invertiCassetti(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  
  return arr;
}`,
      explanation: 'Usare due puntatori che convergono verso il centro garantisce esattamente N/2 scambi. Quando left >= right ci siamo fermati al momento perfetto, con memoria extra O(1).',
      verificationQuestion: 'Cosa succede se l\'array ha un numero dispari di elementi (es. 5 elementi)?',
      verificationAnswer: 'L\'elemento centrale all\'indice 2 non viene mai toccato (quando left === 2 e right === 2 il ciclo while termina), rimanendo esattamente al suo posto centrale corretto!'
    }
  },
  {
    id: 'w1-e5',
    worldId: 1,
    order: 5,
    title: 'Rimozione Duplicati da Array Ordinato',
    slug: 'rimuovi-duplicati-ordinato',
    difficulty: 'Medio',
    concept: 'Puntatore lento vs puntatore veloce (due puntatori su array)',
    story: 'Lavori al database dell\'anagrafe: hai una lista di codici ID già ordinati in modo crescente, ma ci sono dei duplicati dovuti a inserimenti doppi. Devi compattare l\'array eliminando i duplicati consecutivi e restituire la nuova lunghezza valida. Gli elementi unici devono trovarsi all\'inizio dell\'array.',
    functionName: 'eliminaDuplicati',
    signature: 'function eliminaDuplicati(numeri)',
    parameters: [{ name: 'numeri', type: 'number[]', description: 'Array di numeri ordinati' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    starterCode: `function eliminaDuplicati(numeri) {
  if (numeri.length === 0) return 0;
  
  // Usa un indice lento 'k' che tiene traccia dell'ultimo elemento unico scritto
  let k = 0;
  
  // Ritorna la nuova lunghezza (k + 1)
  return k + 1;
}
`,
    tests: [
      { id: 'w1-e5-t1', input: [[1, 1, 2]], expected: 2, visible: true },
      { id: 'w1-e5-t2', input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5, visible: true },
      { id: 'w1-e5-t3', input: [[]], expected: 0, visible: true },
      { id: 'w1-e5-t4', input: [[1, 2, 3]], expected: 3, visible: false },
      { id: 'w1-e5-t5', input: [[7, 7, 7, 7]], expected: 1, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Poiché l\'array è già ordinato, dove si trovano due elementi identici? Sono sempre vicini o possono essere sparsi?'
      },
      {
        level: 2,
        text: 'Fai scorrere un indice i da 1 a length - 1. Se numeri[i] !== numeri[k], significa che hai trovato un nuovo numero: incrementa k e scrivi numeri[k] = numeri[i].'
      },
      {
        level: 3,
        text: 'Controesempio: non usare numeri.splice() dentro il ciclo for! Splice costa O(n) ogni volta che rimuove, trasformando il tuo algoritmo da O(n) a un lentissimo O(n²).'
      }
    ],
    solution: {
      code: `function eliminaDuplicati(numeri) {
  if (numeri.length === 0) return 0;
  
  let k = 0;
  for (let i = 1; i < numeri.length; i++) {
    if (numeri[i] !== numeri[k]) {
      k++;
      numeri[k] = numeri[i];
    }
  }
  
  return k + 1;
}`,
      explanation: 'Il puntatore veloce i scansiona ogni elemento, mentre il puntatore lento k avanza solo quando incontriamo un valore mai visto prima. Tempo O(n), spazio O(1).',
      verificationQuestion: 'Perché ritorniamo k + 1 e non semplicemente k?',
      verificationAnswer: 'Perché k è l\'INDICE dell\'ultimo elemento unico scritto (partito da 0). Il numero di elementi totali (lunghezza) è quindi sempre indice + 1!'
    }
  },
  {
    id: 'w1-e6',
    worldId: 1,
    order: 6,
    title: 'Rotazione Array a Destra di K Posti',
    slug: 'ruota-array-k',
    difficulty: 'Difficile',
    concept: 'Aritmetica modulare sugli indici: (i + k) % length',
    story: 'In una catena di montaggio circolare, ogni stazione di lavoro deve traslare a destra di K posizioni. Ad esempio con K=2, l\'ultimo elemento va al penultimo e il penultimo al primo. Se K è maggiore della lunghezza dell\'array, il nastro fa semplicemente dei giri completi. Restituisci il nuovo array ruotato.',
    functionName: 'ruotaNastro',
    signature: 'function ruotaNastro(arr, k)',
    parameters: [
      { name: 'arr', type: 'any[]', description: 'Array originale' },
      { name: 'k', type: 'number', description: 'Numero di scatti a destra' }
    ],
    returnType: 'any[]',
    targetComplexity: 'O(n)',
    starterCode: `function ruotaNastro(arr, k) {
  if (arr.length === 0) return [];
  // Usa l'operatore modulo % per gestire k > arr.length
  
}
`,
    tests: [
      { id: 'w1-e6-t1', input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], visible: true },
      { id: 'w1-e6-t2', input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], visible: true },
      { id: 'w1-e6-t3', input: [[1, 2], 5], expected: [2, 1], visible: true },
      { id: 'w1-e6-t4', input: [[], 3], expected: [], visible: true },
      { id: 'w1-e6-t5', input: [[10, 20, 30], 0], expected: [10, 20, 30], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se l\'array ha 3 elementi e lo ruoti di 3 volte, come cambia? E se lo ruoti di 5 volte? Quante rotazioni effettive compi?'
      },
      {
        level: 2,
        text: 'Calcola la rotazione effettiva con effK = k % arr.length. Il nuovo indice di ogni elemento originale all\'indice i diventa (i + effK) % arr.length.'
      },
      {
        level: 3,
        text: 'Controesempio: se non fai k % arr.length, un test con k = 1.000.000 su un array di 2 elementi andrebbe in timeout se provassi a fare unpop() e unshift() 1 milione di volte in un ciclo!'
      }
    ],
    solution: {
      code: `function ruotaNastro(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  
  const rot = k % n;
  if (rot === 0) return [...arr];
  
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[(i + rot) % n] = arr[i];
  }
  return res;
}`,
      explanation: 'L\'operatore modulo % n riconduce qualsiasi numero di rotazioni all\'interno dell\'intervallo valido [0, n - 1]. Ogni elemento atterra al suo nuovo indice in tempo lineare O(n).',
      verificationQuestion: 'Cosa succederebbe se k fosse un multiplo esatto della lunghezza dell\'array (es. k = 10 e n = 5)?',
      verificationAnswer: 'k % n darebbe 0, quindi l\'array farebbe due giri completi e rimarrebbe identico all\'originale!'
    }
  }
];
