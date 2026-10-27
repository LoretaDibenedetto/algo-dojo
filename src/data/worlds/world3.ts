import { Exercise } from '../../types';

export const world3Exercises: Exercise[] = [
  {
    id: 'w3-e1',
    worldId: 3,
    order: 1,
    title: 'La Trappola del Ciclo Doppio: Da O(n²) a O(n)',
    slug: 'coppia-somma-target',
    difficulty: 'Facile',
    concept: 'Hash Set Lookup O(1) invece di scansione annidata O(n)',
    story: 'In un portale di pagamenti online, devi verificare se in una lista di transazioni esistono due importi la cui somma sia esattamente uguale al valore "target". Con un doppio ciclo for annidato il server andrà in blocco per liste grandi. Trova la soluzione lineare O(n) restituendo true se esiste la coppia, altrimenti false.',
    functionName: 'haCoppiaSomma',
    signature: 'function haCoppiaSomma(numeri, target)',
    parameters: [
      { name: 'numeri', type: 'number[]', description: 'Array di numeri interi' },
      { name: 'target', type: 'number', description: 'Somma richiesta' }
    ],
    returnType: 'boolean',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se numeri = [2, 7, 11, 15] e target = 9: per il numero 2, qual è il complemento esatto che cerchi? Quanto vale target - numero?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function haCoppiaSomma(numeri, target) {
  // NON usare due cicli for annidati (sarebbe O(n^2))!
  // Usa un Set per memorizzare i numeri già visti.
  
  return false;
}
`,
    tests: [
      { id: 'w3-e1-t1', input: [[2, 7, 11, 15], 9], expected: true, visible: true },
      { id: 'w3-e1-t2', input: [[3, 2, 4], 6], expected: true, visible: true },
      { id: 'w3-e1-t3', input: [[1, 2, 3, 9], 8], expected: false, visible: true },
      { id: 'w3-e1-t4', input: [[], 10], expected: false, visible: true },
      { id: 'w3-e1-t5', input: [[5], 10], expected: false, visible: true },
      { id: 'w3-e1-t6', input: [[10, 20, 30, 40, 50, 60], 110], expected: true, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se stai esaminando il numero X, quale altro numero ti serve per fare target? Esiste una semplice formula di sottrazione.'
      },
      {
        level: 2,
        text: 'Crea un Set chiamato "visti". Per ogni numero x nell\'array, calcola complemento = target - x. Se visti.has(complemento) restituisci true, altrimenti visti.add(x).'
      },
      {
        level: 3,
        text: 'Controesempio: se numeri = [5] e target = 10, fare numeri.includes(target - 5) sullo stesso array troverebbe il 5 stesso, sommando il numero con se stesso! Il Set riempito passo-passo previene questo errore.'
      }
    ],
    solution: {
      code: `function haCoppiaSomma(numeri, target) {
  const visti = new Set();
  
  for (let i = 0; i < numeri.length; i++) {
    const x = numeri[i];
    const complemento = target - x;
    if (visti.has(complemento)) {
      return true;
    }
    visti.add(x);
  }
  
  return false;
}`,
      explanation: 'Scambiando un po\' di memoria (un Set) con il tempo, riduciamo i confronti da N² a N. Verificare la presenza in un Set costa O(1) anziché O(N).',
      verificationQuestion: 'Cosa impedisce a un numero di sommarsi con se stesso (es. [3], target 6)?',
      verificationAnswer: 'Il numero viene inserito in "visti" SOLO DOPO aver verificato se il suo complemento c\'è già. Quindi [3] non trova nessun 3 precedente e ritorna correttamente false!'
    },
    bigOQuiz: {
      question: 'Qual è la complessità temporale di due cicli for annidati che scorrono entrambi lo stesso array di N elementi?',
      codeSnippet: `for(let i=0; i<N; i++) {
  for(let j=0; j<N; j++) {
    operazione();
  }
}`,
      options: [
        { label: 'O(N)', complexity: 'O(n)', explanation: 'Sarebbe lineare solo se i cicli fossero consecutivi, non annidati!' },
        { label: 'O(N²)', complexity: 'O(n^2)', explanation: 'Esatto! Il ciclo interno si ripete N volte per ciascuna delle N iterazioni del ciclo esterno: N * N = N².' },
        { label: 'O(log N)', complexity: 'O(log n)', explanation: 'Log N dimezza lo spazio ad ogni iterazione, qui invece scorre elemento per elemento.' }
      ],
      correctIndex: 1
    }
  },
  {
    id: 'w3-e2',
    worldId: 3,
    order: 2,
    title: 'Trova il Numero Mancante in O(n)',
    slug: 'numero-mancante',
    difficulty: 'Facile',
    concept: 'Formula matematica di Gauss: N*(N+1)/2 vs doppio ciclo',
    story: 'Un server riceve N pacchetti numerati da 0 a N, ma uno di essi è andato perso durante la trasmissione. L\'array contiene quindi N numeri distinti nell\'intervallo [0, N]. Trova il numero mancante con una sola scansione O(n) e memoria extra O(1).',
    functionName: 'numeroMancante',
    signature: 'function numeroMancante(numeri)',
    parameters: [{ name: 'numeri', type: 'number[]', description: 'Array di numeri da 0 a N con un elemento mancante' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se N = 3 e l\'array è [3, 0, 1], la somma teorica di tutti i numeri da 0 a 3 quanto fa? Quanto fa la somma reale dei presenti? Qual è la differenza?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function numeroMancante(numeri) {
  const n = numeri.length;
  // Calcola la somma teorica da 0 a N con la formula di Gauss: n * (n + 1) / 2
  // Poi sottrai la somma effettiva degli elementi presenti nell'array!
  
}
`,
    tests: [
      { id: 'w3-e2-t1', input: [[3, 0, 1]], expected: 2, visible: true },
      { id: 'w3-e2-t2', input: [[0, 1]], expected: 2, visible: true },
      { id: 'w3-e2-t3', input: [[9,6,4,2,3,5,7,0,1]], expected: 8, visible: true },
      { id: 'w3-e2-t4', input: [[0]], expected: 1, visible: true },
      { id: 'w3-e2-t5', input: [[1]], expected: 0, visible: true }
    ],
    hints: [
      {
        level: 1,
        text: 'Se dovessi calcolare la somma dei primi 100 numeri senza fare un ciclo, quale formula useresti?'
      },
      {
        level: 2,
        text: 'La somma di tutti gli interi da 0 a n è data da sommaTeorica = (n * (n + 1)) / 2. Fai la somma reale di tutti i numeri nell\'array e fai la differenza.'
      },
      {
        level: 3,
        text: 'Controesempio: se usi numeri.indexOf(i) dentro un ciclo for, indexOf è a sua volta un ciclo! Ti ritroveresti con complessità quadratica O(n²).'
      }
    ],
    solution: {
      code: `function numeroMancante(numeri) {
  const n = numeri.length;
  const sommaTeorica = (n * (n + 1)) / 2;
  
  let sommaReale = 0;
  for (let i = 0; i < n; i++) {
    sommaReale += numeri[i];
  }
  
  return sommaTeorica - sommaReale;
}`,
      explanation: 'Sfruttando la formula di Gauss n*(n+1)/2 calcoliamo in tempo O(1) la somma attesa. Con una singola scansione O(n) dell\'array calcoliamo la somma reale: la loro differenza è esattamente l\'elemento assente!',
      verificationQuestion: 'Cosa succederebbe se l\'array contenesse numeri molto grandi e la somma superasse Number.MAX_SAFE_INTEGER?',
      verificationAnswer: 'In JavaScript i numeri oltre 2^53 - 1 perdono precisione. In quel caso si userebbe l\'operatore XOR (a ^ b) che non soffre mai di overflow numerico!'
    }
  },
  {
    id: 'w3-e3',
    worldId: 3,
    order: 3,
    title: 'Trova l\'Unico Elemento Singolo (XOR Magic)',
    slug: 'elemento-singolo-xor',
    difficulty: 'Medio',
    concept: 'Operatore bitwise XOR: a ^ a = 0 e a ^ 0 = a',
    story: 'Nel log di un sistema ad alta sicurezza ogni azione richiede un codice di apertura e un codice di chiusura identici. Un giorno un operatore ha dimenticato di chiudere la sessione: tutti i codici compaiono due volte tranne esattamente uno. Trovalo con tempo O(n) e memoria extra rigorosamente O(1).',
    functionName: 'trovaSingolo',
    signature: 'function trovaSingolo(numeri)',
    parameters: [{ name: 'numeri', type: 'number[]', description: 'Array dove ogni numero compare due volte tranne uno' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    starterCode: `function trovaSingolo(numeri) {
  // L'operatore bitwise XOR in JS è il simbolo ^
  // Ricorda: X ^ X = 0 e X ^ 0 = X
  let risultato = 0;
  
  return risultato;
}
`,
    tests: [
      { id: 'w3-e3-t1', input: [[2, 2, 1]], expected: 1, visible: true },
      { id: 'w3-e3-t2', input: [[4, 1, 2, 1, 2]], expected: 4, visible: true },
      { id: 'w3-e3-t3', input: [[1]], expected: 1, visible: true },
      { id: 'w3-e3-t4', input: [[99, 10, 99]], expected: 10, visible: true },
      { id: 'w3-e3-t5', input: [[7, 3, 5, 4, 5, 3, 4]], expected: 7, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Cosa succede quando fai l\'operazione XOR bit a bit tra due numeri identici in codice binario?'
      },
      {
        level: 2,
        text: 'Inizializza risultato = 0. Esegui uno XOR cumulativo con ogni elemento: risultato ^= numeri[i]. Tutti i duplicati si annulleranno a vicenda lasciando solo il singolo.'
      },
      {
        level: 3,
        text: 'Controesempio: usare una mappa di conteggio richiede O(n) memoria extra. L\'operatore XOR lavora in tempo O(n) ma con memoria extra O(1) reale.'
      }
    ],
    solution: {
      code: `function trovaSingolo(numeri) {
  let singolo = 0;
  for (let i = 0; i < numeri.length; i++) {
    singolo ^= numeri[i];
  }
  return singolo;
}`,
      explanation: 'L\'operazione XOR è commutativa e associativa: A ^ B ^ A = (A ^ A) ^ B = 0 ^ B = B. Tutti i numeri gemelli si azzerano spontaneamente lasciando l\'unico numero solitario!',
      verificationQuestion: 'Cosa succederebbe se l\'array fosse vuoto?',
      verificationAnswer: 'Ritorna 0, ma per contratto del problema l\'array contiene sempre almeno un elemento dispari.'
    }
  },
  {
    id: 'w3-e4',
    worldId: 3,
    order: 4,
    title: 'Fusione Ordinata Senza Riordinare da Zero',
    slug: 'fondi-array-ordinati',
    difficulty: 'Medio',
    concept: 'Due puntatori su array diversi: O(n + m) vs O((n+m) log(n+m))',
    story: 'Due filiali bancarie hanno già i propri clienti ordinati per codice identificativo in due array distinti. Devi unire le due liste in un unico grande array ordinato. Unire e fare .sort() finale costa O(K log K). Fallo con due puntatori in tempo lineare O(n + m).',
    functionName: 'fondiOrdinati',
    signature: 'function fondiOrdinati(arrA, arrB)',
    parameters: [
      { name: 'arrA', type: 'number[]', description: 'Primo array ordinato' },
      { name: 'arrB', type: 'number[]', description: 'Secondo array ordinato' }
    ],
    returnType: 'number[]',
    targetComplexity: 'O(n)',
    starterCode: `function fondiOrdinati(arrA, arrB) {
  const risultato = [];
  let i = 0; // puntatore per arrA
  let j = 0; // puntatore per arrB
  
  // Confronta arrA[i] con arrB[j] e inserisci il minore
  
  return risultato;
}
`,
    tests: [
      { id: 'w3-e4-t1', input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6], visible: true },
      { id: 'w3-e4-t2', input: [[], [1, 2, 3]], expected: [1, 2, 3], visible: true },
      { id: 'w3-e4-t3', input: [[10, 20], []], expected: [10, 20], visible: true },
      { id: 'w3-e4-t4', input: [[1, 2, 3], [4, 5]], expected: [1, 2, 3, 4, 5], visible: true },
      { id: 'w3-e4-t5', input: [[2], [1]], expected: [1, 2], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Dato che entrambi gli array sono già ordinati, dove si trova il numero più piccolo in assoluto?'
      },
      {
        level: 2,
        text: 'Mentre i < arrA.length e j < arrB.length, prendi il minore e incrementa il suo puntatore. Alla fine riversa gli elementi rimasti dell\'array non ancora esaurito.'
      },
      {
        level: 3,
        text: 'Controesempio: fare [...arrA, ...arrB].sort((a,b)=>a-b) funziona, ma spreca tempo O(k log k) ignorando il preziosissimo fatto che i due array erano già ordinati!'
      }
    ],
    solution: {
      code: `function fondiOrdinati(arrA, arrB) {
  const risultato = [];
  let i = 0;
  let j = 0;
  
  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] <= arrB[j]) {
      risultato.push(arrA[i]);
      i++;
    } else {
      risultato.push(arrB[j]);
      j++;
    }
  }
  
  while (i < arrA.length) {
    risultato.push(arrA[i]);
    i++;
  }
  
  while (j < arrB.length) {
    risultato.push(arrB[j]);
    j++;
  }
  
  return risultato;
}`,
      explanation: 'Questo è esattamente il cuore della procedura di fusione (merge) del Merge Sort. Ciascun elemento dei due array viene esaminato una volta sola: O(n + m) lineare.',
      verificationQuestion: 'Cosa succederebbe se uno dei due array finisse molto prima dell\'altro (es. [1, 2] e [10, 20, 30, 40])?',
      verificationAnswer: 'Il primo while si interrompe appena finisce il primo array; i due successivi cicli while raccolgono e appendono tutti i restanti elementi del secondo in ordine!'
    }
  }
];
