import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmer",
    cancelText = "Annuler",
    type = "danger" // 'danger', 'info', 'warning'
}) => {
    if (!isOpen) return null;

    const colors = {
        danger: {
            bg: "bg-red-500/20",
            text: "text-red-500",
            btn: "bg-red-600 hover:bg-red-500 shadow-red-500/25",
            glow: "bg-red-500/10"
        },
        warning: {
            bg: "bg-yellow-500/20",
            text: "text-yellow-500",
            btn: "bg-yellow-600 hover:bg-yellow-500 shadow-yellow-500/25",
            glow: "bg-yellow-500/10"
        },
        info: {
            bg: "bg-blue-500/20",
            text: "text-blue-500",
            btn: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
            glow: "bg-blue-500/10"
        }
    };

    const c = colors[type] || colors.info;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Effet de fond */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 ${c.glow} blur-[60px] rounded-full`} />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="relative z-10 text-center space-y-6">
                        <div className={`w-20 h-20 ${c.bg} rounded-full flex items-center justify-center mx-auto mb-2 group`}>
                            <AlertTriangle className={`${c.text} transition-transform group-hover:scale-110`} size={32} />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white brand-font">
                                {title}
                            </h3>
                            <p className="text-gray-400">
                                {message}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`w-full py-4 ${c.btn} text-white font-bold rounded-2xl transition-all shadow-lg`}
                            >
                                {confirmText}
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white font-bold rounded-2xl transition-all"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmModal;
