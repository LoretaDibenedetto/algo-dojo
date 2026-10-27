import { Exercise } from '../../types';

export const world7Exercises: Exercise[] = [
  {
    id: 'w7-e1',
    worldId: 7,
    order: 1,
    title: 'Due Puntatori: Two Sum su Array Ordinato',
    slug: 'two-sum-ordinato',
    difficulty: 'Facile',
    concept: 'Convergenza bidirezionale: left++ e right--',
    story: 'In un sistema di calcolo finanziario hai una lista di importi già ordinata in modo crescente. Devi verificare se esistono due importi distinti la cui somma sia esattamente uguale al valore target. Restituisci [indice1, indice2] (indici partiti da 0) con indice1 < indice2, oppure null se nessuna coppia somma al target. Sfrutta l\'ordinamento per risolverlo in tempo O(n) e memoria extra O(1).',
    functionName: 'coppiaSommaOrdinata',
    signature: 'function coppiaSommaOrdinata(numeri, target)',
    parameters: [
      { name: 'numeri', type: 'number[]', description: 'Array ordinato crescente' },
      { name: 'target', type: 'number', description: 'Somma cercata' }
    ],
    returnType: 'number[] | null',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se numeri = [2, 7, 11, 15] e target = 9: left=0 (val 2), right=3 (val 15). Somma = 17 > 9. Quale puntatore devi spostare? right--',
      targetComplexity: 'O(n)'
    },
    starterCode: `function coppiaSommaOrdinata(numeri, target) {
  let left = 0;
  let right = numeri.length - 1;

  // Mentre left < right, confronta la somma con target
  
  return null;
}
`,
    tests: [
      { id: 'w7-e1-t1', input: [[2, 7, 11, 15], 9], expected: [0, 1], visible: true },
      { id: 'w7-e1-t2', input: [[2, 3, 4], 6], expected: [0, 2], visible: true },
      { id: 'w7-e1-t3', input: [[-1, 0], -1], expected: [0, 1], visible: true },
      { id: 'w7-e1-t4', input: [[1, 2, 3], 99], expected: null, visible: true },
      { id: 'w7-e1-t5', input: [[], 5], expected: null, visible: true },
      { id: 'w7-e1-t6', input: [[5], 10], expected: null, visible: true },
      { id: 'w7-e1-t7', input: [[1, 3, 5, 8, 12, 19], 13], expected: [0, 4], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se la somma corrente numeri[left] + numeri[right] è maggiore del target, per rimpicciolirla quale estremo devi muovere?'
      },
      {
        level: 2,
        text: 'Se somma === target ritorna [left, right]. Se somma < target incrementa left++. Se somma > target decrementa right--.'
      },
      {
        level: 3,
        text: 'Controesempio: usare una mappa hash richiede O(n) memoria extra. La tecnica a due puntatori sfrutta l\'ordinamento per lavorare in spazio O(1) puro!'
      }
    ],
    solution: {
      code: `function coppiaSommaOrdinata(numeri, target) {
  let left = 0;
  let right = numeri.length - 1;

  while (left < right) {
    const somma = numeri[left] + numeri[right];
    if (somma === target) {
      return [left, right];
    } else if (somma < target) {
      left++;
    } else {
      right--;
    }
  }

  return null;
}`,
      explanation: 'Poiché l\'array è ordinato, incrementare left aumenta monotonicamente la somma, mentre decrementare right la riduce. Ad ogni iterazione scartiamo un elemento non idoneo: tempo O(n), spazio O(1).',
      verificationQuestion: 'Perché la condizione del ciclo è left < right e non left <= right?',
      verificationAnswer: 'Perché il problema richiede due elementi distinti: se permettessimo left === right, un numero potrebbe sommarsi con se stesso!'
    },
    tracingChallenge: {
      codeToTrace: 'let l=0, r=2; const arr=[1, 4, 6]; const s = arr[l]+arr[r]; if (s > 5) r--;',
      input: [[1, 4, 6]],
      steps: [
        { step: 1, description: 'Calcolo somma estremi arr[0] + arr[2]', variables: { 'arr[0]': 1, 'arr[2]': 6, 's': 7 } },
        { step: 2, description: 'Confronto s > 5 e decremento right', variables: { 's > 5': 'true', 'r': 1 } },
        { step: 3, description: 'Nuova coppia di indici attivi', variables: { 'l': 0, 'r': 1 } }
      ]
    }
  },
  {
    id: 'w7-e2',
    worldId: 7,
    order: 2,
    title: 'Spostare gli Zeri in Fondo (Move Zeroes In-Place)',
    slug: 'sposta-zeri-in-place',
    difficulty: 'Facile',
    concept: 'Puntatore di lettura vs puntatore di scrittura',
    story: 'In un buffer di rete ricevi un flusso di pacchetti numerici in cui gli zeri rappresentano slot vuoti o cancellati. Devi compattare il buffer spostando tutti i numeri diversi da zero all\'inizio dell\'array preservando il loro ordine relativo, e riempire la fine con tutti gli zeri. L\'operazione deve essere eseguita in-place senza allocare un nuovo array.',
    functionName: 'spostaZeri',
    signature: 'function spostaZeri(arr)',
    parameters: [{ name: 'arr', type: 'number[]', description: 'Array da modificare in-place' }],
    returnType: 'number[]',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se arr = [0, 1, 0, 3, 12]: compattando ottieni [1, 3, 12, 0, 0]. Quanti scambi o scritture compi?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function spostaZeri(arr) {
  // Usa un puntatore 'scrivi' per posizionare i numeri non-zero
  // Poi riempi il resto dell'array con zeri fino alla fine
  
  return arr;
}
`,
    tests: [
      { id: 'w7-e2-t1', input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0], visible: true },
      { id: 'w7-e2-t2', input: [[0]], expected: [0], visible: true },
      { id: 'w7-e2-t3', input: [[]], expected: [], visible: true },
      { id: 'w7-e2-t4', input: [[1, 2, 3]], expected: [1, 2, 3], visible: true },
      { id: 'w7-e2-t5', input: [[0, 0, 0]], expected: [0, 0, 0], visible: true },
      { id: 'w7-e2-t6', input: [[4, 0, 2, 0, 0, 1]], expected: [4, 2, 1, 0, 0, 0], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Come tieni traccia della prossima cella libera all\'inizio dell\'array dove trascrivere il prossimo numero diverso da zero?'
      },
      {
        level: 2,
        text: 'Inizializza let scrivi = 0. Con un ciclo for i da 0 a arr.length - 1, se arr[i] !== 0 assegna arr[scrivi] = arr[i] e scrivi++. Poi con un secondo ciclo da scrivi a arr.length - 1 imposta arr[i] = 0.'
      },
      {
        level: 3,
        text: 'Controesempio: usare arr.splice() dentro il ciclo for per rimuovere gli zeri e fare push() è un errore classico: splice costa O(n) ad ogni rimozione, trasformando il codice in un lentissimo O(n²)!'
      }
    ],
    solution: {
      code: `function spostaZeri(arr) {
  let scrivi = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[scrivi] = arr[i];
      scrivi++;
    }
  }

  while (scrivi < arr.length) {
    arr[scrivi] = 0;
    scrivi++;
  }

  return arr;
}`,
      explanation: 'Una prima passata copia tutti i valori non nulli in testa preservandone l\'ordine sequenziale. La seconda passata azzera le celle rimanenti. Tempo totale O(n), memoria ausiliaria O(1).',
      verificationQuestion: 'Cosa succede se l\'array non contiene nessuno zero (es. [1, 2, 3])?',
      verificationAnswer: 'Ad ogni giro arr[scrivi] riscrive se stesso e scrivi avanza fino a arr.length, il secondo ciclo non parte nemmeno e l\'array rimane identico!'
    }
  },
  {
    id: 'w7-e3',
    worldId: 7,
    order: 3,
    title: 'Finestra Scorrevole Fissa: Picco di Traffico (Max Sum K)',
    slug: 'massima-somma-finestra-k',
    difficulty: 'Medio',
    concept: 'Sliding Window a dimensione fissa: add next, remove past',
    story: 'In un server web monitori le richieste HTTP al minuto memorizzate in un array. Vuoi identificare l\'intervallo di K minuti consecutivi con il massimo volume di traffico totale. Se l\'array contiene meno di K elementi o K <= 0, restituisci 0.',
    functionName: 'maxTrafficoFinestraK',
    signature: 'function maxTrafficoFinestraK(richieste, k)',
    parameters: [
      { name: 'richieste', type: 'number[]', description: 'Array di richieste al minuto' },
      { name: 'k', type: 'number', description: 'Ampiezza della finestra temporale' }
    ],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se richieste = [2, 1, 5, 1, 3, 2] e k = 3: prima finestra [2, 1, 5] fa somma 8. Seconda finestra [1, 5, 1] fa 7. Terza [5, 1, 3] fa 9. Massimo: 9.',
      targetComplexity: 'O(n)'
    },
    starterCode: `function maxTrafficoFinestraK(richieste, k) {
  if (richieste.length < k || k <= 0) return 0;
  // Calcola la somma della prima finestra di K elementi
  // Poi fai scivolare la finestra aggiungendo l'entrante e togliendo l'uscente!
  
  return 0;
}
`,
    tests: [
      { id: 'w7-e3-t1', input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, visible: true },
      { id: 'w7-e3-t2', input: [[2, 3, 4, 1, 5], 2], expected: 7, visible: true },
      { id: 'w7-e3-t3', input: [[], 3], expected: 0, visible: true },
      { id: 'w7-e3-t4', input: [[5], 1], expected: 5, visible: true },
      { id: 'w7-e3-t5', input: [[1, 2], 5], expected: 0, visible: true },
      { id: 'w7-e3-t6', input: [[10, 20, 30, 40], 4], expected: 100, visible: false },
      { id: 'w7-e3-t7', input: [[-1, -2, -3, -4], 2], expected: -3, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Quando la finestra scorre a destra di un minuto, quanti elementi cambiano davvero nella somma?'
      },
      {
        level: 2,
        text: 'Cambiano solo 2 elementi: quello nuovo che entra a destra (+ richieste[i]) e quello vecchio che esce a sinistra (- richieste[i - k]). Non ricalcolare tutti i K elementi da capo!'
      },
      {
        level: 3,
        text: 'Controesempio: calcolare la somma con una slice(i, i + k).reduce(...) per ogni posizione costa O(n * k), che con k = 100.000 causa il blocco del server.'
      }
    ],
    solution: {
      code: `function maxTrafficoFinestraK(richieste, k) {
  if (richieste.length < k || k <= 0) return 0;

  let sommaFinestra = 0;
  for (let i = 0; i < k; i++) {
    sommaFinestra += richieste[i];
  }

  let maxSomma = sommaFinestra;
  for (let i = k; i < richieste.length; i++) {
    sommaFinestra += richieste[i] - richieste[i - k];
    maxSomma = Math.max(maxSomma, sommaFinestra);
  }

  return maxSomma;
}`,
      explanation: 'Ogni scatto della finestra costa un\'addizione e una sottrazione, cioè O(1). Il costo totale per scorrere l\'intero array di N elementi è rigidamente O(n).',
      verificationQuestion: 'Quale indice corrisponde all\'elemento che esce dalla finestra al passo i?',
      verificationAnswer: 'L\'indice è esattamente (i - k), che si trova k passi prima dell\'indice corrente i!'
    }
  },
  {
    id: 'w7-e4',
    worldId: 7,
    order: 4,
    title: 'Finestra Dinamica: Minima Lunghezza Sottoarray con Somma >= S',
    slug: 'minima-dimensione-sottoarray-somma',
    difficulty: 'Difficile',
    concept: 'Sliding window dinamica: espansione a destra e contrazione a sinistra',
    story: 'In un portafoglio azionario devi trovare la minima durata in giorni continui (la minima lunghezza di un sottoarray continuo) la cui somma di rendimenti positivi sia maggiore o uguale alla soglia target S. Se non esiste alcun sottoarray con somma >= S o l\'array è vuoto, restituisci 0.',
    functionName: 'lunghezzaMinimaSomma',
    signature: 'function lunghezzaMinimaSomma(rendimenti, s)',
    parameters: [
      { name: 'rendimenti', type: 'number[]', description: 'Array di numeri positivi' },
      { name: 's', type: 'number', description: 'Soglia minima da raggiungere' }
    ],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se rendimenti = [2, 3, 1, 2, 4, 3] e s = 7: la finestra [4, 3] raggiunge 7 con soli 2 elementi! Risultato: 2.',
      targetComplexity: 'O(n)'
    },
    starterCode: `function lunghezzaMinimaSomma(rendimenti, s) {
  let left = 0;
  let somma = 0;
  let minLen = Infinity;

  // Espandi con il puntatore right da 0 a length - 1
  // Quando somma >= s, comprimi la finestra da sinistra con left++!
  
  return minLen === Infinity ? 0 : minLen;
}
`,
    tests: [
      { id: 'w7-e4-t1', input: [[2, 3, 1, 2, 4, 3], 7], expected: 2, visible: true },
      { id: 'w7-e4-t2', input: [[1, 4, 4], 4], expected: 1, visible: true },
      { id: 'w7-e4-t3', input: [[1, 1, 1, 1, 1, 1, 1, 1], 11], expected: 0, visible: true },
      { id: 'w7-e4-t4', input: [[], 5], expected: 0, visible: true },
      { id: 'w7-e4-t5', input: [[10], 5], expected: 1, visible: true },
      { id: 'w7-e4-t6', input: [[10], 20], expected: 0, visible: true },
      { id: 'w7-e4-t7', input: [[1, 2, 3, 4, 5], 15], expected: 5, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Cosa devi fare non appena la somma nella finestra corrente raggiunge o supera la soglia target S?'
      },
      {
        level: 2,
        text: 'Mentre somma >= s, calcola minLen = Math.min(minLen, right - left + 1), poi sottrai rendimenti[left] dalla somma e incrementa left++ per cercare una finestra ancora più corta.'
      },
      {
        level: 3,
        text: 'Controesempio: generare tutte le possibili coppie di inizio e fine con due cicli for annidati costa O(n²). Con la finestra scorrevole sia left che right avanzano solo in avanti: tempo O(n).'
      }
    ],
    solution: {
      code: `function lunghezzaMinimaSomma(rendimenti, s) {
  let left = 0;
  let somma = 0;
  let minLen = Infinity;

  for (let right = 0; right < rendimenti.length; right++) {
    somma += rendimenti[right];
    while (somma >= s) {
      minLen = Math.min(minLen, right - left + 1);
      somma -= rendimenti[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
      explanation: 'Anche se c\'è un ciclo while all\'interno del ciclo for, ogni elemento viene aggiunto alla somma una volta dal puntatore right e rimosso al massimo una volta dal puntatore left. Tempo complessivo rigorosamente 2N = O(n).',
      verificationQuestion: 'Perché la lunghezza della finestra è (right - left + 1)?',
      verificationAnswer: 'Perché gli indici left e right sono entrambi compresi nell\'intervallo: se left=2 e right=2, l\'elemento è uno solo (2 - 2 + 1 = 1)!'
    }
  },
  {
    id: 'w7-e5',
    worldId: 7,
    order: 5,
    title: 'Contenitore con Più Acqua (Container With Most Water)',
    slug: 'contenitore-piu-acqua',
    difficulty: 'Difficile',
    concept: 'Due puntatori avidi: spostare sempre l\'asta più bassa',
    story: 'Hai un array di numeri verticali che rappresentano l\'altezza di aste piantate a terra lungo un asse. Insieme all\'asse orizzontale, due aste formano un serbatoio d\'acqua la cui capienza è data da: area = (indiceDestro - indiceSinistro) * min(altezza[sinistro], altezza[destro]). Trova la massima quantità d\'acqua che un serbatoio può contenere. Se l\'array ha meno di 2 aste, la capienza è 0.',
    functionName: 'maxAcquaContenuta',
    signature: 'function maxAcquaContenuta(altezze)',
    parameters: [{ name: 'altezze', type: 'number[]', description: 'Array di altezze delle aste' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se altezze = [1, 8, 6, 2, 5, 4, 8, 3, 7]: le aste all\'indice 1 (altezza 8) e indice 8 (altezza 7) distano 7 passi. Area = 7 * min(8, 7) = 49.',
      targetComplexity: 'O(n)'
    },
    starterCode: `function maxAcquaContenuta(altezze) {
  let left = 0;
  let right = altezze.length - 1;
  let maxArea = 0;

  // Mentre left < right, calcola l'area e sposta il puntatore dell'asta più bassa!
  
  return maxArea;
}
`,
    tests: [
      { id: 'w7-e5-t1', input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, visible: true },
      { id: 'w7-e5-t2', input: [[1, 1]], expected: 1, visible: true },
      { id: 'w7-e5-t3', input: [[4, 3, 2, 1, 4]], expected: 16, visible: true },
      { id: 'w7-e5-t4', input: [[]], expected: 0, visible: true },
      { id: 'w7-e5-t5', input: [[10]], expected: 0, visible: true },
      { id: 'w7-e5-t6', input: [[1, 2, 1]], expected: 2, visible: true },
      { id: 'w7-e5-t7', input: [[2, 3, 10, 5, 7, 8, 9]], expected: 36, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'La larghezza della base (right - left) diminuisce ad ogni passo. Per sperare di trovare un\'area maggiore, quale delle due aste devi cambiare?'
      },
      {
        level: 2,
        text: 'L\'altezza dell\'acqua è limitata dall\'asta PIÙ BASSA. Quindi spostare l\'asta più alta non potrà mai migliorare l\'area: devi sempre spostare verso l\'interno l\'asta con altezza minore!'
      },
      {
        level: 3,
        text: 'Controesempio: confrontare tutte le coppie possibili con due cicli for annidati richiede O(n²). Con la convergenza avida dei due puntatori la soluzione è trovata in un unico passaggio O(n).'
      }
    ],
    solution: {
      code: `function maxAcquaContenuta(altezze) {
  let left = 0;
  let right = altezze.length - 1;
  let maxArea = 0;

  while (left < right) {
    const larghezza = right - left;
    const altezzaMin = Math.min(altezze[left], altezze[right]);
    const area = larghezza * altezzaMin;
    maxArea = Math.max(maxArea, area);

    if (altezze[left] < altezze[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}`,
      explanation: 'Poiché l\'area è vincolata dall\'asta più bassa, l\'unico modo per compensare la riduzione della larghezza è cercare un\'asta più alta scartando quella più corta. Questo garantisce di esaminare la configurazione ottima in tempo O(n).',
      verificationQuestion: 'Cosa succede se le due aste correnti hanno esattamente la stessa altezza (altezze[left] === altezze[right])?',
      verificationAnswer: 'È indifferente spostare left o right (o entrambi): poiché entrambe limitano l\'area corrente, nessuna delle due potrà generare un\'area maggiore mantenendo l\'altra con una base più stretta!'
    }
  }
];
