import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Clock, Award, Play, Code, GitBranch, Sparkles, Cpu } from 'lucide-react';

const AlgoIntroduction = ({ onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Header avec retour */}
      <div className="sticky top-0 bg-[#050810]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group"
          >
            <div className="p-2 bg-white/5 rounded-xl group-hover:bg-blue-500/20 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="font-bold tracking-tight">Quitter le cours</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Module de Fondamentaux</h2>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Cours Premium</span>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter italic">
              ALGO<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">RITHMIQUE</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4 md:px-0">
              Développe ton <span className="text-white font-bold">mindset de développeur</span>. Maîtrise la logique pure pour dompter n'importe quel langage.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          { icon: <Users size={24} />, label: "Étudiants", value: "1234", color: "text-blue-400" },
          { icon: <Clock size={24} />, label: "Contenu", value: "8h", color: "text-emerald-400" },
          { icon: <BookOpen size={24} />, label: "Leçons", value: "15", color: "text-purple-400" },
          { icon: <Code size={24} />, label: "Challenge", value: "8", color: "text-orange-400" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="bg-white/5 p-4 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-white/5 backdrop-blur-sm hover:border-white/20 transition-all flex flex-col items-center group cursor-default"
          >
            <div className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 py-12 pb-32">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-black tracking-tighter">POURQUOI CETTE QUÊTE ?</h2>
            <div className="space-y-6">
              {[
                { icon: <GitBranch className="text-blue-400" />, title: "Logique pure", desc: "Apprends à structurer tes pensées avant même d'écrire une ligne de code." },
                { icon: <Cpu className="text-purple-400" />, title: "Cerveau d'ingénieur", desc: "Comprends comment la machine pense pour optimiser tes ressources." },
                { icon: <Award className="text-orange-400" />, title: "Excellence technique", desc: "Deviens imbattable lors des tests techniques les plus rudes." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 md:p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-fit p-4 bg-gray-900 rounded-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-b from-blue-900/20 to-transparent p-10 rounded-[3rem] border border-blue-500/10"
          >
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tighter uppercase">
              <BookOpen className="text-blue-400" /> Le Grimoire
            </h2>
            <ul className="space-y-4">
              {[
                "Complexité Algorithmique",
                "Variables & Types Primitifs",
                "Structures de Contrôle",
                "Boucles Iteratives Masquées",
                "Tableaux & Listes Chaînées",
                "Récursivité Profonde",
                "Tris & Recherches Avancées",
                "Projets de Synthèse"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 transition-all group-hover:scale-150"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors font-medium">{text}</span>
                </li>
              ))}
            </ul>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center"
            >
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Temps estimé : 8 heures d'immersion</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bouton pour commencer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-24"
        >
          <button
            onClick={onStart}
            className="relative px-8 md:px-16 py-4 md:py-6 group overflow-hidden bg-white text-black font-black rounded-2xl md:rounded-[2rem] text-lg md:text-xl shadow-[0_0_50px_rgba(59,130,246,0.5)] transform hover:scale-105 transition-all flex items-center gap-4 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 group-hover:text-white transition-colors uppercase tracking-widest">Ouvrir le grimoire</span>
            <Play size={20} md:size={24} fill="currentColor" className="relative z-10 group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgoIntroduction;