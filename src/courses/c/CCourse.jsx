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
import { cCourseData as courseData } from './cCourseContent';

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
              detail: { text: "C'est une excellente question ! Apprendre par soi-même est très efficace." }
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
            <div className="font-mono text-sm md:text-base text-blue-700 bg-white px-4 md:px-8 py-4 md:py-6 rounded-b-[2rem] border border-slate-200 border-t-0 shadow-lg shadow-blue-500/5 group-hover:shadow-blue-500/10 transition-all overflow-x-auto max-w-full">
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
    <div className="max-w-4xl mx-auto p-0 md:p-8 pb-24 h-full">
      <div className="bg-white/40 p-4 md:p-8 rounded-3xl border border-slate-200 backdrop-blur-sm shadow-sm">
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
                detail: { text: "C'est compris ! Ton apprentissage avance bien." }
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
      detail: { text: correct ? "C'est juste ! Ton raisonnement est très bon." : "Pas tout à fait... Analyse bien la question et réessaye !" }
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

const CCourse = ({ onClose, user, API_URL }) => {
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showClassroomIntro, setShowClassroomIntro] = useState(true);

  // Mettre à plat toutes les leçons
  const allLessons = courseData.flatMap(m => m.chapters.flatMap(c => c.lessons));

  // =====================================================================
  // CALCUL DES NŒUDS POUR LA TIMELINE VERTICALE
  // =====================================================================
  // Au lieu d'une grille complexe sinueuse, nous allons faire une Timeline verticale simple et belle.

  const nodes = allLessons.map((lesson, index) => {
    return {
      ...lesson,
      isUnlocked: index === 0 || completedLessons.includes(allLessons[index - 1].id),
      isCompleted: completedLessons.includes(lesson.id)
    };
  });

  const openNode = (node) => {
    if (!node?.isUnlocked) return;
    setActiveLessonId(node.id);
  };

  const closeLesson = () => setActiveLessonId(null);

  const handleLessonCompletion = (success) => {
    if (success && activeLessonId) {
      if (!completedLessons.includes(activeLessonId)) {
        setCompletedLessons([...completedLessons, activeLessonId]);
      }
      setTimeout(() => closeLesson(), 1500);
    }
  };

  const activeLesson = activeLessonId ? allLessons.find(l => l.id === activeLessonId) : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 text-slate-800 flex flex-col font-sans overflow-hidden pattern-grid-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/50 pointer-events-none" />

      {/* Glitch Overlay effect */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/stardust.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />

      {/* Header */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-50 shadow-sm relative">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-all border border-transparent hover:border-slate-200">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="font-black text-sm md:text-xl tracking-widest flex items-center gap-3 text-slate-900 uppercase">
              <Cpu size={20} className="text-blue-600" /> SYSTEM.C
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-blue-600/70 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              STATUS: ONLINE // Langage Fondateur
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 font-mono hidden md:flex">
          <div className="flex gap-2 text-xs font-black tracking-widest text-slate-400">
            <span>NODES:</span>
            <span className="text-blue-600">{completedLessons.length} / {allLessons.length}</span>
          </div>
          <div className="w-40 h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
              className="h-full bg-blue-500"
            />
          </div>
        </div>
      </header>

      {/* Scrollable Map Area - TIMELINE VERTICALE */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden touch-pan-y custom-scrollbar flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-lg relative">

          {/* Ligne Centrale Globale */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 z-0" />

          {courseData.map((module, mIdx) => (
            <div key={module.id} className="mb-16 w-full relative z-10">
              {/* Module Header */}
              <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm py-4 mb-8 border-y border-slate-200 flex justify-center">
                <div className="flex items-center gap-4 bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
                  <span className="text-blue-600 bg-blue-50 p-2 rounded-xl border border-blue-100">
                    {module.icon}
                  </span>
                  <div>
                    <h3 className="font-black text-slate-900 text-base md:text-lg tracking-widest uppercase">{module.title}</h3>
                    <p className="text-xs text-slate-500 font-mono line-clamp-1">{module.description}</p>
                  </div>
                </div>
              </div>

              {/* Lessons dans ce Module */}
              <div className="flex flex-col gap-10 md:gap-14 w-full">
                {module.chapters.flatMap(c => c.lessons).map((lessonObj, lIdx) => {
                  // Recherche globale pour l'état d'unlock
                  const globalNode = nodes.find(n => n.id === lessonObj.id);
                  const isUnlocked = globalNode?.isUnlocked;
                  const isCompleted = globalNode?.isCompleted;

                  // Alterner gauche/droite sur Desktop
                  const alignLeft = lIdx % 2 === 0;

                  return (
                    <motion.div
                      key={lessonObj.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: lIdx * 0.1 }}
                      className={`flex items-center w-full relative ${alignLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                    >
                      {/* Ligne Connectrice Horizontale (Desktop uniquement) */}
                      <div className={`hidden md:block absolute top-1/2 w-[calc(50%-4rem)] h-1 -translate-y-1/2 -z-10
                               ${isCompleted ? 'bg-blue-500' : isUnlocked ? 'bg-blue-200' : 'bg-slate-200'}
                               ${alignLeft ? 'left-16' : 'right-16'}
                           `} />

                      {/* Composant Centré (Icone) */}
                      <div className="absolute left-[39px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-50 rounded-full p-1 border border-slate-50">
                        <div
                          onClick={() => openNode(globalNode)}
                          className={`
                                w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
                                hover:scale-110 active:scale-95 border-2
                                ${isCompleted ? 'bg-blue-100 border-blue-500 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                              : isUnlocked ? 'bg-white border-blue-300 text-blue-400 shadow-[0_5px_15px_rgba(0,0,0,0.05)]'
                                : 'bg-slate-100 border-slate-200 text-slate-400 opacity-80'}
                               `}
                        >
                          {lessonObj.type === 'theory' && <BookOpen size={24} />}
                          {lessonObj.type === 'quiz' && <HelpCircle size={24} />}
                          {lessonObj.type === 'practice' && <Code size={24} />}

                          {isCompleted && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                              <CheckCircle size={18} className="text-green-500 fill-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Carte de Contenu */}
                      <div className={`
                              w-full md:w-[calc(50%-4rem)] pl-24 md:pl-0 
                              ${alignLeft ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}
                           `}>
                        <div
                          onClick={() => openNode(globalNode)}
                          className={`
                                  relative z-10 bg-white p-4 md:p-5 rounded-2xl cursor-pointer transition-all border
                                  hover:-translate-y-1 hover:shadow-lg
                                  ${isCompleted ? 'border-blue-300 shadow-sm'
                              : isUnlocked ? 'border-blue-200 shadow-sm'
                                : 'border-slate-200 bg-slate-50 opacity-70'}
                                 `}
                        >
                          <div className={`flex items-center gap-2 mb-2 ${alignLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded
                                      ${lessonObj.type === 'theory' ? 'bg-purple-100 text-purple-700' :
                                lessonObj.type === 'quiz' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-pink-100 text-pink-700'}
                                    `}>
                              {lessonObj.type === 'theory' ? 'Théorie' : lessonObj.type === 'quiz' ? 'Quiz' : 'Pratique'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{lessonObj.duration}</span>
                          </div>
                          <h4 className={`text-base md:text-lg font-bold truncate text-slate-900`}>
                            {lessonObj.title}
                          </h4>
                          <p className="text-slate-500 text-xs md:text-sm mt-1 line-clamp-2 md:line-clamp-none">
                            {lessonObj.professorSpeech || "Clique pour décrypter cette information."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Fin de Timeline */}
          <div className="w-full flex justify-center py-10 opacity-70 relative z-20">
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-full flex items-center gap-3 shadow-sm">
              <Trophy size={16} className="text-blue-500" />
              <span className="text-xs font-mono font-black tracking-widest text-slate-500 uppercase">Fin de Ligne</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeLesson && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <div className="bg-slate-50 w-full max-w-5xl h-full md:h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col relative border border-slate-200">
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={closeLesson}
                  className="bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-colors border border-slate-200 shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden bg-white rounded-3xl m-2 md:m-4 mt-16 md:mt-20">
                {activeLesson.type === 'theory' && (
                  <TheoryViewer
                    title={activeLesson.title}
                    content={activeLesson.content}
                    onComplete={handleLessonCompletion}
                  />
                )}
                {activeLesson.type === 'practice' && (
                  <CodeEditor
                    lesson={activeLesson}
                    onComplete={handleLessonCompletion}
                  />
                )}
                {activeLesson.type === 'quiz' && (
                  <QuizViewer
                    data={activeLesson}
                    onComplete={handleLessonCompletion}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CCourse;