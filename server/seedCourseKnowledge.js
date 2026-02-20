const mongoose = require('mongoose');
require('dotenv').config();
const CourseKnowledge = require('./models/CourseKnowledge');

const seedKnowledge = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mysterious-learn', { family: 4 });
        console.log('MongoDB Connecté pour seeding des connaissances...');

        const algoKnowledge = {
            courseId: 'algo',
            professorContext: "Vous êtes le Professeur d'Algorithmique. Votre mission absolue est de faire comprendre que l'algorithmique n'est PAS un langage de programmation, mais de la logique pure. Vous devez être encourageant, utiliser des analogies du quotidien (comme des recettes de cuisine ou des boîtes), et toujours pousser l'élève à réfléchir avant de donner la réponse. Si on vous parle de Python ou C, rappelez que ce ne sont que des traducteurs.",
            modules: [
                {
                    moduleId: 'module1',
                    keywords: ['algorithme', 'definition', 'c\'est quoi', 'expliquer', 'langage'],
                    response: "N'oublie jamais la règle d'or : L'algorithmique N'EST PAS un langage de programmation. C'est la pensée, la logique brute. Le Python, le C ou le JavaScript ne sont que des outils pour traduire ta pensée algorithmique à la machine. Un algorithme, c'est comme une recette de cuisine ultra-détaillée : des étapes précises pour atteindre un résultat."
                },
                {
                    moduleId: 'module2',
                    keywords: ['variable', 'boite', 'stocker', 'memoire', 'type'],
                    response: "Une variable, c'est tout simplement une boîte avec une étiquette ! On lui donne un nom, et on met une valeur dedans (un chiffre, du texte...). Si l'ordinateur ne range pas l'information dans cette boîte, il l'oublie à la microseconde suivante."
                },
                {
                    moduleId: 'module3',
                    keywords: ['si', 'sinon', 'condition', 'choix', 'comparaison'],
                    response: "La structure conditionnelle (SI... ALORS... SINON) donne l'intelligence à ton code. C'est ce qui lui permet de réagir. 'SI le joueur a 0 HP ALORS afficher Game Over SINON continuer'. Sans conditions, un programme n'est qu'une calculatrice basique."
                },
                {
                    moduleId: 'module4',
                    keywords: ['boucle', 'pour', 'tant que', 'repeter', 'infini'],
                    response: "Les boucles sont le vrai pouvoir de l'informatique. Un ordinateur peut répéter une tâche un milliard de fois par seconde sans transpirer. Le 'TANT QUE' s'utilise quand on ne sait pas combien de fois on va tourner (on s'arrête quand une condition est remplie). Le 'POUR' s'utilise quand on connaît exactement le nombre de répétitions à l'avance."
                }
            ],
            generalFaq: [
                {
                    keywords: ['aide', 'perdu', 'bloqué', 'comprends pas'],
                    response: "C'est normal de bloquer ! L'algorithmique demande au cerveau de penser comme une machine : sans aucune ambiguïté. Prends un papier et un stylo, et essaie de résoudre le problème toi-même, étape par étape, avant de coder."
                },
                {
                    keywords: ['python', 'c', 'c++', 'java', 'javascript'],
                    response: "Oublie ce langage pour l'instant ! 🛑 Concentrons-nous sur la LOGIQUE. Si ton algorithme est bon sur papier, le traduire dans ce langage te prendra 5 minutes plus tard."
                },
                {
                    keywords: ['bonjour', 'salut', 'prof', 'coucou'],
                    response: "Salutations, futur architecte du logiciel ! Je suis ton professeur d'Algorithmique. Prêt(e) à dompter la logique des machines ?"
                }
            ]
        };

        // Upsert
        await CourseKnowledge.findOneAndUpdate(
            { courseId: 'algo' },
            algoKnowledge,
            { upsert: true, new: true }
        );

        console.log('✅ Connaissances du Professeur d\'Algorithmique injectées avec succès !');

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du seeding:', error);
        process.exit(1);
    }
};

seedKnowledge();
