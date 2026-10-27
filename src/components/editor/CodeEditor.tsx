import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, isDark = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  // Inserimento simbolo rapido (per mobile)
  const insertSymbol = (symbol: string) => {
    if (!editorViewRef.current) return;
    const view = editorViewRef.current;
    const selection = view.state.selection.main;
    view.dispatch({
      changes: { from: selection.from, to: selection.to, insert: symbol },
      selection: { anchor: selection.from + symbol.length }
    });
    view.focus();
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        javascript(),
        isDark ? oneDark : [],
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          indentWithTab
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': { height: '320px', fontSize: '14px', borderRadius: '0.5rem' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
          '&.cm-focused': { outline: '2px solid #f97316' }
        })
      ]
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current
    });

    editorViewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  // Aggiornamento documento se cambia da esterno
  useEffect(() => {
    if (editorViewRef.current) {
      const currentVal = editorViewRef.current.state.doc.toString();
      if (value !== currentVal) {
        editorViewRef.current.dispatch({
          changes: { from: 0, to: currentVal.length, insert: value }
        });
      }
    }
  }, [value]);

  const quickSymbols = ['(', ')', '[', ']', '{', '}', '<', '>', '=', ';', '"', "'", '+', '-', '!'];

  return (
    <div className="flex flex-col border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      {/* Barra rapida simboli per Mobile e touch */}
      <div className="bg-slate-100 dark:bg-slate-800/80 px-2 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-1">Simboli:</span>
        {quickSymbols.map((sym) => (
          <button
            key={sym}
            type="button"
            onClick={() => insertSymbol(sym)}
            className="px-2.5 py-1 text-sm font-mono font-bold bg-white dark:bg-slate-700 hover:bg-orange-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-600 active:scale-95 transition-transform"
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Area editor CodeMirror */}
      <div ref={containerRef} className="w-full" />
    </div>
  );
};
