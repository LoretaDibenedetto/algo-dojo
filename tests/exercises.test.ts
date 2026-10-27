import { describe, it, expect } from 'vitest';
import { getAllExercises } from '../src/data';

describe('Verifica Soluzioni Ufficiali ed Esercizi del Dojo', () => {
  const exercises = getAllExercises();

  // Test per verificare che ogni soluzione ufficiale passi tutti i suoi test
  exercises.forEach((ex) => {
    it(`Esercizio ${ex.id} (${ex.title}): La soluzione ufficiale passa tutti i test visibili e nascosti`, () => {
      // Eseguiamo il codice della soluzione
      const factory = new Function(`
        ${ex.solution.code}
        return ${ex.functionName};
      `);

      const fn = factory();
      expect(typeof fn).toBe('function');

      for (const t of ex.tests) {
        // deep clone input
        const clonedInput = JSON.parse(JSON.stringify(t.input));
        const actual = fn(...clonedInput);
        expect(actual).toEqual(t.expected);
      }
    });
  });

  // Test per verificare che una soluzione volutamente sbagliata fallisca
  it('Una soluzione palesemente sbagliata fallisce i test', () => {
    const ex = exercises[0]; // w1-e1 L'ultimo pacco
    const wrongFactory = new Function(`
      function ultimoPacco(nastro) {
        return "Sbagliato!";
      }
      return ultimoPacco;
    `);

    const fn = wrongFactory();
    const result = fn([10, 20, 30]);
    expect(result).not.toEqual(30);
  });
});
