import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, Play, RefreshCw, CheckCircle2, ArrowLeft, HelpCircle, ChevronDown, Check, Sparkles, BookOpen } from 'lucide-react';
import { courseData } from './bashCourseContent';
import LogicVisualizer from '../../components/LogicVisualizer';

const InteractiveInsight = ({ prompt, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${isOpen ? 'bg-slate-800 border-slate-700 rounded-b-none' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 shadow-sm'}`}
      >
        <span className="font-bold text-green-400 flex items-center gap-3">
          <HelpCircle size={20} className={isOpen ? 'text-green-400' : 'text-slate-500'} />
          {prompt}
        </span>
        <ChevronDown size={20} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-slate-900/50 border border-t-0 border-slate-700 rounded-b-2xl">
              <p className="text-slate-300 font-medium ">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TheoryViewer = ({ title, content, onComplete }) => {
  const renderRichText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|""|''|`.*?`|\[!.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-green-400 font-black">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-green-500 font-mono text-sm shadow-sm">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) return <h1 key={idx} className="text-2xl md:text-3xl font-black text-white mb-6 mt-4 italic tracking-tighter uppercase">{trimmed.replace('# ', '')}</h1>;
      if (trimmed.startsWith('## ')) return <h2 key={idx} className="text-xl md:text-2xl font-black text-green-500 mb-4 mt-6 italic tracking-tight uppercase">{trimmed.replace('## ', '')}</h2>;
      if (trimmed.startsWith('### ')) return <h3 key={idx} className="text-lg md:text-xl font-black text-slate-200 mb-3 mt-5 uppercase">{trimmed.replace('### ', '')}</h3>;
      if (trimmed.startsWith('> ')) return (
        <blockquote key={idx} className="border-l-4 border-green-500 pl-6 italic text-slate-300 my-6 bg-slate-800/50 p-6 rounded-r-3xl text-base shadow-sm">
          {renderRichText(trimmed.replace('> ', ''))}
        </blockquote>
      );
      if (trimmed.startsWith('* ')) {
        return <li key={idx} className="ml-4 md:ml-8 list-disc text-slate-300 mb-2 text-sm md:text-base font-medium">{renderRichText(trimmed.replace('* ', ''))}</li>;
      }
      if (trimmed.startsWith('[?] ')) {
        const parts = trimmed.replace('[?] ', '').split('|');
        if (parts.length >= 2) {
          return <InteractiveInsight key={idx} prompt={parts[0].trim()} answer={parts.slice(1).join('|').trim()} />;
        }
      }
      if (trimmed === '') return <div key={idx} className="h-3"></div>;

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

      return <p key={idx} className="text-slate-300 leading-relaxed mb-6 text-base md:text-lg font-medium">{renderRichText(line)}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 h-full">
      <div className="bg-slate-900/40 p-4 md:p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-sm">
        {renderContent(content)}
      </div>
    </div>
  );
};

const ModalTheoryViewer = ({ title, content, onComplete }) => {
  const [canValidate, setCanValidate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanValidate(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => onComplete(false)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <Terminal size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          </div>
          <button
            onClick={() => onComplete(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center gap-2 rounded-xl"
          >
            Quitter
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <TheoryViewer
            title={title}
            content={content}
            onComplete={() => { }}
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => onComplete(true)}
            disabled={!canValidate}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all
              ${canValidate
                ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            {canValidate ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />}
            {canValidate ? "J'ai compris, valider" : "Lecture en cours..."}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ModalPracticeViewer = ({ lesson, onComplete }) => {
  const [code, setCode] = useState(lesson.initialCode || '');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const handleValidate = async () => {
    setIsRunning(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      if (lesson.validationRegex && lesson.validationRegex.test(code)) {
        onComplete(true);
      } else {
        setError("Ce n'est pas la bonne commande. Relis bien l'énoncé !");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => onComplete(false)} />
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span className="p-2 bg-green-100 text-green-600 rounded-lg"><Terminal size={24} /></span>
            {lesson.title}
          </h2>
          <button onClick={() => onComplete(false)} className="p-2 text-slate-400 hover:text-slate-600">Quitter</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="bg-slate-800 text-green-400 p-6 rounded-2xl flex items-start gap-4 shadow-inner font-mono">
            <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center shrink-0 border border-slate-600">
              <Terminal size={24} className="text-green-400" />
            </div>
            <div>
              <p className="opacity-90 leading-relaxed">$ {lesson.professorSpeech}</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <h3 className="font-bold text-slate-700 mb-2">Instructions :</h3>
            <p className="text-slate-600 mb-6">{lesson.instruction}</p>

            <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-800 text-white font-mono p-4 min-h-[150px]">
              <div className="flex text-sm opacity-50 mb-2">// Tape ta commande shell ici</div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full min-h-[100px] bg-transparent outline-none resize-none font-mono"
                spellCheck="false"
              />
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                ❌ {error}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
          <button
            onClick={handleValidate}
            disabled={isRunning}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all
              ${isRunning ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/30'}
            `}
          >
            {isRunning ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} />}
            {isRunning ? 'Exécution...' : 'Valider mon code'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BashCourse = ({ onClose, user, API_URL, fetchProgressions }) => {
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const allLessons = courseData.flatMap(m => m.chapters.flatMap(c => c.lessons));

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.token) {
        setLoadingProgress(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/courses/bash/progress`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCompletedLessons(data.completedLessons || []);
        }
      } catch (err) {
        console.error('Erreur chargement progression:', err);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [user, API_URL]);

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

  const handleLessonCompletion = async (success) => {
    if (success && activeLessonId) {
      if (!completedLessons.includes(activeLessonId)) {
        const newCompleted = [...completedLessons, activeLessonId];
        setCompletedLessons(newCompleted);

        if (user?.token) {
          try {
            await fetch(`${API_URL}/courses/bash/progress`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                lessonId: activeLessonId,
                totalLessons: allLessons.length
              }),
            });
            if (fetchProgressions) fetchProgressions();
          } catch (err) {
            console.error('Erreur sauvegarde progression:', err);
          }
        }
      }
      setTimeout(() => closeLesson(), 1500);
    }
  };

  const activeLesson = activeLessonId ? allLessons.find(l => l.id === activeLessonId) : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-200 flex flex-col font-sans overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-green-900/20 pointer-events-none" />

      {/* Header */}
      <header className="h-20 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-8 shrink-0 z-50 shadow-sm relative">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="font-black text-sm md:text-xl tracking-widest flex items-center gap-3 text-white uppercase">
              <Terminal size={20} className="text-green-500" /> BASH_INIT
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-green-500/70 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              STATUS: ROOT_ACCESS // Terminal Basics
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 font-mono hidden md:flex">
          <div className="flex gap-2 text-xs font-black tracking-widest text-slate-400">
            <span>NODES:</span>
            <span className="text-green-500">{completedLessons.length} / {allLessons.length}</span>
          </div>
          <div className="w-40 h-1.5 bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
              className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            />
          </div>
        </div>
      </header>

      {/* TIMELINE VERTICALE */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden touch-pan-y px-4 py-12 custom-scrollbar flex flex-col items-center">
        <div className="w-full max-w-5xl relative">
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-700 -translate-x-1/2 z-0" />

          {courseData.map((module, mIdx) => (
            <div key={module.id} className="mb-20 w-full relative z-10">
              <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm py-4 mb-12 border-y border-slate-700 flex justify-center shadow-sm">
                <div className="flex items-center gap-4 bg-slate-800 border border-slate-700 px-6 py-4 rounded-2xl shadow-sm">
                  <span className="text-green-500 bg-green-500/10 p-3 rounded-xl border border-green-500/20 shadow-inner">
                    {module.icon}
                  </span>
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">MODULE {mIdx + 1}</div>
                    <h2 className="text-xl font-bold text-white">{module.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{module.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-16">
                {module.chapters.map((chapter) => (
                  <div key={chapter.id} className="relative">
                    <div className="absolute left-[39px] md:left-1/2 top-10 bottom-[-40px] w-0.5 bg-slate-600/50 -translate-x-1/2 z-0" />
                    <div className="flex justify-center mb-8 relative z-10">
                      <div className="bg-slate-800 border border-slate-700 px-6 py-2 rounded-full text-xs font-bold text-slate-300 tracking-wider shadow-sm">
                        {chapter.title}
                      </div>
                    </div>

                    <div className="flex justify-center mb-8 z-10">
                      <div className="space-y-6 w-full flex flex-col items-center relative z-10">
                        {chapter.lessons.map((lesson) => {
                          const globalIndex = allLessons.findIndex(l => l.id === lesson.id);
                          const nodeData = nodes[globalIndex];
                          const isUnlocked = nodeData.isUnlocked;
                          const isCompleted = nodeData.isCompleted;

                          return (
                            <motion.button
                              key={lesson.id}
                              whileHover={isUnlocked ? { scale: 1.05 } : {}}
                              whileTap={isUnlocked ? { scale: 0.95 } : {}}
                              onClick={() => openNode(nodeData)}
                              className={`
                                  relative flex flex-col md:flex-row items-center gap-6 w-full md:w-[600px] p-6 rounded-[2.5rem] border-2 transition-all group
                                  ${!isUnlocked ? 'bg-slate-800/50 border-slate-700 opacity-60 cursor-not-allowed' :
                                  isCompleted ? 'bg-slate-800/90 border-green-500/50 hover:border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]' :
                                    'bg-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]'}
                              `}
                            >
                              <div className={`
                                  w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors relative z-10
                                  ${!isUnlocked ? 'bg-slate-700 border-slate-600 text-slate-500' :
                                  isCompleted ? 'bg-green-500/20 border-green-500 text-green-500' :
                                    'bg-green-500 border-white text-white shadow-xl'}
                              `}>
                                {!isUnlocked ? <Lock size={20} /> :
                                  isCompleted ? <CheckCircle2 size={24} /> :
                                    <Terminal size={24} />}
                              </div>
                              <div className="text-center md:text-left flex-1 relative z-10">
                                <h3 className={`font-bold text-lg mb-1 ${!isUnlocked ? 'text-slate-500' : isCompleted ? 'text-slate-300' : 'text-slate-900'}`}>
                                  {lesson.title}
                                </h3>
                                <p className={`text-sm ${!isUnlocked ? 'text-slate-600' : isCompleted ? 'text-slate-500' : 'text-slate-600'}`}>
                                  {lesson.description}
                                </p>
                                <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${!isUnlocked ? 'bg-slate-700 text-slate-500' : 'bg-slate-100 text-slate-500'}`}>
                                    {lesson.type}
                                  </span>
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Connecteur final esthétique */}
          <div className="flex justify-center mt-[-40px]">
            <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-slate-700" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeLesson && (
          activeLesson.type === 'theory' ? (
            <ModalTheoryViewer
              title={activeLesson.title}
              content={activeLesson.content}
              onComplete={(validated) => {
                if (validated) handleLessonCompletion(true);
                else closeLesson();
              }}
            />
          ) : (
            <ModalPracticeViewer
              lesson={activeLesson}
              onComplete={(validated) => {
                if (validated) handleLessonCompletion(true);
                else closeLesson();
              }}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default BashCourse;
