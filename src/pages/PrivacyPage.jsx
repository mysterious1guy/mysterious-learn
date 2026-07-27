import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, Shield, Lock, Eye, Trash2, Cookie, 
    Globe, Mail, CheckCircle, AlertTriangle, FileText, Clock
} from 'lucide-react';
import Footer from '../components/Footer';

const PrivacyPage = () => {
    const lastUpdate = '27 Juillet 2026';

    const sections = [
        {
            id: '1',
            icon: Eye,
            title: '1. Données Collectées',
            color: 'text-blue-400',
            content: [
                {
                    subtitle: 'Données d\'inscription',
                    text: 'Lorsque vous créez un compte, nous collectons : votre nom ou pseudonyme, votre adresse email, et un mot de passe haché (jamais stocké en clair). Si vous utilisez la connexion Google (OAuth), nous recevons uniquement le nom, l\'email et l\'avatar de votre compte Google.'
                },
                {
                    subtitle: 'Données de progression',
                    text: 'Nous enregistrons votre progression dans les cours (chapitres complétés, scores, XP), vos préférences de langue et de thème, ainsi que l\'historique de vos sessions dans le terminal Linux.'
                },
                {
                    subtitle: 'Données techniques',
                    text: 'Pour améliorer la plateforme, nous collectons des données anonymisées sur votre navigateur, système d\'exploitation et comportement de navigation (pages visitées, temps passé). Ces données ne permettent pas de vous identifier personnellement.'
                }
            ]
        },
        {
            id: '2',
            icon: Lock,
            title: '2. Utilisation des Données',
            color: 'text-emerald-400',
            content: [
                {
                    subtitle: 'Usage pédagogique',
                    text: 'Vos données de progression servent exclusivement à personnaliser votre parcours d\'apprentissage, calculer votre XP et votre position dans le classement (leaderboard), et vous recommander des cours adaptés à votre niveau.'
                },
                {
                    subtitle: 'Communications',
                    text: 'Nous pouvons vous envoyer des emails relatifs à votre compte (confirmation d\'inscription, réinitialisation de mot de passe) et des notifications pédagogiques optionnelles (nouveaux cours, rappels de progression). Vous pouvez vous désabonner à tout moment.'
                },
                {
                    subtitle: 'Pas de vente de données',
                    text: 'Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales. Jamais.'
                }
            ]
        },
        {
            id: '3',
            icon: Globe,
            title: '3. Partage avec des Tiers',
            color: 'text-purple-400',
            content: [
                {
                    subtitle: 'Services techniques',
                    text: 'Pour faire fonctionner la plateforme, nous faisons appel à des prestataires techniques : Render.com (hébergement), MongoDB Atlas (base de données), Google OAuth (connexion), Twilio/SendGrid (emails). Ces partenaires traitent vos données dans le strict cadre de leur mission et sont soumis à des politiques de confidentialité rigoureuses.'
                },
                {
                    subtitle: 'Intelligence Artificielle',
                    text: 'Notre assistant IA utilise l\'API OpenRouter (modèles DeepSeek, Claude, GPT). Vos messages sont transmis à ces APIs pour générer des réponses. Ils ne sont pas utilisés pour entraîner des modèles. Évitez d\'y inclure des données sensibles.'
                },
                {
                    subtitle: 'Publicités (Google AdSense)',
                    text: 'Nous utilisons Google AdSense pour afficher des publicités. Google peut utiliser des cookies publicitaires pour personnaliser les annonces en fonction de votre navigation. Vous pouvez gérer vos préférences publicitaires via les paramètres Google ou refuser via notre bandeau cookies.'
                }
            ]
        },
        {
            id: '4',
            icon: Cookie,
            title: '4. Cookies',
            color: 'text-amber-400',
            content: [
                {
                    subtitle: 'Cookies essentiels',
                    text: 'Nécessaires au fonctionnement de la plateforme : jeton d\'authentification (JWT), préférences de langue et de thème. Ces cookies ne peuvent pas être refusés sans altérer le fonctionnement du site.'
                },
                {
                    subtitle: 'Cookies analytiques et publicitaires',
                    text: 'Google Analytics (statistiques anonymes de trafic) et Google AdSense (publicités) utilisent des cookies tiers. Vous pouvez les refuser via notre gestionnaire de consentement ou les paramètres de votre navigateur.'
                }
            ]
        },
        {
            id: '5',
            icon: Shield,
            title: '5. Sécurité des Données',
            color: 'text-red-400',
            content: [
                {
                    subtitle: 'Mesures techniques',
                    text: 'Toutes les communications sont chiffrées via HTTPS/TLS. Les mots de passe sont hachés avec bcrypt (algorithme irréversible). Les tokens d\'authentification JWT ont une durée de vie limitée et sont validés à chaque requête.'
                },
                {
                    subtitle: 'Accès restreint',
                    text: 'L\'accès aux données utilisateurs est strictement limité à l\'administrateur de la plateforme (Mouhamed FALL). Aucun autre employé ou tiers n\'y a accès, sauf les prestataires techniques dans le cadre de leurs missions.'
                }
            ]
        },
        {
            id: '6',
            icon: Trash2,
            title: '6. Vos Droits (RGPD)',
            color: 'text-indigo-400',
            content: [
                {
                    subtitle: 'Droits garantis',
                    text: 'Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : accès à vos données personnelles, rectification des données inexactes, suppression de votre compte et de toutes vos données (droit à l\'oubli), portabilité de vos données dans un format standard.'
                },
                {
                    subtitle: 'Exercer vos droits',
                    text: 'Pour exercer ces droits, envoyez une demande à : mysteriousclassroom@gmail.com. Nous traiterons votre demande dans un délai maximum de 30 jours, conformément à la réglementation.'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition group text-sm"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
                        Retour à l'accueil
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-semibold mb-6">
                            <Shield size={14} />
                            Votre vie privée nous importe
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-300 bg-clip-text text-transparent">
                            Politique de<br />Confidentialité
                        </h1>
                        <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
                            Chez <strong className="text-white">Mysterious Classroom</strong>, nous croyons en une transparence totale 
                            sur la façon dont nous utilisons vos données.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6">
                            <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
                                <CheckCircle size={14} />
                                Conforme au RGPD
                            </div>
                            <div className="flex items-center gap-2 text-blue-400 text-sm bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5">
                                <Clock size={14} />
                                Mise à jour : {lastUpdate}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation rapide */}
            <div className="bg-slate-900/80 border-b border-slate-800 py-4 px-4 sticky top-0 z-10 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto flex flex-wrap gap-3 text-xs">
                    {sections.map(s => (
                        <a key={s.id} href={`#section-${s.id}`} className="text-slate-400 hover:text-white transition hover:underline">
                            {s.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Sections */}
            <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
                {sections.map((section, i) => (
                    <motion.section
                        key={section.id}
                        id={`section-${section.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition"
                    >
                        <h2 className={`text-xl md:text-2xl font-black mb-6 flex items-center gap-3 ${section.color}`}>
                            <section.icon size={24} />
                            {section.title}
                        </h2>
                        <div className="space-y-5">
                            {section.content.map((item, j) => (
                                <div key={j}>
                                    <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">{item.subtitle}</h3>
                                    <p className="text-slate-400 leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                ))}

                {/* Alerte AdSense */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex items-start gap-4"
                >
                    <AlertTriangle size={24} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-amber-400 font-bold mb-2">Note sur Google AdSense</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Cette plateforme participe au programme Google AdSense. Google, en tant que fournisseur tiers, 
                            utilise des cookies (dont le cookie DART) pour diffuser des annonces en fonction des visites 
                            de l'utilisateur sur ce site et d'autres sites. Les utilisateurs peuvent désactiver l'utilisation 
                            du cookie DART en consultant la <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-amber-400 underline hover:text-white">politique de confidentialité de Google</a>.
                        </p>
                    </div>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center"
                >
                    <FileText size={32} className="text-slate-500 mx-auto mb-4" />
                    <h2 className="text-xl font-black text-white mb-3">Des questions sur vos données ?</h2>
                    <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm">
                        Notre Délégué à la Protection des Données (DPD) est disponible pour répondre à toutes vos questions concernant le traitement de vos données personnelles.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="mailto:mysteriousclassroom@gmail.com"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all hover:scale-105"
                        >
                            <Mail size={16} />
                            mysteriousclassroom@gmail.com
                        </a>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 hover:border-slate-500 text-white rounded-xl transition-all hover:scale-105"
                        >
                            Formulaire de contact
                        </Link>
                    </div>
                    <p className="text-slate-600 text-xs mt-6">
                        Éditeur : Mouhamed FALL — Étudiant, École Supérieure Polytechnique, Dakar, Sénégal<br />
                        Hébergeur : Render.com — 525 Brannan St, San Francisco, CA 94107, USA
                    </p>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPage;
