import { Exercise, ExecutionResult, TestCase } from '../../types';

export interface CodeRunner {
  run(code: string, exercise: Exercise): Promise<ExecutionResult>;
}

// Iniezione di strumento contatore e proxy per array
export function buildWorkerScript(): string {
  return `
    self.onmessage = function(e) {
      const { code, functionName, tests, targetComplexity } = e.data;
      
      let operationsCount = 0;
      let totalInputSize = 0;

      // Wrap dell'ambiente con contatore
      // Creiamo un Proxy per intercettare gli accessi e confronti su Array se passati
      function instrument(val) {
        if (Array.isArray(val)) {
          return new Proxy(val, {
            get(target, prop) {
              if (typeof prop === 'string' && !isNaN(Number(prop))) {
                operationsCount++;
              }
              return Reflect.get(target, prop);
            },
            set(target, prop, value) {
              if (typeof prop === 'string' && !isNaN(Number(prop))) {
                operationsCount++;
              }
              return Reflect.set(target, prop, value);
            }
          });
        }
        return val;
      }

      try {
        // Valutazione funzione
        const factory = new Function('__instrument', \`
          let __ops = 0;
          \${code}
          if (typeof \${functionName} !== 'function') {
            throw new Error('La funzione "' + '\${functionName}' + '" non è stata definita o non è una funzione.');
          }
          return \${functionName};
        \`);

        const userFn = factory(instrument);

        const testResults = [];
        let allPassed = true;
        const startTime = performance.now();

        for (const t of tests) {
          // deep clone input per evitare che mutazioni compromettano il test successivo
          const clonedInput = JSON.parse(JSON.stringify(t.input));
          
          // Calcolo dimensione input approssimativa
          let testInputSize = 0;
          for (const arg of clonedInput) {
            if (Array.isArray(arg)) testInputSize += arg.length;
            else if (typeof arg === 'string') testInputSize += arg.length;
            else testInputSize += 1;
          }
          totalInputSize = Math.max(totalInputSize, testInputSize);

          // Esecuzione
          let actual;
          let testPassed = false;
          let failedIndex = undefined;
          let testErr = undefined;

          try {
            // Strumentiamo gli input
            const instrumentedArgs = clonedInput.map(instrument);
            actual = userFn(...instrumentedArgs);

            // Confronto profondo
            testPassed = deepEqual(actual, t.expected);

            // Se fallisce ed entrambi sono array, troviamo l'indice dell'errore (off-by-one check)
            if (!testPassed) {
              if (Array.isArray(actual) && Array.isArray(t.expected)) {
                const maxLen = Math.max(actual.length, t.expected.length);
                for (let i = 0; i < maxLen; i++) {
                  if (!deepEqual(actual[i], t.expected[i])) {
                    failedIndex = i;
                    break;
                  }
                }
              } else if (Array.isArray(t.input[0]) && typeof actual === 'number' && typeof t.expected === 'number') {
                // se l'output atteso è un indice e l'utente ha restituito un indice sbagliato
                failedIndex = actual;
              }
            }
          } catch (err) {
            testPassed = false;
            testErr = err.message || String(err);
          }

          if (!testPassed) {
            allPassed = false;
          }

          testResults.push({
            testId: t.id,
            passed: testPassed,
            visible: t.visible,
            input: t.input,
            expected: t.expected,
            actual: actual !== undefined ? actual : null,
            error: testErr,
            failedIndex: failedIndex
          });
        }

        const runtimeMs = performance.now() - startTime;

        // Controllo euristico della complessità
        let complexityAlert = undefined;
        if (allPassed && totalInputSize > 5) {
          const N = totalInputSize;
          if (targetComplexity === 'O(n)' && operationsCount > (N * N * 0.4) && operationsCount > 40) {
            complexityAlert = "Attenzione: il codice esegue troppe operazioni (" + operationsCount + " operazioni per N=" + N + "). La tua soluzione sembra O(n²), mentre questo problema richiede una scansione lineare O(n).";
          } else if (targetComplexity === 'O(1)' && operationsCount > 15) {
            complexityAlert = "Attenzione: l'algoritmo doveva essere O(1) in tempo costante, ma sembra scorrere elementi ripetutamente (" + operationsCount + " operazioni).";
          }
        }

        self.postMessage({
          success: allPassed,
          testResults,
          operationsCount,
          inputSize: totalInputSize,
          complexityAlert,
          runtimeMs
        });

      } catch (globalErr) {
        self.postMessage({
          success: false,
          error: globalErr.message || String(globalErr),
          testResults: [],
          operationsCount: 0,
          inputSize: 0,
          runtimeMs: 0
        });
      }

      function deepEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return a === b;
        if (typeof a !== typeof b) return false;
        if (typeof a !== 'object') return false;
        
        if (Array.isArray(a)) {
          if (!Array.isArray(b) || a.length !== b.length) return false;
          for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
          }
          return true;
        }

        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (const k of keysA) {
          if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
          if (!deepEqual(a[k], b[k])) return false;
        }
        return true;
      }
    };
  `;
}

export class JavaScriptWorkerRunner implements CodeRunner {
  private timeoutMs: number;

  constructor(timeoutMs = 2000) {
    this.timeoutMs = timeoutMs;
  }

  run(code: string, exercise: Exercise): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      let worker: Worker | null = null;
      let timer: number | null = null;

      try {
        const workerBlob = new Blob([buildWorkerScript()], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(workerBlob);
        worker = new Worker(workerUrl);

        timer = window.setTimeout(() => {
          if (worker) {
            worker.terminate();
            worker = null;
          }
          resolve({
            success: false,
            error: 'Tempo scaduto! Il codice ha impiegato più di 2 secondi (possibile ciclo infinito).',
            testResults: [],
            operationsCount: 0,
            inputSize: 0,
            runtimeMs: this.timeoutMs
          });
        }, this.timeoutMs);

        worker.onmessage = (event) => {
          if (timer) clearTimeout(timer);
          if (worker) worker.terminate();
          resolve(event.data);
        };

        worker.onerror = (err) => {
          if (timer) clearTimeout(timer);
          if (worker) worker.terminate();
          resolve({
            success: false,
            error: 'Errore durante l\'esecuzione: ' + (err.message || 'Errore di sintassi o runtime'),
            testResults: [],
            operationsCount: 0,
            inputSize: 0,
            runtimeMs: 0
          });
        };

        worker.postMessage({
          code,
          functionName: exercise.functionName,
          tests: exercise.tests,
          targetComplexity: exercise.targetComplexity
        });

      } catch (setupError: any) {
        if (timer) clearTimeout(timer);
        if (worker) (worker as Worker).terminate();
        resolve({
          success: false,
          error: 'Impossibile avviare il Worker: ' + (setupError.message || String(setupError)),
          testResults: [],
          operationsCount: 0,
          inputSize: 0,
          runtimeMs: 0
        });
      }
    });
  }
}
