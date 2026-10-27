import { Exercise } from '../../types';

export const world5Exercises: Exercise[] = [
  {
    id: 'w5-e1',
    worldId: 5,
    order: 1,
    title: 'Bubble Sort con Bandiera Ottimizzata',
    slug: 'bubble-sort-ottimizzato',
    difficulty: 'Facile',
    concept: 'Scambio coppie adiacenti e stop anticipato O(n)',
    story: 'In un magazzino i carrelli devono essere allineati per peso crescente. Il sistema esegue una serie di passate confrontando e scambiando carrelli adiacenti se fuori posto. Ottimizza con un flag booleano per terminare immediatamente se in una passata non avviene alcuno scambio (array già ordinato).',
    functionName: 'bubbleSort',
    signature: 'function bubbleSort(arr)',
    parameters: [{ name: 'arr', type: 'number[]', description: 'Array di numeri da ordinare' }],
    returnType: 'number[]',
    targetComplexity: 'O(n^2)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se arr = [5, 1, 4, 2]: alla prima passata, 5 sale fino alla fine [1, 4, 2, 5]. Quanti elementi ordinati si accumulano alla fine?',
      targetComplexity: 'O(n^2)'
    },
    starterCode: `function bubbleSort(arr) {
  const n = arr.length;
  // Fai scorrere le passate scambiando arr[j] e arr[j+1]
  // Usa una variabile booleana per interrompere il ciclo se è già ordinato!
  
  return arr;
}
`,
    tests: [
      { id: 'w5-e1-t1', input: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8], visible: true },
      { id: 'w5-e1-t2', input: [[3, 2, 1]], expected: [1, 2, 3], visible: true },
      { id: 'w5-e1-t3', input: [[]], expected: [], visible: true },
      { id: 'w5-e1-t4', input: [[42]], expected: [42], visible: true },
      { id: 'w5-e1-t5', input: [[5, 5, 2, 2, 8]], expected: [2, 2, 5, 5, 8], visible: true },
      { id: 'w5-e1-t6', input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], visible: false },
      { id: 'w5-e1-t7', input: [[-3, -1, -7, 0, 5]], expected: [-7, -3, -1, 0, 5], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Alla fine della prima passata, quale elemento ha sicuramente raggiunto la sua posizione finale?'
      },
      {
        level: 2,
        text: 'L\'elemento più grande "galleggia" fino alla fine. Il ciclo interno può fermarsi a n - 1 - i. Se in una passata scambiato resta false, fermati subito con break.'
      },
      {
        level: 3,
        text: 'Controesempio: se non usi la bandiera di interruzione, un array già ordinato di 10.000 elementi farà comunque 100 milioni di controlli inutili!'
      }
    ],
    solution: {
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let scambiato = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        scambiato = true;
      }
    }
    if (!scambiato) break;
  }
  return arr;
}`,
      explanation: 'Dopo ogni passata i, il massimo della porzione rimanente si stabilisce all\'indice corretto. Con l\'ottimizzazione della bandiera, il tempo nel caso migliore diventa O(n).',
      verificationQuestion: 'Perché il ciclo interno controlla j < n - 1 - i anziché j < n - 1?',
      verificationAnswer: 'Perché ad ogni passata i, gli ultimi i elementi sono già ordinati e collocati nella loro posizione definitiva, quindi non occorre ricontrollarli!'
    },
    tracingChallenge: {
      codeToTrace: 'const arr = [3, 1, 2]; if (arr[0] > arr[1]) { let t = arr[0]; arr[0] = arr[1]; arr[1] = t; }',
      input: [[3, 1, 2]],
      steps: [
        { step: 1, description: 'Confronto arr[0] (3) con arr[1] (1)', variables: { 'arr[0] > arr[1]': 'true' } },
        { step: 2, description: 'Salvataggio temporaneo t', variables: { 't': 3 } },
        { step: 3, description: 'Scambio valori completato', variables: { 'arr[0]': 1, 'arr[1]': 3, 'arr[2]': 2 } }
      ]
    }
  },
  {
    id: 'w5-e2',
    worldId: 5,
    order: 2,
    title: 'Selection Sort: Trova il Minimo e Scambia',
    slug: 'selection-sort',
    difficulty: 'Facile',
    concept: 'Selezione del minimo per ogni posizione da 0 a N - 1',
    story: 'In una biblioteca riorganizzi i libri per altezza. Ad ogni passo trovi il libro più basso tra quelli rimanenti e lo scambi con il libro nella prima posizione non ancora ordinata. Questo algoritmo minimizza il numero totale di scritture/scambi a esattamente O(n).',
    functionName: 'selectionSort',
    signature: 'function selectionSort(arr)',
    parameters: [{ name: 'arr', type: 'number[]', description: 'Array da ordinare' }],
    returnType: 'number[]',
    targetComplexity: 'O(n^2)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se arr = [64, 25, 12, 22, 11]: qual è il minimo assoluto? Con chi viene scambiato all\'inizio? Risultato: 11 scambiato con 64.',
      targetComplexity: 'O(n^2)'
    },
    starterCode: `function selectionSort(arr) {
  const n = arr.length;
  // Per ogni posizione i da 0 a n - 1:
  // cerca l'indice del valore minimo tra i e n - 1 e scambialo con arr[i]
  
  return arr;
}
`,
    tests: [
      { id: 'w5-e2-t1', input: [[64, 25, 12, 22, 11]], expected: [11, 12, 22, 25, 64], visible: true },
      { id: 'w5-e2-t2', input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], visible: true },
      { id: 'w5-e2-t3', input: [[]], expected: [], visible: true },
      { id: 'w5-e2-t4', input: [[7]], expected: [7], visible: true },
      { id: 'w5-e2-t5', input: [[3, 1, 3, 1, 2]], expected: [1, 1, 2, 3, 3], visible: true },
      { id: 'w5-e2-t6', input: [[-10, 0, -20, 30]], expected: [-20, -10, 0, 30], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Quale valore memorizzi per cercare il minimo: il valore numerico o il suo indice nell\'array?'
      },
      {
        level: 2,
        text: 'Memorizza minIdx = i. Con un secondo ciclo j da i + 1 a n - 1, se arr[j] < arr[minIdx] aggiorna minIdx = j. Alla fine del ciclo interno scambia arr[i] con arr[minIdx].'
      },
      {
        level: 3,
        text: 'Controesempio: se scambi appena trovi un elemento minore senza aspettare di aver finito il ciclo interno, farai molti più scambi del necessario perdendo la proprietà cardine del Selection Sort!'
      }
    ],
    solution: {
      code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}`,
      explanation: 'Selection sort esegue esattamente N - 1 scambi di memoria in totale (ottimo quando scrivere su disco/memoria flash è un\'operazione costosa). Confronti totali O(n²).',
      verificationQuestion: 'Selection Sort è un algoritmo stabile (preserva l\'ordine relativo di elementi duplicati)?',
      verificationAnswer: 'No, non è stabile per via dei salti a lunga distanza durante gli scambi (un elemento uguale può scavalcare il suo gemello)!'
    }
  },
  {
    id: 'w5-e3',
    worldId: 5,
    order: 3,
    title: 'Insertion Sort: Inserimento Come le Carte in Mano',
    slug: 'insertion-sort',
    difficulty: 'Medio',
    concept: 'Spostamento a destra degli elementi maggiori e inserimento in fessura',
    story: 'Immagina di giocare a carte: peschi una nuova carta alla volta e la infili nella posizione corretta nella tua mano già ordinata, facendo scivolare verso destra tutte le carte più alte. Implementa Insertion Sort.',
    functionName: 'insertionSort',
    signature: 'function insertionSort(carte)',
    parameters: [{ name: 'carte', type: 'number[]', description: 'Array di numeri' }],
    returnType: 'number[]',
    targetComplexity: 'O(n^2)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se carte = [12, 11, 13, 5, 6]: quando esamini 11, salvi 11, sposti 12 a destra e inserisci 11 all\'inizio. Risultato: [11, 12, 13, 5, 6].',
      targetComplexity: 'O(n^2)'
    },
    starterCode: `function insertionSort(carte) {
  // Parti da i = 1 (il primo elemento da solo è già una mano ordinata)
  // Fai scorrere indietro finché trovi la posizione esatta per carte[i]
  
  return carte;
}
`,
    tests: [
      { id: 'w5-e3-t1', input: [[12, 11, 13, 5, 6]], expected: [5, 6, 11, 12, 13], visible: true },
      { id: 'w5-e3-t2', input: [[4, 3, 2, 10, 12, 1, 5, 6]], expected: [1, 2, 3, 4, 5, 6, 10, 12], visible: true },
      { id: 'w5-e3-t3', input: [[]], expected: [], visible: true },
      { id: 'w5-e3-t4', input: [[99]], expected: [99], visible: true },
      { id: 'w5-e3-t5', input: [[2, 2, 1, 1]], expected: [1, 1, 2, 2], visible: true },
      { id: 'w5-e3-t6', input: [[1, 2, 3]], expected: [1, 2, 3], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Perché è fondamentale salvare il valore corrente in una variabile (es. const chiave = arr[i]) prima di iniziare a spostare gli elementi?'
      },
      {
        level: 2,
        text: 'Con un ciclo while (j >= 0 && arr[j] > chiave), sposta arr[j + 1] = arr[j] e decrementa j--. Poi posiziona arr[j + 1] = chiave.'
      },
      {
        level: 3,
        text: 'Controesempio: se non salvi la chiave, sovrascrivendo arr[j + 1] = arr[j] cancellerai per sempre il valore che stavi tentando di inserire!'
      }
    ],
    solution: {
      code: `function insertionSort(carte) {
  for (let i = 1; i < carte.length; i++) {
    const chiave = carte[i];
    let j = i - 1;
    while (j >= 0 && carte[j] > chiave) {
      carte[j + 1] = carte[j];
      j--;
    }
    carte[j + 1] = chiave;
  }
  return carte;
}`,
      explanation: 'Insertion Sort è estremamente efficiente per dataset piccoli o array "quasi ordinati" (tempo O(n)). È inoltre un algoritmo di ordinamento stabile e in-place.',
      verificationQuestion: 'Qual è la complessità temporale se l\'array di input è già completamente ordinato?',
      verificationAnswer: 'È O(n) lineare, perché il ciclo while interno termina immediatamente al primo controllo (carte[j] > chiave è falsa) per ogni carta!'
    }
  },
  {
    id: 'w5-e4',
    worldId: 5,
    order: 4,
    title: 'Merge Sort: Divide et Impera O(n log n)',
    slug: 'merge-sort-ricorsivo',
    difficulty: 'Difficile',
    concept: 'Dimezzamento ricorsivo e fusione ordinata',
    story: 'L\'archivio del ministero gestisce milioni di record fiscali. Gli algoritmi quadratici O(n²) non sono accettabili. Implementa Merge Sort: dividi a metà l\'array ricorsivamente fino a liste di 1 elemento, poi fondile a ritroso in ordine crescente.',
    functionName: 'mergeSort',
    signature: 'function mergeSort(arr)',
    parameters: [{ name: 'arr', type: 'number[]', description: 'Array da ordinare' }],
    returnType: 'number[]',
    targetComplexity: 'O(n log n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se arr = [4, 2, 1, 3]: metà sinistra [4, 2] -> [2, 4]; metà destra [1, 3] -> [1, 3]. Fondi [2, 4] e [1, 3] -> [1, 2, 3, 4].',
      targetComplexity: 'O(n log n)'
    },
    starterCode: `function mergeSort(arr) {
  // Caso base: se arr.length <= 1, l'array è già ordinato!
  // Dividi a metà con slice, chiama mergeSort su sinistra e destra, e fondi.
  
  return arr;
}
`,
    tests: [
      { id: 'w5-e4-t1', input: [[4, 2, 1, 3]], expected: [1, 2, 3, 4], visible: true },
      { id: 'w5-e4-t2', input: [[38, 27, 43, 3, 9, 82, 10]], expected: [3, 9, 10, 27, 38, 43, 82], visible: true },
      { id: 'w5-e4-t3', input: [[]], expected: [], visible: true },
      { id: 'w5-e4-t4', input: [[5]], expected: [5], visible: true },
      { id: 'w5-e4-t5', input: [[5, 1, 5, 1, 2]], expected: [1, 1, 2, 5, 5], visible: true },
      { id: 'w5-e4-t6', input: [[-5, -1, -10, 0]], expected: [-10, -5, -1, 0], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Qual è il caso base fondamentale per evitare che la ricorsione continui a dividere all\'infinito?'
      },
      {
        level: 2,
        text: 'Se arr.length <= 1 ritorna arr. Altrimenti trova mid = Math.floor(arr.length / 2). Ordina ricorsivamente left = mergeSort(arr.slice(0, mid)) e right = mergeSort(arr.slice(mid)). Poi fondili.'
      },
      {
        level: 3,
        text: 'Controesempio: se dimentichi di riversare gli elementi residui dell\'array non ancora esaurito alla fine del ciclo di fusione, perderai dei numeri per strada!'
      }
    ],
    solution: {
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Funzione di fusione
  const risultato = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      risultato.push(left[i]);
      i++;
    } else {
      risultato.push(right[j]);
      j++;
    }
  }
  while (i < left.length) {
    risultato.push(left[i]);
    i++;
  }
  while (j < right.length) {
    risultato.push(right[j]);
    j++;
  }
  return risultato;
}`,
      explanation: 'Dividendo l\'array in log2(n) livelli e spendendo tempo lineare O(n) per fondere i livelli, garantiamo la complessità ottimale O(n log n) in qualsiasi caso.',
      verificationQuestion: 'Qual è il costo di memoria aggiuntiva (spazio) di Merge Sort?',
      verificationAnswer: 'È O(n), perché richiede array ausiliari per memorizzare le porzioni durante la fase di fusione.'
    }
  },
  {
    id: 'w5-e5',
    worldId: 5,
    order: 5,
    title: 'Ordinare per Frequenza Decrescente',
    slug: 'ordina-per-frequenza',
    difficulty: 'Difficile',
    concept: 'Custom Comparator su mappa delle frequenze',
    story: 'In un portale e-commerce devi ordinare i codici prodotto visualizzati in modo che compaiano prima quelli più popolari (frequenza più alta). Se due codici hanno la stessa frequenza, ordinali in senso crescente per valore numerico.',
    functionName: 'ordinaPerFrequenza',
    signature: 'function ordinaPerFrequenza(numeri)',
    parameters: [{ name: 'numeri', type: 'number[]', description: 'Array di codici interi' }],
    returnType: 'number[]',
    targetComplexity: 'O(n log n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se numeri = [1, 1, 2, 2, 2, 3]: 2 compare 3 volte, 1 compare 2 volte, 3 compare 1 volta. Risultato: [2, 2, 2, 1, 1, 3].',
      targetComplexity: 'O(n log n)'
    },
    starterCode: `function ordinaPerFrequenza(numeri) {
  // 1. Conta le frequenze con un dizionario/Map
  // 2. Ordina l'array con una funzione di confronto personalizzata
  
  return numeri;
}
`,
    tests: [
      { id: 'w5-e5-t1', input: [[1, 1, 2, 2, 2, 3]], expected: [2, 2, 2, 1, 1, 3], visible: true },
      { id: 'w5-e5-t2', input: [[2, 3, 1, 3, 2]], expected: [2, 2, 3, 3, 1], visible: true },
      { id: 'w5-e5-t3', input: [[]], expected: [], visible: true },
      { id: 'w5-e5-t4', input: [[7]], expected: [7], visible: true },
      { id: 'w5-e5-t5', input: [[-1, 1, -6, 4, 5, -6, 1, 4, 1]], expected: [1, 1, 1, -6, -6, 4, 4, -1, 5], visible: true }
    ],
    hints: [
      {
        level: 1,
        text: 'Quale valore deve restituire la funzione di confronto di sort((a, b) => ...) se vogliamo che l\'elemento con frequenza maggiore preceda quello minore?'
      },
      {
        level: 2,
        text: 'Costruisci prima la mappa freq[num]. Poi usa numeri.sort((a, b) => { if (freq[b] !== freq[a]) return freq[b] - freq[a]; return a - b; }).'
      },
      {
        level: 3,
        text: 'Controesempio: ricalcolare la frequenza contando gli elementi con numeri.filter(x => x === a).length DENTRO il comparatore trasformerebbe l\'algoritmo in un pessimo O(n² log n)!'
      }
    ],
    solution: {
      code: `function ordinaPerFrequenza(numeri) {
  const freq = {};
  for (let i = 0; i < numeri.length; i++) {
    const num = numeri[i];
    freq[num] = (freq[num] || 0) + 1;
  }

  return [...numeri].sort((a, b) => {
    if (freq[b] !== freq[a]) {
      return freq[b] - freq[a]; // frequenza decrescente
    }
    return a - b; // a parità di frequenza, valore crescente
  });
}`,
      explanation: 'Pre-calcolando le frequenze in O(n) con un dizionario, ogni confronto del comparatore di sort() richiede tempo O(1). Complessità totale O(n log n).',
      verificationQuestion: 'Cosa succede se tutti gli elementi hanno frequenza 1 (tutti distinti)?',
      verificationAnswer: 'Il ramo freq[b] !== freq[a] non si attiva mai, e l\'array viene ordinato interamente per valore crescente grazie a return a - b!'
    }
  }
];
