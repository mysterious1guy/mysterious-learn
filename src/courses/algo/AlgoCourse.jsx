import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, ChevronDown, Code, BookOpen,
  CheckCircle, Circle, Terminal, Play, Cpu, Database, Box,
  Layers, AlertTriangle, Info, Check, X, RefreshCw,
  Maximize2, Minimize2, Save, Trophy, Lock, FileText,
  HelpCircle, Lightbulb, Award, Star, Target, GitBranch,
  TrendingUp, Clock, Filter, Search, Repeat, Zap, Sparkles
} from 'lucide-react';

import CourseClassroom from '../../components/CourseClassroom';
import LogicVisualizer from '../../components/LogicVisualizer';
import { algoCourseData as courseData } from './algoCourseContent';

// =====================================================================
// COMPOSANTS INTERACTIFS
// =====================================================================

const InteractiveInsight = ({ prompt, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-6">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            const event = new CustomEvent('mysterious-ai-murmur', {
              detail: { text: "Excellente curiosité ! Découvrir par soi-même vaut mille explications." }
            });
            window.dispatchEvent(event);
          }
        }}
        className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${isOpen ? 'bg-blue-50 border-blue-200 rounded-b-none' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}
      >
        <span className="font-bold text-blue-700 flex items-center gap-3">
          <HelpCircle size={20} className={isOpen ? 'text-blue-500' : 'text-slate-400'} />
          {prompt}
        </span>
        <ChevronDown size={20} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-slate-50 border border-t-0 border-blue-200 rounded-b-2xl">
              <p className="text-slate-700 font-medium ">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TheoryViewer = ({ title, content, onComplete }) => {
  const renderRichText = (text) => {
    // Handling bold **text**
    // Handling italic ""text"" or ''text''
    // Handling inline code `code`

    const parts = text.split(/(\*\*.*?\*\*|""|''|`.*?`|\[!.*?\])/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-blue-700 font-black">{part.slice(2, -2)}</strong>;
      }
      if ((part.startsWith('""') && part.endsWith('""')) || (part.startsWith("''") && part.endsWith("''"))) {
        return <span key={i} className="text-purple-700 italic font-bold">{part.slice(2, -2)}</span>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="px-2 py-0.5 bg-slate-200 border border-slate-300 rounded text-pink-600 font-mono text-sm shadow-sm">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) return <h1 key={idx} className="text-2xl md:text-3xl font-black text-blue-700 mb-6 mt-4 italic tracking-tighter uppercase">{trimmed.replace('# ', '')}</h1>;
      if (trimmed.startsWith('## ')) return <h2 key={idx} className="text-xl md:text-2xl font-black text-purple-700 mb-4 mt-6 italic tracking-tight uppercase">{trimmed.replace('## ', '')}</h2>;
      if (trimmed.startsWith('### ')) return <h3 key={idx} className="text-lg md:text-xl font-black text-pink-600 mb-3 mt-5 uppercase">{trimmed.replace('### ', '')}</h3>;
      if (trimmed.startsWith('> ')) return (
        <blockquote key={idx} className="border-l-4 border-yellow-500 pl-6 italic text-slate-700 my-6 bg-slate-100 p-6 rounded-r-3xl text-base shadow-sm">
          {renderRichText(trimmed.replace('> ', ''))}
        </blockquote>
      );
      if (trimmed.startsWith('* ')) {
        return <li key={idx} className="ml-4 md:ml-8 list-disc text-slate-700 mb-2 text-sm md:text-base font-medium">{renderRichText(trimmed.replace('* ', ''))}</li>;
      }
      if (trimmed.startsWith('[?] ')) {
        const parts = trimmed.replace('[?] ', '').split('|');
        if (parts.length >= 2) {
          return <InteractiveInsight key={idx} prompt={parts[0].trim()} answer={parts.slice(1).join('|').trim()} />;
        }
      }
      if (trimmed === '') return <div key={idx} className="h-3"></div>;

      if (line.includes('FONCTION ') || line.includes('SI ') || line.includes('POUR ') ||
        line.includes('TANT QUE ') || line.includes('FIN ') || line.includes('//') || line.includes(' <- ') || line.includes(' := ')) {
        return (
          <div key={idx} className="my-8 group">
            <div className="flex items-center gap-2 px-6 py-3 bg-slate-100 border border-slate-200 rounded-t-[2rem] border-b-0 shadow-sm transition-all group-hover:bg-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.2em] ml-3">Terminal Professeur</span>
            </div>
            <div className="font-mono text-sm md:text-base text-blue-700 bg-white px-8 py-6 rounded-b-[2rem] border border-slate-200 border-t-0 shadow-lg shadow-blue-500/5 group-hover:shadow-blue-500/10 transition-all overflow-x-auto">
              {line}
            </div>
          </div>
        );
      }

      if (trimmed.startsWith('[VISUALIZER]')) {
        try {
          const jsonStr = trimmed.replace('[VISUALIZER]', '').trim();
          const visualizerData = JSON.parse(jsonStr);
          return <LogicVisualizer key={idx} {...visualizerData} />;
        } catch (e) {
          console.error("Invalid Visualizer JSON", e);
          return null;
        }
      }

      return <p key={idx} className="text-slate-700 leading-relaxed mb-6 text-base md:text-lg font-medium">{renderRichText(line)}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 pb-24 h-full">
      <div className="bg-white/40 p-6 md:p-10 rounded-3xl border border-slate-200 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        </div>
        {renderContent(content)}

        <div className="mt-12 p-8 bg-blue-500/5 rounded-3xl border border-blue-200 flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Check size={32} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Prêt pour la suite ?</h4>
            <p className="text-slate-500 text-sm max-w-md">
              Si tu as bien assimilé ces concepts, clique sur le bouton ci-dessous pour valider cette étape.
            </p>
          </div>
          <button
            onClick={() => {
              const event = new CustomEvent('mysterious-ai-murmur', {
                detail: { text: "Bravo ! Passons à la suite. La curiosité est ton meilleur atout." }
              });
              window.dispatchEvent(event);
              onComplete(true);
            }}
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(59,130,246,0.1)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.2)] hover:scale-105 active:scale-95 flex items-center gap-3 group"
          >
            <Sparkles size={20} className="group-hover:animate-pulse" />
            J'ai compris !
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizViewer = ({ data, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = data.options.find(opt => opt.id === selected)?.correct;
    onComplete(correct);
    setShowExplanation(true);

    // AI Murmur on Quiz result
    const event = new CustomEvent('mysterious-ai-murmur', {
      detail: { text: correct ? "Excellent ! Ton raisonnement est parfaitement logique." : "Pas tout à fait... Mais comme on dit : 'On ne perd jamais, soit on gagne, soit on apprend !'" }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 h-full flex flex-col justify-center">
      <div className="bg-white/70 rounded-[3rem] p-6 md:p-10 border border-slate-200 backdrop-blur-md shadow-xl">
        <h2 className="text-2xl font-black mb-6 text-slate-900 tracking-tight italic uppercase">{data.title}</h2>
        <div className="bg-slate-50 p-6 rounded-2xl mb-8 border-l-4 border-blue-500 shadow-sm">
          <p className="text-lg text-slate-700 font-medium leading-relaxed">{data.question}</p>
        </div>

        <div className="space-y-4">
          {data.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !submitted && setSelected(opt.id)}
              className={`w-full p-5 rounded-2xl text-left border transition-all flex justify-between items-center group
                ${submitted && opt.correct ? 'bg-green-500/10 border-green-500/30' : ''}
                ${submitted && selected === opt.id && !opt.correct ? 'bg-red-500/10 border-red-500/30' : ''}
                ${!submitted && selected === opt.id ? 'bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/30' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}
              `}
            >
              <span className={`font-bold ${selected === opt.id ? 'text-blue-600' : 'text-slate-500'}`}>{opt.text}</span>
              {submitted && opt.correct && <CheckCircle className="text-green-500 shrink-0" size={20} />}
              {submitted && selected === opt.id && !opt.correct && <X className="text-red-500 shrink-0" size={20} />}
            </button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4"
          >
            <Lightbulb className="text-yellow-500 shrink-0" size={20} />
            <p className="text-slate-600 text-sm leading-relaxed">{data.explanation}</p>
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selected || submitted}
          className={`mt-10 w-full py-4 rounded-2xl font-black tracking-widest uppercase transition-all
            ${!selected || submitted ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 text-white'}
          `}
        >
          {submitted ? 'Validé ✓' : 'Vérifier ma réponse'}
        </button>
      </div>
    </div>
  );
};

const CodeEditor = ({ lesson, onComplete }) => {
  const [code, setCode] = useState(lesson.initialCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([{ type: 'info', text: 'Compilateur virtuel en cours d\'initialisation...' }]);

    setTimeout(() => {
      const logs = [];
      let passed = false;

      if (lesson.validationRegex && lesson.validationRegex.test(code)) {
        passed = true;
      }

      if (passed) {
        logs.push({ type: 'success', text: '✅ Algorithme Validé avec succès !' });
        logs.push({ type: 'system', text: 'Analyse logicielle terminée. Résultat positif.' });
        setTimeout(() => onComplete(true), 2000);
      } else {
        logs.push({ type: 'error', text: '❌ Échec de la validation.' });
        logs.push({ type: 'hint', text: 'Indices :\n' + (lesson.hints?.join('\n') || 'Relisez attentivement la consigne.') });
      }

      setOutput(logs);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 p-6 shrink-0 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 italic tracking-tight">
          <Terminal size={24} className="text-blue-600" /> {lesson.title}
        </h3>
        <p className="text-slate-500 mt-2 text-sm max-w-2xl font-medium">{lesson.instruction}</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 relative border-r border-slate-100">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-slate-50 text-slate-800 p-8 resize-none focus:outline-none font-mono text-base leading-relaxed"
            spellCheck="false"
            placeholder="// Écris ton algorithme ici..."
          />
        </div>

        <div className="w-full md:w-96 bg-white flex flex-col shadow-2xl">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Terminal size={12} /> Console de sortie
            </span>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar bg-white">
            {output.map((log, i) => (
              <div key={i} className={`
                ${log.type === 'info' ? 'text-blue-600' : ''}
                ${log.type === 'success' ? 'text-green-600 font-bold' : ''}
                ${log.type === 'error' ? 'text-red-600' : ''}
                ${log.type === 'system' ? 'text-purple-600' : ''}
                ${log.type === 'hint' ? 'text-slate-500 italic bg-slate-100 p-3 rounded-xl border border-slate-200' : ''}
                whitespace-pre-wrap
              `}>
                {log.text}
              </div>
            ))}
            {output.length === 0 && <p className="text-slate-300 italic">En attente d'exécution...</p>}
          </div>
          <div className="p-6 bg-slate-50/50 border-t border-slate-100">
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3
                ${isRunning ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'}
              `}
            >
              {isRunning ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} />}
              {isRunning ? 'Exécution...' : 'Valider mon code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlgoCourse = ({ onClose, user, API_URL }) => {
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showClassroomIntro, setShowClassroomIntro] = useState(true);

  // Mettre à plat toutes les leçons
  const allLessons = courseData.flatMap(m => m.chapters.flatMap(c => c.lessons));

  // Générer les positions pour le Node Map (Zig-zag vertical)
  const COLUMNS = 3;
  const X_SPACING = 250;
  const Y_SPACING = 150;

  const nodes = allLessons.map((lesson, index) => {
    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;
    // Si ligne impaire, on inverse la direction
    const xMultiplier = row % 2 !== 0 ? (params => (COLUMNS - 1) - params)(col) : col;

    return {
      ...lesson,
      x: xMultiplier * X_SPACING + 100,
      y: row * Y_SPACING + 100,
      isUnlocked: index === 0 || completedLessons.includes(allLessons[index - 1].id),
      isCompleted: completedLessons.includes(lesson.id)
    };
  });

  useEffect(() => {
    if (!user || !API_URL) {
      setLoadingProgress(false);
      return;
    }
    fetch(`${API_URL}/courses/algo/progress`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.completedLessons) setCompletedLessons(data.completedLessons);
        setLoadingProgress(false);
      })
      .catch(err => {
        console.error("Erreur progress:", err);
        setLoadingProgress(false);
      });
  }, [user, API_URL]);

  // Si on ouvre une leçon (clic sur un noeud)
  const openNode = (lesson) => {
    if (!lesson.isUnlocked) return;
    setActiveLessonId(lesson.id);

    // Déclenche l'Oracle
    window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
      detail: { text: "Accès à la mémoire du noeud en cours... Analyse de la logique." }
    }));

    const eventType = lesson.type;
    const event = new CustomEvent('mysterious-ai-theater-open', {
      detail: {
        type: eventType,
        title: lesson.title,
        node: eventType === 'theory' ? (
          <TheoryViewer
            title={lesson.title}
            content={lesson.content}
            onComplete={(success) => handleLessonCompletion(lesson.id, success)}
          />
        ) : eventType === 'quiz' ? (
          <QuizViewer
            data={lesson}
            onComplete={(success) => handleLessonCompletion(lesson.id, success)}
          />
        ) : (
          <CodeEditor lesson={lesson} onComplete={(success) => handleLessonCompletion(lesson.id, success)} />
        )
      }
    });
    window.dispatchEvent(event);
  };

  const handleLessonCompletion = async (id, success) => {
    if (success && !completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id]);
      window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
        detail: { text: "Séquence validée. Connexion au prochain noeud établie." }
      }));
      if (user && API_URL) {
        try {
          await fetch(`${API_URL}/courses/algo/progress`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({ lessonId: id, totalLessons: allLessons.length })
          });
        } catch (err) { }
      }
      setTimeout(() => window.dispatchEvent(new CustomEvent('mysterious-ai-theater-close')), 1500);
    }
  };

  if (loadingProgress) {
    return (
      <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6" />
        <p className="font-mono text-xs tracking-widest text-emerald-500 uppercase font-black text-center">Initialisation du Réseau Neuronal...</p>
      </div>
    );
  }

  if (showClassroomIntro) {
    return (
      <CourseClassroom
        courseTitle="Protocole: ALGORITHMIQUE"
        courseDescription="Ici la théorie n'existe pas. Seule la logique fait loi. Explore le réseau neuronal et connecte les concepts."
        onEnter={() => setShowClassroomIntro(false)}
      />
    );
  }

  // Dimensions virtelles du canvas draggable
  const canvasWidth = COLUMNS * X_SPACING + 200;
  const canvasHeight = Math.ceil(allLessons.length / COLUMNS) * Y_SPACING + 200;

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] text-emerald-50 flex flex-col font-sans overflow-hidden pattern-grid-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/90 to-emerald-900/20 pointer-events-none" />

      {/* Glitch Overlay effect */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Cybernetic HUD Header */}
      <header className="h-20 bg-black/80 backdrop-blur-md border-b border-emerald-500/20 flex items-center justify-between px-8 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-2 hover:bg-emerald-500/10 rounded-xl text-emerald-500 transition-all border border-transparent hover:border-emerald-500/30">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="font-black text-sm md:text-xl tracking-widest flex items-center gap-3 text-white uppercase">
              <Cpu size={20} className="text-emerald-500" /> SYSTEM.ALGO
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-emerald-500/70 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: ONLINE // Rendu Neuronal Actif
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 font-mono">
          <div className="flex gap-2 text-xs font-black tracking-widest text-emerald-500/50">
            <span>NODES:</span>
            <span className="text-emerald-400">{completedLessons.length} / {allLessons.length}</span>
          </div>
          <div className="w-40 h-1 bg-emerald-900/30 rounded-full overflow-hidden shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
            />
          </div>
        </div>
      </header>

      {/* Draggable Map Area */}
      <div className="flex-1 relative overflow-hidden cursor-move">
        <motion.div
          drag
          dragConstraints={{
            top: -canvasHeight + window.innerHeight - 100,
            left: -canvasWidth + window.innerWidth - 100,
            right: 100,
            bottom: 100
          }}
          className="absolute origin-top-left"
          style={{ width: canvasWidth, height: canvasHeight }}
        >
          {/* SVG Connecting Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, i) => {
              if (i === nodes.length - 1) return null;
              const nextNode = nodes[i + 1];
              const isPathCompleted = node.isCompleted && nextNode.isCompleted;
              const isPathUnlocked = node.isCompleted;

              return (
                <motion.line
                  key={`line-${i}`}
                  x1={node.x} y1={node.y}
                  x2={nextNode.x} y2={nextNode.y}
                  stroke={isPathCompleted ? '#10b981' : isPathUnlocked ? '#0ea5e9' : '#1e293b'}
                  strokeWidth={isPathCompleted ? "3" : "2"}
                  strokeDasharray={!isPathCompleted ? "5,5" : "none"}
                  className="transition-colors duration-1000"
                />
              );
            })}
          </svg>

          {/* Nodes Render */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              onClick={() => openNode(node)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
              whileHover={node.isUnlocked ? { scale: 1.1 } : {}}
              whileTap={node.isUnlocked ? { scale: 0.9 } : {}}
            >
              <div className={`
                        relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500
                        ${node.isCompleted ? 'bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)] text-emerald-400'
                  : node.isUnlocked ? 'bg-blue-900/40 border-2 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse'
                    : 'bg-slate-900/80 border-2 border-slate-800 text-slate-600'}
                    `}>
                {node.type === 'theory' && <BookOpen size={24} />}
                {node.type === 'quiz' && <HelpCircle size={24} />}
                {node.type === 'practice' && <Code size={24} />}

                {/* Node Label */}
                <div className="absolute top-20 w-48 text-center pointer-events-none">
                  <p className={`text-xs font-black tracking-widest uppercase truncate ${node.isCompleted ? 'text-emerald-400' : node.isUnlocked ? 'text-blue-400' : 'text-slate-600'}`}>
                    {node.title}
                  </p>
                  {node.isCompleted && <span className="text-[9px] text-emerald-500 font-mono mt-1 block">DONNÉE_ASSIMILÉE</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* UI Guidance Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 text-emerald-500/50 font-mono text-[10px] tracking-widest pointer-events-none uppercase">
        <span>{'>'} Glisse pour naviguer le réseau</span>
        <span>// Clique sur un noeud pour l'assimiler {'<'}</span>
      </div>
    </div>
  );
};

export default AlgoCourse;