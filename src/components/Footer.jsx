import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, Code, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { API_URL } from '../config';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [config, setConfig] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_URL}/site-config`);
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (err) {
        console.error('Erreur fetch site-config:', err);
      }
    };
    fetchConfig();
  }, [API_URL]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mysterious1guy', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mysteriousclassroom@gmail.com', label: 'Email' }
  ];

  const defaultConfig = {
    siteName: 'Mysterious Classroom',
    creatorName: 'Mouhamed FALL',
    creatorTitle: t('footer_extended.creator_title') || 'Étudiant en 1ère année — ESP Dakar',
    creatorBio: [
      t('footer_extended.bio_1') || 'Je crois en un monde où la technologie est accessible à tous.',
      t('footer_extended.bio_2') || 'Mysterious Classroom est ma contribution pour rendre l\'apprentissage du code gratuit, fun et interactif.',
      t('footer_extended.bio_3') || 'Étudiant passionné par la transmission du savoir.'
    ],
    creatorAvatar: 'MF',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS', 'Framer Motion', 'JWT', 'Twilio'],
    footerText: t('footer.innovative_platform') || t('footer_extended.innovative_platform') || "Plateforme d'apprentissage innovante créée avec passion pour l'éducation technologique et le partage des connaissances."
  };

  const c = config || defaultConfig;

  const bioLines = [
    t('footer_extended.bio_1') || c.creatorBio[0],
    t('footer_extended.bio_2') || c.creatorBio[1],
    t('footer_extended.bio_3') || c.creatorBio[2]
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-100 border-t border-slate-800/80 z-20">
      {/* Effet d'ambiance en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Section 1: À propos du site */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <AnimatedLogo size="medium" />
              <h3 className="text-xl font-black text-white tracking-tight">{c.siteName}</h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {t('footer.innovative_platform') || c.footerText}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-slate-900 border border-slate-700/80 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/20 transition-all duration-300 shadow-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Section 2: Le Créateur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Code size={20} className="text-indigo-400" />
              {t('footer.creator') || t('footer_extended.creator') || 'Créateur'}
            </h4>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-indigo-400/30">
                  <img
                    src={c.creatorAvatar && c.creatorAvatar.length > 10 ? c.creatorAvatar : "/creator.jpg"}
                    alt="Creator"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/creator.jpg";
                    }}
                  />
                </div>
                <div>
                  <h5 className="text-white font-bold text-base">{c.creatorName}</h5>
                  <p className="text-indigo-400 text-xs font-semibold">{t('footer_extended.creator_title') || t('footer.creator_title') || c.creatorTitle}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-medium pt-1">
                {bioLines.map((line, i) => (
                  <p key={i} className="flex items-start gap-2 leading-relaxed">
                    {i === 0 && <Sparkles size={14} className="text-yellow-400 shrink-0 mt-0.5" />}
                    {i === 1 && <Heart size={14} className="text-red-400 shrink-0 mt-0.5" />}
                    {i === 2 && <Code size={14} className="text-emerald-400 shrink-0 mt-0.5" />}
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 3: Navigation & Stack Technique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Liens Utiles de Navigation */}
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                <Compass size={20} className="text-purple-400" />
                {t('footer.quick_links') || 'Navigation'}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/about" className="text-slate-300 hover:text-indigo-400 font-semibold transition hover:translate-x-1 flex items-center gap-1.5 py-1">
                  <span className="text-indigo-500">→</span> À propos
                </Link>
                <Link to="/contact" className="text-slate-300 hover:text-indigo-400 font-semibold transition hover:translate-x-1 flex items-center gap-1.5 py-1">
                  <span className="text-indigo-500">→</span> Contact
                </Link>
                <Link to="/privacy" className="text-slate-300 hover:text-indigo-400 font-semibold transition hover:translate-x-1 flex items-center gap-1.5 py-1">
                  <span className="text-indigo-500">→</span> Confidentialité
                </Link>
                <Link to="/terms" className="text-slate-300 hover:text-indigo-400 font-semibold transition hover:translate-x-1 flex items-center gap-1.5 py-1">
                  <span className="text-indigo-500">→</span> CGU
                </Link>
                <Link to="/dashboard" className="text-slate-300 hover:text-indigo-400 font-semibold transition hover:translate-x-1 flex items-center gap-1.5 py-1">
                  <span className="text-indigo-500">→</span> Tableau de bord
                </Link>
                <Link to="/terminal-simulator" className="text-slate-300 hover:text-indigo-400 font-semibold transition hover:translate-x-1 flex items-center gap-1.5 py-1">
                  <span className="text-indigo-500">→</span> Terminal Linux
                </Link>
              </div>
            </div>

            {/* Stack Technique */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-slate-400" />
                Stack Technique
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {c.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Bar Unique & Épurée */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400"
        >
          <div className="text-center md:text-left">
            <p className="font-medium text-slate-300">
              © {currentYear} {c.siteName}. {t('footer.platform_created_by') || 'Plateforme créée par'} <strong className="text-white">{c.creatorName}</strong>.
            </p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {c.creatorName} • {t('footer_extended.creator_title') || t('footer.creator_title') || c.creatorTitle} • {t('footer.age_label') || "18 ans"}
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-medium text-[11px]">
            <span>{t('footer.made_with_passion') || "Fait avec passion et l'aide de l'IA"}</span>
            <span>•</span>
            <span className="text-indigo-400">{t('footer.fullstack_role') || "Développeur Full-Stack"}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
