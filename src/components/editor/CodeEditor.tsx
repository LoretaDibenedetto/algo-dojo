import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { 
  EditorView, 
  keymap, 
  lineNumbers, 
  highlightActiveLineGutter, 
  highlightSpecialChars, 
  drawSelection, 
  dropCursor, 
  rectangularSelection, 
  crosshairCursor, 
  highlightActiveLine 
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { 
  CornerDownLeft, 
  Delete, 
  Indent, 
  Outdent, 
  Sparkles, 
  Type, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, isDark = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [activeTab, setActiveTab] = useState<'simboli' | 'snippet' | 'indici'>('simboli');
  const [fontSize, setFontSize] = useState<number>(14);

  // Inserimento testo generico
  const insertText = (text: string, cursorOffset?: number) => {
    if (!editorViewRef.current) return;
    const view = editorViewRef.current;
    const selection = view.state.selection.main;
    view.dispatch({
      changes: { from: selection.from, to: selection.to, insert: text },
      selection: { anchor: selection.from + (cursorOffset !== undefined ? cursorOffset : text.length) }
    });
    view.focus();
  };

  // Tasto Cancella (Backspace rapido da toolbar)
  const handleBackspace = () => {
    if (!editorViewRef.current) return;
    const view = editorViewRef.current;
    const selection = view.state.selection.main;
    if (selection.from !== selection.to) {
      view.dispatch({ changes: { from: selection.from, to: selection.to, insert: '' } });
    } else if (selection.from > 0) {
      view.dispatch({
        changes: { from: selection.from - 1, to: selection.from, insert: '' },
        selection: { anchor: selection.from - 1 }
      });
    }
    view.focus();
  };

  // Indentazione
  const handleIndent = (out = false) => {
    if (!editorViewRef.current) return;
    const view = editorViewRef.current;
    if (out) {
      // Outdent: toglie due spazi
      const selection = view.state.selection.main;
      view.dispatch({
        changes: { from: Math.max(0, selection.from - 2), to: selection.from, insert: '' }
      });
    } else {
      insertText('  ');
    }
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
          '&': { 
            height: '340px', 
            fontSize: `${fontSize}px`, 
            borderRadius: '0.75rem',
            touchAction: 'manipulation'
          },
          '.cm-scroller': { 
            overflow: 'auto', 
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            paddingBottom: '20px'
          },
          '.cm-content': {
            caretColor: '#f97316'
          },
          '&.cm-focused': { 
            outline: '2px solid #f97316',
            boxShadow: '0 0 0 4px rgba(249, 115, 22, 0.15)'
          }
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

  // Aggiornamento font size dinamico
  useEffect(() => {
    if (!editorViewRef.current) return;
    editorViewRef.current.dispatch({
      effects: []
    });
  }, [fontSize]);

  // Aggiornamento valore se cambia da esterno
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

  // Simboli singoli essenziali da mobile
  const quickSymbols = ['(', ')', '[', ']', '{', '}', '<', '>', '=', ';', '!', '+', '-', '*', '/', '%', '&&', '||', '"', "'", '`', ':', '?'];

  // Snippet pronti per evitare errori da mobile
  const snippetShortcuts = [
    { label: 'for (i < n)', insert: 'for (let i = 0; i < .length; i++) {\n  \n}', offset: 20 },
    { label: 'while (l < r)', insert: 'while (left < right) {\n  \n}', offset: 25 },
    { label: 'if (...)', insert: 'if () {\n  \n}', offset: 4 },
    { label: 'return', insert: 'return ;', offset: 7 },
    { label: 'const', insert: 'const  = ;', offset: 6 },
    { label: 'let', insert: 'let  = ;', offset: 4 },
    { label: 'new Set()', insert: 'new Set()', offset: 9 },
    { label: 'arr.length - 1', insert: '.length - 1', offset: 0 },
    { label: 'Math.floor()', insert: 'Math.floor()', offset: 11 }
  ];

  // Scorciatoie per indici (il punto debole principale)
  const indexShortcuts = [
    { label: 'arr[i]', insert: '[i]', offset: 3 },
    { label: 'arr[i + 1]', insert: '[i + 1]', offset: 7 },
    { label: 'arr[i - 1]', insert: '[i - 1]', offset: 7 },
    { label: 'arr[left]', insert: '[left]', offset: 6 },
    { label: 'arr[right]', insert: '[right]', offset: 7 },
    { label: 'arr[mid]', insert: '[mid]', offset: 5 },
    { label: 'left++', insert: 'left++;\n' },
    { label: 'right--', insert: 'right--;\n' }
  ];

  return (
    <div className="flex flex-col border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-md transition-all">
      {/* HEADER DELLA TOOLBAR CON TABS */}
      <div className="bg-slate-100 dark:bg-slate-800/90 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
        {/* Categorie scorciatoie */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('simboli')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'simboli'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Simboli
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('snippet')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'snippet'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⚡ Blocchi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('indici')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'indici'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🎯 Indici
          </button>
        </div>

        {/* Tasti di editing rapido (Backspace, Indent, Zoom) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleIndent(false)}
            title="Tab / Indenta"
            className="p-1.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-300 dark:border-slate-600 active:scale-95 text-xs font-mono font-bold"
          >
            Tab ⇥
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            title="Cancella carattere"
            className="p-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-900/60 active:scale-95"
          >
            <Delete size={15} />
          </button>
          <button
            type="button"
            onClick={() => setFontSize(f => f >= 18 ? 12 : f + 2)}
            title="Ingrandisci testo"
            className="p-1.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-300 dark:border-slate-600 active:scale-95 flex items-center gap-0.5 text-[11px] font-bold"
          >
            <Type size={13} />
            <span>{fontSize}</span>
          </button>
        </div>
      </div>

      {/* RIGA DEI PULSANTI SCORCIATOIE SCORREVOLE TOUCH */}
      <div className="bg-slate-50 dark:bg-slate-950/70 px-2 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none select-none">
        {activeTab === 'simboli' && (
          <>
            {quickSymbols.map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => insertText(sym)}
                className="min-w-9 h-9 px-2 flex items-center justify-center text-sm font-mono font-black bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm active:scale-90 active:bg-orange-500 active:text-white transition-all flex-shrink-0"
              >
                {sym}
              </button>
            ))}
          </>
        )}

        {activeTab === 'snippet' && (
          <>
            {snippetShortcuts.map((snip) => (
              <button
                key={snip.label}
                type="button"
                onClick={() => insertText(snip.insert, snip.offset)}
                className="h-9 px-3 flex items-center justify-center text-xs font-mono font-bold bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-orange-600 dark:text-orange-400 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm active:scale-95 transition-all flex-shrink-0"
              >
                {snip.label}
              </button>
            ))}
          </>
        )}

        {activeTab === 'indici' && (
          <>
            {indexShortcuts.map((idx) => (
              <button
                key={idx.label}
                type="button"
                onClick={() => insertText(idx.insert, idx.offset)}
                className="h-9 px-3 flex items-center justify-center text-xs font-mono font-bold bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-400 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm active:scale-95 transition-all flex-shrink-0"
              >
                {idx.label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* AREA CODEMIRROR */}
      <div ref={containerRef} className="w-full text-sm" />
    </div>
  );
};
