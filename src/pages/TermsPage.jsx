import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TermsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          {t('common.back_to_home') || "Retour à l'accueil"}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-slate-900">
            {t('terms.title') || "Conditions d'Utilisation"}
          </h1>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.h1') || "1. Acceptation des Conditions"}</h2>
              <p>
                {t('terms.p1') || "En accédant à Mysterious Classroom, vous acceptez d'être lié par les présentes conditions d'utilisation."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.h2') || "2. Compte Utilisateur"}</h2>
              <p>
                {t('terms.p2') || "Vous êtes responsable de maintenir la confidentialité de votre compte."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('terms.h3') || "3. Contenu des Cours"}</h2>
              <p>
                {t('terms.p3') || "Le contenu des cours est protégé par les droits d'auteur."}
              </p>
            </section>

            <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-xl">
              <p className="text-purple-700">
                {t('terms.last_update') || "Dernière mise à jour : 18 Février 2026"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
