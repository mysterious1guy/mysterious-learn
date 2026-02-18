import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          Retour à l'accueil
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Conditions d'Utilisation
          </h1>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptation des Conditions</h2>
              <p>
                En accédant à Mysterious Classroom, vous acceptez d'être lié par les présentes 
                conditions d'utilisation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Compte Utilisateur</h2>
              <p>
                Vous êtes responsable de maintenir la confidentialité de votre compte.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Contenu des Cours</h2>
              <p>
                Le contenu des cours est protégé par les droits d'auteur.
              </p>
            </section>

            <div className="mt-8 p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl">
              <p className="text-purple-200">
                Dernière mise à jour : 18 Février 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
