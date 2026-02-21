const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
    siteName: {
        type: String,
        default: 'Mysterious Classroom'
    },
    creatorName: {
        type: String,
        default: 'Mouhamed FALL'
    },
    creatorTitle: {
        type: String,
        default: 'Étudiant en 1ère année — ESP Dakar'
    },
    creatorBio: {
        type: [String],
        default: [
            "Je crois en un monde où la technologie est accessible à tous.",
            "Mysterious Classroom est ma contribution pour rendre l'apprentissage du code gratuit, fun et interactif.",
            "Étudiant passionné par la transmission du savoir."
        ]
    },
    creatorAvatar: {
        type: String, // Initials or Base64
        default: 'MF'
    },
    technologies: {
        type: [String],
        default: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS', 'Framer Motion', 'JWT', 'Twilio']
    },
    socialLinks: [
        {
            platform: String,
            url: String,
            icon: String
        }
    ],
    footerText: {
        type: String,
        default: "Plateforme d'apprentissage innovante créée avec passion pour l'éducation technologique et le partage des connaissances."
    },
    // Nouveaux paramètres ajoutés en Phase 15
    aiTemperature: {
        type: Number,
        default: 0.7
    },
    aiMemory: {
        type: Boolean,
        default: true
    },
    gamificationStreaks: {
        type: Boolean,
        default: true
    },
    gamificationBadges: {
        type: Boolean,
        default: false
    },
    themeForce: {
        type: String,
        enum: ['AUTO', 'DARK'],
        default: 'AUTO'
    },
    ultraImmersiveMode: {
        type: Boolean,
        default: false
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
