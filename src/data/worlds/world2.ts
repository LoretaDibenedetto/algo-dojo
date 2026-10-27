import { Exercise } from '../../types';

export const world2Exercises: Exercise[] = [
  {
    id: 'w2-e1',
    worldId: 2,
    order: 1,
    title: 'Lo Specchio delle Parole: Palindromo',
    slug: 'verifica-palindromo',
    difficulty: 'Facile',
    concept: 'Due indici su stringa: left e right convergono',
    story: 'In un archivio storico stai catalogando antiche incisioni. Alcune parole possono essere lette indifferentemente da sinistra a destra e da destra a sinistra (es. "radar", "anna"). Scrivi una funzione che verifichi se una stringa è un palindromo (case-insensitive e ignorando gli spazi).',
    functionName: 'isPalindromo',
    signature: 'function isPalindromo(testo)',
    parameters: [{ name: 'testo', type: 'string', description: 'Stringa da verificare' }],
    returnType: 'boolean',
    targetComplexity: 'O(n)',
    starterCode: `function isPalindromo(testo) {
  // Pulisci prima il testo: toLowerCase() e rimuovi spazi
  // Usa due puntatori: uno all'inizio (0) e uno alla fine (length - 1)
  
}
`,
    tests: [
      { id: 'w2-e1-t1', input: ['radar'], expected: true, visible: true },
      { id: 'w2-e1-t2', input: ['Anna'], expected: true, visible: true },
      { id: 'w2-e1-t3', input: ['ciao'], expected: false, visible: true },
      { id: 'w2-e1-t4', input: ['i topi non avevano nipoti'], expected: true, visible: true },
      { id: 'w2-e1-t5', input: [''], expected: true, visible: true },
      { id: 'w2-e1-t6', input: ['abccba'], expected: true, visible: false },
      { id: 'w2-e1-t7', input: ['abcfba'], expected: false, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Quale carattere deve combaciare con il primo (indice 0)? E quale con il secondo (indice 1)?'
      },
      {
        level: 2,
        text: 'Rimuovi gli spazi e converti in minuscolo. Poi mantieni due indici: left = 0 e right = s.length - 1. Se s[left] !== s[right], restituisci subito false.'
      },
      {
        level: 3,
        text: 'Controesempio: fare s.split("").reverse().join("") funziona, ma alloca due array intermedi e una stringa nuova, raddoppiando l\'uso di memoria. Due indici usano O(1) memoria extra.'
      }
    ],
    solution: {
      code: `function isPalindromo(testo) {
  const pulito = testo.toLowerCase().replace(/\\s+/g, '');
  let left = 0;
  let right = pulito.length - 1;
  
  while (left < right) {
    if (pulito[left] !== pulito[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      explanation: 'Scorrendo con due puntatori dai due estremi verso il centro, verifichiamo la simmetria in un unico passaggio O(n), interrompendoci al primissimo carattere non coincidente.',
      verificationQuestion: 'Cosa restituisce per la stringa vuota "" e perché?',
      verificationAnswer: 'Restituisce true, perché non esiste alcuna coppia di caratteri asimmetrici che violi la definizione di palindromo!'
    }
  },
  {
    id: 'w2-e2',
    worldId: 2,
    order: 2,
    title: 'Contatore di Vocali e Consonanti',
    slug: 'conteggio-vocali-consonanti',
    difficulty: 'Facile',
    concept: 'Lookup Set e iterazione caratteri',
    story: 'In un\'agenzia di traduzione devi analizzare la leggibilità di un testo contando quante vocali e quante consonanti (italiane) contiene. Ignora numeri, punteggiatura e spazi. Restituisci { vocali: number, consonanti: number }.',
    functionName: 'contaLettere',
    signature: 'function contaLettere(testo)',
    parameters: [{ name: 'testo', type: 'string', description: 'Testo da analizzare' }],
    returnType: '{ vocali: number, consonanti: number }',
    targetComplexity: 'O(n)',
    starterCode: `function contaLettere(testo) {
  let vocali = 0;
  let consonanti = 0;
  
  // Scansione carattere per carattere
  
  return { vocali, consonanti };
}
`,
    tests: [
      { id: 'w2-e2-t1', input: ['Ciao Mondo!'], expected: { vocali: 5, consonanti: 4 }, visible: true },
      { id: 'w2-e2-t2', input: ['aeiou'], expected: { vocali: 5, consonanti: 0 }, visible: true },
      { id: 'w2-e2-t3', input: ['123 -- !!'], expected: { vocali: 0, consonanti: 0 }, visible: true },
      { id: 'w2-e2-t4', input: ['Programmatrice Backend'], expected: { vocali: 7, consonanti: 14 }, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Come distingui una lettera alfabetica da un simbolo o numero come "!" o "3"?'
      },
      {
        level: 2,
        text: 'Trasforma il testo in minuscolo. Definisci un Set di vocali ("aeiou"). Per ogni carattere tra "a" e "z", se è nel set incrementa vocali, altrimenti incrementa consonanti.'
      },
      {
        level: 3,
        text: 'Controesempio: se controlli solo "se non è vocale allora è consonante", conterai spazi, virgole e punti come se fossero consonanti!'
      }
    ],
    solution: {
      code: `function contaLettere(testo) {
  let vocali = 0;
  let consonanti = 0;
  const setVocali = new Set(['a', 'e', 'i', 'o', 'u']);
  const str = testo.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch >= 'a' && ch <= 'z') {
      if (setVocali.has(ch)) {
        vocali++;
      } else {
        consonanti++;
      }
    }
  }

  return { vocali, consonanti };
}`,
      explanation: 'Verificare prima l\'appartenenza all\'alfabeto (ch >= "a" && ch <= "z") protegge da simboli e spazi. L\'uso del Set rende il controllo vocali O(1).',
      verificationQuestion: 'Perché in JavaScript la stringa si può scorrere con l\'indice str[i] proprio come un array?',
      verificationAnswer: 'Perché le stringhe in JS sono oggetti iterabili e indicizzabili in lettura, con indici da 0 a str.length - 1!'
    }
  },
  {
    id: 'w2-e3',
    worldId: 2,
    order: 3,
    title: 'Anagrammi Perfetti',
    slug: 'verifica-anagramma',
    difficulty: 'Medio',
    concept: 'Frequency Map (Conteggio frequenze O(n))',
    story: 'Due parole sono anagrammi se contengono esattamente le stesse lettere con le stesse frequenze, ma in ordine diverso (es. "notte" e "tento"). Verifica se due parole sono anagrammi, ignorando maiuscole/minuscole.',
    functionName: 'sonoAnagrammi',
    signature: 'function sonoAnagrammi(parolaA, parolaB)',
    parameters: [
      { name: 'parolaA', type: 'string', description: 'Prima parola' },
      { name: 'parolaB', type: 'string', description: 'Seconda parola' }
    ],
    returnType: 'boolean',
    targetComplexity: 'O(n)',
    starterCode: `function sonoAnagrammi(parolaA, parolaB) {
  // Se la lunghezza è diversa, possono essere anagrammi?
  // Usa una mappa o un oggetto delle frequenze!
  
}
`,
    tests: [
      { id: 'w2-e3-t1', input: ['notte', 'tento'], expected: true, visible: true },
      { id: 'w2-e3-t2', input: ['roma', 'amor'], expected: true, visible: true },
      { id: 'w2-e3-t3', input: ['gatto', 'cane'], expected: false, visible: true },
      { id: 'w2-e3-t4', input: ['casa', 'casale'], expected: false, visible: true },
      { id: 'w2-e3-t5', input: ['Ananas', 'sannaa'], expected: true, visible: false },
      { id: 'w2-e3-t6', input: ['a', 'b'], expected: false, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se due parole hanno lunghezze diverse, è necessario anche solo contare le lettere o puoi già dare una risposta certa?'
      },
      {
        level: 2,
        text: 'Conta le occorrenze di ciascuna lettera nella prima parola dentro un dizionario/oggetto (+1). Poi sottrai (-1) per ogni lettera della seconda parola.'
      },
      {
        level: 3,
        text: 'Controesempio: ordinare le due stringhe con split().sort().join() impiega tempo O(n log n). Usando una tabella di frequenze invece la risolvi in tempo puramente lineare O(n).'
      }
    ],
    solution: {
      code: `function sonoAnagrammi(parolaA, parolaB) {
  const a = parolaA.toLowerCase();
  const b = parolaB.toLowerCase();
  
  if (a.length !== b.length) return false;
  
  const freq = {};
  for (let i = 0; i < a.length; i++) {
    freq[a[i]] = (freq[a[i]] || 0) + 1;
  }
  
  for (let i = 0; i < b.length; i++) {
    if (!freq[b[i]]) {
      return false; // lettera assente o esaurita
    }
    freq[b[i]]--;
  }
  
  return true;
}`,
      explanation: 'Una mappa delle frequenze tiene traccia esatta del conteggio di ogni carattere. Un primo passaggio incrementa, il secondo decrementa: se un carattere finisce a 0 o manca, non sono anagrammi. Complessità O(n).',
      verificationQuestion: 'Cosa succederebbe se ci fosse una lettera in più nella seconda parola (es. "notte" vs "nottee")?',
      verificationAnswer: 'Viene intercettata immediatamente dal primissimo controllo sulle lunghezze (a.length !== b.length), con tempo O(1)!'
    }
  },
  {
    id: 'w2-e4',
    worldId: 2,
    order: 4,
    title: 'Compressione Run-Length (RLE)',
    slug: 'compressione-rle',
    difficulty: 'Medio',
    concept: 'Scansione con confronto elemento successivo arr[i + 1]',
    story: 'Nel protocollo di trasmissione dati della tua API backend, vuoi risparmiare banda comprimendo sequenze di caratteri ripetuti. Ad esempio la sequenza "AAABBBCC" diventa "A3B3C2". Se un carattere compare una sola volta, scrivi comunque il carattere seguito da 1 (es. "A1"). Se la stringa è vuota, restituisci "".',
    functionName: 'comprimiTesto',
    signature: 'function comprimiTesto(s)',
    parameters: [{ name: 's', type: 'string', description: 'Stringa da comprimere' }],
    returnType: 'string',
    targetComplexity: 'O(n)',
    starterCode: `function comprimiTesto(s) {
  if (s.length === 0) return "";
  
  let risultato = "";
  let conteggio = 1;
  
  // Itera confrontando il carattere corrente con il successivo!
  
  return risultato;
}
`,
    tests: [
      { id: 'w2-e4-t1', input: ['AAABBBCC'], expected: 'A3B3C2', visible: true },
      { id: 'w2-e4-t2', input: ['ABCD'], expected: 'A1B1C1D1', visible: true },
      { id: 'w2-e4-t3', input: [''], expected: '', visible: true },
      { id: 'w2-e4-t4', input: ['WWWWWWWWWWWWBWWWWWWWWWWWWBBB'], expected: 'W12B1W12B3', visible: true },
      { id: 'w2-e4-t5', input: ['Z'], expected: 'Z1', visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Quando incontri l\'ultimo carattere dell\'array, cosa c\'è al posto di s[i + 1]?'
      },
      {
        level: 2,
        text: 'Itera da i = 0 a s.length - 1. Se s[i] === s[i + 1], incrementa il conteggio. Altrimenti aggiungi a risultato s[i] + conteggio e resetta conteggio = 1.'
      },
      {
        level: 3,
        text: 'Controesempio: se il ciclo si ferma a i < s.length - 1 senza un\'istruzione di chiusura, dimenticherai di scrivere l\'ultimo blocco di caratteri!'
      }
    ],
    solution: {
      code: `function comprimiTesto(s) {
  if (s.length === 0) return "";
  
  let risultato = "";
  let conteggio = 1;
  
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && s[i] === s[i + 1]) {
      conteggio++;
    } else {
      risultato += s[i] + conteggio;
      conteggio = 1;
    }
  }
  
  return risultato;
}`,
      explanation: 'Confrontando s[i] con s[i + 1] ed emettendo il conteggio quando il carattere cambia (o alla fine della stringa), gestiamo ogni gruppo compatto in un solo passaggio lineare O(n).',
      verificationQuestion: 'Cosa succede all\'ultima iterazione quando i + 1 === s.length?',
      verificationAnswer: 'La condizione i + 1 < s.length è falsa, quindi entra nel ramo else emettendo regolarmente l\'ultimo carattere con il suo conteggio corretto!'
    }
  },
  {
    id: 'w2-e5',
    worldId: 2,
    order: 5,
    title: 'Sottostringa Più Lunga Senza Ripetizioni',
    slug: 'lunghezza-sottostringa-unica',
    difficulty: 'Difficile',
    concept: 'Finestra scorrevole (Sliding Window)',
    story: 'Devi trovare la lunghezza della più lunga sottostringa contigua che contenga tutti caratteri distinti senza alcuna ripetizione. Ad esempio in "abcabcbb" la risposta è 3 ("abc"). In "bbbbb" la risposta è 1 ("b").',
    functionName: 'lunghezzaSenzaRipetizioni',
    signature: 'function lunghezzaSenzaRipetizioni(s)',
    parameters: [{ name: 's', type: 'string', description: 'Stringa in ingresso' }],
    returnType: 'number',
    targetComplexity: 'O(n)',
    starterCode: `function lunghezzaSenzaRipetizioni(s) {
  let maxLen = 0;
  let left = 0;
  const visti = new Set();
  
  // Fai scorrere il puntatore right da 0 a s.length - 1
  
  return maxLen;
}
`,
    tests: [
      { id: 'w2-e5-t1', input: ['abcabcbb'], expected: 3, visible: true },
      { id: 'w2-e5-t2', input: ['bbbbb'], expected: 1, visible: true },
      { id: 'w2-e5-t3', input: ['pwwkew'], expected: 3, visible: true },
      { id: 'w2-e5-t4', input: [''], expected: 0, visible: true },
      { id: 'w2-e5-t5', input: ['abcdef'], expected: 6, visible: false }
    ],
    hints: [
      {
        level: 1,
        text: 'Se muovi l\'indice destro e incontri un carattere già presente nel Set, quale indice devi muovere a sinistra per farlo uscire?'
      },
      {
        level: 2,
        text: 'Usa una sliding window: espandi right. Se s[right] è già nel Set, rimuovi s[left] e incrementa left finché il duplicato sparisce. Poi aggiungi s[right] e calcola maxLen.'
      },
      {
        level: 3,
        text: 'Controesempio: generare tutte le possibili sottostringhe con due cicli annidati e controllare duplicati per ciascuna costa O(n³). Con la finestra scorrevole ogni carattere entra ed esce dal Set al massimo una volta: O(n) garantito.'
      }
    ],
    solution: {
      code: `function lunghezzaSenzaRipetizioni(s) {
  let maxLen = 0;
  let left = 0;
  const visti = new Set();
  
  for (let right = 0; right < s.length; right++) {
    while (visti.has(s[right])) {
      visti.delete(s[left]);
      left++;
    }
    visti.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}`,
      explanation: 'La tecnica Sliding Window mantiene una finestra [left, right] sempre valida. Il calcolo right - left + 1 misura esattamente l\'ampiezza della finestra corrente. Complessità temporale O(n).',
      verificationQuestion: 'Perché la lunghezza della finestra è (right - left + 1) e non semplicemente (right - left)?',
      verificationAnswer: 'Perché entrambi gli estremi left e right sono inclusi nella finestra! Se left=0 e right=0, l\'elemento è 1 solo (0 - 0 + 1 = 1).'
    }
  }
];
