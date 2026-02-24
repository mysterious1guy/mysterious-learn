const algoCourses = [
    {
        id: "algorithmique-niveau-d-butant",
        title: "Algorithmique - Niveau Débutant",
        description: "Plongez dans les bases absolues. Maîtrisez la logique, les variables et les structures de décision fondamentales. Ce module forge votre esprit analytique.",
        category: "Théorie",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=800&q=80",
        rating: 4.9,
        students: 12050,
        language: "french",
        isFree: true,
        tags: ["algorithme", "logique", "débutant", "fondations"],
        motivationVideo: "kM9VKRowit0",
        chapters: [
            {
                title: "Chapitre 1 : L’Algorithme & Fondations Numériques",
                description: "Désacralisez l'informatique. Apprenez le modèle IPO et comment stocker l'information dans des variables.",
                order: 1,
                duration: "7 heures",
                content: `### 1. Introduction Simple
Le mot "Algorithme" peut sembler effrayant. En réalité, c'est une simple recette : une suite d'instructions précises pour résoudre un problème. L'ordinateur est un exécutant parfait mais stupide : il n'a aucune intuition. Si vous oubliez une étape, il ne la devinera pas.

### 2. Le Concept Expliqué (Modèle IPO)
Tout programme suit le cycle **Entrée -> Traitement -> Sortie** (Input -> Process -> Output).
*   **Les Variables :** Ce sont des boîtes étiquetées en mémoire.
*   **Les Types :** Entier (3), Réel (19.99), Chaîne ("Bonjour"), Booléen (Vrai/Faux).
*   **L'Affectation (=) :** \`x = 10\` n'est pas une égalité mathématique, c'est l'ordre de "ranger 10 dans la boîte x".

### 3. Exemple Clair : Le Profil de Joueur
\`nom = "Héros"\` (Chaîne)
\`vies = 3\` (Entier)
\`score = score + 10\` (Mise à jour d'un entier)

### 4. Cas Pratique : Le Calculateur de TVA
1. **Entrée :** Prix HT (100€).
2. **Traitement :** \`Total = PrixHT * 1.20\`.
3. **Sortie :** Afficher 120€.

### 5. Exercices Progressifs
**Exercice 1 :** Quel type utiliser pour stocker le nom d'un utilisateur ?
**Exercice 2 :** Si A=5 et B=10. On fait \`A = B\`. Que contient A maintenant ?

### 6. Correction Détaillée
**Correction 1 :** Une **Chaîne (String)**, car c'est du texte.
**Correction 2 :** **10**. L'ancienne valeur (5) est écrasée à jamais par la nouvelle.`,
                objectives: ["Comprendre le modèle IPO", "Maîtriser les types de données", "Différencier affectation et égalité"],
                resources: [{ title: "Bases de l'Algo (Video)", type: "video", url: "https://www.youtube.com/embed/kM9VKRowit0" }]
            },
            {
                title: "Chapitre 2 : Séquentialité & Logique de Contrôle",
                description: "Donnez du cerveau à votre code. Apprenez à faire des choix (SI) et à répéter des actions (BOUCLES).",
                order: 2,
                duration: "8 heures",
                content: `### 1. Introduction Simple
Un programme n'est pas toujours une ligne droite. C'est un arbre de décision. "SI la porte est fermée, ALORS frappe, SINON entre".

### 2. Le Concept Expliqué
*   **Les Conditions (SI / SINON) :** Permettent de bifurquer.
*   **Les Boucles (TANT QUE / POUR) :** Permettent de répéter sans copier-coller.
*   **Le Switch (SELON) :** Pour gérer plusieurs choix propres (ex: un menu de jeu).

### 3. Exemple Clair : Le Réservoir
\`TANT QUE (essence > 0)\`
  \`Rouler()\`
  \`essence = essence - 1\`
\`FIN TANT QUE\`

### 4. Cas Pratique : Le Mot de Passe
1. Demander le code.
2. **SI** (code == 1234) **ALORS** "Bienvenue".
3. **SINON** "Accès refusé".

### 5. Exercices Progressifs
**Exercice 1 :** Comment appelle-t-on une boucle qui ne s'arrête jamais ?
**Exercice 2 :** Pour faire 100 pompes, quel type de boucle est le plus adapté : POUR ou TANT QUE ?

### 6. Correction Détaillée
**Correction 1 :** Une **Boucle Infinie**. C'est le bug n°1 qui fait 'ramer' les PC.
**Correction 2 :** La boucle **POUR (For)**, car on connaît le nombre exact de tours à l'avance (100).`,
                objectives: ["Maîtriser les structures SI/SINON", "Utiliser correctement les boucles For et While", "Éviter les boucles infinies"],
                resources: [{ title: "Conditions et Boucles (Video)", type: "video", url: "https://www.youtube.com/embed/Xp0WpS_mKAs" }]
            }
        ]
    },
    {
        id: "algorithmique-niveau-interm-diaire",
        title: "Algorithmique - Niveau Intermédiaire",
        description: "Organisez votre code et gérez des masses de données. Apprenez la modularité et la récursivité.",
        category: "Théorie",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8540,
        language: "french",
        isFree: true,
        tags: ["algorithme", "fonctions", "récursivité", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 3 : Modularité, Mémoire vive & Récursivité",
                description: "Construisez des systèmes complexes sans vous perdre. Apprenez à déléguer via les fonctions.",
                order: 1,
                duration: "20 heures",
                content: `### 1. Introduction Simple
Imaginez que vous soyez chef de cuisine. Vous avez un spécialiste pour la viande, un pour les sauces. En informatique, ce sont les **Fonctions**.

### 2. Le Concept Expliqué
*   **Fonction :** Un bloc de code réutilisable avec un nom.
*   **Paramètres :** Les ingrédients que vous donnez à la fonction.
*   **Return :** La valeur que la fonction vous rend.
*   **Call Stack :** L'ordinateur empile les fonctions les unes sur les autres pour savoir où il en est.
*   **Récursivité :** Une fonction qui s'appelle elle-même (ex: Fractales ou Factorielle).

### 3. Exemple Clair : Le Robot Saluteur
\`FONCTION saluer(nom)\`
  \`AFFICHER "Bonjour " + nom\`
\`FIN FONCTION\`

### 4. Cas Pratique : Le Calculateur de Factorielle
Une factorielle de 5, c'est 5 * fact(4). C'est le triomphe de la logique récursive !

### 5. Exercices Progressifs
**Exercice 1 :** Qu'est-ce que la portée (Scope) d'une variable locale ?
**Exercice 2 :** Pourquoi une fonction récursive sans condition de sortie fait-elle planter le programme ?

### 6. Correction Détaillée
**Correction 1 :** C'est sa "bulle de vie". Une variable créée dans une fonction n'existe pas en dehors.
**Correction 2 :** Elle sature la **Call Stack** (Stack Overflow) : l'ordinateur n'a plus assez de papier pour noter ses rappels.`,
                objectives: ["Définir et appeler des fonctions", "Comprendre la pile d'exécution (Call Stack)", "S'initier à la pensée récursive"],
                resources: [{ title: "Fonctions et Mémoire (Video)", type: "video", url: "https://www.youtube.com/embed/n4XW4W_jM6k" }]
            }
        ]
    },
    {
        id: "algorithmique-niveau-avanc",
        title: "Algorithmique - Niveau Avancé",
        description: "Gérez des masses de données. Apprenez les collections et l'analyse de performance (Big O).",
        category: "Théorie",
        level: "Avancé",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8540,
        language: "french",
        isFree: true,
        tags: ["algorithme", "tableaux", "complexité", "avancé"],
        chapters: [
            {
                title: "Chapitre 4 : Gestion des Collections & Performance",
                description: "Gérez des millions d'utilisateurs. Apprenez les tableaux et l'analyse de complexité (Big O).",
                order: 1,
                duration: "20 heures",
                content: `### 1. Introduction Simple
Au lieu d'avoir 1000 variables \`nom1\`, \`nom2\`, on utilise un **Tableau**. C'est une étagère géante sous un seul nom.

### 2. Le Concept Expliqué
*   **Indexation :** On commence à **ZÉRO**. Le premier élément est à l'index 0.
*   **Recherche Dichotomique :** Couper le problème en deux à chaque étape (O(log N)). Incroyablement rapide.
*   **Complexité (Big O) :** La mesure de la lenteur. O(N²) est lent, O(N) est rapide, O(1) est instantané.

### 3. Exemple Clair : Le Tri à Bulles
On compare deux voisins. Si le gros est à gauche, on inverse. On répète jusqu'à ce que tout soit trié.

### 4. Cas Pratique : Chercher dans un dictionnaire
Si vous cherchez un mot, vous ouvrez le milieu. Si le mot cherché est après, vous jetez la première moitié. Voilà la puissance de l'algorithmique !

### 5. Exercices Progressifs
**Exercice 1 :** Dans un tableau de 10 éléments, quel est l'index du dernier élément ?
**Exercice 2 :** Si un algorithme a une complexité de O(N²), est-il bon pour traiter 1 milliard de données ?

### 6. Correction Détaillée
**Correction 1 :** L'index **9**. (10 - 1, car on commence à zéro).
**Correction 2 :** **NON**, il serait horriblement lent. Pour un milliard, on cherche du O(log N) ou O(N) maximum.`,
                objectives: ["Manipuler les tableaux 1D et 2D", "Implémenter des tris et recherches de base", "Évaluer la complexité d'un code"],
                resources: [{ title: "Tableaux et Tris (Video)", type: "video", url: "https://www.youtube.com/embed/n4XW4W_jM6k" }]
            }
        ]
    },
    {
        id: "algorithmique-niveau-expert",
        title: "Algorithmique - Niveau Expert",
        description: "Entrez dans l'élite. Arbres, Graphes, Backtracking et Programmation Dynamique.",
        category: "Théorie",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        rating: 5.0,
        students: 4200,
        language: "french",
        isFree: true,
        tags: ["algorithme", "expert", "graphes", "arbres", "DP"],
        chapters: [
            {
                title: "Chapitre 5 : Structures Complexes & Optimisation Algorithmique",
                description: "Le sommet du voyage. Maîtrisez les arbres, les graphes et la programmation dynamique.",
                order: 1,
                duration: "60 heures",
                content: `### 1. Introduction Simple
Vous avez maîtrisé la ligne (variables) et l'étagère (tableaux). Maintenant, apprenez la toile (graphes) et l'arbre (hiérarchie).

### 2. Le Concept Expliqué
*   **Arbres Binaires :** Idéal pour trier et chercher instantanément (ex: Dossiers PC).
*   **Graphes :** Modéliser les réseaux sociaux (amis) ou routiers (GPS).
*   **Programmation Dynamique (DP) :** "Se souvenir du passé pour ne pas le recalculer".
*   **Backtracking :** Explorer tous les possibles (ex: Résoudre un Sudoku).

### 3. Exemple Clair : Le GPS (Dijkstra)
Comment Google Maps trouve le chemin le plus court ? Il utilise un algorithme de graphe qui compare le 'poids' de chaque route.

### 4. Cas Pratique : Le Problème du Rendu de Monnaie
Pour rendre la monnaie avec le moins de pièces possible, on utilise la Programmation Dynamique pour tester intelligemment les combinaisons.

### 5. Exercices Progressifs
**Exercice 1 :** Quel outil utiliser pour modéliser les relations entre amis sur Facebook ?
**Exercice 2 :** À quoi sert la "Mémoïsation" en Programmation Dynamique ?

### 6. Correction Détaillée
**Correction 1 :** Un **Graphe**. Les sommets sont les personnes, les arêtes sont les amitiés.
**Correction 2 :** À sauvegarder les résultats de calculs déjà faits pour gagner des millions de secondes lors des calculs suivants.`,
                objectives: ["Mainpuler des arbres et des graphes", "Comprendre le paradigme de programmation dynamique", "Utiliser le backtracking pour les problèmes d'exploration"],
                resources: [{ title: "Algo Avancé (Video)", type: "video", url: "https://www.youtube.com/embed/n4XW4W_jM6k" }]
            }
        ]
    }
];

module.exports = algoCourses;
