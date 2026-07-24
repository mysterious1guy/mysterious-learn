import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart, Code, Sparkles } from 'lucide-react';
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
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mouhamedfa2007@gmail.com', label: 'Email' }
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
    <footer className="relative bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent border-t border-gray-800">
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Section À propos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <AnimatedLogo size="medium" />
              <h3 className="text-xl font-bold text-white">{c.siteName}</h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.innovative_platform') || c.footerText}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Section Créateur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Code size={18} className="text-blue-400" />
              {t('footer.creator') || t('footer_extended.creator') || 'Créateur'}
            </h4>

            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
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
                  <h5 className="text-white font-medium">{c.creatorName}</h5>
                  <p className="text-gray-400 text-sm">{t('footer_extended.creator_title') || t('footer.creator_title') || c.creatorTitle}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                {bioLines.map((line, i) => (
                  <p key={i} className="flex items-center gap-2">
                    {i === 0 && <Sparkles size={14} className="text-yellow-400 shrink-0" />}
                    {i === 1 && <Heart size={14} className="text-red-400 shrink-0" />}
                    {i === 2 && <Code size={14} className="text-green-400 shrink-0" />}
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-purple-400" />
              {t('footer.technologies') || t('footer_extended.technologies') || 'Technologies'}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {c.technologies.map((tech) => (
                <motion.div
                  key={tech}
                  className="bg-gray-800/30 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} {c.siteName}. {t('footer.platform_created_by') || 'Plateforme créée par'} {c.creatorName}.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {c.creatorName} • {t('footer_extended.creator_title') || t('footer.creator_title') || c.creatorTitle} • {t('footer.age_label') || "18 ans"}
              </p>
            </div>

            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>{t('footer.made_with_passion') || "Fait avec passion et l'aide de l'IA"}</span>
              <span>•</span>
              <span>{t('footer.fullstack_role') || "Développeur Full-Stack"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
