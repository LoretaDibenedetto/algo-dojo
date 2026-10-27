import { Exercise } from '../../types';

export const world4Exercises: Exercise[] = [
  {
    id: 'w4-e1',
    worldId: 4,
    order: 1,
    title: 'Il Registro Ordini: Ricerca Lineare',
    slug: 'ricerca-lineare',
    difficulty: 'Facile',
    concept: 'Scansione sequenziale e stop anticipato',
    story: 'In un magazzino non automatizzato, i faldoni degli ordini cartacei sono impilati senza un ordine preciso. Il responsabile ti chiede di trovare l\'indice del primo faldone con il codice ID richiesto. Se il faldone non è presente o la lista è vuota, restituisci -1.',
    functionName: 'trovaOrdine',
    signature: 'function trovaOrdine(faldoni, idCercato)',
    parameters: [
      { name: 'faldoni', type: 'any[]', description: 'Array di identificativi o codici' },
      { name: 'idCercato', type: 'any', description: 'ID da localizzare' }
    ],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se faldoni = ["ORD-10", "ORD-42", "ORD-99"] e idCercato = "ORD-42": quale indice devi restituire? Quando puoi fermarti senza controllare "ORD-99"?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function trovaOrdine(faldoni, idCercato) {
  // Scansiona l'array dall'inizio: appena trovi l'elemento ritorna il suo indice.
  // Se arrivi alla fine senza averlo trovato, cosa restituisci?
  
}
`,
    tests: [
      { id: 'w4-e1-t1', input: [['ORD-10', 'ORD-42', 'ORD-99'], 'ORD-42'], expected: 1, visible: true },
      { id: 'w4-e1-t2', input: [[10, 20, 30, 40], 50], expected: -1, visible: true },
      { id: 'w4-e1-t3', input: [[], 'QUALSIASI'], expected: -1, visible: true },
      { id: 'w4-e1-t4', input: [[7], 7], expected: 0, visible: true },
      { id: 'w4-e1-t5', input: [[7], 9], expected: -1, visible: true },
      { id: 'w4-e1-t6', input: [[5, 2, 5, 8], 5], expected: 0, visible: false },
      { id: 'w4-e1-t7', input: [['A', 'B', 'C', 'D', 'E'], 'E'], expected: 4, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se l\'array non è ordinato, esiste una scorciatoia o devi per forza guardare gli elementi uno a uno?'
      },
      {
        level: 2,
        text: 'Itera con un indice i da 0 a faldoni.length - 1. Se faldoni[i] === idCercato, restituisci immediatamente i. Se il ciclo termina senza ritorni, restituisci -1 fuori dal ciclo.'
      },
      {
        level: 3,
        text: 'Controesempio: non restituire -1 dentro il ramo else del ciclo! Altrimenti, se il primissimo elemento non coincide, la funzione uscirebbe subito dicendo che non c\'è.'
      }
    ],
    solution: {
      code: `function trovaOrdine(faldoni, idCercato) {
  for (let i = 0; i < faldoni.length; i++) {
    if (faldoni[i] === idCercato) {
      return i;
    }
  }
  return -1;
}`,
      explanation: 'La ricerca lineare è l\'unico approccio applicabile a collezioni disordinate. Nel caso peggiore esamina tutti gli N elementi: tempo O(n), memoria extra O(1).',
      verificationQuestion: 'Cosa succede se ci sono più elementi duplicati identici a idCercato nell\'array?',
      verificationAnswer: 'Viene restituito l\'indice della prima occorrenza incontrata da sinistra, poiché il return interrompe subito l\'esecuzione del ciclo!'
    },
    tracingChallenge: {
      codeToTrace: 'const arr = [10, 30, 20]; const target = 30; for(let i=0; i<arr.length; i++) { if(arr[i]===target) return i; }',
      input: [[10, 30, 20], 30],
      steps: [
        { step: 1, description: 'Iterazione i=0: confronto arr[0] con target', variables: { 'i': 0, 'arr[0]': 10, 'match': 'false' } },
        { step: 2, description: 'Iterazione i=1: confronto arr[1] con target', variables: { 'i': 1, 'arr[1]': 30, 'match': 'true' } },
        { step: 3, description: 'Return valore indice', variables: { 'risultato': 1 } }
      ]
    }
  },
  {
    id: 'w4-e2',
    worldId: 4,
    order: 2,
    title: 'L\'Archivio Cronologico: Ricerca Binaria Classica',
    slug: 'ricerca-binaria-classica',
    difficulty: 'Medio',
    concept: 'Dimezzamento dello spazio di ricerca O(log n)',
    story: 'L\'archivio dei bonifici memorizza i codici transazione già ordinati in modo strettamente crescente. Devi verificare se una transazione è presente restituendo il suo indice, o -1 se assente. La lista contiene milioni di righe: la ricerca lineare manderebbe il server in timeout!',
    functionName: 'ricercaBinaria',
    signature: 'function ricercaBinaria(transazioni, target)',
    parameters: [
      { name: 'transazioni', type: 'number[]', description: 'Array ordinato di numeri crescenti' },
      { name: 'target', type: 'number', description: 'Numero transazione da trovare' }
    ],
    returnType: 'number',
    targetComplexity: 'O(log n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se transazioni = [10, 20, 30, 40, 50] e target = 40: left=0, right=4. Quanto vale mid? transazioni[mid] vale 30: il target è a destra o a sinistra di mid?',
      targetComplexity: 'O(log n)'
    },
    starterCode: `function ricercaBinaria(transazioni, target) {
  let left = 0;
  let right = transazioni.length - 1;

  // Calcola il punto medio senza dimenticare Math.floor!
  // Condizione del ciclo: left <= right oppure left < right?
  
  return -1;
}
`,
    tests: [
      { id: 'w4-e2-t1', input: [[10, 20, 30, 40, 50], 40], expected: 3, visible: true },
      { id: 'w4-e2-t2', input: [[-5, 0, 3, 9, 12], 9], expected: 3, visible: true },
      { id: 'w4-e2-t3', input: [[1, 2, 3, 4], 99], expected: -1, visible: true },
      { id: 'w4-e2-t4', input: [[], 5], expected: -1, visible: true },
      { id: 'w4-e2-t5', input: [[42], 42], expected: 0, visible: true },
      { id: 'w4-e2-t6', input: [[42], 10], expected: -1, visible: true },
      { id: 'w4-e2-t7', input: [[1, 3, 5, 7, 9, 11, 13, 15, 17], 1], expected: 0, visible: false },
      { id: 'w4-e2-t8', input: [[1, 3, 5, 7, 9, 11, 13, 15, 17], 17], expected: 8, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se l\'elemento a metà è più piccolo del target, ha senso continuare a cercare nella metà sinistra?'
      },
      {
        level: 2,
        text: 'Usa while (left <= right). Calcola mid = Math.floor((left + right) / 2). Se arr[mid] === target ritorna mid; se arr[mid] < target imposta left = mid + 1; altrimenti right = mid - 1.'
      },
      {
        level: 3,
        text: 'Controesempio: se usi while (left < right) invece di <=, quando l\'array ha 1 solo elemento o l\'intervallo si riduce a left === right, il ciclo salterà il controllo e restituirà erroneamente -1!'
      }
    ],
    solution: {
      code: `function ricercaBinaria(transazioni, target) {
  let left = 0;
  let right = transazioni.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (transazioni[mid] === target) {
      return mid;
    } else if (transazioni[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
      explanation: 'A ogni iterazione l\'intervallo di ricerca si dimezza esattamente. Per un milione di elementi bastano al massimo 20 confronti: complessità temporale O(log n), memoria O(1).',
      verificationQuestion: 'Perché aggiorniamo con left = mid + 1 e right = mid - 1 invece che con mid?',
      verificationAnswer: 'Perché l\'elemento mid è già stato verificato (sappiamo che non è uguale a target); includerlo nuovamente causerebbe un loop infinito quando left e right sono adiacenti!'
    }
  },
  {
    id: 'w4-e3',
    worldId: 4,
    order: 3,
    title: 'Punto di Inserimento Ordinato (Bisect Left)',
    slug: 'punto-inserimento-ordinato',
    difficulty: 'Medio',
    concept: 'Lower bound: trovare la posizione corretta per mantenere l\'ordine',
    story: 'In un motore di prenotazione aerea, i prezzi dei biglietti sono memorizzati in ordine crescente. Quando un utente imposta un filtro di budget X, il sistema deve trovare l\'indice del primo prezzo >= X (oppure la posizione dove inserire X preservando l\'ordinamento). Se tutti i prezzi sono minori di X, l\'indice è pari alla lunghezza dell\'array.',
    functionName: 'cercaPosizioneInserimento',
    signature: 'function cercaPosizioneInserimento(prezzi, target)',
    parameters: [
      { name: 'prezzi', type: 'number[]', description: 'Array ordinato crescente' },
      { name: 'target', type: 'number', description: 'Valore soglia da collocare' }
    ],
    returnType: 'number',
    targetComplexity: 'O(log n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se prezzi = [10, 30, 50, 70] e target = 35: tra quali indici deve cadere 35? Quale indice prenderà?',
      targetComplexity: 'O(log n)'
    },
    starterCode: `function cercaPosizioneInserimento(prezzi, target) {
  let left = 0;
  let right = prezzi.length - 1;
  
  // Trova l'indice del primo elemento >= target in O(log n)
  
}
`,
    tests: [
      { id: 'w4-e3-t1', input: [[10, 30, 50, 70], 35], expected: 2, visible: true },
      { id: 'w4-e3-t2', input: [[1, 3, 5, 6], 5], expected: 2, visible: true },
      { id: 'w4-e3-t3', input: [[1, 3, 5, 6], 2], expected: 1, visible: true },
      { id: 'w4-e3-t4', input: [[1, 3, 5, 6], 7], expected: 4, visible: true },
      { id: 'w4-e3-t5', input: [[1, 3, 5, 6], 0], expected: 0, visible: true },
      { id: 'w4-e3-t6', input: [[], 10], expected: 0, visible: true },
      { id: 'w4-e3-t7', input: [[5], 3], expected: 0, visible: false },
      { id: 'w4-e3-t8', input: [[5], 8], expected: 1, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Cosa rappresenta il valore finale della variabile left quando il ciclo della ricerca binaria termina senza trovare una corrispondenza esatta?'
      },
      {
        level: 2,
        text: 'Esegui il ciclo while (left <= right). Se prezzi[mid] === target ritorna mid. Se prezzi[mid] < target, left = mid + 1; altrimenti right = mid - 1. Quando il ciclo termina, left indica la posizione esatta.'
      },
      {
        level: 3,
        text: 'Controesempio: fare un ciclo for per scorrere prezzi e fare if (prezzi[i] >= target) return i funziona, ma è O(n). Con array grandi il test di complessità fallirà.'
      }
    ],
    solution: {
      code: `function cercaPosizioneInserimento(prezzi, target) {
  let left = 0;
  let right = prezzi.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (prezzi[mid] === target) {
      return mid;
    } else if (prezzi[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
      explanation: 'Quando il ciclo termina con left > right, la variabile left punta esattamente al primo elemento che risulta maggiore di target (oppure a length se target supera tutti gli elementi). Tempo O(log n).',
      verificationQuestion: 'Cosa restituisce la funzione se l\'array è vuoto [] e cerchiamo il target 10?',
      verificationAnswer: 'Restituisce 0, perché left è 0 e right è -1, il ciclo non parte neanche e left=0 è la posizione corretta dove inserire l\'elemento!'
    }
  },
  {
    id: 'w4-e4',
    worldId: 4,
    order: 4,
    title: 'Prima e Ultima Occorrenza con Duplicati',
    slug: 'prima-ultima-occorrenza',
    difficulty: 'Difficile',
    concept: 'Ricerca binaria modificata: continuare a stringere a sinistra o destra',
    story: 'In un log di audit finanziario, lo stesso codice di errore può comparire molteplici volte consecutive perché i dati sono ordinati per tipologia di errore. Devi trovare l\'intervallo [primoIndice, ultimoIndice] in cui compare il codice cercato in tempo O(log n). Se il codice non è presente o la lista è vuota, restituisci [-1, -1].',
    functionName: 'intervalloOccorrenze',
    signature: 'function intervalloOccorrenze(logErrori, target)',
    parameters: [
      { name: 'logErrori', type: 'number[]', description: 'Array ordinato con possibili duplicati' },
      { name: 'target', type: 'number', description: 'Codice errore da individuare' }
    ],
    returnType: 'number[]',
    targetComplexity: 'O(log n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se logErrori = [5, 7, 7, 8, 8, 10] e target = 8: quali sono il primo e l\'ultimo indice in cui compare 8? Risultato: [3, 4].',
      targetComplexity: 'O(log n)'
    },
    starterCode: `function intervalloOccorrenze(logErrori, target) {
  // Scrivi una logica di ricerca binaria che trova l'estremo sinistro
  // e una seconda che trova l'estremo destro!
  
  return [-1, -1];
}
`,
    tests: [
      { id: 'w4-e4-t1', input: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4], visible: true },
      { id: 'w4-e4-t2', input: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1], visible: true },
      { id: 'w4-e4-t3', input: [[], 0], expected: [-1, -1], visible: true },
      { id: 'w4-e4-t4', input: [[1], 1], expected: [0, 0], visible: true },
      { id: 'w4-e4-t5', input: [[2, 2, 2, 2, 2], 2], expected: [0, 4], visible: true },
      { id: 'w4-e4-t6', input: [[1, 2, 3, 4, 5], 3], expected: [2, 2], visible: false },
      { id: 'w4-e4-t7', input: [[1, 2, 2, 3], 4], expected: [-1, -1], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se una classica ricerca binaria trova arr[mid] === target, ti puoi fermare subito o potrebbero esserci altri target prima o dopo mid?'
      },
      {
        level: 2,
        text: 'Quando trovi arr[mid] === target, per cercare la prima occorrenza salva l\'indice in una variabile e continua a cercare a sinistra impostando right = mid - 1. Per l\'ultima occorrenza, fai left = mid + 1.'
      },
      {
        level: 3,
        text: 'Controesempio: trovare un target con ricerca binaria e poi espandersi a sinistra e a destra con un ciclo while locale può degradare a O(n) nel caso in cui l\'array sia composto da un milione di elementi tutti identici a target!'
      }
    ],
    solution: {
      code: `function intervalloOccorrenze(logErrori, target) {
  function trovaLimite(cercaPrimo) {
    let left = 0;
    let right = logErrori.length - 1;
    let risultato = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (logErrori[mid] === target) {
        risultato = mid;
        if (cercaPrimo) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (logErrori[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return risultato;
  }

  const primo = trovaLimite(true);
  if (primo === -1) return [-1, -1];
  const ultimo = trovaLimite(false);
  return [primo, ultimo];
}`,
      explanation: 'Eseguendo due distinte ricerche binarie modificate, troviamo entrambi gli estremi senza mai scandire linearmente i duplicati. Complessità rigidamente O(log n).',
      verificationQuestion: 'Cosa restituisce la funzione se l\'array contiene un solo elemento che corrisponde a target (es. [1], target 1)?',
      verificationAnswer: 'Restituisce [0, 0], perché sia la prima sia l\'ultima occorrenza convergono sull\'indice 0!'
    }
  },
  {
    id: 'w4-e5',
    worldId: 4,
    order: 5,
    title: 'Il Picco nella Serie Temporale',
    slug: 'trova-elemento-picco',
    difficulty: 'Difficile',
    concept: 'Ricerca binaria su array non ordinato (gradiente locale)',
    story: 'Un sensore IoT registra una serie di misurazioni di pressione. Si definisce "picco" un elemento che è strettamente maggiore dei suoi vicini immediati (per gli estremi, conta solo l\'unico vicino presente). L\'array non è ordinato, ma gli elementi adiacenti sono sempre distinti. Trova l\'indice di un QUALSIASI elemento picco in tempo O(log n). Se l\'array è vuoto, restituisci -1.',
    functionName: 'trovaPicco',
    signature: 'function trovaPicco(misurazioni)',
    parameters: [{ name: 'misurazioni', type: 'number[]', description: 'Array di misurazioni' }],
    returnType: 'number',
    targetComplexity: 'O(log n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se misurazioni = [1, 2, 3, 1]: all\'indice 2 c\'è il valore 3, che è > 2 e > 1. È un picco! Qual è il suo indice? Risultato: 2.',
      targetComplexity: 'O(log n)'
    },
    starterCode: `function trovaPicco(misurazioni) {
  if (misurazioni.length === 0) return -1;
  let left = 0;
  let right = misurazioni.length - 1;

  // Confronta misurazioni[mid] con il vicino misurazioni[mid + 1]
  
  return left;
}
`,
    tests: [
      { id: 'w4-e5-t1', input: [[1, 2, 3, 1]], expected: 2, visible: true },
      { id: 'w4-e5-t2', input: [[1, 2, 1, 3, 5, 6, 4]], expected: 5, visible: true },
      { id: 'w4-e5-t3', input: [[10]], expected: 0, visible: true },
      { id: 'w4-e5-t4', input: [[1, 2]], expected: 1, visible: true },
      { id: 'w4-e5-t5', input: [[2, 1]], expected: 0, visible: true },
      { id: 'w4-e5-t6', input: [[]], expected: -1, visible: true },
      { id: 'w4-e5-t7', input: [[1, 3, 5, 7, 9]], expected: 4, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se ti trovi a metà strada e il valore alla tua destra è più alto del tuo, in quale direzione è garantito che esista una vetta/picco?'
      },
      {
        level: 2,
        text: 'Se misurazioni[mid] < misurazioni[mid + 1], stai salendo una collina: un picco si troverà sicuramente a destra, quindi left = mid + 1. Altrimenti right = mid.'
      },
      {
        level: 3,
        text: 'Controesempio: una scansione da 0 a N con confronto tra vicini trova un picco ma richiede tempo O(n). Per array con milioni di sensori la ricerca binaria sul gradiente impiega solo 20 passi!'
      }
    ],
    solution: {
      code: `function trovaPicco(misurazioni) {
  if (misurazioni.length === 0) return -1;
  let left = 0;
  let right = misurazioni.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (misurazioni[mid] < misurazioni[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}`,
      explanation: 'Anche senza ordinamento globale, il gradiente locale tra mid e mid + 1 ci dice dove la sequenza cresce. Poiché i valori non sono infiniti, seguire la salita garantisce di incontrare un picco locale in tempo O(log n).',
      verificationQuestion: 'Cosa succede se l\'array ha un solo elemento (es. [10])?',
      verificationAnswer: 'left=0 e right=0, la condizione left < right è falsa in partenza e la funzione ritorna subito left=0, che è per definizione il picco isolato!'
    }
  }
];
