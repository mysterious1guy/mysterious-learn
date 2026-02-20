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

const ProfessorBubble = ({ text, isThinking, onAskQuestion }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className="flex items-start gap-4 mb-8"
  >
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
      <Sparkles size={24} />
    </div>
    <div className="bg-white border border-slate-200 p-5 rounded-3xl rounded-tl-none shadow-sm relative group">
      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-white border-b-[8px] border-b-transparent" />
      <p className="text-slate-700 text-sm md:text-base leading-relaxed italic font-medium">
        {isThinking ? "..." : text}
      </p>

      {!isThinking && (
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={onAskQuestion}
          className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 transition-all"
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

  // --- AUTO THEATER TRIGGER ---
  useEffect(() => {
    if (!currentLesson || isTransitioning) return;

    if (currentLesson.type === 'theory' || currentLesson.type === 'quiz') {
      const timer = setTimeout(() => {
        const eventType = currentLesson.type;
        const event = new CustomEvent('mysterious-ai-theater-open', {
          detail: {
            type: eventType,
            title: currentLesson.title,
            node: eventType === 'theory' ? (
              <TheoryViewer
                title={currentLesson.title}
                content={currentLesson.content}
                onComplete={(success) => {
                  handleLessonCompletion(success);
                  window.dispatchEvent(new CustomEvent('mysterious-ai-theater-close'));
                }}
              />
            ) : (
              <QuizViewer
                data={currentLesson}
                onComplete={(success) => {
                  handleLessonCompletion(success);
                  if (success) setTimeout(() => window.dispatchEvent(new CustomEvent('mysterious-ai-theater-close')), 2000);
                }}
              />
            )
          }
        });
        window.dispatchEvent(event);
      }, 1000); // 1s delay for smooth transition
      return () => clearTimeout(timer);
    }
  }, [activeLessonId, isTransitioning, currentLesson]);

  if (loadingProgress) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6" />
        <p className="font-mono text-xs tracking-widest text-blue-600 uppercase font-black text-center">Consultation du grimoire...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent)] pointer-events-none" />

      {/* Module Celebration Overlay */}
      <AnimatePresence>
        {showModuleCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="bg-blue-600 text-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center gap-4">
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="mb-24"
                >
                  {currentLesson?.type === 'theory' && (
                    <div className="flex flex-col items-center py-20 text-center">
                      <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20">
                        <BookOpen size={48} className="text-blue-500 animate-pulse" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-4 italic tracking-tighter">Déploiement du Savoir...</h2>
                      <p className="text-gray-500 mb-10 max-w-sm">Le Professeur expose actuellement la leçon au centre de la salle.</p>
                      <button
                        onClick={() => {
                          const event = new CustomEvent('mysterious-ai-theater-open', {
                            detail: {
                              type: 'theory',
                              title: currentLesson.title,
                              node: <TheoryViewer title={currentLesson.title} content={currentLesson.content} onComplete={(success) => {
                                handleLessonCompletion(success);
                                window.dispatchEvent(new CustomEvent('mysterious-ai-theater-close'));
                              }} />
                            }
                          });
                          window.dispatchEvent(event);
                        }}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all flex items-center gap-3 group"
                      >
                        <Maximize2 size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        Ouvrir le Théâtre du Savoir
                      </button>
                    </div>
                  )}
                  {currentLesson?.type === 'quiz' && (
                    <div className="flex flex-col items-center py-20 text-center">
                      <div className="w-32 h-32 rounded-full bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20">
                        <HelpCircle size={48} className="text-purple-500 animate-bounce" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-4 italic tracking-tighter">Épreuve de Logique...</h2>
                      <p className="text-gray-500 mb-10 max-w-sm">Le quiz est en cours d'exposition sur la scène principale.</p>
                      <button
                        onClick={() => {
                          const event = new CustomEvent('mysterious-ai-theater-open', {
                            detail: {
                              type: 'quiz',
                              title: currentLesson.title,
                              node: <QuizViewer data={currentLesson} onComplete={(success) => {
                                handleLessonCompletion(success);
                                if (success) setTimeout(() => window.dispatchEvent(new CustomEvent('mysterious-ai-theater-close')), 2000);
                              }} />
                            }
                          });
                          window.dispatchEvent(event);
                        }}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all flex items-center gap-3 group"
                      >
                        <Trophy size={20} className="text-purple-400 group-hover:rotate-12 transition-transform" />
                        Accéder à la Scène Quizz
                      </button>
                    </div>
                  )}
                  {currentLesson?.type === 'practice' && <CodeEditor lesson={currentLesson} onComplete={handleLessonCompletion} />}
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