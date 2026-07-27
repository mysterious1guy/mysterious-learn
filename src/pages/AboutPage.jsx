import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, Terminal, Shield, Users, Target, 
    Sparkles, Heart, Globe, Code2, Zap, Award, Mail
} from 'lucide-react';
import Footer from '../components/Footer';

const AboutPage = () => {
    const stats = [
        { icon: BookOpen, value: '50+', label: 'Cours disponibles', color: 'text-blue-400' },
        { icon: Terminal, value: '10+', label: 'Projets pratiques', color: 'text-emerald-400' },
        { icon: Users, value: '100%', label: 'Gratuit', color: 'text-purple-400' },
        { icon: Award, value: '24/7', label: 'IA disponible', color: 'text-amber-400' },
    ];

    const features = [
        { icon: Terminal, title: 'Terminal Linux Réel', desc: 'Apprenez dans un terminal authentique, pas une simulation. Connectez-vous à de vraies machines via SSH.' },
        { icon: Shield, title: 'Cybersécurité Éthique', desc: 'Initiez-vous au hacking éthique avec des missions guidées et des scénarios réalistes de sécurité informatique.' },
        { icon: BookOpen, title: 'Cours Progressifs', desc: 'Du débutant à l\'expert, nos cours s\'adaptent à votre niveau et progressent à votre rythme.' },
        { icon: Zap, title: 'Apprentissage par Projets', desc: 'Réalisez de vrais projets professionnels pour consolider vos compétences avec un feedback en temps réel.' },
        { icon: Globe, title: 'Accessible Partout', desc: 'Apprenez depuis n\'importe quel appareil, à tout moment. Notre plateforme est 100% responsive.' },
        { icon: Code2, title: 'IA Pédagogique', desc: 'Un assistant IA dédié vous guide, répond à vos questions et vous débogue à chaque étape.' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition group text-sm"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
                        Retour à l'accueil
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-indigo-400 text-sm font-semibold mb-6">
                            <Sparkles size={14} />
                            Notre Histoire
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                            À Propos de<br />Mysterious Classroom
                        </h1>
                        <p className="text-slate-400 text-xl leading-relaxed max-w-3xl">
                            Une plateforme d'apprentissage créée par un étudiant passionné, 
                            pour rendre le code et la cybersécurité accessibles à tous — <strong className="text-white">gratuitement</strong>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats */}
            <div className="py-12 px-4 border-y border-slate-800 bg-slate-900/50">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <stat.icon size={28} className={`mx-auto mb-2 ${stat.color}`} />
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mission */}
            <div className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-indigo-400 font-bold mb-4 uppercase tracking-wider text-sm">
                                <Target size={16} />
                                Notre Mission
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                                L'éducation technologique, <span className="text-indigo-400">accessible à tous</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Mysterious Classroom est né d'une conviction simple : apprendre la programmation, 
                                Linux et la cybersécurité ne devrait pas nécessiter de payer des milliers d'euros de formation.
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Notre plateforme propose des cours structurés, des projets pratiques et un simulateur 
                                de terminal Linux réel pour que vous puissiez acquérir de vraies compétences professionnelles.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Tout le contenu est original, créé avec soin pour progresser du niveau débutant 
                                jusqu'à des compétences avancées en sécurité informatique.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-slate-800 border border-slate-700 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                    MF
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Mouhamed FALL</h3>
                                    <p className="text-slate-400 text-sm">Fondateur & Développeur</p>
                                    <p className="text-indigo-400 text-xs">Étudiant — École Supérieure Polytechnique, Dakar</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm text-slate-400">
                                <p className="flex items-start gap-2">
                                    <Sparkles size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                                    Je crois en un monde où la technologie est accessible à tous.
                                </p>
                                <p className="flex items-start gap-2">
                                    <Heart size={14} className="text-red-400 shrink-0 mt-0.5" />
                                    Mysterious Classroom est ma contribution pour rendre l'apprentissage du code gratuit, fun et interactif.
                                </p>
                                <p className="flex items-start gap-2">
                                    <Code2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                                    Étudiant passionné par la transmission du savoir et l'innovation technologique.
                                </p>
                            </div>
                            <a
                                href="mailto:mysteriousclassroom@gmail.com"
                                className="mt-6 inline-flex items-center gap-2 text-indigo-400 hover:text-white text-sm transition"
                            >
                                <Mail size={14} />
                                mysteriousclassroom@gmail.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features */}
            <div className="py-16 px-4 bg-slate-900/50 border-y border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ce que nous offrons</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Une expérience d'apprentissage complète, unique et professionnelle.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
                            >
                                <feature.icon size={24} className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenu & Conformité */}
            <div className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-emerald-500/10 to-slate-800 border border-emerald-500/30 rounded-3xl p-8 md:p-12"
                    >
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                            <Shield size={24} className="text-emerald-400" />
                            Contenu Original & Éthique
                        </h2>
                        <div className="space-y-4 text-slate-300 leading-relaxed">
                            <p>
                                Tout le contenu de Mysterious Classroom est <strong className="text-white">original, éducatif et adapté à tous les publics</strong>. 
                                Nous sommes engagés à maintenir un environnement d'apprentissage sûr et respectueux.
                            </p>
                            <p>
                                La cybersécurité que nous enseignons est exclusivement dans un cadre <strong className="text-emerald-400">éthique et légal</strong> : 
                                pentest de machines virtuelles, labs isolés, et projets pédagogiques sans cible réelle.
                            </p>
                            <p>
                                Nous nous conformons aux <a href="/privacy" className="text-indigo-400 hover:text-white underline">politiques de confidentialité</a> les plus strictes 
                                et aux <a href="/terms" className="text-indigo-400 hover:text-white underline">conditions d'utilisation</a> clairement définies.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Contact */}
            <div className="py-12 px-4 bg-slate-900 border-t border-slate-800">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-black text-white mb-4">Des questions ?</h2>
                    <p className="text-slate-400 mb-6">N'hésitez pas à nous contacter, nous répondons dans les 24h.</p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
                    >
                        <Mail size={18} />
                        Nous contacter
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
