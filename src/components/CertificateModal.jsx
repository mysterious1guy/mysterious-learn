import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Download, Share2, Sparkles, ShieldCheck } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, certificateData }) => {
  if (!isOpen || !certificateData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border-2 border-amber-500/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-amber-500/10 overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[120px] pointer-events-none -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[120px] pointer-events-none -ml-40 -mb-40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-all print:hidden"
          >
            <X size={20} />
          </button>

          {/* Certificate Inner Frame */}
          <div className="border-2 border-dashed border-amber-500/20 rounded-[2rem] p-6 md:p-10 relative bg-slate-950/60 backdrop-blur-md">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
                <Award size={36} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
                  Certificat d'Excellence & Accomplissement
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tight mt-1">
                  MYSTERIOUS CLASSROOM
                </h1>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center space-y-6">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Décerné avec les félicitations du jury à
              </p>

              <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                {certificateData.userName}
              </h2>

              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                Pour avoir complété avec succès et brio le programme de formation avancée :
              </p>

              <div className="py-3 px-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl inline-block">
                <p className="text-lg md:text-xl font-black text-amber-300">
                  {certificateData.courseTitle}
                </p>
              </div>

              {/* AI Appreciation Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-left relative overflow-hidden space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} /> Appréciation Officielle du Copilot & Direction
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium italic">
                  "{certificateData.appreciation}"
                </p>
              </div>

              {/* Footer Credentials */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>ID Officiel : <strong className="font-mono text-white">{certificateData.certificateId}</strong></span>
                </div>
                <div>
                  <span>Délivré le : <strong className="text-white">{certificateData.issueDate}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Download size={16} /> Imprimer / Imprimer en PDF
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl transition-all"
            >
              Fermer
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CertificateModal;
