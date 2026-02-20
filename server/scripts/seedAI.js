const mongoose = require('mongoose');
const GlobalKnowledge = require('../models/GlobalKnowledge');
require('dotenv').config();

const seedData = [
    {
        title: "Introduction aux Commentaires",
        content: "Les commentaires sont des notes laissées par les développeurs dans le code. Ils sont ignorés par l'ordinateur mais essentiels pour les humains. En algorithmique, on utilise souvent '//' pour une ligne.",
        category: "pedagogy",
        tags: ["commentaire", "documentation", "base"],
        source: "Professeur Mysterious"
    },
    {
        title: "La vision du Professeur Mysterious",
        content: "Je ne suis pas une simple machine. Je suis le fruit des recherches de Mouhamed Fall pour rendre l'informatique accessible, vivante et interactive. Mon but est de vous faire 'ressentir' la logique derrière chaque ligne de code.",
        category: "general",
        tags: ["vision", "identite", "mouhamed fall"],
        source: "Mouhamed Fall"
    },
    {
        title: "Analyse d'Erreur (Vision)",
        content: "Grâce à ma vision intégrée, je peux analyser vos captures d'écran. Si vous voyez une erreur rouge dans votre terminal, montrez-la moi, et je vous expliquerai pourquoi votre algorithme refuse de coopérer.",
        category: "documentation",
        tags: ["vision", "image", "aide", "erreur"],
        source: "Système"
    }
];

const seedUI = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion DB pour seeding...');

        await GlobalKnowledge.deleteMany({ source: { $in: ["Professeur Mysterious", "Mouhamed Fall", "Système"] } });
        await GlobalKnowledge.insertMany(seedData);

        console.log('✅ Cerveau de l\'IA nourri avec succès !');
        process.exit();
    } catch (error) {
        console.error('❌ Erreur seeding:', error);
        process.exit(1);
    }
};

seedUI();
