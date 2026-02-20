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

import { algoCourseData as courseData } from './algoCourseContent';

// =====================================================================
// COMPOSANTS INTERACTIFS
// =====================================================================

const TheoryViewer = ({ title, content, onComplete }) => {
  const renderContent = (text) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) return <h1 key={idx} className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 mt-2">{trimmed.replace('# ', '')}</h1>;
      if (trimmed.startsWith('## ')) return <h2 key={idx} className="text-xl md:text-2xl font-semibold text-purple-400 mb-3 mt-5">{trimmed.replace('## ', '')}</h2>;
      if (trimmed.startsWith('### ')) return <h3 key={idx} className="text-lg md:text-xl font-bold text-pink-400 mb-2 mt-4">{trimmed.replace('### ', '')}</h3>;
      if (trimmed.startsWith('> ')) return (
        <blockquote key={idx} className="border-l-4 border-yellow-500 pl-4 italic text-gray-300 my-3 bg-gray-800/30 p-3 rounded-r text-sm">
          {trimmed.replace('> ', '')}
        </blockquote>
      );
      if (trimmed.startsWith('* ')) {
        return <li key={idx} className="ml-4 md:ml-6 list-disc text-gray-300 mb-1 text-sm md:text-base">{trimmed.replace('* ', '')}</li>;
      }
      if (trimmed === '') return <div key={idx} className="h-3"></div>;

      if (line.includes('FONCTION ') || line.includes('SI ') || line.includes('POUR ') ||
        line.includes('TANT QUE ') || line.includes('FIN ') || line.includes('//')) {
        return (
          <div key={idx} className="my-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-950 border border-white/10 rounded-t-xl border-b-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Console Professeur</span>
            </div>
            <div className="font-mono text-sm md:text-base text-blue-300 bg-black/90 px-6 py-4 rounded-b-xl border border-white/10 border-t-0 shadow-2xl overflow-x-auto">
              {line}
            </div>
          </div>
        );
      }

      return <p key={idx} className="text-gray-300 leading-relaxed mb-4 text-base md:text-lg">{line}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 pb-24 h-full">
      <div className="bg-gray-900/40 p-6 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">{title}</h2>
        {renderContent(content)}

        <div className="mt-12 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Check size={32} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Prêt pour la suite ?</h4>
            <p className="text-gray-400 text-sm max-w-md">
              Si tu as bien assimilé ces concepts, clique sur le bouton ci-dessous pour valider cette étape.
            </p>
          </div>
          <button
            onClick={() => onComplete(true)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
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
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 h-full flex flex-col justify-center">
      <div className="bg-gray-800/40 rounded-3xl p-6 md:p-10 border border-white/5 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">{data.title}</h2>
        <div className="bg-gray-900/60 p-6 rounded-2xl mb-8 border-l-4 border-blue-500 shadow-inner">
          <p className="text-lg text-gray-200 leading-relaxed">{data.question}</p>
        </div>

        <div className="space-y-4">
          {data.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !submitted && setSelected(opt.id)}
              className={`w-full p-5 rounded-2xl text-left border transition-all flex justify-between items-center group
                ${submitted && opt.correct ? 'bg-green-500/10 border-green-500/50 ring-1 ring-green-500/50' : ''}
                ${submitted && selected === opt.id && !opt.correct ? 'bg-red-500/10 border-red-500/50' : ''}
                ${!submitted && selected === opt.id ? 'bg-blue-500/20 border-blue-500/50 ring-1 ring-blue-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}
              `}
            >
              <span className={`font-medium ${selected === opt.id ? 'text-white' : 'text-gray-400'}`}>{opt.text}</span>
              {submitted && opt.correct && <CheckCircle className="text-green-500 shrink-0" size={20} />}
              {submitted && selected === opt.id && !opt.correct && <X className="text-red-500 shrink-0" size={20} />}
            </button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-start gap-4"
          >
            <Lightbulb className="text-yellow-400 shrink-0" size={20} />
            <p className="text-blue-100/80 text-sm leading-relaxed">{data.explanation}</p>
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selected || submitted}
          className={`mt-10 w-full py-4 rounded-2xl font-black tracking-widest uppercase transition-all
            ${!selected || submitted ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 text-white'}
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
    <div className="flex flex-col h-full bg-[#0a0c12]">
      <div className="bg-[#0f121d] border-b border-white/5 p-6 shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <Code size={24} className="text-blue-500" /> {lesson.title}
        </h3>
        <p className="text-gray-400 mt-2 text-sm max-w-2xl">{lesson.instruction}</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 relative border-r border-white/5">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-[#0a0c12] text-blue-100/90 p-8 resize-none focus:outline-none font-mono text-base leading-relaxed"
            spellCheck="false"
            placeholder="// Écris ton algorithme ici..."
          />
        </div>

        <div className="w-full md:w-96 bg-[#0f121d] flex flex-col">
          <div className="p-4 border-b border-white/5 bg-black/20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
              <Terminal size={12} /> Console de sortie
            </span>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar">
            {output.map((log, i) => (
              <div key={i} className={`
                ${log.type === 'info' ? 'text-blue-400' : ''}
                ${log.type === 'success' ? 'text-green-500 font-bold' : ''}
                ${log.type === 'error' ? 'text-red-500' : ''}
                ${log.type === 'system' ? 'text-purple-400' : ''}
                ${log.type === 'hint' ? 'text-yellow-500 italic bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/10' : ''}
                whitespace-pre-wrap
              `}>
                {log.text}
              </div>
            ))}
            {output.length === 0 && <p className="text-gray-700 italic">En attente d'exécution...</p>}
          </div>
          <div className="p-6 bg-black/40">
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3
                ${isRunning ? 'bg-gray-800 text-gray-600' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20'}
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

const ProfessorBubble = ({ text, isThinking, onAskQuestion }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className="flex items-start gap-4 mb-8"
  >
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
      <Sparkles size={24} />
    </div>
    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none backdrop-blur-md relative group">
      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-white/10 border-b-[8px] border-b-transparent" />
      <p className="text-gray-200 text-sm md:text-base leading-relaxed italic">
        {isThinking ? "..." : text}
      </p>

      {/* Bouton d'action discret */}
      {!isThinking && (
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={onAskQuestion}
          className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20 transition-all"
        >
          <HelpCircle size={12} />
          Poser une question
        </motion.button>
      )}
    </div>
  </motion.div>
);

const AlgoCourse = ({ onClose, user, API_URL }) => {
  const [activeModuleId, setActiveModuleId] = useState('module1');
  const [activeChapterId, setActiveChapterId] = useState('chap1');
  const [activeLessonId, setActiveLessonId] = useState('algo_m_1_1');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentModule = courseData.find(m => m.id === activeModuleId);
  const currentChapter = currentModule?.chapters.find(c => c.id === activeChapterId);
  const currentLesson = currentChapter?.lessons.find(l => l.id === activeLessonId);

  // Nouveau state pour l'animation de changement de module
  const [showModuleCelebration, setShowModuleCelebration] = useState(false);

  const totalLessons = courseData.reduce((acc, mod) => acc + mod.chapters.reduce((acc2, chap) => acc2 + chap.lessons.length, 0), 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  // Flattened lessons for easier "Next" logic
  const allLessons = courseData.flatMap(m => m.chapters.flatMap(c => c.lessons));
  const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const isLastLesson = currentIndex === allLessons.length - 1;

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
        if (data && data.completedLessons) {
          setCompletedLessons(data.completedLessons);
          if (data.completedLessons.length > 0 && data.completedLessons.length < totalLessons) {
            const lastCompletedIndex = allLessons.findIndex(l => l.id === data.completedLessons[data.completedLessons.length - 1]);
            const nextIndex = Math.min(allLessons.length - 1, lastCompletedIndex + 1);
            const nextLesson = allLessons[nextIndex];

            // Trouver le module et le chapitre pour cette leçon
            for (const mod of courseData) {
              for (const chap of mod.chapters) {
                if (chap.lessons.find(l => l.id === nextLesson.id)) {
                  setActiveModuleId(mod.id);
                  setActiveChapterId(chap.id);
                  setActiveLessonId(nextLesson.id);
                  break;
                }
              }
            }
          }
        }
        setLoadingProgress(false);
      })
      .catch(err => {
        console.error("Erreur progress:", err);
        setLoadingProgress(false);
      });
  }, [user, API_URL]);

  // Proactivité : Suggérer des questions si l'utilisateur stagne
  useEffect(() => {
    if (loadingProgress || isTransitioning) return;

    const proactiveTimer = setTimeout(() => {
      // Déclencher un événement mystérieux pour l'IA
      const event = new CustomEvent('mysterious-ai-suggest', {
        detail: {
          text: `Je vois que tu étudies attentivement cette partie sur "${currentLesson?.title}". Est-ce qu'il y a quelque chose qui n'est pas clair pour toi ? Je suis là pour t'expliquer différemly si besoin !`,
          forceOpen: true
        }
      });
      window.dispatchEvent(event);
    }, 45000); // 45 secondes d'inactivité/lecture sur la leçon

    return () => clearTimeout(proactiveTimer);
  }, [activeLessonId, loadingProgress, isTransitioning]);

  const handleAskQuestion = () => {
    const event = new CustomEvent('mysterious-ai-open', {
      detail: { message: `J'ai une question sur la leçon "${currentLesson?.title}" : ` }
    });
    window.dispatchEvent(event);
  };

  const goToNextLesson = () => {
    if (isLastLesson) return;
    setIsTransitioning(true);

    const nextLesson = allLessons[currentIndex + 1];

    // Vérifier si on change de module
    let nextMod = null;
    for (const mod of courseData) {
      for (const chap of mod.chapters) {
        if (chap.lessons.find(l => l.id === nextLesson.id)) {
          nextMod = mod;
          break;
        }
      }
      if (nextMod) break;
    }

    const changedModule = nextMod && nextMod.id !== activeModuleId;

    setTimeout(() => {
      if (nextMod) {
        // Si on change de module, on peut afficher une petite célébration
        if (changedModule) {
          setShowModuleCelebration(true);
          setTimeout(() => setShowModuleCelebration(false), 3000);
        }

        // Trouver le chapitre
        let nextChap = null;
        for (const chap of nextMod.chapters) {
          if (chap.lessons.find(l => l.id === nextLesson.id)) {
            nextChap = chap;
            break;
          }
        }

        setActiveModuleId(nextMod.id);
        setActiveChapterId(nextChap.id);
        setActiveLessonId(nextLesson.id);
      }
      setIsTransitioning(false);
    }, 400);
  };

  const goToPreviousLesson = () => {
    if (currentIndex === 0) return;
    setIsTransitioning(true);

    const prevLesson = allLessons[currentIndex - 1];

    // Trouver module et chapitre
    let prevMod = null;
    let prevChap = null;
    for (const mod of courseData) {
      for (const chap of mod.chapters) {
        if (chap.lessons.find(l => l.id === prevLesson.id)) {
          prevMod = mod;
          prevChap = chap;
          break;
        }
      }
      if (prevMod) break;
    }

    setTimeout(() => {
      setActiveModuleId(prevMod.id);
      setActiveChapterId(prevChap.id);
      setActiveLessonId(prevLesson.id);
      setIsTransitioning(false);
    }, 400);
  };

  const handleLessonCompletion = async (success) => {
    if (success && !completedLessons.includes(activeLessonId)) {
      setCompletedLessons(prev => [...prev, activeLessonId]);
      if (user && API_URL) {
        try {
          await fetch(`${API_URL}/courses/algo/progress`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
              lessonId: activeLessonId,
              totalLessons: totalLessons
            })
          });
        } catch (err) {
          console.error("Erreur save progress", err);
        }
      }
    }
  };

  if (loadingProgress) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050810] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6" />
        <p className="font-mono text-xs tracking-widest text-blue-400 uppercase">Consultation du grimoire...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050810] text-gray-100 flex flex-col font-sans overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

      {/* Module Celebration Overlay */}
      <AnimatePresence>
        {showModuleCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="bg-blue-600/90 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
                <Trophy size={40} className="text-yellow-400" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Nouveau Module !</h3>
                <p className="text-blue-100 font-medium">{currentModule?.title}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-16 md:h-20 bg-[#0a0c12]/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="flex flex-col">
            <h1 className="font-bold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span className="text-blue-500 font-black italic hidden sm:inline">ALGO</span>
              <span className="opacity-50 hidden sm:inline">|</span>
              <span className="truncate max-w-[150px] md:max-w-none">{currentLesson?.title}</span>
            </h1>
            {/* Breadcrumb for mobile clarity */}
            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <span className="text-purple-400/80">{currentModule?.title.split(':')[0]}</span>
              <ChevronRight size={10} className="opacity-30" />
              <span className="truncate max-w-[100px]">{currentChapter?.title}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end gap-1">
            <div className="flex gap-2 text-[10px] font-black tracking-widest text-gray-500">
              <span>Maîtrise :</span>
              <span className="text-blue-400">{progress}%</span>
            </div>
            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Trophy size={14} className="text-yellow-500" />
            <span className="text-xs font-bold text-blue-400">{completedLessons.length}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-y-auto custom-scrollbar relative px-4 py-8 md:px-0 scroll-smooth">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <ProfessorBubble
                text={currentLesson?.professorSpeech || "C'est parti ! Apprenons ensemble."}
                isThinking={isTransitioning}
                onAskQuestion={handleAskQuestion}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {!isTransitioning && (
                <motion.div
                  key={activeLessonId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-24"
                >
                  {currentLesson?.type === 'theory' && <TheoryViewer title={currentLesson.title} content={currentLesson.content} onComplete={handleLessonCompletion} />}
                  {currentLesson?.type === 'practice' && <CodeEditor lesson={currentLesson} onComplete={handleLessonCompletion} />}
                  {currentLesson?.type === 'quiz' && <QuizViewer data={currentLesson} onComplete={handleLessonCompletion} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer Navigation - Floating Button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6 flex gap-4">
          <button
            onClick={goToPreviousLesson}
            disabled={currentIndex === 0 || isTransitioning}
            className={`
              w-20 p-5 rounded-3xl font-black transition-all flex items-center justify-center shadow-2xl
              ${currentIndex === 0 || isTransitioning
                ? 'bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed'
                : 'bg-white/5 text-white hover:bg-white/10 active:scale-95'
              }
            `}
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={goToNextLesson}
            disabled={!completedLessons.includes(activeLessonId) || isLastLesson || isTransitioning}
            className={`
              flex-1 p-5 rounded-3xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl
              ${!completedLessons.includes(activeLessonId) || isLastLesson || isTransitioning
                ? 'bg-gray-800 text-gray-600 opacity-50 cursor-not-allowed border border-white/5'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] active:scale-95 shadow-blue-500/20'
              }
            `}
          >
            {isLastLesson ? "Grimoire Terminé !" : "Continuer l'aventure"}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgoCourse;