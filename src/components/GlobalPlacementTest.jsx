import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BrainCircuit, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GlobalPlacementTest = ({ level, onPass, onFail }) => {
    const { t, language } = useLanguage();
    const [step, setStep] = useState('intro'); // 'intro', 'testing', 'failed', 'success'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = {
        'Intermédiaire': [
            {
                question: language === 'en'
                    ? "What is the primary function of a network firewall?"
                    : "Quelle est la fonction principale d'un pare-feu (firewall) réseau ?",
                options: language === 'en' ? [
                    "To compress network data",
                    "To filter incoming and outgoing traffic based on security rules",
                    "To generate passwords for users",
                    "To route emails to the correct inbox"
                ] : [
                    "Compresser les données réseau",
                    "Filtrer le trafic entrant et sortant selon des règles de sécurité",
                    "Générer des mots de passe pour les utilisateurs",
                    "Aiguiller les emails vers la bonne boîte"
                ],
                answer: 1
            },
            {
                question: language === 'en'
                    ? "What is the primary role of HTTPS compared to HTTP?"
                    : "Quel est le rôle principal de HTTPS par rapport à HTTP ?",
                options: language === 'en' ? [
                    "HTTPS loads pages 10x faster",
                    "HTTPS encrypts communication between browser and server using SSL/TLS",
                    "HTTPS replaces JavaScript code",
                    "HTTPS automatically creates database backups"
                ] : [
                    "HTTPS charge les pages 10x plus vite",
                    "HTTPS chiffre les échanges entre le navigateur et le serveur via SSL/TLS",
                    "HTTPS remplace le code JavaScript",
                    "HTTPS crée des sauvegardes automatiques de la base de données"
                ],
                answer: 1
            },
            {
                question: language === 'en'
                    ? "In Linux, what is the 'chmod' command used for?"
                    : "Sous Linux, à quoi sert la commande 'chmod' ?",
                options: language === 'en' ? [
                    "Checking the system memory",
                    "Downloading files from the internet",
                    "Changing file or directory access permissions",
                    "Killing unresponsive processes"
                ] : [
                    "Vérifier la mémoire du système",
                    "Télécharger des fichiers sur internet",
                    "Modifier les permissions d'accès d'un fichier ou répertoire",
                    "Arrêter des processus bloqués"
                ],
                answer: 2
            },
            {
                question: language === 'en'
                    ? "What is the primary goal of a Phishing attack?"
                    : "Quel est le but principal d'une attaque de type Phishing (Hameçonnage) ?",
                options: language === 'en' ? [
                    "To deceive a victim into revealing confidential information",
                    "To completely crash a remote server",
                    "To format the victim's hard drive",
                    "To intercept unencrypted Wi-Fi traffic"
                ] : [
                    "Tromper une victime pour lui faire révéler des informations confidentielles",
                    "Faire planter complètement un serveur distant",
                    "Formater le disque dur de la victime",
                    "Intercepter du trafic Wi-Fi non chiffré"
                ],
                answer: 0
            },
            {
                question: language === 'en'
                    ? "Which Linux terminal command displays the current working directory?"
                    : "Quelle commande du terminal Linux permet d'afficher le répertoire courant ?",
                options: ["ls", "cd", "pwd", "grep"],
                answer: 2
            }
        ],
        'Avancé': [
            {
                question: language === 'en'
                    ? "What is an SQL Injection (SQLi) vulnerability?"
                    : "Qu'est-ce qu'une vulnérabilité d'Injection SQL (SQLi) ?",
                options: language === 'en' ? [
                    "Using a VPN to bypass server blocks",
                    "Cracking passwords using a dictionary list",
                    "Inserting malicious code into a database query to manipulate it",
                    "Overloading the database with too many connections"
                ] : [
                    "Utiliser un VPN pour contourner des blocages serveurs",
                    "Craquer des mots de passe avec une liste dictionnaire",
                    "Insérer du code malveillant dans une requête de base de données pour la manipuler",
                    "Surcharger la base de données avec trop de connexions"
                ],
                answer: 2
            },
            {
                question: language === 'en'
                    ? "What is the key difference between Symmetric and Asymmetric encryption?"
                    : "Quelle est la différence fondamentale entre le chiffrement Symétrique et Asymétrique ?",
                options: language === 'en' ? [
                    "Symmetric is used only for text, Asymmetric for files",
                    "Asymmetric uses a key pair (public/private), symmetric uses a single key",
                    "Symmetric is unbreakable, Asymmetric can be cracked",
                    "Asymmetric requires an internet connection, Symmetric does not"
                ] : [
                    "Le symétrique ne chiffre que le texte, l'asymétrique chiffre les fichiers",
                    "L'asymétrique utilise une paire de clés (publique/privée), le symétrique utilise une clé unique",
                    "Le symétrique est inviolable, l'asymétrique peut être craqué",
                    "L'asymétrique nécessite une connexion internet, le symétrique non"
                ],
                answer: 1
            },
            {
                question: language === 'en'
                    ? "In penetration testing, what is a Reverse Shell?"
                    : "En test d'intrusion (pentest), qu'est-ce qu'un 'Reverse Shell' ?",
                options: language === 'en' ? [
                    "A shell interface that reads commands from right to left",
                    "A security mechanism that blocks incoming shells",
                    "A connection initiated from the target machine back to the attacker's machine",
                    "An encrypted tunnel used by administrators to manage servers"
                ] : [
                    "Une interface shell qui lit les commandes de droite à gauche",
                    "Un mécanisme de sécurité bloquant les terminaux distants",
                    "Une connexion initiée par la machine cible vers l'ordinateur de l'attaquant",
                    "Un tunnel chiffré utilisé par les administrateurs serveurs"
                ],
                answer: 2
            },
            {
                question: language === 'en'
                    ? "Which of the following describes a 'Buffer Overflow'?"
                    : "Laquelle de ces définitions décrit un 'Débordement de Tampon' (Buffer Overflow) ?",
                options: language === 'en' ? [
                    "When a user opens too many tabs in their browser",
                    "Writing more data to a block of memory than it is allocated to hold",
                    "A database failing because it ran out of disk space",
                    "Sending too many HTTP requests to a web server (DDoS)"
                ] : [
                    "Quand un utilisateur ouvre trop d'onglets dans son navigateur",
                    "L'écriture de plus de données dans un bloc de mémoire que ce qui lui est alloué",
                    "Une base de données qui plante par manque d'espace disque",
                    "L'envoi de trop de requêtes HTTP vers un serveur web (DDoS)"
                ],
                answer: 1
            },
            {
                question: language === 'en'
                    ? "What type of web attack occurs when malicious scripts are injected into trusted websites?"
                    : "Quelle attaque web consiste à injecter des scripts malveillants exécutés par d'autres utilisateurs ?",
                options: ["SQL Injection", "Cross-Site Scripting (XSS)", "CSRF", "Man-in-the-Middle"],
                answer: 1
            }
        ]
    };

    const activeQuestions = questions[level] || questions['Intermédiaire'];

    const handleAnswer = (idx) => {
        if (idx !== activeQuestions[currentQuestionIndex].answer) {
            setStep('failed');
            return;
        }

        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStep('success');
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-white"
            >
                <div className="p-8 md:p-10 text-center">
                    <AnimatePresence mode="wait">
                        {step === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                                    <BrainCircuit size={40} className="text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
                                    {t('placementTest.eval_title') || "Évaluation de Niveau"}
                                </h3>
                                <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed">
                                    {t('placementTest.eval_desc_prefix') || "Tu as choisi le niveau"} <span className="text-blue-400 font-bold">{level}</span>. <br />
                                    {t('placementTest.eval_desc_body') || "Prouve tes compétences via ce test technique rapide. Une seule erreur et tu seras redirigé vers le niveau Débutant."}
                                </p>
                                <button
                                    onClick={() => setStep('testing')}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3"
                                >
                                    {t('placementTest.start_exam') || "Démarrer l'Examen"} <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={onFail}
                                    className="mt-5 text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                                >
                                    {t('placementTest.choose_beginner') || "Finalement, je préfère le niveau Débutant"}
                                </button>
                            </motion.div>
                        )}

                        {step === 'testing' && (
                            <motion.div
                                key="testing"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-left"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <span className="px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
                                        Question {currentQuestionIndex + 1} / {activeQuestions.length}
                                    </span>
                                    <div className="flex gap-2">
                                        {activeQuestions.map((_, i) => (
                                            <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i === currentQuestionIndex ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : i < currentQuestionIndex ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                                        ))}
                                    </div>
                                </div>

                                <h4 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed tracking-tight">
                                    {activeQuestions[currentQuestionIndex].question}
                                </h4>

                                <div className="grid grid-cols-1 gap-3">
                                    {activeQuestions[currentQuestionIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="p-4 text-left bg-slate-950/70 border border-slate-800 rounded-2xl hover:border-blue-500 hover:bg-blue-600/10 transition-all group"
                                        >
                                            <span className="text-slate-300 font-semibold text-sm group-hover:text-white transition-colors">
                                                {option}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'failed' && (
                            <motion.div
                                key="failed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 shadow-lg shadow-red-500/10">
                                    <ShieldAlert size={40} className="text-red-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">
                                    {t('placementTest.access_denied') || "Accès Refusé"}
                                </h3>
                                <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed">
                                    {t('placementTest.failed_desc_prefix') || "Tes réponses ne semblent pas encore correspondre au niveau"} <span className="font-bold text-red-400">{level}</span>. <br />
                                    {t('placementTest.failed_desc_body') || "Il est préférable de commencer par les bases pour progresser sereinement."}
                                </p>
                                <button
                                    onClick={onFail}
                                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg"
                                >
                                    {t('placementTest.start_beginner') || "Commencer en tant que Débutant"}
                                </button>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                                    <ShieldCheck size={40} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">
                                    {t('placementTest.success_title') || "Niveau Validé 🎉"}
                                </h3>
                                <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed">
                                    {t('placementTest.success_desc_prefix') || "Tu as brillamment réussi l'examen technique."} <br />
                                    {t('placementTest.success_desc_body') || "Le niveau"} <span className="text-emerald-400 font-bold">{level}</span> {t('placementTest.success_unlocked') || "t'est désormais débloqué."}
                                </p>
                                <button
                                    onClick={onPass}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-emerald-600/30"
                                >
                                    {t('placementTest.finalize_signup') || "Finaliser l'Inscription"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default GlobalPlacementTest;
