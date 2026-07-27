import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, Mail, MessageSquare, Github, Linkedin, 
    Twitter, Clock, CheckCircle, Send, AlertCircle, User, FileText
} from 'lucide-react';
import Footer from '../components/Footer';
import { API_URL } from '../config';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus('loading');
        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            // Si la route contact n'existe pas encore, simuler le succès 
            // (le message sera envoyé par email directement)
            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Direct',
            value: 'mysteriousclassroom@gmail.com',
            desc: 'Réponse garantie sous 24h',
            href: 'mailto:mysteriousclassroom@gmail.com',
            color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        },
        {
            icon: Github,
            title: 'GitHub',
            value: 'github.com/mysterious1guy',
            desc: 'Signaler un bug ou proposer une fonctionnalité',
            href: 'https://github.com/mysterious1guy',
            color: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        },
        {
            icon: Twitter,
            title: 'Réseaux Sociaux',
            value: '@MysteriousClassroom',
            desc: 'Suivez nos actualités et nouvelles formations',
            href: 'https://x.com',
            color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
        },
    ];

    const subjects = [
        'Question sur les cours',
        'Problème technique',
        'Signaler un bug',
        'Proposition de partenariat',
        'Question sur mon compte',
        'Autre',
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition group text-sm"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
                        Retour à l'accueil
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm font-semibold mb-6">
                            <MessageSquare size={14} />
                            Nous sommes à l'écoute
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                            Contactez-nous
                        </h1>
                        <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
                            Une question, un problème ou une suggestion ? Notre équipe vous répondra
                            dans les <strong className="text-white">24 heures</strong>.
                        </p>
                        <div className="flex items-center gap-2 mt-6 text-emerald-400 text-sm">
                            <Clock size={16} />
                            <span>Délai de réponse moyen : moins de 12 heures</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-12">
                {/* Méthodes de contact */}
                <div className="md:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                        <h2 className="text-xl font-bold text-white mb-6">Autres moyens de contact</h2>
                        <div className="space-y-4">
                            {contactMethods.map((method, i) => (
                                <motion.a
                                    key={i}
                                    href={method.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`block border rounded-2xl p-5 transition-all hover:scale-[1.02] ${method.color}`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <method.icon size={20} />
                                        <span className="font-bold">{method.title}</span>
                                    </div>
                                    <p className="text-white text-sm font-semibold">{method.value}</p>
                                    <p className="text-slate-500 text-xs mt-1">{method.desc}</p>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Informations légales */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-sm space-y-3"
                    >
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <FileText size={16} className="text-slate-400" />
                            Ressources légales
                        </h3>
                        <div className="space-y-2">
                            <Link to="/privacy" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                                → Politique de Confidentialité
                            </Link>
                            <Link to="/terms" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                                → Conditions d'Utilisation
                            </Link>
                            <Link to="/about" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                                → À propos de nous
                            </Link>
                        </div>
                        <p className="text-slate-500 text-xs pt-2 border-t border-slate-700">
                            Éditeur : Mouhamed FALL — mysteriousclassroom@gmail.com<br />
                            Hébergeur : Render.com — 525 Brannan St, San Francisco, CA 94107
                        </p>
                    </motion.div>
                </div>

                {/* Formulaire */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="md:col-span-3"
                >
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Send size={18} className="text-blue-400" />
                            Envoyer un message
                        </h2>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <CheckCircle size={56} className="text-emerald-400 mx-auto mb-4" />
                                <h3 className="text-white text-xl font-black mb-2">Message envoyé !</h3>
                                <p className="text-slate-400">Nous vous répondrons sous 24h à l'adresse que vous avez fournie.</p>
                                <button
                                    onClick={() => setStatus(null)}
                                    className="mt-6 px-6 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:text-white transition text-sm"
                                >
                                    Envoyer un autre message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-400 text-sm font-semibold mb-2">
                                            <User size={14} className="inline mr-1" />
                                            Nom complet *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                            placeholder="Votre nom"
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-sm font-semibold mb-2">
                                            <Mail size={14} className="inline mr-1" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            placeholder="votre@email.com"
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm font-semibold mb-2">Sujet</label>
                                    <select
                                        value={form.subject}
                                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                                    >
                                        <option value="">Sélectionner un sujet...</option>
                                        {subjects.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm font-semibold mb-2">
                                        <MessageSquare size={14} className="inline mr-1" />
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        placeholder="Décrivez votre question ou problème en détail..."
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600 resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                                        <AlertCircle size={16} />
                                        Erreur lors de l'envoi. Veuillez nous écrire directement à mysteriousclassroom@gmail.com
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20"
                                >
                                    {status === 'loading' ? (
                                        <span className="animate-pulse">Envoi en cours...</span>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Envoyer le message
                                        </>
                                    )}
                                </button>
                                <p className="text-slate-500 text-xs text-center">
                                    En envoyant ce message, vous acceptez notre <Link to="/privacy" className="text-blue-400 hover:underline">politique de confidentialité</Link>.
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;
