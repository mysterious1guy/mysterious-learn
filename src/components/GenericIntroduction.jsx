import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, BookOpen, Users, Clock, Award, Play,
    Zap, Shield, Database, AlertTriangle, Cpu, Link, Terminal as TerminalIcon
} from 'lucide-react';

const GenericIntroduction = ({ course, onStart, onBack }) => {
    if (!course) return null;

    const renderSmartContent = (content) => {
        if (!content) return null;

        const getIcon = (title) => {
            const t = title.toLowerCase();
            if (t.includes('préprocesseur') || t.includes('compilateur')) return <Zap className="text-yellow-400" size={24} />;
            if (t.includes('mémoire') || t.includes('ram')) return <Database className="text-blue-400" size={24} />;
            if (t.includes('sécurité') || t.includes('faille')) return <Shield className="text-green-400" size={24} />;
            if (t.includes('erreur') || t.includes('bug')) return <AlertTriangle className="text-red-400" size={24} />;
            if (t.includes('assembleur') || t.includes('cpu')) return <Cpu className="text-purple-400" size={24} />;
            if (t.includes('link') || t.includes('lien')) return <Link className="text-indigo-400" size={24} />;
            return <TerminalIcon className="text-slate-400" size={24} />;
        };

        const listMarkerPattern = /(\d+[.)]|\u2022|\*)/;
        const parts = content.split(listMarkerPattern);

        if (parts.length > 2) {
            const intro = parts[0];
            const items = [];
            for (let i = 1; i < parts.length; i += 2) {
                items.push({ marker: parts[i], text: (parts[i + 1] || "").trim() });
            }

            return (
                <div className="space-y-8">
                    {intro && <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic">{intro}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto px-4">
                        {items.map((item, idx) => {
                            const [title, ...descParts] = item.text.split(':');
                            const description = descParts.join(':').trim();

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-gray-800/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:bg-gray-800/60 transition-all text-left group relative overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                                        {getIcon(title)}
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black border border-blue-500/20 shadow-inner">
                                            {item.marker}
                                        </div>
                                        <h4 className="font-black text-white text-xl group-hover:text-blue-400 transition-colors">{title}</h4>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed font-medium">
                                        {description || title}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{content}</p>;
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white ${course.themeColor || 'from-blue-900 via-blue-800 to-blue-900'}`}>
            {/* Header avec retour */}
            <div className="sticky top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Retour</span>
                    </button>
                    <h2 className="text-xl font-bold">{course.name}</h2>
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
                        className={`inline-block p-4 bg-gray-800/50 rounded-full mb-6 ${course.color}`}
                    >
                        {/* Clone the icon with a larger size if possible, or just render it */}
                        {React.cloneElement(course.icon, { size: 64, className: course.color })}
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    >
                        {course.name}
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-full"
                    >
                        {renderSmartContent(course.longDesc || course.description)}
                    </motion.div>
                </div>

                {/* Motivation Video Section */}
                {course.motivationVideo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto px-6 -mt-8 mb-20 group"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-950 border border-white/5 shadow-2xl ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10 pointer-events-none opacity-40"></div>
                            <div className="aspect-video relative z-0">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${course.motivationVideo}?rel=0&modestbranding=1&controls=1`}
                                    title="Motivational Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] font-mono">Pourquoi commencer aujourd'hui ?</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Statistiques rapides */}
            <div className="max-w-6xl mx-auto px-6 -mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl text-center backdrop-blur-sm border border-gray-700">
                    <Users className="mx-auto mb-2 text-blue-400" size={24} />
                    <p className="text-2xl font-bold">{course.students}</p>
                    <p className="text-xs text-gray-400">étudiants</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center backdrop-blur-sm border border-gray-700">
                    <Clock className="mx-auto mb-2 text-green-400" size={24} />
                    <p className="text-2xl font-bold">10h</p> {/* Placeholder or add to data */}
                    <p className="text-xs text-gray-400">de contenu</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center backdrop-blur-sm border border-gray-700">
                    <BookOpen className="mx-auto mb-2 text-purple-400" size={24} />
                    <p className="text-2xl font-bold">{course.lessons ? course.lessons.length : 0}</p>
                    <p className="text-xs text-gray-400">leçons</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl text-center backdrop-blur-sm border border-gray-700">
                    <Award className="mx-auto mb-2 text-yellow-400" size={24} />
                    <p className="text-2xl font-bold">Certifié</p>
                    <p className="text-xs text-gray-400">fin de parcours</p>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Colonne gauche : pourquoi apprendre ce langage */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold">Pourquoi apprendre {course.name} ?</h2>
                        <div className="space-y-4">
                            {/* Generic reasons - could be customized in data later */}
                            <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                                <Award className="text-yellow-400 flex-shrink-0" size={24} />
                                <div>
                                    <h3 className="font-semibold text-lg">Compétence demandée</h3>
                                    <p className="text-gray-400">{course.name} est une technologie clé sur le marché du travail actuel.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                                <Play className="text-blue-400 flex-shrink-0" size={24} />
                                <div>
                                    <h3 className="font-semibold text-lg">Projets concrets</h3>
                                    <p className="text-gray-400">Réalisez des projets réels et construisez votre portfolio.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Colonne droite : programme détaillé */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-800/30 p-8 rounded-3xl border border-gray-700"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <BookOpen className="text-purple-400" /> Au programme
                        </h2>
                        <ul className="space-y-4">
                            {course.lessons && course.lessons.map((lesson, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>{lesson.title}</span>
                                    <span className="text-xs text-gray-500 ml-auto">{lesson.duration}</span>
                                </li>
                            ))}
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

export default GenericIntroduction;
