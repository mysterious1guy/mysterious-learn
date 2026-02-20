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

const TheoryViewer = ({ title, content }) => {
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
          <div key={idx} className="font-mono text-xs md:text-sm text-green-400 bg-gray-950 px-3 py-1 rounded border-l-4 border-blue-600 my-2 overflow-x-auto">
            {line}
          </div>
        );
      }

      return <p key={idx} className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base">{line}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 pb-24 h-full overflow-y-auto">
      <div className="bg-gray-900/40 p-6 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">{title}</h2>
        {renderContent(content)}
        <div className="mt-12 flex items-center gap-4 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Info size={24} />
          </div>
          <p className="text-sm text-blue-200/70 italic">
            Félicitations pour avoir lu cette partie ! N'hésite pas à passer à l'exercice pour valider tes connaissances.
          </p>
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

const AlgoCourse = ({ onClose, user, API_URL }) => {
  const [activeModuleId, setActiveModuleId] = useState('module1');
  const [activeChapterId, setActiveChapterId] = useState('chap1');
  const [activeLessonId, setActiveLessonId] = useState('algo_m_1_1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const currentModule = courseData.find(m => m.id === activeModuleId);
  const currentChapter = currentModule?.chapters.find(c => c.id === activeChapterId);
  const currentLesson = currentChapter?.lessons.find(l => l.id === activeLessonId);

  const totalLessons = courseData.reduce((acc, mod) => acc + mod.chapters.reduce((acc2, chap) => acc2 + chap.lessons.length, 0), 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

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

          // Auto progression logic: Reprendre là où on s'était arrêté
          if (data.completedLessons.length > 0 && data.completedLessons.length < totalLessons) {
            let found = false;
            for (const mod of courseData) {
              for (const chap of mod.chapters) {
                for (const les of chap.lessons) {
                  if (!data.completedLessons.includes(les.id)) {
                    setActiveModuleId(mod.id);
                    setActiveChapterId(chap.id);
                    setActiveLessonId(les.id);
                    found = true;
                    break;
                  }
                }
                if (found) break;
              }
              if (found) break;
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

  const handleLessonCompletion = async (success) => {
    if (success && !completedLessons.includes(activeLessonId)) {
      const newCompleted = [...completedLessons, activeLessonId];
      setCompletedLessons(newCompleted);

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
    return <div className="fixed inset-0 z-50 bg-[#050810] flex items-center justify-center text-white">Chargement du grimoire...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050810] text-gray-100 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 md:h-20 bg-[#0a0c12]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all group">
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="hidden md:block">
            <h1 className="font-black text-xl tracking-tighter italic flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-[10px] px-2.5 py-1 rounded-full text-white uppercase tracking-widest not-italic shadow-lg shadow-blue-500/20">Mondial</span>
              Algo Grimoire
            </h1>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            <span>Progression du Voyage</span>
            <span>{completedLessons.length}/{totalLessons} • {progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
            />
          </div>
        </div>

        <button className="md:hidden p-3 text-gray-400" onClick={() => setMobileMenuOpen(true)}>
          <Layers size={24} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`
          fixed inset-0 z-[60] bg-[#050810] md:relative md:translate-x-0 md:z-auto
          w-full md:w-80 flex flex-col border-r border-white/5 transition-transform duration-500
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6 flex items-center justify-between md:hidden border-b border-white/5">
            <span className="font-black tracking-widest uppercase text-sm">Sommaire</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar space-y-8">
            {courseData.map(mod => (
              <div key={mod.id} className="space-y-3">
                <div className="flex items-center gap-3 text-blue-400/80 mb-2">
                  {mod.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{mod.title}</span>
                </div>
                {mod.chapters.map(chap => (
                  <div key={chap.id} className="space-y-1">
                    <div className="text-xs font-bold text-gray-500 px-3 flex items-center gap-2 mb-2">
                      <ChevronDown size={12} /> {chap.title}
                    </div>
                    {chap.lessons.map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveModuleId(mod.id);
                          setActiveChapterId(chap.id);
                          setActiveLessonId(lesson.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full p-4 rounded-2xl text-left text-sm transition-all flex items-center justify-between group
                          ${activeLessonId === lesson.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                        `}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {completedLessons.includes(lesson.id) ? <CheckCircle size={16} className="text-green-400 shrink-0" /> : <Circle size={14} className="shrink-0 opacity-50" />}
                          <span className="truncate font-medium">{lesson.title}</span>
                        </div>
                        {lesson.type === 'practice' && <Code size={14} className="shrink-0 opacity-40 group-hover:opacity-100" />}
                        {lesson.type === 'quiz' && <HelpCircle size={14} className="shrink-0 opacity-40 group-hover:opacity-100" />}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Content Viewer */}
        <main className="flex-1 flex flex-col bg-[#050810] overflow-hidden">
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLessonId}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {currentLesson?.type === 'theory' && <TheoryViewer title={currentLesson.title} content={currentLesson.content} />}
                {currentLesson?.type === 'practice' && <CodeEditor lesson={currentLesson} onComplete={handleLessonCompletion} />}
                {currentLesson?.type === 'quiz' && <QuizViewer data={currentLesson} onComplete={handleLessonCompletion} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlgoCourse;