import json

# Add module 11
mod11 = {
    "id": "module11",
    "title": "Module 11: La Magie de la Récursivité",
    "icon": "Repeat",
    "description": "Appelez-vous vous-même. Comprenez la puissance de la récursivité.",
    "chapters": [
        {
            "id": "chap11",
            "title": "Les Poupées Russes Codeuses",
            "description": "L'art de découper un problème en sous-problèmes identiques.",
            "lessons": [
                {
                    "id": "algo_m_11_1",
                    "type": "theory",
                    "title": "Inception : La Fonction qui s'appelle elle-même",
                    "professorSpeech": "Pour comprendre la récursivité, il faut d'abord comprendre la récursivité. C'est l'art de s'appeler soi-même.",
                    "duration": "15 min",
                    "content": "# 🪆 La Récursivité\n\nUne fonction **récursive** est une fonction qui fait appel à **elle-même** pendant son exécution.\n\n## Les 2 Lois Fondamentales\n1.  **Le cas de base (Condition d'arrêt)** : Il FAUT un moment où la fonction arrête de s'appeler, sinon c'est la boucle infinie (Stack Overflow) !\n2.  **L'appel récursif** : L'étape où elle s'appelle elle-même avec un problème légèrement plus petit.\n\n```pseudo\nFONCTION CompteARebours(n : Entier)\nDÉBUT\n    // 1. Cas de base\n    SI n <= 0 ALORS\n        AFFICHER \"Décollage !\"\n        RETOURNER\n    FINSI\n    \n    AFFICHER n\n    // 2. Appel récursif (problème plus petit)\n    CompteARebours(n - 1)\nFINFONCTION\n```\n"
                }
            ]
        }
    ]
}

# Add module 12
mod12 = {
    "id": "module12",
    "title": "Module 12: Manipulation de Chaînes",
    "icon": "Type",
    "description": "L'art de traiter le texte, les mots de passe et la cryptographie.",
    "chapters": [
        {
            "id": "chap12",
            "title": "Algorithmes sur les Strings",
            "description": "Palindromes, Anagrammes et expressions régulières.",
            "lessons": [
                {
                    "id": "algo_m_12_1",
                    "type": "theory",
                    "title": "Palindromes (Miroirs Parfaits)",
                    "professorSpeech": "RADAR. KAYAK. LAVAL. Un mot qui se lit dans les deux sens cache des symétries intéressantes.",
                    "duration": "15 min",
                    "content": "# 🪞 Les Palindromes\n\nUn palindrome est un mot qui se lit de la même manière de gauche à droite et de droite à gauche.\n\n**Comment vérifier un palindrome ?**\nOn utilise généralement la technique des \"Deux Pointeurs\" (Two Pointers).\n1. Un pointeur \`gauche\` commence au début (indice 0).\n2. Un pointeur \`droite\` commence à la fin.\n3. On compare, puis on rapproche les pointeurs vers le centre.\n\n```pseudo\nFONCTION EstPalindrome(mot : Chaîne)\n    gauche <- 0\n    droite <- LONGUEUR(mot) - 1\n    \n    TANT QUE gauche < droite\n        SI mot[gauche] != mot[droite] ALORS\n            RETOURNER FAUX\n        FINSI\n        gauche <- gauche + 1\n        droite <- droite - 1\n    FINTANTQUE\n    \n    RETOURNER VRAI\nFINFONCTION\n```\n"
                }
            ]
        }
    ]
}

# Add module 13
mod13 = {
    "id": "module13",
    "title": "Module 13: Les Listes Chaînées",
    "icon": "Link",
    "description": "Une alternative dynamique aux Tableaux. La mémoire sous forme de chaîne.",
    "chapters": [
        {
            "id": "chap13",
            "title": "Gérer la Frontière de la Mémoire",
            "description": "Noeuds, Pointeurs et Allocation dynamique.",
            "lessons": [
                {
                    "id": "algo_m_13_1",
                    "type": "theory",
                    "title": "Noeuds et Pointeurs",
                    "professorSpeech": "Imaginez des wagons de train. Chaque wagon contient une marchandise, mais aussi un crochet pointant vers le wagon suivant. C'est une liste chaînée.",
                    "duration": "20 min",
                    "content": "# 🔗 Les Listes Chaînées (Linked Lists)\n\nContrairement à un tableau où toutes les cases sont collées en mémoire, une **liste chaînée** est dispersée. \n\nChaque élément (appelé **Noeud**) contient :\n1. La Donnée (La valeur).\n2. Le **Pointeur** (L'adresse en mémoire du noeud suivant).\n\n## Pourquoi utiliser des listes chaînées ?\n- **✅ Ajout/Suppression ultra rapide :** O(1) si on est au bon endroit. Il suffit de changer le lien du pointeur.\n- **❌ Accès très lent :** O(N). Pas d'indice ! Pour voir le 50ème élément, il faut parcourir les 49 premiers un par un.\n\n> [!CAUTION]\n> \"Null Pointer Exception\" : L'erreur la plus célèbre du monde arrive quand un pointeur regarde vers le vide (Null) au lieu d'un Noeud existant.\n"
                }
            ]
        }
    ]
}

# Add module 14
mod14 = {
    "id": "module14",
    "title": "Module 14: L'Empire des Arbres",
    "icon": "Network",
    "description": "Hiérarchies et organisation spatiale des données.",
    "chapters": [
        {
            "id": "chap14",
            "title": "Arbres Binaires et Graphes",
            "description": "BST, Parcours DFS et BFS.",
            "lessons": [
                {
                    "id": "algo_m_14_1",
                    "type": "theory",
                    "title": "Les Arbres Binaires de Recherche (BST)",
                    "professorSpeech": "L'organisation parfaite n'est pas une ligne droite, c'est un arbre généalogique.",
                    "duration": "25 min",
                    "content": "# 🌳 Les Arbres Binaires\n\nUn Arbre est composé de **Noeuds**. Le premier noeud tout en haut est la **Racine** (Root). Les noeuds tout en bas sans enfants sont les **Feuilles** (Leaves).\n\nUn **Arbre Binaire de Recherche (BST)** a une règle magique :\n- Tout enfant à **gauche** est plus PETIT que son parent.\n- Tout enfant à **droite** est plus GRAND que son parent.\n\n## La Recherche Parfaite\nGrâce à cette règle, chercher un élément coupe toujours le problème en deux (comme la recherche dichotomique !). Temps de recherche : **O(log N)**.\n\n```pseudo\nFONCTION RechercheArbre(racine, valeur)\n    SI racine est NULL ALORS\n        RETOURNER FAUX\n    FINSI\n    SI racine.donnee == valeur ALORS\n        RETOURNER VRAI\n    FINSI\n    SI valeur < racine.donnee ALORS\n        RETOURNER RechercheArbre(racine.gauche, valeur)\n    SINON\n        RETOURNER RechercheArbre(racine.droite, valeur)\n    FINSI\nFINFONCTION\n```\n"
                }
            ]
        }
    ]
}

# Add module 15
mod15 = {
    "id": "module15",
    "title": "Module 15: Le Secret du Hachage",
    "icon": "DatabaseZap",
    "description": "Comment les bases de données trouvent un million d'infos instantanément.",
    "chapters": [
        {
            "id": "chap15",
            "title": "Tables de Hachage et Dictionnaires",
            "description": "Le secret derrière la recherche en O(1).",
            "lessons": [
                {
                    "id": "algo_m_15_1",
                    "type": "theory",
                    "title": "Les Fonctions de Hachage",
                    "professorSpeech": "Chercher dans un tableau prend du temps (O(N)). Imagines si tu connaissais la réponse instantanément sans chercher (O(1)). C'est le pouvoir des clés.",
                    "duration": "20 min",
                    "content": "# 🗝️ Les Tables de Hachage (Hash Tables)\n\nAussi appelées **Dictionnaires** (Python) ou **Maps** (Java/JS), c'est la structure de données la plus utilisée au monde.\n\n**Comment ça marche ?**\n1. Tuple Clé-Valeur : Au lieu d'un index numérique, on utilise un mot-clé (ex: \"nom\" -> \"Alice\").\n2. **La Fonction de Hachage** : Elle prend le mot-clé, fait des mathématiques bizarres dessus, et crache un numéro. \n3. Ce numéro indique EXACTEMENT à quel endroit dans la mémoire la valeur est stockée.\n\n## Le problème des Collisions\nQue se passe-t-il si \"Alice\" et \"Bob\" donnent le même numéro après calcul mathématique ? C'est une **collision**. L'ordinateur stocke alors les deux dans la même case (souvent via une mini-liste chaînée).\n\n> [!TIP]\n> C'est avec des tables de hachage que les jeux vidéo vérifient instantanément si le pseudo que vous voulez prendre est déjà utilisé parmi des millions de joueurs !\n"
                }
            ]
        }
    ]
}


# Add module 16
mod16 = {
    "id": "module16",
    "title": "Module 16: L'Épreuve des Dieux",
    "icon": "Crown",
    "description": "Programmation Dynamique, Algorithmes Gloutons et Pathfinding.",
    "chapters": [
        {
            "id": "chap16",
            "title": "Maîtrise Algorithmique",
            "description": "Comment Google Maps trouve le chemin le plus court.",
            "lessons": [
                {
                    "id": "algo_m_16_1",
                    "type": "theory",
                    "title": "Programmation Dynamique (DP)",
                    "professorSpeech": "Ceux qui oublient le passé sont condamnés à le répéter. La programmation dynamique, c'est se souvenir de ce qu'on a déjà calculé.",
                    "duration": "30 min",
                    "content": "# 🧠 La Programmation Dynamique\n\nC'est la technique reine des entretiens chez Google, Microsoft ou Meta.\n\nLe principe est la **Mémoïsation** (Rappeler à la mémoire).\nSi vous calculez Fibonacci(50) de manière récursive classique, votre ordinateur va exploser car il recalcule les mêmes choses des milliards de fois.\n\n**La Solution DP :**\nSi on demande Fibonacci(5), et qu'on a déjà calculé Fibonacci(5) plus tôt, on sauvegarde la réponse dans un tableau. La prochaine fois, on lit le tableau (O(1)) au lieu de refaire le calcul !\n\n1. Décomposer le problème en sous-problèmes.\n2. Résoudre chaque sous-problème une seule fois.\n3. Stocker la solution dans une table.\n"
                },
                {
                    "id": "algo_m_16_2",
                    "type": "theory",
                    "title": "Le Compas d'Or : A* et Pathfinding",
                    "professorSpeech": "Comment aller d'un point A à un point B ? Le GPS ne devine pas, il calcule. Bienvenue dans les Graphes pondérés.",
                    "duration": "30 min",
                    "content": "# 🗺️ Pathfinding (Recherche de chemin)\n\nComment un PNJ dans un jeu vidéo trouve son chemin vers vous en évitant les murs ?\n\n## L'algorithme de Dijkstra\nIl explore comme une flaque d'eau : il teste tous les chemins en cercles concentriques grandissants jusqu'à trouver la cible. C'est sûr à 100%, mais c'est très lent.\n\n## L'algorithme A*\nIl ajoute une **Heuristique** (Une supposition intelligente). Au lieu d'explorer dans toutes les directions, il calcule une \"distance à vol d'oiseau\" et priorise les cases qui se rapprochent physiquement de la cible.\n\n> [!NOTE]\n> Si vous jouez aux Échecs contre l'ordinateur, l'IA utilise un algorithme appelé **Minimax** avec élagage Alpha-Beta, qui est une exploration de l'arbre des coups possibles ! Vous savez maintenant comment le monde numérique est bâti.\n\n**Toutes nos félicitations, Maître.** Vous avez atteint la limite de l'enseignement classique. Le reste s'écrit avec vos doigts sur le clavier.\n"
                }
            ]
        }
    ]
}

final_mods = [mod11, mod12, mod13, mod14, mod15, mod16]
with open('extra_modules.json', 'w') as f:
    json.dump(final_mods, f, indent=4)
