import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, ChevronDown, Code, BookOpen,
  CheckCircle, Circle, Terminal, Play, Cpu, Database, Box,
  Layers, AlertTriangle, Info, Check, X, RefreshCw,
  Maximize2, Minimize2, Save, Trophy, Lock, FileText,
  HelpCircle, Lightbulb, Award, Star, Target, GitBranch,
  TrendingUp, Clock, Filter, Search, Repeat, Zap, Sparkles
} from 'lucide-react';

// =====================================================================
// DONNÉES DU COURS D'ALGORITHMIQUE - Version "MONDIAL" (Ultra-Détaillée)
// =====================================================================

const courseData = [
  {
    id: 'module1',
    title: 'Module 1: L\'Éveil du Codeur',
    icon: <Cpu size={20} />,
    description: "Bienvenue dans l'aventure ! Ici, on apprend ce qu'est vraiment le code, sans stress, étape par étape.",
    chapters: [
      {
        id: 'chap1',
        title: "C'est quoi un Algorithme ?",
        description: "Désacralisons le mot : un algorithme, c'est juste une recette !",
        lessons: [
          {
            id: 'algo_m_1_1',
            type: 'theory',
            title: "Le concept de pas-à-pas",
            duration: '5 min',
            content: `
# 🕯️ Bienvenue dans le Grimoire !

Tu penses peut-être que coder est réservé aux génies des mathématiques ? Détrompe-toi. Coder, c'est **donner des ordres précis à une machine un peu bête**.

## L'analogie de la recette
Imagine que tu doives expliquer à un robot comment faire des crêpes :
1. Sortir la farine.
2. Casser deux œufs.
3. Mélanger.

Si tu oublies de lui dire "Casse les œufs avant de les mettre dans le bol", il va mettre les œufs avec la coquille !

**Un algorithme, c'est exactement ça :** une suite d'instructions tellement claires qu'il n'y a pas d'erreur possible.

> Dans ce cours, nous n'allons pas apprendre un langage spécifique tout de suite. Nous allons apprendre **la logique**. Une fois que tu as la logique, tu peux apprendre n'importe quel langage (C, Python, JavaScript) en quelques jours.
            `
          },
          {
            id: 'algo_m_1_2',
            type: 'quiz',
            title: "Quiz : La pensée binaire",
            question: "L'ordinateur est-il capable d'interpréter une consigne floue comme 'Fais chauffer l'eau un peu' ?",
            options: [
              { id: 'a', text: "Oui, il comprend le contexte.", correct: false },
              { id: 'b', text: "Non, il lui faut une température ou une durée précise.", correct: true }
            ],
            explanation: "L'ordinateur ne devine rien. Il faut lui dire 'Chauffe l'eau à 100°C' ou 'Attends 5 minutes'."
          }
        ]
      },
      {
        id: 'chap2',
        title: "Les Variables : Nos Boîtes Magiques",
        description: "Comment l'ordinateur se souvient des choses ?",
        lessons: [
          {
            id: 'algo_m_1_3',
            type: 'theory',
            title: "Stocker l'information",
            duration: '10 min',
            content: `
# 📦 Les Variables

Pour travailler, l'ordinateur a besoin de stocker des informations dans sa mémoire. Imagine une étagère remplie de **boîtes**.

Chaque boîte a :
1. **Un Nom** (pour la retrouver).
2. **Une Valeur** (ce qu'il y a dedans).
3. **Un Type** (ce qu'on a le droit de mettre dedans).

## Les types de base
*   **Entier** (1, 42, -5)
*   **Réel** (3.14, 10.5)
*   **Texte** ("Bonjour")
*   **Booléen** (Vrai ou Faux)

### L'Assignation
Quand on met quelque chose dans une boîte, on dit qu'on **assigne** une valeur.
\`score = 0\`
            `
          },
          {
            id: 'algo_m_1_4',
            type: 'practice',
            title: "Créer sa première variable",
            description: "Apprenons à manipuler des boîtes.",
            instruction: "Créez une variable nommée 'age' et donnez-lui la valeur 25.",
            initialCode: "// Définissez votre variable ici\n",
            hints: ["Écrivez : age = 25"],
            validationRegex: /age\s*=\s*25/i,
            difficulty: "Débutant"
          }
        ]
      }
    ]
  },
  {
    id: 'module2',
    title: 'Module 2: Le Don de la Pensée (Logique)',
    icon: <Database size={20} />,
    description: "Apprenons à notre programme à faire des choix intelligents.",
    chapters: [
      {
        id: 'chap3',
        title: "Les Conditions (Si... Alors)",
        description: "Faire des embranchements dans le code.",
        lessons: [
          {
            id: 'algo_m_2_1',
            type: 'theory',
            title: "L'art du choix",
            duration: '10 min',
            content: `
# 🛣️ Prendre une décision

En algorithmique, on utilise le **SI... ALORS... SINON**.

\`\`\`
SI (il pleut) ALORS
    Prendre un parapluie
SINON
    Prendre ses lunettes de soleil
FIN SI
\`\`\`

### Les Comparateurs
*   \`==\` : Égal
*   \`!=\` : Différent
*   \`>\` : Supérieur
*   \`<\` : Inférieur
            `
          },
          {
            id: 'algo_m_2_2',
            type: 'quiz',
            title: "Quiz : La logique du Sinon",
            question: "Si la condition du 'SI' est FAUSSE, que se passe-t-il ?",
            options: [
              { id: 'a', text: "Le programme s'arrête.", correct: false },
              { id: 'b', text: "L'alternative 'SINON' est exécutée.", correct: true }
            ],
            explanation: "Le SINON est le plan B quand le SI échoue."
          }
        ]
      }
    ]
  },
  {
    id: 'module3',
    title: 'Module 3: Le Pouvoir de la Répétition (Boucles)',
    icon: <Repeat size={20} />,
    description: "Faites travailler l'ordinateur pour vous, des milliers de fois.",
    chapters: [
      {
        id: 'chap4',
        title: "Tant Que (While)",
        description: "Répéter sous condition.",
        lessons: [
          {
            id: 'algo_m_3_1',
            type: 'theory',
            title: "La boucle infinie",
            duration: '10 min',
            content: `
# 🔄 Les Boucles

Une boucle permet de répéter un bloc de code.

## Tant Que (While)
On répète **tant qu'une condition** est vraie.

\`\`\`
TANT QUE (batterie < 100) FAIRE
    Charger le téléphone
FIN TANT QUE
\`\`\`
            `
          }
        ]
      },
      {
        id: 'chap5',
        title: "Pour (For)",
        description: "Répéter un nombre de fois précis.",
        lessons: [
          {
            id: 'algo_m_3_2',
            type: 'theory',
            title: "Compter ses tours",
            duration: '10 min',
            content: `
# 🔢 La boucle POUR

C'est une boucle avec un compteur.

\`\`\`
POUR i allant de 1 à 10 FAIRE
    Afficher(i)
FIN POUR
\`\`\`
            `
          },
          {
            id: 'algo_m_3_3',
            type: 'practice',
            title: "Répéter 5 fois",
            description: "Affichez 'Hello' 5 fois.",
            instruction: "Utilisez une boucle POUR de 1 à 5.",
            initialCode: "POUR i allant de 1 à 5 FAIRE\n    // ...\nFIN POUR",
            validationRegex: /POUR/i,
            difficulty: "Débutant"
          }
        ]
      }
    ]
  },
  {
    id: 'module4',
    title: 'Module 4: Organiser les Données (Tableaux)',
    icon: <Box size={20} />,
    description: "Stockez des centaines de valeurs dans une seule variable.",
    chapters: [
      {
        id: 'chap6',
        title: "Les Tableaux",
        description: "Des listes indexées.",
        lessons: [
          {
            id: 'algo_m_4_1',
            type: 'theory',
            title: "Les Indices",
            duration: '12 min',
            content: `
# 📊 Les Tableaux

Imagine un tiroir avec plusieurs compartiments. Chaque compartiment a un numéro : l'**index**.

**Attention :** En code, on commence à compter à **0**.
Le premier élément est à l'index 0.
            `
          },
          {
            id: 'algo_m_4_2',
            type: 'quiz',
            title: "Quiz : Indexation",
            question: "Quel est l'index du 1er élément d'un tableau ?",
            options: [
              { id: 'a', text: "1", correct: false },
              { id: 'b', text: "0", correct: true }
            ],
            explanation: "On commence toujours à 0 !"
          }
        ]
      }
    ]
  },
  {
    id: 'module5',
    title: 'Module 5: Diviser pour Régner (Fonctions)',
    icon: <GitBranch size={20} />,
    description: "Apprenez à découper votre code en briques réutilisables.",
    chapters: [
      {
        id: 'chap7',
        title: "Créer une fonction",
        description: "Donner un nom à une action.",
        lessons: [
          {
            id: 'algo_m_5_1',
            type: 'theory',
            title: "Les Outils réutilisables",
            duration: '15 min',
            content: `
# 🛠️ Les Fonctions

Une fonction est un bloc de code nommé qu'on peut appeler n'importe quand.

## Paramètres et Retour
Tu peux lui donner des infos (paramètres) et elle te rend un résultat.

\`\`\`
FONCTION addition(a, b)
    RETOURNE a + b
FIN FONCTION
\`\`\`
            `
          }
        ]
      }
    ]
  },
  {
    id: 'module6',
    title: 'Module 6: La Magie Noire (Récursivité)',
    icon: <Sparkles size={20} />,
    description: "Le concept ultime : une fonction qui s'appelle elle-même.",
    chapters: [
      {
        id: 'chap8',
        title: "Une fonction dans une fonction",
        description: "Comprendre le miroir sans fin.",
        lessons: [
          {
            id: 'algo_m_6_1',
            type: 'theory',
            title: "Le Cas d'Arrêt",
            duration: '15 min',
            content: `
# 🔁 La Récursivité

C'est quand une fonction s'appelle elle-même. Pour éviter le crash, il faut une **condition d'arrêt**.

## Exemple : La Factorielle
5! = 5 * 4 * 3 * 2 * 1
On peut dire que 5! = 5 * 4!
            `
          }
        ]
      }
    ]
  },
  {
    id: 'module7',
    title: 'Module 7: Algorithmes de Légende',
    icon: <Trophy size={20} />,
    description: "Tris, recherches et optimisation de pro.",
    chapters: [
      {
        id: 'chap9',
        title: "Algorithmes de Tri",
        description: "Mettre de l'ordre dans le chaos.",
        lessons: [
          {
            id: 'algo_m_7_1',
            type: 'theory',
            title: "Tri à Bulles",
            duration: '20 min',
            content: `
# 🫧 Tri à Bulles

Le plus simple : on compare deux voisins et on échange s'ils sont dans le mauvais ordre. On répète.
            `
          }
        ]
      },
      {
        id: 'chap10',
        title: "Algorithmes de Recherche",
        description: "Trouver une aiguille ultra-vite.",
        lessons: [
          {
            id: 'algo_m_7_2',
            type: 'theory',
            title: "La Dichotomie",
            duration: '15 min',
            content: `
# 🔍 Recherche Dichotomique

Sur un tableau trié, on divise le terrain par 2 à chaque étape. C'est ultra puissant !
            `
          }
        ]
      }
    ]
  }
];

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

const AlgoCourse = ({ onClose, completedLessons = [], onLessonComplete }) => {
  const [activeModuleId, setActiveModuleId] = useState('module1');
  const [activeChapterId, setActiveChapterId] = useState('chap1');
  const [activeLessonId, setActiveLessonId] = useState('algo_m_1_1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentModule = courseData.find(m => m.id === activeModuleId);
  const currentChapter = currentModule?.chapters.find(c => c.id === activeChapterId);
  const currentLesson = currentChapter?.lessons.find(l => l.id === activeLessonId);

  const totalLessons = courseData.reduce((acc, mod) => acc + mod.chapters.reduce((acc2, chap) => acc2 + chap.lessons.length, 0), 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  const handleLessonCompletion = (success) => {
    if (success) {
      onLessonComplete('algo', activeLessonId);
    }
  };

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