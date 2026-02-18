import React, { useState, useEffect, useMemo } from 'react';

const CourseTerminal = ({ lang, onCompleteLesson, theme = 'light' }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');

  const commands = useMemo(() => ({
    start: [
      { type: 'output', text: `Bienvenue dans le cours ${lang.name}. Tapez 'help' pour voir les commandes.` },
    ],
    help: [
      { type: 'output', text: 'Commandes disponibles :' },
      { type: 'output', text: '  help    : affiche cette aide' },
      { type: 'output', text: '  code    : affiche le code exemple' },
      { type: 'output', text: '  run     : exécute le code (simulation)' },
      { type: 'output', text: '  lesson1 : marque la leçon 1 comme terminée' },
      { type: 'output', text: '  clear   : efface l’écran' },
    ],
    code: [
      { type: 'output', text: '```' },
      { type: 'output', text: lang.code },
      { type: 'output', text: '```' },
    ],
    run: [
      { type: 'output', text: 'Exécution du code...' },
      { type: 'output', text: '> Programme lancé' },
      { type: 'output', text: 'Résultat :' },
      { type: 'output', text: 'Hello World! (simulation)', color: 'text-green-600' },
    ],
    lesson1: [
      { type: 'output', text: 'Leçon 1 marquée comme terminée !' },
      { type: 'action', fn: () => onCompleteLesson(lang.lessons?.[0]?.id || 'c1') },
    ],
  }), [lang, onCompleteLesson]);

  const addLine = (line) => {
    setLines(prev => [...prev, line]);
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === 'clear') {
      setLines([]);
      return;
    }
    const cmdLines = commands[trimmed] || [
      { type: 'output', text: `Commande inconnue : ${cmd}. Tapez 'help'.` }
    ];
    cmdLines.forEach(line => {
      if (line.type === 'output') {
        addLine({ text: line.text, color: line.color || (theme === 'light' ? 'text-gray-800' : 'text-green-400') });
      } else if (line.type === 'action') {
        line.fn();
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addLine({ text: `$ ${input}`, color: 'text-blue-600' });
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    // We keep the effect to handle lang or theme changes after mount
    const initialLines = commands.start.map(line => ({
      text: line.text,
      color: theme === 'light' ? 'text-gray-800' : 'text-green-400'
    }));
    setLines(initialLines);
  }, [commands, theme]);

  return (
    <div className={`rounded-xl border overflow-hidden ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'}`}>
      <div className={`px-4 py-2 flex items-center gap-2 border-b ${theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className={`text-xs ml-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>terminal ~ {lang.name}</span>
      </div>
      <div className={`p-4 font-mono text-sm h-80 overflow-y-auto ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-950 text-green-400'}`}>
        {lines.map((line, idx) => (
          <div key={idx} className={`${line.color} mb-1`}>
            {line.text}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className={`mr-2 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 bg-transparent outline-none ${theme === 'light' ? 'text-gray-800' : 'text-green-400'}`}
            placeholder="Tapez une commande..."
          />
        </form>
      </div>
    </div>
  );
};

export default CourseTerminal;