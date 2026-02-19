import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart, Code, Sparkles } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mouhamedfa2007@gmail.com', label: 'Email' }
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
              <h3 className="text-xl font-bold text-white">Mysterious Classroom</h3>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Plateforme d'apprentissage innovante créée avec passion pour l'éducation 
              technologique et le partage des connaissances.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
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
              Créateur
            </h4>
            
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MF</span>
                </div>
                <div>
                  <h5 className="text-white font-medium">Mouhamed FALL</h5>
                  <p className="text-gray-400 text-sm">Étudiant en informatique</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-400" />
                  Première année - École Supérieure Polytechnique de Dakar (ESP)
                </p>
                <p className="flex items-center gap-2">
                  <Heart size={14} className="text-red-400" />
                  Passionné d'informatique depuis la 5ème
                </p>
                <p className="flex items-center gap-2">
                  <Code size={14} className="text-green-400" />
                  18 ans, développeur full-stack
                </p>
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
              Technologies
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                'React', 'Node.js', 'MongoDB', 'Express',
                'TailwindCSS', 'Framer Motion', 'JWT', 'Twilio'
              ].map((tech, index) => (
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
                © {currentYear} Mysterious Classroom. Tous droits réservés.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Créé avec <Heart className="inline text-red-400" size={12} /> par Mouhamed FALL
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span>ESP Dakar</span>
              <span>•</span>
              <span>Class of 2027</span>
              <span>•</span>
              <span>Full-Stack Developer</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
