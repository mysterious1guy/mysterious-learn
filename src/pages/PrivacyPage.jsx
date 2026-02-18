import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const PrivacyPage = () => {
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
            Politique de Confidentialité
          </h1>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-xl text-white font-semibold">
              Votre confiance est notre priorité absolue.
            </p>
            
            <p>
              Chez <strong>Mysterious Classroom</strong>, nous croyons en une transparence totale 
              et une sécurité sans faille.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Collecte de Données</h2>
              <p>
                Nous collectons uniquement les informations nécessaires à votre progression : 
                votre nom, email et votre avancement dans les cours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Usage des Données</h2>
              <p>
                Vos données servent exclusivement à personnaliser votre expérience d'apprentissage. 
                Nous ne partageons jamais vos informations avec des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Sécurité</h2>
              <p>
                Toutes vos données sont chiffrées et stockées sur des serveurs sécurisés.
              </p>
            </section>

            <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <p className="text-blue-200 flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 mt-1" size={20} />
                <span>
                  Dernière mise à jour : 18 Février 2026
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
