const algoCourses = [
    {
        title: "Algorithmique - Niveau Débutant",
        description: "Plongez dans les bases absolues de l'algorithmique. Maîtrisez la séquentialité, la mémoire, les décisions et les itérations. Ce cours fondateur est conçu avec la plus grande rigueur académique pour forger votre esprit analytique.",
        category: "Théorie",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=800&q=80",
        rating: 4.9,
        students: 12050,
        language: "french",
        isFree: true,
        tags: ["algorithme", "logique", "débutant", "bases", "fondations"],
        chapters: [
            {
                title: "Chapitre 1 : Philosophie et Pensée Algorithmique",
                description: "Comprendre la genèse de l'informatique avant de toucher à la moindre ligne de code.",
                order: 1,
                duration: "5 heures",
                content: "L'informatique ne consiste pas à taper sur un clavier, mais à apprendre à penser. Un algorithme est, formellement défini, un ensemble fini et non ambigu d'instructions exécutables, visant à résoudre un problème donné en un temps fini. Nous allons ici déconstruire la notion d'état, de transition, de donnée d'entrée (input) et de donnée de sortie (output). Vous apprendrez à 'penser comme une machine' : de manière séquentielle, déterministe, et sans aucune ambiguïté. C'est ici que réside la différence entre un bricoleur et un ingénieur logiciel.",
                objectives: ["Définir formellement un algorithme", "Comprendre le déterminisme", "Séparer le problème de son implémentation", "Modéliser un problème de la vie réelle mathématiquement"],
                exercises: [
                    {
                        title: "Modélisation : La Tour de Hanoï",
                        description: "Écrivez les étapes manuelles, sous forme pseudo-algorithmique stricte, pour résoudre une Tour de Hanoï à 3 disques.",
                        difficulty: "Moyen",
                        solution: "1. Déplacer Disque(1) de A vers C\n2. Déplacer Disque(2) de A vers B\n3. Déplacer Disque(1) de C vers B\n4. Déplacer Disque(3) de A vers C\n5. Déplacer Disque(1) de B vers A\n6. Déplacer Disque(2) de B vers C\n7. Déplacer Disque(1) de A vers C",
                        hints: ["Nommez vos piquets A, B et C.", "Rappelez-vous : un plus grand disque ne peut jamais reposer sur un plus petit."]
                    },
                    {
                        title: "Le Distributeur Automatique",
                        description: "Créez un algorithme séquentiel qui décrit le comportement d'un distributeur de boisson : insertion de monnaie, vérification du stock, rendu de monnaie.",
                        difficulty: "Facile",
                        solution: "1. LIRE Montant_Insere\n2. LIRE Choix_Boisson\n3. SI Stock(Choix_Boisson) == 0 ALORS Rendre Montant_Insere ET Terminer\n4. SI Montant_Insere < Prix(Choix_Boisson) ALORS Rendre Montant_Insere ET Signaler Erreur ET Terminer\n5. Distribuer Choix_Boisson\n6. Rendre (Montant_Insere - Prix(Choix_Boisson))\n7. Reduire_Stock(Choix_Boisson, 1)",
                        hints: ["N'oubliez pas les états d'erreurs (pas de stock, pas assez d'argent)."]
                    }
                ],
                resources: [
                    { title: "Pensée Computationnelle (MIT)", type: "video", url: "https://www.youtube.com/embed/6iZiqQZBQNY" },
                    { title: "Histoire de l'Algorithmique par Al-Khwarizmi", type: "article", url: "https://fr.wikipedia.org/wiki/Al-Khw%C3%A2rizm%C3%AE" }
                ]
            },
            {
                title: "Chapitre 2 : Mémoire, Variables et Typage Rigoureux",
                description: "Domptez la gestion de la mémoire, les types de données primitifs et l'allocation.",
                order: 2,
                duration: "7 heures",
                content: "Une machine manipule de la mémoire vive (RAM). Pour notre algorithme, cela se traduit par la déclaration de 'variables'. Mais attention : une variable n'est pas magique. Elle a une taille (en octets), une adresse (où elle est stockée), un Nom (identificateur), un Type (entier, flottant, pointeur, caractère, booléen) et une Valeur. Nous allons voir pourquoi le typage rigoureux est essentiel. Vous apprendrez la différence entre l'affectation (=) et l'égalité (==), ainsi que les principes de portée (scope local vs global).",
                objectives: ["Maîtriser les types primitifs", "Comprendre la représentation binaire en mémoire", "Éviter les erreurs d'affectation et d'effets de bord"],
                exercises: [
                    {
                        title: "Permutation Circulaire (A, B, C)",
                        description: "Écrivez un algorithme pour échanger les valeurs de 3 variables : la valeur de A va dans B, celle de B dans C, et celle de C dans A.",
                        difficulty: "Moyen",
                        solution: "VARIABLE Temp, A, B, C\nTemp = C\nC = B\nB = A\nA = Temp",
                        hints: ["Utilisez au moins une variable de sauvegarde."]
                    },
                    {
                        title: "Conversions de Types",
                        description: "Que se passe-t-il si vous tentez d'additionner un Entier(5) et une Chaîne('10') dans un langage fortement typé ?",
                        difficulty: "Moyen",
                        solution: "Une erreur de compilation ou une exception au runtime est levée (ex: Type Mismatch), car le compilateur refuse de mélanger aveuglément des types mathématiques et textuels sans fonction de 'cast' explicite.",
                        hints: ["Pensez à la différence entre concaténation et addition mathématique."]
                    }
                ],
                resources: [
                    { title: "Architecture Mémoire von Neumann", type: "video", url: "https://www.youtube.com/embed/ZiaJ0tBwEw0" }
                ]
            },
            {
                title: "Chapitre 3 : Structures de Contrôle et Algèbre de Boole",
                description: "Le cerveau de l'algorithme : branchements conditionnels et opérateurs logiques complexes.",
                order: 3,
                duration: "8 heures",
                content: "Les conditions transforment une simple calculatrice en une machine intelligente. Nous plongeons ici dans l'Algèbre de Boole : opérateurs ET (AND), OU (OR), NON (NOT), OU Exclusif (XOR). Vous apprendrez à construire des tables de vérité pour prouver formellement la justesse de vos conditions. Nous aborderons les structures conditionnelles imbriquées (IF, ELSE IF, ELSE) et le fameux Switch (Selon). Savoir simplifier une condition via les lois de De Morgan est une compétence d'ingénieur indispensable.",
                objectives: ["Construire une table de vérité complete", "Appliquer les Lois de De Morgan", "Maîtriser les branchements décisionnels multiples"],
                exercises: [
                    {
                        title: "Loi de De Morgan Appliquée",
                        description: "Simplifiez l'expression logique suivante : NON(A ET B) OU NON(A).",
                        difficulty: "Difficile",
                        solution: "Par De Morgan : NON(A ET B) = NON(A) OU NON(B).\nDonc l'expression devient : (NON(A) OU NON(B)) OU NON(A).\nCe qui se simplifie en : NON(A) OU NON(B).",
                        hints: ["Révisez les tables de vérité. NON(A ET B) n'est pas NON(A) ET NON(B)."]
                    },
                    {
                        title: "L'Année Bissextile",
                        description: "Un classique mondial. Écrivez la condition logique absolue pour déterminer si une année 'A' est bissextile.",
                        difficulty: "Moyen",
                        solution: "SI (A modulo 4 == 0 ET A modulo 100 != 0) OU (A modulo 400 == 0) ALORS\n  AFFICHER 'Bissextile'\nSINON\n  AFFICHER 'Non Bissextile'\nFIN SI",
                        hints: ["Une année divisible par 4 est bissextile, SAUF si elle l'est par 100, AUQUEL CAS elle doit aussi l'être par 400."]
                    }
                ],
                resources: [
                    { title: "Algèbre Mathématique et Logique Booléenne", type: "video", url: "https://www.youtube.com/embed/0B2k5E4bZJ4" }
                ]
            },
            {
                title: "Chapitre 4 : La Puissance de l'Itération (Boucles)",
                description: "Maîtriser la répétition algorithmique : Boucles déterministes et indéterministes.",
                order: 4,
                duration: "10 heures",
                content: "La véritable puissance des ordinateurs réside dans leur capacité à répéter des milliards d'opérations sans erreur. Nous analysons en profondeur : 1) La boucle POUR (FOR), itération déterministe avec compteur d'initialisation, borne et pas d'incrémentation. 2) La boucle TANT QUE (WHILE), itération conditionnelle. 3) La boucle REPETER... JUSQU'A (DO... WHILE), s'exécutant au moins une fois. Nous traiterons des pièges mortels en entreprise : les boucles infinies, les effets de bord dans les itérateurs, et l'optimisation des sauts (Break, Continue).",
                objectives: ["Sélectionner la boucle optimale pour chaque situation", "Prouver la terminaison d'une boucle (Variant de boucle)", "Maîtriser les compteurs, accumulateurs et drapeaux (flags)"],
                exercises: [
                    {
                        title: "La Suite de Fibonacci (Itérative)",
                        description: "Générez les N premiers termes de la célèbre suite de Fibonacci en utilisant uniquement une boucle.",
                        difficulty: "Difficile",
                        solution: "LIRE N\nPrev1 = 0, Prev2 = 1\nSI N >= 1 ALORS AFFICHER Prev1\nSI N >= 2 ALORS AFFICHER Prev2\nPOUR i ALLANT DE 3 A N FAIRE\n  Nouveau = Prev1 + Prev2\n  AFFICHER Nouveau\n  Prev1 = Prev2\n  Prev2 = Nouveau\nFIN POUR",
                        hints: ["La suite commence par 0, 1. Ensuite, chaque nombre est la somme des deux précédents. Maintenez toujours la trace des deux derniers !"]
                    },
                    {
                        title: "Nombres Premiers (Recherche Exhaustive)",
                        description: "Écrivez un algorithme algorithmique pour vérifier si un nombre X est premier en testant ses diviseurs avec une boucle WHILE optimisée.",
                        difficulty: "Difficile",
                        solution: "LIRE X\nSI X <= 1 ALORS RETOURNER Faux\ndiviseur = 2\nTANT QUE diviseur * diviseur <= X FAIRE\n  SI X modulo diviseur == 0 ALORS\n    RETOURNER Faux\n  FIN SI\n  diviseur = diviseur + 1\nFIN TANT QUE\nRETOURNER Vrai",
                        hints: ["Il n'est pas nécessaire de tester jusqu'à X. S'arrêter à la racine carrée de X (diviseur * diviseur <= X) est la preuve mathématique d'optimisation."]
                    }
                ],
                resources: [
                    { title: "Invariants et Terminaison des Boucles", type: "video", url: "https://www.youtube.com/embed/9Bv_A0M2M1Y" }
                ]
            }
        ]
    },
    {
        title: "Algorithmique - Niveau Intermédiaire",
        description: "Élevez votre niveau. L'heure n'est plus à la syntaxe, mais à la structuration avancée des données et à la modularisation via les Fonctions. Ce module est le rempart pour devenir un vrai développeur complet.",
        category: "Théorie",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8540,
        language: "french",
        isFree: true,
        tags: ["algorithme", "tableaux", "tris", "fonctions", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 1 : Vecteurs, Tableaux Unidimensionnels et Parcourabilité",
                description: "Le fondement des collections de données, l'accès mémoire séquentiel et la manipulation d'index.",
                order: 1,
                duration: "10 heures",
                content: "Les variables simples trouvent vite leurs limites. Un Tableau (Array) permet l'agrégation de N éléments contigus en mémoire sous une même entité. C'est l'un des concepts les plus cruciaux de l'ingénierie logicielle. Nous décortiquons l'allocation statique vs dynamique, le dépassement d'index (Buffer Overflow - la plus grave faille de sécurité historique), ainsi que les techniques de balayage complet (Maps, Folds, accumulatrices). L'élève devra être capable d'inverser un tableau en place, de supprimer un élément par décalage, et d'y insérer une donnée au détriment de l'optimisation coûtante O(n).",
                objectives: ["Contrôler les limites (Out of Bounds)", "Réaliser des opérations 'In-Place' (sans utiliser de second tableau)", "Maîtriser la recherche séquentielle (Linear Search)"],
                exercises: [
                    {
                        title: "Inversion d'un Tableau en Place (In-Place Reversal)",
                        description: "Inversez tous les éléments d'un tableau T de taille N sans déclarer de nouveau tableau (mémoire O(1)).",
                        difficulty: "Difficile",
                        solution: "gauche = 0\ndroite = N - 1\nTANT QUE gauche < droite FAIRE\n  Temp = T[gauche]\n  T[gauche] = T[droite]\n  T[droite] = Temp\n  gauche = gauche + 1\n  droite = droite - 1\nFIN TANT QUE",
                        hints: ["Utilisez le concept de 'Two Pointers' (deux curseurs) se dirigeant l'un vers l'autre."]
                    },
                    {
                        title: "Décalage d'Éléments (Shift)",
                        description: "Supprimez l'élément à l'index K d'un tableau et décalez toute la suite d'un cran vers la gauche.",
                        difficulty: "Moyen",
                        solution: "POUR i ALLANT DE K A N - 2 FAIRE\n  T[i] = T[i + 1]\nFIN POUR\nN = N - 1",
                        hints: ["Si j'efface la case 3, je dois y mettre le contenu de la case 4, et ainsi de suite."]
                    }
                ],
                resources: [{ title: "Mémoire Contiguë : Comment ça marche ?", type: "video", url: "https://www.youtube.com/embed/5mFpPbcXgB0" }]
            },
            {
                title: "Chapitre 2 : Sous-programmes, Fonctions et Procédures (DRY)",
                description: "La modularisation du code : paramètres, retours, portées, et passage par valeur vs référence.",
                order: 2,
                duration: "10 heures",
                content: "Un code 'Spaghetti' monolithique est indébuggable. L'art de l'ingénieur réside dans l'encapsulation de blocs logiques autonomes : les sous-programmes. Nous définirons avec intransigeance la différence entre : Les Paramètres Formels (dans la définition) et les Paramètres Effectifs ou Arguments (lors de l'appel). Nous étudierons le 'Passage par Valeur' (copie de la donnée, aucune altération globale) et le 'Passage par Référence' (pointeur brut de mémoire, altération profonde redoutable). La compréhension de la portée (Scope lexical) et du masquage de variables est exigée.",
                objectives: ["Écrire des fonctions pures", "Maîtriser le Call Stack (Pile d'exécution)", "Distinguer Valeur et Référence"],
                exercises: [
                    {
                        title: "Danger du Passage par Référence",
                        description: "Si T est un tableau passé à une procédure 'ViderTableau(Tab)', le tableau d'origine T est-il impacté ? Pourquoi ?",
                        difficulty: "Moyen",
                        solution: "Oui. Historiquement et techniquement, les tableaux sont généralement passés par référence (ou pointeur vers leur adresse mémoire initiale) pour éviter le coût exorbitant de la copie de milliers d'éléments. La procédure modifie l'adresse d'origine.",
                        hints: ["Copier un tableau de 1 Gigaoctet à chaque appel ralentirait le PC."]
                    }
                ],
                resources: [{ title: "Fonctions, Scopes et Call Stack", type: "video", url: "https://www.youtube.com/embed/8vOaO9I8WJU" }]
            },
            {
                title: "Chapitre 3 : Les Algorithmes de Tri Quadratiques (O(n²))",
                description: "Comprendre comment remettre de l'ordre dans le chaos, brique par brique.",
                order: 3,
                duration: "10 heures",
                content: "Le Tri est le défi par excellence de la Computer Science. L'apprentissage débute par les tris naïfs, dont le temps d'exécution croît de façon quadratique avec le nombre d'éléments. Nous étudierons : 1. Le Tri par Sélection (Chercher le plus petit, le mettre au début). 2. Le Tri par Insertion (Comme ranger sa main aux cartes). 3. Le Tri à Bulles (Faire remonter les plus grandes valeurs comme des bulles d'air). Nous décortiquerons ligne par ligne l'imbrication fatale de leurs boucles générant la complexité de O(N²).",
                objectives: ["Implémenter de mémoire le Tri par Sélection", "Comprendre visuellement le Tri Insertion", "Compter le nombre d'opérations exactes requises"],
                exercises: [
                    {
                        title: "L'Algorithme du Tri Insertion",
                        description: "Écrivez le pseudo-code absolu du tri par insertion.",
                        difficulty: "Difficile",
                        solution: "POUR i ALLANT DE 1 A N-1 FAIRE\n  cle = T[i]\n  j = i - 1\n  TANT QUE j >= 0 ET T[j] > cle FAIRE\n    T[j + 1] = T[j]\n    j = j - 1\n  FIN TANT QUE\n  T[j + 1] = cle\nFIN POUR",
                        hints: ["On sauvegarde l'élément actuel (cle). On décale vers la droite tous les éléments plus grands que 'cle', puis on l'insère dans le vide créé."]
                    }
                ],
                resources: [{ title: "Visualisation des Tris Quadratiques", type: "video", url: "https://www.youtube.com/embed/kgBjXUE_Nwc" }]
            },
            {
                title: "Chapitre 4 : Manipulation de Chaînes de Caractères (Strings)",
                description: "L'analyse lexicale, les tables ASCII et la gestion fine du texte.",
                order: 4,
                duration: "10 heures",
                content: "L'humanité communique par le texte, les machines par les nombres. Une Chaîne (String) n'est fondamentalement qu'un tableau de caractères codés en nombres (ASCII, UTF-8). Nous verrons des algorithmes de NLP (Natural Language Processing) de base : vérifier un palindrome, chercher des sous-chaînes (Pattern Matching naïf), effacer les espaces redondants, et convertir en Majuscule/Minuscule sans utiliser de fonctions intégrées (par soustraction arithmétique de la table ASCII).",
                objectives: ["Manipuler la table ASCII", "Comprendre un String comme un Array inhérent", "Dédoubler des mots et analyser du texte brut"],
                exercises: [
                    {
                        title: "Le Détecteur de Palindromes Parfait",
                        description: "Écrivez un algorithme pour déterminer si un mot est un palindrome (ex: KAYAK, RADAR) en ignorant les espaces et en temps O(N).",
                        difficulty: "Difficile",
                        solution: "gauche = 0\ndroite = Longueur(MOT) - 1\nTANT QUE gauche < droite FAIRE\n  SI MOT[gauche] == ESPACE ALORS gauche = gauche + 1\n  SINON SI MOT[droite] == ESPACE ALORS droite = droite - 1\n  SINON SI Majuscule(MOT[gauche]) != Majuscule(MOT[droite]) ALORS RETOURNER Faux\n  SINON\n    gauche = gauche + 1\n    droite = droite - 1\nFIN TANT QUE\nRETOURNER Vrai",
                        hints: ["Utilisez le pattern Two-Pointers (gauche et droite). Ignorez les caractères spéciaux en demandant à vos pointeurs d'avancer s'ils en croisent."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "Algorithmique - Niveau Expert Mondiale (Avancé)",
        description: "Bienvenue dans l'antichambre des géants de la Tech (FAANG). Ce module terminal enseigne les fondations qui distinguent les codeurs ordinaires des ingénieurs Senior. O, Arbres, Graphes, Backtracking et Programmation Dynamique.",
        category: "Théorie",
        level: "Avancé",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        rating: 5.0,
        students: 4200,
        language: "french",
        isFree: true,
        tags: ["algorithme", "avancé", "récursivité", "arbres", "complexité", "graphes", "dynamic_programming"],
        chapters: [
            {
                title: "Chapitre 1 : L'Analyse Asymptotique et Notation Big O",
                description: "Apprenez à prouver mathématiquement qu'un code est optimisé.",
                order: 1,
                duration: "8 heures",
                content: "Lorsqu'Amazon traite 1 milliard d'articles, un algorithme en O(N²) crashe l'entreprise. L'outil suprême de l'ingénieur est la notation asympotique de Landau (Big O). Elle mesure non pas le 'temps' en secondes, mais le Taux de Croissance des opérations selon la taille N de la donnée. Nous distinguerons O(1) (Magie constante), O(log N) (Dichotomie redoutable), O(N) (Linéaire saine), O(N log N) (Tri optimal), O(N²) (Dangereux), et les catastrophiques O(2^N) / O(N!). Vous ne pourrez plus jamais coder sans calculer mentalement votre Big O.",
                objectives: ["Calculer la complexité Temporelle de tout algorithme", "Comprendre la Complexité Spatiale (Mémoire)", "Identifier le pire cas, le cas moyen et le meilleur cas"],
                exercises: [
                    {
                        title: "Alerte de Complexité Spatiale",
                        description: "Quelle est la particularité mortelle du Merge Sort concernant sa complexité spatiale par rapport au Quick Sort ?",
                        difficulty: "Difficile",
                        solution: "Le Merge Sort nécessite O(N) mémoire supplémentaire (création de sous-tableaux temporaires lors de la fusion). Le Quick Sort, si implémenté In-Place, opère en O(log N) mémoire (strictement limité à la profondeur de la Call Stack récursive). En environnement embarqué très limité, le Merge Sort peut générer un Memory Exhaustion, justifiant le tri In-Place.",
                        hints: ["Pensez à l'impact des créations de nouveaux tableaux à chaque division du divide and conquer."]
                    }
                ],
                resources: [{ title: "Conférence Mathématique : Big O", type: "video", url: "https://www.youtube.com/embed/v4cd1O4zkGw" }]
            },
            {
                title: "Chapitre 2 : Divide and Conquer & La Recherche Dichotomique",
                description: "Diviser pour régner, ou comment pulvériser les données colossales en un temps O(log N).",
                order: 2,
                duration: "10 heures",
                content: "Face à une botte de foin gigantesque, chercher l'aiguille brin par brin (O(N)) est inacceptable. Le paradigme Divide and Conquer exige la division du spectre par des fractions massives à chaque réflexion. La Recherche Dichotomique (Binary Search) incarne ce miracle : dans un annuaire trié de 1 milliard de personnes, la recherche séquentielle mettrait 1 milliard de tentatives. La recherche dichotomique trouve la cible ou conclut l'échec en seulement 30 opérations (car 2^30 > 1 Milliard). L'élève devra coder aveuglément cette méthode et repérer ses failles (le dépassement d'Entier 'overflow' pendant le calcul du (debut+fin)/2).",
                objectives: ["Coder la Recherche Dichotomique sans Overflow", "Comprendre la récursivité du Divide", "Maîtriser les conditions aux limites (Off-by-one errors)"],
                exercises: [
                    {
                        title: "Vraie Implémentation de la Dichotomie (Sans Overflow)",
                        description: "Écrivez le code d'une recherche dichotomique qui évite complètement le bug historique du Stack Overflow qui existait même dans l'API Java originelle.",
                        difficulty: "Difficile",
                        solution: "debut = 0, fin = N - 1\nTANT QUE debut <= fin FAIRE\n  // Au lieu de (debut + fin) / 2 qui peut dépasser la limite INTEGER_MAX si tableau gigantesque\n  milieu = debut + (fin - debut) / 2\n  SI T[milieu] == CIBLE ALORS RETOURNER milieu\n  SI T[milieu] < CIBLE ALORS debut = milieu + 1\n  SINON fin = milieu - 1\nFIN TANT QUE\nRETOURNER -1",
                        hints: ["Rappelez-vous que 'debut + fin' peut produire un nombre plus grand que les 32 bits de la machine si le tableau est massif. Pensez autrement..."]
                    }
                ],
                resources: [{ title: "L'art de la Binary Search", type: "video", url: "https://www.youtube.com/embed/P3YcAW7jM" }]
            },
            {
                title: "Chapitre 3 : Récursion, Call Stack et Tris Avancés (Quick Sort & Merge Sort)",
                description: "Les algorithmes complexes et l'architecture mémoire interne : La beauté vertigineuse des fonctions auto-appellantes.",
                order: 3,
                duration: "15 heures",
                content: "La récursion survient lorsqu'une fonction s'appelle elle-même avec un sous-problème plus petit. L'ingénieur doit visualiser mentalement la Call Stack du processeur. Nous utiliserons la récursion pour bâtir les deux tris professionnels mondiaux en O(n log n). Le Merge Sort (Tri Fusion), algorithme de type Out-of-place très puissant pour les listes géantes ; et surtout le Quick Sort (Tri Rapide), de sir Tony Hoare, très rapide en In-Place, dont la performance totale dépend d'un Pivot savamment choisi, sinon quoi il chute fatalement en O(N²).",
                objectives: ["Implémenter formellement le partitionnement QuickSort", "Fusionner deux tableaux (Merge)", "Eviter les Stack Overflows Recursifs"],
                exercises: [
                    {
                        title: "Concept du Tri Fusion (Merge)",
                        description: "Comment fusionner deux tableaux A et B DÉJÀ triés en un seul tableau C trié, en temps linéaire O(N) ?",
                        difficulty: "Difficile",
                        solution: "i = 0, j = 0, k = 0\nTANT QUE i < Taille(A) ET j < Taille(B) FAIRE\n  SI A[i] <= B[j] ALORS\n    C[k] = A[i]; i++\n  SINON\n    C[k] = B[j]; j++\n  k++\nFIN TANT QUE\nAjouter le reste de A (si i < Taille(A)) dans C\nAjouter le reste de B (si j < Taille(B)) dans C",
                        hints: ["Imaginez devoir zipper deux piles de cartes ordonnées. Regardez la première de chaque, prenez la plus petite."]
                    }
                ],
                resources: [{ title: "L'Invention du Quicksort", type: "video", url: "https://www.youtube.com/embed/Hoixgm4-P4M" }]
            },
            {
                title: "Chapitre 4 : Data Structures Ultimates — Pointeurs, Listes, Arbres et Graphes",
                description: "Créer des structures dynamiques complexes non-contiguës.",
                order: 4,
                duration: "15 heures",
                content: "Nous quittons le confort chaleureux des tableaux. La réalité informatique demande des structures dynamiques. Vous plongerez dans la création de structures via des **Pointeurs** (adresses mémoire) : Listes simplement et doublement chaînées (O(1) en insertion/suppression), Piles (LIFO) et Files (FIFO). Le cœur de la modélisation informatique : Les Arbres Binaires de Recherche (BST), qui lient la flexibilité des listes avec la vitesse du niveau log N. Enfin, introduction théâtrale à la Théorie des Graphes (Sommets, Arêtes) pour la modélisation des réseaux routiers et sociaux : le BFS (Parcours en largeur), le DFS (Parcours en profondeur), et l'algorithme mythique du plus court chemin de Dijkstra.",
                objectives: ["Maîtriser les pointeurs logiques Node/Next/Root", "Implémenter une Pile (Stack)", "Parcourir un Arbre Binaire complet (InOrder, PreOrder)"],
                exercises: [
                    {
                        title: "Récupération dans une Pile (Stack)",
                        description: "Une pile contient {A, B, C} où C a été ajouté en dernier. Quel élément sera retiré au premier Dépiler (Pop) ?",
                        difficulty: "Facile",
                        solution: "L'élément C. C'est le principe du Last-In-First-Out (LIFO).",
                        hints: ["LIFO. Le dernier posé, le premier sorti."]
                    },
                    {
                        title: "Algorithme de l'Arbre Binaire de Recherche",
                        description: "Décrivez la règle d'insertion mathématique pour un nœud dans un BST (Binary Search Tree).",
                        difficulty: "Difficile",
                        solution: "Pour tout nœud Parent :\n- Toutes les valeurs du sous-arbre gauche doivent être strictement INFÉRIEURES à celle du Parent.\n- Toutes les valeurs du sous-arbre droit doivent être strictement SUPÉRIEURES à celle du Parent.",
                        hints: ["Tout doit être triable et recherchable naturellement de chaque côté de la balance."]
                    }
                ],
                resources: [{ title: "Réseaux : De Dijkstra à Google Maps", type: "video", url: "https://www.youtube.com/embed/GazC3A4OQTE" }]
            },
            {
                title: "Chapitre 5 : Programmation Dynamique (Dynamic Programming) et Backtracking",
                description: "Les armes absolues. Résoudre l'insoluble via la mémoïsation et la théorie des essais/erreurs.",
                order: 5,
                duration: "12 heures",
                content: "Une fois expert en Graphes et en Récursivité, vous êtes prêt pour la consécration de l'intelligence artificielle : la Programmation Dynamique et le Backtracking. La Programmation Dynamique (de Richard Bellman) enseigne l'optimisation par la conservation des calculs : 'Ceux qui ne se souviennent pas du passé sont condamnés à le répéter'. Éviter des arbres de calculs titanesques de O(2^N) grâce à la Mémoïsation (Top-Down) et la Tabulation (Bottom-Up). Le Backtracking, ou algorithme d'exploration systématique (Ex: Résoudre un Sudoku, problème des N-Reines), pour annuler élégamment des tentatives vouées à l'échec et explorer un arbre d'état monstrueux. Vous êtes arrivés à la fin du voyage. Vous êtes devenus de véritables Ingénieurs Logiciels d'Élite ! 🥂",
                objectives: ["Comprendre la 'Memoization'", "Résoudre le problème du Rendu de Monnaie Optimisé", "Implémenter une matrice de programmation dynamique"],
                exercises: [
                    {
                        title: "L'Explosion de Fibonacci",
                        description: "Pourquoi faire un calcul récursif pur F(50) = F(49) + F(48) bloque-t-il l'ordinateur, et comment la mémoïsation sauve-t-elle le désastre ?",
                        difficulty: "Difficile",
                        solution: "Le calcul pur est en O(2^N). F(48) ou F(30) est recalculé des millions et des millions de fois inutilement comme des racines redondantes. La Mémoïsation (Dynamic Programming) force la fonction à sauvegarder F(X) dans un tableau T la première fois qu'il le calcule. La fois suivante, au lieu d'ouvrir un arbre entier, il le lit dans le tableau en O(1), abaissant la complexité totale à O(N).",
                        hints: ["Réfléchissez au nombre de fois où Fib(5) sera appelé lors du calcul récursif de Fib(8). C'est vertigineux."]
                    }
                ],
                resources: [{ title: "Introduction Bellman & Dynamic Programming", type: "video", url: "https://www.youtube.com/embed/vYquumk4nWw" }]
            }
        ]
    }
];

module.exports = algoCourses;
