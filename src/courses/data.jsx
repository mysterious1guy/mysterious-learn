import React from 'react';
import {
  Code2, Terminal, Layout, Palette, Globe, Server, Database, FileCode, Coffee, Box, Figma, Sparkles,
  Smartphone, Cloud, Shield, Cpu, Zap, Activity, Layers, PenTool, Hash, Gem, Search, Heart, User, Calendar, BookOpen, Users, Play, ShieldAlert, BadgeCheck
} from 'lucide-react';

export const coursesData = [
  {
    category: "🧠 Fondamentaux",
    items: [
      {
        id: 'algo',
        name: "Algorithmique",
        icon: <Code2 />,
        color: "text-blue-400",
        desc: "Penser comme un programmeur.",
        longDesc: "L'algorithmique est l'art de concevoir des procédures pas à pas pour résoudre des problèmes. Maîtrise les bases : variables, boucles, conditions.",
        code: "// Pseudo-code\nSI reussite ALORS BRAVO",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
        tags: ["Logique", "Bases"],
        lessons: [
          { id: 'algo-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'algo-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'algo-niveau-avanc', title: "Niveau Avancé" },
          { id: 'algo-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'c',
        name: "Langage C",
        icon: <Terminal />,
        color: "text-slate-400",
        desc: "Le langage système par excellence.",
        longDesc: "Le C est le fondement du logiciel moderne. Apprends la gestion mémoire, les pointeurs et la compilation.",
        code: "int main() { return 0; }",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        tags: ["Système", "Mémoire"],
        lessons: [
          { id: 'c-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'c-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'c-niveau-avanc', title: "Niveau Avancé" },
          { id: 'c-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'python',
        name: "Python",
        icon: <Terminal />,
        color: "text-yellow-400",
        desc: "Polyvalent et élégant.",
        longDesc: "Le langage le plus populaire pour débuter, la data science et l'automatisation.",
        code: "print('Hello World')",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
        tags: ["Data", "Scripting"],
        lessons: [
          { id: 'python-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'python-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'python-niveau-avanc', title: "Niveau Avancé" },
          { id: 'python-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'cpp',
        name: "C++",
        icon: <Terminal />,
        color: "text-blue-500",
        desc: "Performance et POO.",
        longDesc: "Maîtrise la programmation orientée objet avec ce langage de haute performance utilisé partout.",
        code: "std::cout << \"Hello\";",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        tags: ["Performance", "POO"],
        lessons: [
          { id: 'cpp-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'cpp-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'cpp-niveau-avanc', title: "Niveau Avancé" },
          { id: 'cpp-niveau-expert', title: "Niveau Expert" }
        ]
      }
    ]
  },
  {
    category: "🌐 Web & Frontend",
    items: [
      {
        id: 'html',
        name: "HTML",
        icon: <Layout />,
        color: "text-orange-400",
        desc: "Structure du Web.",
        longDesc: "La base de tout site web. Maîtrise la sémantique et l'accessibilité.",
        code: "<h1>Hello</h1>",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80",
        tags: ["Web", "Structure"],
        lessons: [
          { id: 'html-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'html-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'html-niveau-avanc', title: "Niveau Avancé" },
          { id: 'html-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'css',
        name: "CSS",
        icon: <Palette />,
        color: "text-blue-400",
        desc: "Design et Styles.",
        longDesc: "Donne vie au HTML avec des couleurs, des layouts et des animations.",
        code: "body { color: blue; }",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
        tags: ["Design", "UI"],
        lessons: [
          { id: 'css-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'css-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'css-niveau-avanc', title: "Niveau Avancé" },
          { id: 'css-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'js',
        name: "JavaScript",
        icon: <FileCode />,
        color: "text-yellow-400",
        desc: "L'intelligence du Web.",
        longDesc: "Maîtrise le langage qui rend le Web interactif.",
        code: "const x = 10;",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        tags: ["Logic", "Interactivité"],
        lessons: [
          { id: 'javascript-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'javascript-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'javascript-niveau-avanc', title: "Niveau Avancé" },
          { id: 'javascript-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'react',
        name: "React.js",
        icon: <Layout />,
        color: "text-cyan-400",
        desc: "Interfaces réactives.",
        longDesc: "Apprends à créer des composants modernes et performants avec la bibliothèque la plus utilisée.",
        code: "const App = () => {}",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        tags: ["Frontend", "UI"],
        lessons: [
          { id: 'react-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'react-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'react-niveau-avanc', title: "Niveau Avancé" },
          { id: 'react-niveau-expert', title: "Niveau Expert" }
        ]
      }
    ]
  },
  {
    category: "⚙️ Backend & Données",
    items: [
      {
        id: 'php',
        name: "PHP",
        icon: <Server />,
        color: "text-indigo-400",
        desc: "Backend Dynamique.",
        longDesc: "Le moteur historique du Web pour créer des sites dynamiques.",
        code: "echo 'Hello PHP';",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&q=80",
        tags: ["Backend", "Web"],
        lessons: [
          { id: 'php-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'php-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'php-niveau-avanc', title: "Niveau Avancé" },
          { id: 'php-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'mongodb',
        name: "MongoDB",
        icon: <Database />,
        color: "text-emerald-600",
        desc: "NoSQL moderne.",
        longDesc: "Gère tes données sans schémas rigides de manière flexible et rapide.",
        code: "db.collection.find()",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        tags: ["NoSQL", "Document"],
        lessons: [
          { id: 'mongodb-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'mongodb-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'mongodb-niveau-avanc', title: "Niveau Avancé" },
          { id: 'mongodb-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'mysql',
        name: "MySQL",
        icon: <Database />,
        color: "text-blue-600",
        desc: "Puissance relationnelle.",
        longDesc: "Maîtrise le langage de base de données le plus utilisé au monde.",
        code: "SELECT * FROM users;",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        tags: ["SQL", "Relationnel"],
        lessons: [
          { id: 'mysql-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'mysql-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'mysql-niveau-avanc', title: "Niveau Avancé" },
          { id: 'mysql-niveau-expert', title: "Niveau Expert" }
        ]
      },
      {
        id: 'bash',
        name: "Bash & Linux",
        icon: <Terminal />,
        color: "text-gray-200",
        desc: "Maîtrise le terminal.",
        longDesc: "Automatise tes tâches et gère tes serveurs comme un pro.",
        code: "ls -la /var/www",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
        tags: ["Terminal", "Automatisation"],
        lessons: [
          { id: 'bash-niveau-d-butant', title: "Niveau Débutant" },
          { id: 'bash-niveau-interm-diaire', title: "Niveau Intermédiaire" },
          { id: 'bash-niveau-avanc', title: "Niveau Avancé" },
          { id: 'bash-niveau-expert', title: "Niveau Expert" }
        ]
      }
    ]
  }
];