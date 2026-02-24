# MYSTERIOUS CLASSROOM — Blueprint pédagogique (version 3 niveaux)

## Vision
Plateforme e-learning gamifiée pour apprendre la programmation via parcours progressifs, projets pratiques, et validation des acquis.

## Stack
- MongoDB
- Express
- React
- Node.js
- Vite
- TailwindCSS

## Architecture des parcours (3 niveaux)
Chaque parcours suit désormais strictement **3 niveaux** :
1. Débutant
2. Moyen
3. Avancé

### Parcours Orientation & Socle
- Orientation (obligatoire)
- Algorithmique (obligatoire)
  - Débutant
  - Moyen
  - Avancé

### Langages principaux
- C
- C++
- Python
- HTML
- CSS
- JavaScript
- PHP
- Bash/Linux
- React.js

Pour chaque langage principal :
- Débutant
- Moyen
- Avancé

### Bases de données
- MongoDB
- MySQL

Pour chaque base de données :
- Débutant
- Moyen
- Avancé

### Outils transversaux
- Git/GitHub
- Réseaux

Également structurés en :
- Débutant
- Moyen
- Avancé

## Modèle de progression recommandé
- Orientation complétée → déblocage Algorithmique Débutant
- Algorithmique Avancé validé → déblocage des projets intermédiaires multi-langages
- Pour chaque techno : progression verrouillée Débutant → Moyen → Avancé

## Gamification (XP)
### XP par leçon
- Leçon vidéo terminée : +20 XP
- Quiz/Exercice corrigé : +40 XP
- Validation terminal exécutable : +60 XP

### XP par projet
- Projet Débutant : +200 XP
- Projet Moyen : +350 XP
- Projet Avancé : +500 XP

### Badges
- Badge “Socle logique” : Algorithmique Avancé validé
- Badge “Builder” : 3 projets validés
- Badge “Full-Stack Apprentice” : 1 parcours front + 1 parcours back + 1 DB validés en Avancé

## Projets (déblocage progressif)
- Un projet est lié à un cours et un niveau.
- Déblocage : projet niveau N visible seulement si cours niveau N validé.
- Projets capstone : accessibles après validation d’au moins 2 parcours en Avancé.

## Supports pédagogiques
- Vidéos guidées par niveau
- Exercices corrigés avec feedback
- Terminaux exécutables pour pratique immédiate
- Illustrations/diagrammes pour concepts abstraits

## Sécurité et administration
- Rôle admin principal protégé (2FA recommandé)
- Audit des validations XP
- Vérification anti-fraude sur soumission des projets
- Cohérence de progression via règles de prérequis côté API

## Contrats techniques (MERN)
- `courses`: catalogue des parcours et niveaux
- `lessons`: contenu (vidéo, terminal, exercice)
- `progress`: suivi utilisateur (cours, leçons, XP)
- `projects`: projets et conditions de déblocage
- `badges`: règles et attribution

## Règle directrice
La plateforme doit conserver une pédagogie simple et cohérente : **3 niveaux maximum partout** pour uniformiser l’expérience d’apprentissage.
