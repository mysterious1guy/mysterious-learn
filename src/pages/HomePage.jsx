import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, BookOpen, Sparkles, Zap, Code2, Heart, Mail, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme('light');
    }, [setTheme]);
    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
    const [courseStats, setCourseStats] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [config, setConfig] = useState(null);


    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2;
            const y = (clientY / window.innerHeight - 0.5) * 2;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }

                const cStatsRes = await fetch(`${API_URL}/courses/stats`);
                if (cStatsRes.ok) {
                    const cStatsData = await cStatsRes.json();
                    setCourseStats(cStatsData);
                }
            } catch (err) {
                console.error('Erreur fetch stats/config:', err);
            }
        };
        fetchStats();

        const fetchConfig = async () => {
            try {
                const res = await fetch(`${API_URL}/site-config`);
                if (res.ok) {
                    const data = await res.json();
                    setConfig(data);
                }
            } catch (err) {
                console.error('Erreur fetch site config:', err);
            }
        };
        fetchConfig();
    }, [API_URL]);

    // Le site contient désormais 36 cours officiels et 12 langages
    const totalCoursesCount = 36;

    return (
        <div className="min-h-screen bg-transparent font-sans selection:bg-blue-500/30">
            {/* Background elements */}

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-10">
                        {/* Logo animé */}
                        <motion.div
                            style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex justify-center"
                        >
                            <AnimatedLogo size="xlarge" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h1 className="flex flex-col items-center">
                                <motion.span
                                    style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
                                    className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] brand-font text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-glow-blue leading-[0.85] flex"
                                >
                                    {"MYSTERIOUS".split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                                            transition={{
                                                duration: 6,
                                                times: [0, (i * 0.15) / 6, (i * 0.15 + 0.1) / 6, 0.8, 0.85, 1],
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.span>
                                <motion.span
                                    style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
                                    className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mt-2 md:mt-4 text-glow-purple leading-[0.85] flex"
                                >
                                    {"CLASSROOM".split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                                            transition={{
                                                duration: 6,
                                                times: [0, ((i + 10) * 0.15) / 6, ((i + 10) * 0.15 + 0.1) / 6, 0.8, 0.85, 1],
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.span>
                            </h1>

                            <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                                L'éducation technologique repensée. Apprenez gratuitement avec une plateforme interactive et immersive.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                            >
                                <Zap size={20} className="md:w-6 md:h-6 group-hover:text-yellow-400 transition-colors" />
                                COMMENCER MAINTENANT
                                <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Real Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center gap-6 md:gap-12 pt-8"
                        >
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-blue-400 transition-colors">{stats.totalUsers}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Membres</p>
                            </div>
                            <div className="w-px h-12 bg-slate-300 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-purple-400 transition-colors">{stats.activeUsers}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Actifs</p>
                            </div>
                            <div className="w-px h-12 bg-slate-300 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-pink-400 transition-colors">{totalCoursesCount}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Cours gratuits</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Educational Philosophy Section */}
            <div className="py-20 bg-slate-100  relative border-t border-slate-200 ">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600  text-sm font-bold tracking-widest uppercase mb-4">
                            <BookOpen size={16} /> Notre Pédagogie
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900  max-w-3xl leading-tight">
                            L'Excellence par la Maîtrise des Fondamentaux
                        </h2>
                        <p className="mt-6 text-xl text-slate-600  max-w-2xl font-medium">
                            Nous fuyons la surabondance. Mysterious Classroom se concentre fièrement sur 12 piliers technologiques essentiels, forgés à travers 3 niveaux d'expertise stricts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* Level 1 */}
                        <div className="bg-white  border border-slate-200  rounded-[2rem] p-8 cyber-card group shadow-2xl relative overflow-hidden glass-panel">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-blue-500/10 text-blue-600  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <span className="text-3xl">🐣</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900  mb-3">Niveau Débutant</h3>
                            <p className="text-slate-600  leading-relaxed font-medium">
                                Les fondations pures. Apprenez la logique algorithmique, la syntaxe de base et les concepts clés sans aucune abstraction. 100% pratique.
                            </p>
                        </div>
                        {/* Level 2 */}
                        <div className="bg-white  border border-slate-200  rounded-[2rem] p-8 cyber-card group shadow-2xl relative overflow-hidden glass-panel">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-purple-500/10 text-purple-600  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900  mb-3">Intermédiaire</h3>
                            <p className="text-slate-600  leading-relaxed font-medium">
                                L'architecture et la rigueur. Structure de données avancée, programmation orientée objet, gestion mémoire et création de projets complets.
                            </p>
                        </div>
                        {/* Level 3 */}
                        <div className="bg-white  border border-slate-200  rounded-[2rem] p-8 cyber-card group shadow-2xl relative overflow-hidden glass-panel">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-orange-500/10 text-orange-600  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                                <span className="text-3xl">💻</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900  mb-3">Expertise Avancée</h3>
                            <p className="text-slate-600  leading-relaxed font-medium">
                                Conçu pour l'ingénierie. Algorithmes complexes, sécurité, performance système et architectures backend/frontend professionnelles.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white  border border-slate-200  rounded-[3rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                        <h3 className="text-3xl font-black text-slate-900  mb-8 relative z-10">Les 12 Piliers de l'Apprentissage</h3>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            {[
                                { name: 'Algorithmique', icon: '🧠' },
                                { name: 'Langage C', icon: '⚙️' },
                                { name: 'C++', icon: '🚀' },
                                { name: 'Python', icon: '🐍' },
                                { name: 'Bash Scripts', icon: '🐧' },
                                { name: 'HTML5', icon: '🌐' },
                                { name: 'CSS3', icon: '🎨' },
                                { name: 'JavaScript', icon: '⚡' },
                                { name: 'PHP', icon: '🐘' },
                                { name: 'MySQL', icon: '🐬' },
                                { name: 'MongoDB', icon: '🍃' },
                                { name: 'ReactJS', icon: '⚛️' }
                            ].map(tech => (
                                <span key={tech.name} className="flex items-center gap-2 px-6 py-3 bg-slate-50  border border-slate-200  rounded-xl text-slate-700  font-bold hover:text-blue-600 :text-white hover:border-blue-500 transition-colors shadow-lg shadow-black/5 ">
                                    <span className="text-xl">{tech.icon}</span>
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                        <div className="mt-12 relative z-10">
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 font-black rounded-xl transition-colors shadow-xl"
                            >
                                Commencer l'Aventure
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Installation Section (PWA & Desktop) */}
            <div className="py-24 bg-slate-50 #050814] relative border-t border-slate-200 ">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600  text-sm font-bold tracking-widest uppercase mx-auto w-max mb-4">
                            <Zap size={16} /> Application Native
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 ">
                            Installez Mysterious Classroom
                        </h2>
                        <p className="text-lg text-slate-600  max-w-2xl mx-auto font-medium">
                            Emportez votre écosystème d'apprentissage partout. Profitez d'une expérience fluide, rapide et immersive directement depuis votre écran d'accueil, sans passer par le navigateur.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Windows */}
                        <div className="bg-white  border border-slate-200  rounded-3xl p-8 hover:border-blue-500/50 transition-all group shadow-xl">
                            <div className="w-14 h-14 bg-blue-50  text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-900  mb-2">Windows PC</h3>
                            <p className="text-sm text-slate-600  font-medium mb-6">Installation rapide via Microsoft Edge ou Chrome.</p>
                            <div className="space-y-3 text-sm text-slate-500  font-medium bg-slate-50  p-4 rounded-xl border border-slate-100 ">
                                <p>1. Ouvrez ce site sur Chrome/Edge.</p>
                                <p>2. Cliquez sur l'icône <span className="text-blue-500">⊕</span> dans la barre d'adresse (à droite).</p>
                                <p>3. Cliquez sur <b>Installer</b>.</p>
                            </div>
                        </div>

                        {/* Android */}
                        <div className="bg-white  border border-slate-200  rounded-3xl p-8 hover:border-green-500/50 transition-all group shadow-xl">
                            <div className="w-14 h-14 bg-green-50  text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02L19.55 6.002a.4173.4173 0 00-.5903-.1197.4174.4174 0 00-.1197.5904l-1.6373 3.251c-1.353-.616-2.8724-.9545-4.4812-.9545-1.6092 0-3.1286.3385-4.4816.9545L6.6026 6.4727A.417.417 0 005.8926 6.353a.4175.4175 0 00.1197.5905l1.6685 3.3195C3.3915 12.6288 1.1541 16.5915 1 21.0827h22c-.154-4.4912-2.3914-8.454-6.6815-10.82Z" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-900  mb-2">Google Play Store</h3>
                            <p className="text-sm text-slate-600  font-medium mb-6">Une application légère (Play Store PWA).</p>
                            <div className="space-y-3 text-sm text-slate-500  font-medium bg-slate-50  p-4 rounded-xl border border-slate-100 ">
                                <p>1. Ouvrez Chrome sur Android.</p>
                                <p>2. Appuyez sur le menu (les 3 petits points).</p>
                                <p>3. Sélectionnez <b className="text-green-500">Ajouter à l'écran d'accueil</b>.</p>
                            </div>
                        </div>

                        {/* Apple */}
                        <div className="bg-white  border border-slate-200  rounded-3xl p-8 hover:border-slate-400/50 transition-all group shadow-xl">
                            <div className="w-14 h-14 bg-slate-100  text-slate-900  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.328 14.881c-1.077.587-2.327.904-3.66.904-4.14 0-7.495-3.355-7.495-7.495 0-1.333.317-2.583.904-3.66l10.251 10.251zm1.464-1.464L6.541 5.166C7.618 4.579 8.868 4.262 10.201 4.262c4.14 0 7.495 3.355 7.495 7.495 0 1.333-.317 2.583-.904 3.66z" className="hidden" /><path d="M16.92 18.068c-1.127 1.637-2.316 3.27-4.128 3.32-1.782.046-2.368-1.037-4.425-1.037-2.057 0-2.704 1.002-4.425 1.054-1.812.053-3.155-1.751-4.298-3.391C-2.744 14.61-1.063 9.771 1.259 7.641c1.144-1.053 2.651-1.714 4.195-1.739 1.748-.029 3.374 1.18 4.453 1.18 1.08 0 3.012-1.42 5.148-1.206 1.802.083 3.425.88 4.524 2.476-4.522 2.709-3.805 9.074 1.341 11.21-.861 2.126-1.928 4.208-3.88 6.556 0 0-.063.078-.12.181zM11.967 5.62c-.08 2.37-1.94 4.536-4.263 4.515-.145-2.296 1.705-4.593 4.126-4.64.043.05.093.09.137.125z" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-900  mb-2">Apple App Store</h3>
                            <p className="text-sm text-slate-600  font-medium mb-6">Optimisé pour iPhone et iPad via Safari.</p>
                            <div className="space-y-3 text-sm text-slate-500  font-medium bg-slate-50  p-4 rounded-xl border border-slate-100 ">
                                <p>1. Ouvrez ce site sur Safari.</p>
                                <p>2. Appuyez sur l'icône de <b className="text-slate-800 ">Partage</b> ⍗ (en bas).</p>
                                <p>3. Glissez et choisissez <b>Sur l'écran d'accueil</b>.</p>
                            </div>
                        </div>

                        {/* Linux */}
                        <div className="bg-white  border border-slate-200  rounded-3xl p-8 hover:border-yellow-500/50 transition-all group shadow-xl">
                            <div className="w-14 h-14 bg-yellow-50  text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12.015 0c-1.397 0-2.6.43-3.66 1.258-1.344 1.054-2.127 2.443-2.613 4.07-.36 1.198-.48 2.484-.45 3.738.019.866.113 1.745.367 2.576.262.86.666 1.666 1.155 2.38.647.944 1.487 1.727 2.448 2.29.957.56 2.016.892 3.12 1.002.825.083 1.662.067 2.46-.067.838-.14 1.637-.417 2.365-.826 1.05-.595 1.96-1.42 2.65-2.404.72-1.026 1.21-2.227 1.42-3.486.2-1.213.14-2.462-.1-3.666-.25-1.257-.75-2.434-1.42-3.456C16.94 1.332 15.356.24 13.5.045c-.496-.037-.992-.047-1.485-.045zm1.517 3.51c.36-.002.733.02 1.1.066 1.054.137 2.04.593 2.84 1.295.688.604 1.206 1.385 1.498 2.253.308.92.392 1.918.254 2.875-.125.867-.428 1.693-.865 2.43-.532.898-1.285 1.64-2.195 2.144-.813.455-1.745.69-2.68.73-1.036.046-2.074-.167-3.007-.633-1.005-.503-1.854-1.246-2.465-2.16-.626-.94-.993-2.05-1.07-3.176-.07-1.033.08-2.083.435-3.06.353-.966.924-1.826 1.658-2.493.856-.778 1.93-1.26 3.064-1.398.477-.058.96-.065 1.433-.047zM5.503 16.48c-1.354 0-2.673.498-3.763 1.35a6.43 6.43 0 00-2.094 2.887c-.42 1.052-.57 2.214-.405 3.336.142.97.514 1.914 1.114 2.7.535.7 1.248 1.246 2.042 1.58.26.11.533.202.812.27.795.196 1.62.25 2.43.2 1.127-.068 2.26-.37 3.25-.956.84-.496 1.57-1.157 2.15-1.928a6.34 6.34 0 00.998-1.84c.328-.897.47-1.874.457-2.843-.01-.735-.128-1.465-.36-2.164-.26-.788-.66-1.52-1.15-2.167-.718-.94-1.66-1.683-2.73-2.15-.76-.33-1.56-.55-2.38-.636-.452-.047-.905-.052-1.36-.04zm0 2.203c1.077.01 2.144.385 2.992 1.026.83.627 1.432 1.493 1.725 2.476.29.967.31 2.02.044 2.983-.243.882-.716 1.692-1.35 2.33-.77.77-1.802 1.268-2.88 1.424-.954.137-1.944.025-2.83-.34-1.077-.442-1.99-1.222-2.55-2.193-.52-.912-.76-1.99-.714-3.045.038-.857.262-1.696.64-2.433.473-.925 1.182-1.696 2.03-2.22.9-.556 1.98-.822 3.03-.895zm12.986-2.193c-1.35 0-2.67.498-3.762 1.35a6.43 6.43 0 00-2.093 2.887c-.422 1.052-.57 2.214-.406 3.336.143.97.514 1.914 1.114 2.7.534.7 1.247 1.246 2.042 1.58.262.11.533.202.81.27.796.196 1.62.25 2.43.2 1.128-.068 2.262-.37 3.25-.956.843-.496 1.57-1.157 2.152-1.928.397-.534.73-1.163.998-1.84.326-.897.47-1.874.457-2.843-.01-.735-.126-1.465-.36-2.164-.26-.788-.66-1.52-1.15-2.167-.714-.94-1.656-1.683-2.726-2.15-.762-.33-1.56-.55-2.382-.636-.452-.047-.905-.052-1.36-.04zm0 2.203c1.077.01 2.146.385 2.993 1.026.83.627 1.432 1.493 1.725 2.476.288.967.31 2.02.046 2.983-.243.882-.716 1.692-1.35 2.33-.77.77-1.802 1.268-2.882 1.424-.954.137-1.944.025-2.83-.34-1.076-.442-1.99-1.222-2.548-2.193-.52-.912-.76-1.99-.715-3.045.038-.857.262-1.696.64-2.433.473-.925 1.182-1.696 2.03-2.22.9-.556 1.98-.822 3.03-.895z" /></svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-900  mb-2">Linux & Unix</h3>
                            <p className="text-sm text-slate-600  font-medium mb-6">Compatible avec Chromium et Google Chrome.</p>
                            <div className="space-y-3 text-sm text-slate-500  font-medium bg-slate-50  p-4 rounded-xl border border-slate-100  font-mono">
                                <p>1. Lancez Chromium / Chrome.</p>
                                <p>2. Allez sur le site web.</p>
                                <p>3. Icône <span className="text-yellow-500">⭳</span> "Installer" dans la barre d'adresse.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Creator Section (Centralized) */}
            <div className="py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] -z-10" />

                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-[3rem] p-10 md:p-16 text-center space-y-10 relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 p-1.5 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full shadow-2xl overflow-hidden">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                                    {config?.creatorAvatar && config.creatorAvatar.length > 2 ? (
                                        <img
                                            src={config.creatorAvatar}
                                            alt="Créateur"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config?.creatorName || 'MF')}&background=0D8ABC&color=fff&size=128`;
                                            }}
                                        />
                                    ) : (
                                        <span className="text-3xl font-black bg-gradient-to-tr from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {config?.creatorAvatar || 'MF'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">LE CRÉATEUR</h3>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900">{config?.creatorName || 'Mouhamed FALL'}</h2>
                            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto italic">
                                "{config?.creatorBio && config.creatorBio.length > 0
                                    ? config.creatorBio[config.creatorBio.length - 1]
                                    : "Je crois en un monde où la technologie est accessible à tous. Mysterious Classroom est ma contribution pour rendre l'apprentissage du code gratuit, fun et interactif."
                                }"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Sparkles, label: "Statut", value: "Étudiant L1" },
                                { icon: Heart, label: "Passion", value: "Code & Partage" },
                                { icon: Code2, label: "Focus", value: "Apprentissage" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-200 group hover:border-blue-500/30 transition-colors">
                                    <item.icon size={24} className="mx-auto mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-slate-800 font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6">
                            <a href="#" className="p-4 bg-white border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-white border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-white border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>


        </div >
    );
};

export default HomePage;
