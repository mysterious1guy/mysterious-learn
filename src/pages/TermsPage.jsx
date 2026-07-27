import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';

const TermsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <div className="py-20 px-4 max-w-4xl mx-auto w-full flex-1">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition group text-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
          {t('common.back_to_home') || "Retour à l'accueil"}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-white bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            {t('terms.title') || "Conditions d'Utilisation"}
          </h1>

          <div className="space-y-6 text-slate-300 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{t('terms.h1') || "1. Acceptation des Conditions"}</h2>
              <p>
                {t('terms.p1') || "En accédant à Mysterious Classroom, vous acceptez d'être lié par les présentes conditions d'utilisation."}
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{t('terms.h2') || "2. Compte Utilisateur"}</h2>
              <p>
                {t('terms.p2') || "Vous êtes responsable de maintenir la confidentialité de votre compte."}
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{t('terms.h3') || "3. Contenu des Cours"}</h2>
              <p>
                {t('terms.p3') || "Le contenu des cours est protégé par les droits d'auteur."}
              </p>
            </section>

            <div className="mt-8 p-5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
              <p className="text-indigo-400 text-sm font-semibold">
                {t('terms.last_update') || "Dernière mise à jour : 27 Juillet 2026"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
