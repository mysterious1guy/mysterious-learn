import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPage = () => {
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
            {t('privacy.title') || "Politique de Confidentialité"}
          </h1>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p className="text-xl text-slate-900 font-bold">
              {t('privacy.priority') || "Votre confiance est notre priorité absolue."}
            </p>
            
            <p dangerouslySetInnerHTML={{ __html: t('privacy.intro') || "Chez <strong>Mysterious Classroom</strong>, nous croyons en une transparence totale et une sécurité sans faille." }} />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.h1') || "1. Collecte de Données"}</h2>
              <p>
                {t('privacy.p1') || "Nous collectons uniquement les informations nécessaires à votre progression : votre nom, email et votre avancement dans les cours."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.h2') || "2. Usage des Données"}</h2>
              <p>
                {t('privacy.p2') || "Vos données servent exclusivement à personnaliser votre expérience d'apprentissage. Nous ne partageons jamais vos informations avec des tiers."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.h3') || "3. Sécurité"}</h2>
              <p>
                {t('privacy.p3') || "Toutes vos données sont chiffrées et stockées sur des serveurs sécurisés."}
              </p>
            </section>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-700 flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 mt-1" size={20} />
                <span>
                  {t('privacy.last_update') || "Dernière mise à jour : 18 Février 2026"}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
