import { Exercise } from '../../types';

export const world6Exercises: Exercise[] = [
  {
    id: 'w6-e1',
    worldId: 6,
    order: 1,
    title: 'Rilevamento Duplicati Istantaneo in O(n)',
    slug: 'contiene-duplicati',
    difficulty: 'Facile',
    concept: 'Lookup e memorizzazione in un Set O(1)',
    story: 'In un sistema di registrazione utenti, devi verificare se in una lista di token di sessione esistono duplicati. Con un doppio ciclo for annidato l\'API impiegherebbe secondi. Verifica se un qualsiasi valore compare almeno due volte restituendo true, oppure false se tutti gli elementi sono distinti. Se l\'array ha meno di 2 elementi, restituisci false.',
    functionName: 'haDuplicati',
    signature: 'function haDuplicati(tokenList)',
    parameters: [{ name: 'tokenList', type: 'any[]', description: 'Array di identificativi' }],
    returnType: 'boolean',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se tokenList = [1, 2, 3, 1]: inserisci in un Set [1, 2, 3]. Quando incontri di nuovo 1, il Set ce l\'ha già? Risultato: true.',
      targetComplexity: 'O(n)'
    },
    starterCode: `function haDuplicati(tokenList) {
  // Usa un Set per memorizzare gli elementi già incontrati.
  // Appena trovi un elemento già presente nel Set, ritorna subito true!
  
  return false;
}
`,
    tests: [
      { id: 'w6-e1-t1', input: [[1, 2, 3, 1]], expected: true, visible: true },
      { id: 'w6-e1-t2', input: [[1, 2, 3, 4]], expected: false, visible: true },
      { id: 'w6-e1-t3', input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true, visible: true },
      { id: 'w6-e1-t4', input: [[]], expected: false, visible: true },
      { id: 'w6-e1-t5', input: [[42]], expected: false, visible: true },
      { id: 'w6-e1-t6', input: [['a', 'b', 'c', 'd']], expected: false, visible: false },
      { id: 'w6-e1-t7', input: [['sessione1', 'sessione2', 'sessione1']], expected: true, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Qual è il tempo di accesso medio per verificare se una chiave esiste in un Set di JavaScript?'
      },
      {
        level: 2,
        text: 'Crea const visti = new Set(). Scorri gli elementi: se visti.has(x) ritorna true, altrimenti fai visti.add(x). Se il ciclo finisce, ritorna false.'
      },
      {
        level: 3,
        text: 'Controesempio: fare tokenList.indexOf(tokenList[i]) !== i costa O(n) per ogni iterazione, degradando l\'algoritmo a O(n²).'
      }
    ],
    solution: {
      code: `function haDuplicati(tokenList) {
  const visti = new Set();
  for (let i = 0; i < tokenList.length; i++) {
    const item = tokenList[i];
    if (visti.has(item)) {
      return true;
    }
    visti.add(item);
  }
  return false;
}`,
      explanation: 'Grazie alla tabella hash interna del Set, ogni operazione di verifica has() e inserimento add() richiede tempo O(1). L\'intero array viene controllato in tempo lineare O(n).',
      verificationQuestion: 'Cosa restituirebbe il confronto new Set(tokenList).size !== tokenList.length?',
      verificationAnswer: 'Restituirebbe lo stesso risultato booleano corretto, ma la soluzione con ciclo si ferma al primo duplicato (early exit) senza dover inserire tutti gli N elementi nel Set!'
    },
    tracingChallenge: {
      codeToTrace: 'const s = new Set(); s.add(10); const exists = s.has(10); const missing = s.has(20);',
      input: [[10]],
      steps: [
        { step: 1, description: 'Aggiunta elemento 10 nel Set', variables: { 's.size': 1 } },
        { step: 2, description: 'Verifica esistenza 10', variables: { 'exists': 'true' } },
        { step: 3, description: 'Verifica esistenza 20', variables: { 'missing': 'false' } }
      ]
    }
  },
  {
    id: 'w6-e2',
    worldId: 6,
    order: 2,
    title: 'Intersezione di Due Liste senza Duplicati',
    slug: 'intersezione-due-array',
    difficulty: 'Facile',
    concept: 'Operazioni insiemistiche con Set: intersezione O(n + m)',
    story: 'Due database contengono liste di ID clienti che hanno acquistato in due negozi diversi. Trova gli ID dei clienti che hanno acquistato in entrambi i negozi. La risposta non deve contenere duplicati (ogni ID presente al massimo una volta). Se non ci sono clienti in comune o un array è vuoto, restituisci [].',
    functionName: 'intersezioneClienti',
    signature: 'function intersezioneClienti(negozioA, negozioB)',
    parameters: [
      { name: 'negozioA', type: 'number[]', description: 'Prima lista di ID' },
      { name: 'negozioB', type: 'number[]', description: 'Seconda lista di ID' }
    ],
    returnType: 'number[]',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se negozioA = [1, 2, 2, 1] e negozioB = [2, 2]: quali numeri sono presenti in entrambi? Risultato: [2].',
      targetComplexity: 'O(n)'
    },
    starterCode: `function intersezioneClienti(negozioA, negozioB) {
  // Trasforma uno dei due array in un Set per lookup O(1)
  // Raccogli gli elementi comuni senza duplicare il risultato
  
  return [];
}
`,
    tests: [
      { id: 'w6-e2-t1', input: [[1, 2, 2, 1], [2, 2]], expected: [2], visible: true },
      { id: 'w6-e2-t2', input: [[4, 9, 5], [9, 4, 9, 8, 4]], expected: [9, 4], visible: true }, // [9, 4] o [4, 9] entrambi validi
      { id: 'w6-e2-t3', input: [[], [1, 2, 3]], expected: [], visible: true },
      { id: 'w6-e2-t4', input: [[1, 2, 3], []], expected: [], visible: true },
      { id: 'w6-e2-t5', input: [[1, 2, 3], [4, 5, 6]], expected: [], visible: true },
      { id: 'w6-e2-t6', input: [[7], [7]], expected: [7], visible: true },
      { id: 'w6-e2-t7', input: [[10, 20, 30], [20]], expected: [20], visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se trasformi negozioA in un Set, quanto costa verificare se un elemento di negozioB è presente?'
      },
      {
        level: 2,
        text: 'Crea const setA = new Set(negozioA) e const ris = new Set(). Per ogni elemento di negozioB, se setA.has(x) fai ris.add(x). Alla fine ritorna Array.from(ris).'
      },
      {
        level: 3,
        text: 'Controesempio: se usi negozioA.includes(x) dentro un ciclo for su negozioB, l\'inclusione costa O(N) ad ogni giro: N * M operazioni totali anziché N + M!'
      }
    ],
    solution: {
      code: `function intersezioneClienti(negozioA, negozioB) {
  const setA = new Set(negozioA);
  const risultato = new Set();

  for (let i = 0; i < negozioB.length; i++) {
    const item = negozioB[i];
    if (setA.has(item)) {
      risultato.add(item);
    }
  }

  return Array.from(risultato);
}`,
      explanation: 'Convertire un array in un Set costa O(N). Scorrere il secondo array verificando la presenza richiede M controlli da O(1). Tempo totale O(N + M).',
      verificationQuestion: 'Cosa impedisce a un ID che compare 5 volte in negozioB di essere inserito 5 volte nel risultato?',
      verificationAnswer: 'L\'uso di risultato come Set()! L\'operazione risultato.add(item) ignora automaticamente gli inserimenti di elementi già presenti.'
    }
  },
  {
    id: 'w6-e3',
    worldId: 6,
    order: 3,
    title: 'Raggruppare Anagrammi (Group Anagrams)',
    slug: 'raggruppa-anagrammi',
    difficulty: 'Medio',
    concept: 'Hash Map con chiavi normalizzate (chiave = parola ordinata)',
    story: 'In un motore linguistico devi catalogare un vocabolario raggruppando insieme tutte le parole che sono anagrammi tra loro (es. ["eat", "tea", "ate"]). Restituisci una matrice in cui ogni riga contiene un gruppo di anagrammi. Se l\'array è vuoto, restituisci [].',
    functionName: 'raggruppaAnagrammi',
    signature: 'function raggruppaAnagrammi(parole)',
    parameters: [{ name: 'parole', type: 'string[]', description: 'Array di parole' }],
    returnType: 'string[][]',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se parole = ["eat", "tea", "tan", "ate", "nat", "bat"]: ordina le lettere di ogni parola. "eat" -> "aet", "tea" -> "aet". Quanti gruppi distinti ottieni?',
      targetComplexity: 'O(n)'
    },
    starterCode: `function raggruppaAnagrammi(parole) {
  // Usa una Map o un oggetto {} con chiave la parola con lettere ordinate
  // es: "aet" => ["eat", "tea", "ate"]
  
  return [];
}
`,
    tests: [
      { 
        id: 'w6-e3-t1', 
        input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], 
        expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']], 
        visible: true 
      },
      { id: 'w6-e3-t2', input: [['']], expected: [['']], visible: true },
      { id: 'w6-e3-t3', input: [['a']], expected: [['a']], visible: true },
      { id: 'w6-e3-t4', input: [[]], expected: [], visible: true },
      { id: 'w6-e3-t5', input: [['roma', 'amor', 'mora']], expected: [['roma', 'amor', 'mora']], visible: true }
    ],
    hints: [
      {
        level: 1,
        text: 'Cosa hanno ESATTAMENTE in comune due parole che sono anagrammi se ordini alfabeticamente le loro lettere?'
      },
      {
        level: 2,
        text: 'Per ogni parola, calcola const chiave = parola.split("").sort().join(""). Usa un oggetto mappa[chiave] = mappa[chiave] || [] e fai mappa[chiave].push(parola). Ritorna Object.values(mappa).'
      },
      {
        level: 3,
        text: 'Controesempio: confrontare ogni coppia di parole tra loro per verificare se sono anagrammi richiede tempo quadratico O(n² * K). Con la chiave nella Hash Map il raggruppamento è lineare nel numero di parole!'
      }
    ],
    solution: {
      code: `function raggruppaAnagrammi(parole) {
  const mappa = {};

  for (let i = 0; i < parole.length; i++) {
    const p = parole[i];
    const chiave = p.split('').sort().join('');
    if (!mappa[chiave]) {
      mappa[chiave] = [];
    }
    mappa[chiave].push(p);
  }

  return Object.values(mappa);
}`,
      explanation: 'Tutti gli anagrammi convergono univocamente sulla stessa forma canonica (la stringa con caratteri ordinati). Usando questa forma come chiave di un dizionario, il raggruppamento avviene in un unico passaggio.',
      verificationQuestion: 'Cosa succede per parole composte da una sola lettera come "a"?',
      verificationAnswer: 'La chiave calcolata è "a" stessa, e viene inserita in un gruppo monoelemento [["a"]] senza alcun problema!'
    }
  },
  {
    id: 'w6-e4',
    worldId: 6,
    order: 4,
    title: 'Sottoarray a Somma K (Subarray Sum Equals K)',
    slug: 'sottoarray-somma-k',
    difficulty: 'Difficile',
    concept: 'Prefix Sums con Hash Map delle frequenze O(n)',
    story: 'In un sistema contabile che registra movimenti positivi (incassi) e negativi (uscite), devi contare quanti sottoarray continui di transazioni hanno una somma totale esattamente pari a K. Con due cicli annidati il calcolo è O(n²). Implementa la soluzione lineare O(n) con le somme prefisse.',
    functionName: 'contaSottoarraySommaK',
    signature: 'function contaSottoarraySommaK(numeri, k)',
    parameters: [
      { name: 'numeri', type: 'number[]', description: 'Array di interi positivi e negativi' },
      { name: 'k', type: 'number', description: 'Somma target cercata' }
    ],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se numeri = [1, 1, 1] e k = 2: quali porzioni continue sommano a 2? numeri[0..1] e numeri[1..2]. Totale: 2 sottoarray.',
      targetComplexity: 'O(n)'
    },
    starterCode: `function contaSottoarraySommaK(numeri, k) {
  // Usa una mappa delle somme cumulative (somma prefissa)
  // Inizializza la mappa con somma 0 vista 1 volta: mappa[0] = 1
  let conteggio = 0;
  
  return conteggio;
}
`,
    tests: [
      { id: 'w6-e4-t1', input: [[1, 1, 1], 2], expected: 2, visible: true },
      { id: 'w6-e4-t2', input: [[1, 2, 3], 3], expected: 2, visible: true }, // [1, 2] e [3]
      { id: 'w6-e4-t3', input: [[1, -1, 0], 0], expected: 3, visible: true }, // [1, -1], [0], [1, -1, 0]
      { id: 'w6-e4-t4', input: [[], 5], expected: 0, visible: true },
      { id: 'w6-e4-t5', input: [[5], 5], expected: 1, visible: true },
      { id: 'w6-e4-t6', input: [[1], 0], expected: 0, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se la somma cumulata fino all\'indice corrente è sum, quale somma cumulata precedente renderebbe la differenza tra loro uguale a K?'
      },
      {
        level: 2,
        text: 'Se sum - k è già presente nella mappa delle somme prefisse, aggiungi a conteggio il numero di volte che sum - k è comparsa. Poi incrementa freq[sum].'
      },
      {
        level: 3,
        text: 'Controesempio: se dimentichi di inizializzare freq[0] = 1, non conterai mai i sottoarray che partono esattamente dall\'indice 0!'
      }
    ],
    solution: {
      code: `function contaSottoarraySommaK(numeri, k) {
  let conteggio = 0;
  let sum = 0;
  const prefissi = { 0: 1 };

  for (let i = 0; i < numeri.length; i++) {
    sum += numeri[i];
    const diff = sum - k;
    if (prefissi[diff]) {
      conteggio += prefissi[diff];
    }
    prefissi[sum] = (prefissi[sum] || 0) + 1;
  }

  return conteggio;
}`,
      explanation: 'Sfruttando l\'equazione sum[j] - sum[i] = k, cerchiamo nella Hash Map quante volte sum[i] = sum[j] - k è già apparsa. Questo riduce un problema quadratico O(n²) a una singola scansione O(n).',
      verificationQuestion: 'Perché inizializziamo prefissi[0] = 1 prima di entrare nel ciclo?',
      verificationAnswer: 'Perché se la somma dall\'inizio dell\'array fino a un indice i fa esattamente k (sum === k), allora sum - k fa 0: aver registrato la somma 0 ci permette di contare immediatamente questo sottoarray!'
    }
  },
  {
    id: 'w6-e5',
    worldId: 6,
    order: 5,
    title: 'La Più Lunga Sequenza Consecutiva in O(n)',
    slug: 'lunghezza-sequenza-consecutiva',
    difficulty: 'Difficile',
    concept: 'Lookup Set con identificazione intelligente dell\'inizio sequenza',
    story: 'In un registro di numeri di protocollo arrivati disordinati, devi trovare la lunghezza della più lunga sequenza di numeri interi consecutivi (es. [100, 4, 200, 1, 3, 2] contiene la sequenza [1, 2, 3, 4], lunghezza 4). L\'ordinamento con sort() impiegherebbe O(n log n). Risolvilo in tempo puramente lineare O(n).',
    functionName: 'lunghezzaSequenzaConsecutiva',
    signature: 'function lunghezzaSequenzaConsecutiva(numeri)',
    parameters: [{ name: 'numeri', type: 'number[]', description: 'Array disordinato di numeri interi' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    defaultPreWrite: {
      exampleHandPrompt: 'Se numeri = [100, 4, 200, 1, 3, 2]: come capisci che 1 è l\'inizio di una sequenza? Perché 1 - 1 = 0 non esiste nel set!',
      targetComplexity: 'O(n)'
    },
    starterCode: `function lunghezzaSequenzaConsecutiva(numeri) {
  if (numeri.length === 0) return 0;
  // Inserisci tutti i numeri in un Set per lookup O(1)
  // Conta la sequenza SOLO se il numero è l'inizio di una catena (num - 1 non è nel Set)!
  
  return 0;
}
`,
    tests: [
      { id: 'w6-e5-t1', input: [[100, 4, 200, 1, 3, 2]], expected: 4, visible: true },
      { id: 'w6-e5-t2', input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9, visible: true },
      { id: 'w6-e5-t3', input: [[]], expected: 0, visible: true },
      { id: 'w6-e5-t4', input: [[42]], expected: 1, visible: true },
      { id: 'w6-e5-t5', input: [[10, 20, 30]], expected: 1, visible: true },
      { id: 'w6-e5-t6', input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expected: 7, visible: false } // -1, 0, 1.. (da 3 a 9 fa 7)
    ],
    hints: [
      {
        level: 1,
        text: 'Se provi ad espandere la sequenza per ogni singolo numero dell\'array, quale complessità rischi di avere nel caso peggiore?'
      },
      {
        level: 2,
        text: 'Inserisci tutto in const set = new Set(numeri). Fai il conteggio while (set.has(corrente + 1)) SOLO se !set.has(num - 1).'
      },
      {
        level: 3,
        text: 'Controesempio: se controlli e fai il ciclo while anche per 2, 3 e 4, visiterai gli stessi numeri ripetutamente: O(n²). Controllando solo gli inizi (!set.has(num - 1)), ogni elemento viene visitato al massimo due volte: O(n).'
      }
    ],
    solution: {
      code: `function lunghezzaSequenzaConsecutiva(numeri) {
  if (numeri.length === 0) return 0;

  const setNumeri = new Set(numeri);
  let maxSequenza = 0;

  for (const num of setNumeri) {
    // Controlla se 'num' è l'inizio di una sequenza
    if (!setNumeri.has(num - 1)) {
      let corrente = num;
      let lunghezzaAttuale = 1;

      while (setNumeri.has(corrente + 1)) {
        corrente++;
        lunghezzaAttuale++;
      }

      maxSequenza = Math.max(maxSequenza, lunghezzaAttuale);
    }
  }

  return maxSequenza;
}`,
      explanation: 'Verificando che num - 1 non sia presente nel Set, ci assicuriamo di avviare il ciclo di espansione solo ed esclusivamente dai veri capi-fila delle sequenze. Ogni numero viene toccato al massimo 2 volte: tempo strettamente lineare O(n).',
      verificationQuestion: 'Cosa succede se l\'array contiene molti numeri duplicati identici?',
      verificationAnswer: 'Inserendo i numeri nel Set all\'inizio, i duplicati vengono rimossi subito senza alterare il calcolo delle sequenze consecutive!'
    }
  }
];
