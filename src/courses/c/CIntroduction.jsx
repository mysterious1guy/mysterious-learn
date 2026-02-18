import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Zap, Code, BookOpen, Play, Users, Clock } from 'lucide-react';

const CIntroduction = ({ onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header avec retour */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <h2 className="text-xl font-bold">Langage C</h2>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-6xl mx-auto px-6 py-16 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 bg-blue-500/20 rounded-full mb-6"
          >
            <Cpu size={64} className="text-blue-400" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Langage C
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Le langage système par excellence. Maîtrisez la mémoire, les pointeurs et les bases de l'informatique.
          </motion.p>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-xl text-center backdrop-blur-sm">
          <Users className="mx-auto mb-2 text-blue-400" size={24} />
          <p className="text-2xl font-bold">890</p>
          <p className="text-xs text-slate-400">étudiants</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl text-center backdrop-blur-sm">
          <Clock className="mx-auto mb-2 text-green-400" size={24} />
          <p className="text-2xl font-bold">6h</p>
          <p className="text-xs text-slate-400">de contenu</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl text-center backdrop-blur-sm">
          <BookOpen className="mx-auto mb-2 text-purple-400" size={24} />
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-slate-400">leçons</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl text-center backdrop-blur-sm">
          <Code className="mx-auto mb-2 text-yellow-400" size={24} />
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-slate-400">projets</p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Colonne gauche : pourquoi apprendre le C */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Pourquoi apprendre le C ?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl">
                <Zap className="text-yellow-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Performance</h3>
                  <p className="text-slate-400">Le C est rapide et proche du matériel, idéal pour les systèmes embarqués, les OS, les jeux.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl">
                <Code className="text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Fondations solides</h3>
                  <p className="text-slate-400">Comprendre le C vous aidera à maîtriser C++, Java, C# et même JavaScript sous le capot.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl">
                <Cpu className="text-green-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Contrôle total</h3>
                  <p className="text-slate-400">Gérez la mémoire manuellement, optimisez vos programmes, comprenez ce qui se passe vraiment.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite : programme détaillé */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="text-purple-400" /> Au programme
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Syntaxe de base et structure d'un programme</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Variables, types et opérateurs</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Pointeurs et gestion de la mémoire</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Fonctions et passage par référence</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Structures et unions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Fichiers et entrées/sorties</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Projets pratiques : mini-shell, jeu en console</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bouton pour commencer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={onStart}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full text-lg shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 mx-auto"
          >
            <Play size={24} fill="white" />
            COMMENCER LE COURS
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CIntroduction;