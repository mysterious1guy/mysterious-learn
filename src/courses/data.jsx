import React from 'react';
import {
  Code2, Terminal, Layout, Palette, Globe, Server, Database, FileCode, Coffee, Box, Figma, Sparkles,
  Smartphone, Cloud, Shield, Cpu, Zap, Activity, Layers, PenTool, Hash, Gem, Search, Heart, User, Clock, Calendar, BookOpen, Users, Play, ShieldAlert, BadgeCheck
} from 'lucide-react';

const GemIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3 8 9l3 12" />
    <path d="m13 3 3 6-3 12" />
    <path d="M2 9h20" />
  </svg>
);
// Use GemIcon instead of Gem to avoid naming conflict with lucide if any, 
// though lucide doesn't have Gem (it has Diamond).

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
        students: 1234,
        lessons: [
          { id: 'algo1', title: "Les variables", duration: "10 min" },
          { id: 'algo2', title: "Les boucles", duration: "15 min" },
          { id: 'algo3', title: "Les conditions", duration: "12 min" },
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
        students: 890,
        lessons: [
          { id: 'c1', title: "Syntaxe & Types", duration: "20 min" },
          { id: 'c2', title: "Pointeurs basics", duration: "25 min" },
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
        students: 2100,
        lessons: [
          { id: 'py1', title: "Installation & Premier script", duration: "15 min" },
          { id: 'py2', title: "Les Listes & Dictionnaires", duration: "20 min" },
          { id: 'py3', title: "Les Fonctions & Modules", duration: "25 min" },
        ]
      },
      {
        id: 'ruby',
        name: "Ruby",
        icon: <GemIcon />,
        color: "text-red-500",
        desc: "Le bonheur du développeur.",
        longDesc: "Conçu pour une productivité maximale et un plaisir d'écriture inégalé. Base de Ruby on Rails.",
        code: "puts 'Hello Ruby'",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        tags: ["Web", "Productivité"],
        students: 450,
        lessons: [
          { id: 'rb1', title: "L'esprit Ruby", duration: "10 min" },
          { id: 'rb2', title: "Les Blocs & Procs", duration: "20 min" },
          { id: 'rb3', title: "Classes & Objets", duration: "25 min" },
        ]
      },
      {
        id: 'assembly',
        name: "Assembly",
        icon: <Cpu />,
        color: "text-emerald-500",
        desc: "Parler à la machine.",
        longDesc: "Le niveau le plus bas avant le binaire. Comprends l'architecture des processeurs et des registres.",
        code: "MOV EAX, 1",
        level: "Expert",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        tags: ["Hardware", "Bas niveau"],
        students: 120,
        lessons: [
          { id: 'asm1', title: "Registres & Mémoire", duration: "30 min" },
          { id: 'asm2', title: "Instructions Arithmétiques", duration: "35 min" },
          { id: 'asm3', title: "Sauts & Conditions", duration: "40 min" },
        ]
      },
      {
        id: 'cpp',
        name: "C++",
        icon: <Terminal />,
        color: "text-blue-600",
        desc: "Puissance et contrôle.",
        longDesc: "Le successeur du C, ajoutant l'orienté objet et la performance brute pour les jeux et systèmes.",
        code: "std::cout << \"Hello\";",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        tags: ["Jeux", "Performance"],
        students: 950,
        lessons: [
          { id: 'cpp1', title: "Classes & Héritage", duration: "25 min" },
          { id: 'cpp2', title: "Templates & STL", duration: "30 min" },
          { id: 'cpp3', title: "Smart Pointers", duration: "25 min" },
        ]
      },
      {
        id: 'csharp',
        name: "C#",
        icon: <Code2 />,
        color: "text-purple-600",
        desc: "L'écosystème .NET.",
        longDesc: "Polyvalent et puissant, idéal pour le développement Windows, les jeux avec Unity et le backend.",
        code: "Console.WriteLine(\"Hi\");",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
        tags: ["Microsoft", "Unity"],
        students: 1100,
        lessons: [
          { id: 'cs1', title: "Syntaxe & Types .NET", duration: "20 min" },
          { id: 'cs2', title: "LINQ & Collections", duration: "25 min" },
          { id: 'cs3', title: "Async / Await", duration: "20 min" },
        ]
      }
    ]
  },
  {
    category: "🌐 Web Modern",
    items: [
      {
        id: 'html',
        name: "HTML5",
        icon: <Layout />,
        color: "text-orange-500",
        desc: "La structure du web.",
        longDesc: "Apprends à baliser le contenu de tes pages pour un web sémantique et accessible.",
        code: "<h1>Hello</h1>",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        tags: ["Frontend", "Structure"],
        students: 3450,
        lessons: [
          { id: 'html1', title: "Sémantique & Structure", duration: "10 min" },
          { id: 'html2', title: "Formulaires & Validation", duration: "15 min" },
          { id: 'html3', title: "Audio & Vidéo", duration: "10 min" },
        ]
      },
      {
        id: 'css',
        name: "CSS3",
        icon: <Palette />,
        color: "text-blue-300",
        desc: "Design et animations.",
        longDesc: "Stylise tes applications avec Flexbox, Grid et des animations fluides.",
        code: "body { color: blue; }",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
        tags: ["Style", "Responsive"],
        students: 2980,
        lessons: [
          { id: 'css1', title: "Flexbox & Grid", duration: "15 min" },
          { id: 'css2', title: "Animations & Transitions", duration: "20 min" },
          { id: 'css3', title: "Responsive Design", duration: "15 min" },
        ]
      },
      {
        id: 'js',
        name: "JavaScript",
        icon: <Globe />,
        color: "text-yellow-400",
        desc: "L'interactivité dynamique.",
        longDesc: "Maîtrise ES6+, les promesses et la manipulation du DOM.",
        code: "console.log('JS');",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
        tags: ["Logique", "Frontend"],
        students: 1870,
        lessons: [
          { id: 'js1', title: "ES6 Fundamentals", duration: "20 min" },
          { id: 'js2', title: "Async / Await & Fetch", duration: "25 min" },
          { id: 'js3', title: "Manipulation du DOM", duration: "20 min" },
        ]
      },
      {
        id: 'typescript',
        name: "TypeScript",
        icon: <Shield />,
        color: "text-blue-600",
        desc: "JavaScript avec des types.",
        longDesc: "Évite les erreurs au runtime et améliore ton expérience de développement avec le typage statique.",
        code: "const x: number = 5;",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        tags: ["Sécurité", "Scalabilité"],
        students: 1200,
        lessons: [
          { id: 'ts1', title: "Interfaces & Types", duration: "15 min" },
          { id: 'ts2', title: "Generics", duration: "20 min" },
          { id: 'ts3', title: "Enums & Unions", duration: "15 min" },
        ]
      },
      {
        id: 'react',
        name: "React",
        icon: <Code2 />,
        color: "text-cyan-400",
        desc: "Interfaces basées sur les composants.",
        longDesc: "La bibliothèque UI la plus utilisée au monde par Meta.",
        code: "const App = () => <div>Hi</div>",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        tags: ["UI", "Meta"],
        students: 1560,
        lessons: [
          { id: 'react1', title: "Hooks (useState, useEffect)", duration: "20 min" },
          { id: 'react2', title: "Custom Hooks", duration: "25 min" },
          { id: 'react3', title: "Context API", duration: "20 min" },
        ]
      },
      {
        id: 'vue',
        name: "Vue.js",
        icon: <Layers />,
        color: "text-emerald-400",
        desc: "Progressif et performant.",
        longDesc: "Une alternative élégante et facile à apprendre pour construire des interfaces modernes.",
        code: "new Vue({ el: '#app' })",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?w=800&q=80",
        tags: ["Simplicité", "Frontend"],
        students: 950,
        lessons: [
          { id: 'vue1', title: "Composition API", duration: "15 min" },
          { id: 'vue2', title: "Vuex / Pinia", duration: "20 min" },
          { id: 'vue3', title: "Vue Router", duration: "15 min" },
        ]
      },
      {
        id: 'svelte',
        name: "Svelte",
        icon: <Zap />,
        color: "text-orange-600",
        desc: "Zéro runtime, pur JS.",
        longDesc: "Compile ton code en pur JavaScript efficace sans virtual DOM.",
        code: "let count = 0;",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        tags: ["Performance", "Compilateur"],
        students: 600,
        lessons: [
          { id: 'svelte1', title: "Réactivité & Stores", duration: "12 min" },
          { id: 'svelte2', title: "Components & Props", duration: "15 min" },
          { id: 'svelte3', title: "Animations Svelte", duration: "12 min" },
        ]
      },
      {
        id: 'markdown',
        name: "Markdown",
        icon: <FileCode />,
        color: "text-gray-400",
        desc: "Écrire pour le web.",
        longDesc: "Le standard pour la documentation, les README et le contenu structuré ultra-léger.",
        code: "# Titre\n**Gras**",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1585241936939-be05368a5bc3?w=800&q=80",
        tags: ["Docs", "Rédaction"],
        students: 1800,
        lessons: [
          { id: 'md1', title: "Syntaxe de base", duration: "10 min" },
          { id: 'md2', title: "Tableaux & Listes", duration: "12 min" },
        ]
      }
    ]
  },
  {
    category: "📱 Mobile App",
    items: [
      {
        id: 'swift',
        name: "Swift",
        icon: <Smartphone />,
        color: "text-orange-400",
        desc: "Apps iOS & macOS.",
        longDesc: "Le langage puissant et intuitif d'Apple pour créer des applications natives fluides.",
        code: "print('Hello Swift')",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1599658880436-125054692aa6?w=800&q=80",
        tags: ["Apple", "iOS"],
        students: 780,
        lessons: [
          { id: 'sw1', title: "SwiftUI Basics", duration: "20 min" },
          { id: 'sw2', title: "Swift Concurrency", duration: "25 min" },
          { id: 'sw3', title: "Core Data", duration: "30 min" },
        ]
      },
      {
        id: 'kotlin',
        name: "Kotlin",
        icon: <Smartphone />,
        color: "text-purple-500",
        desc: "Standard Android moderne.",
        longDesc: "Le successeur de Java pour le développement Android, moderne, sûr et concis.",
        code: "println('Hello Kotlin')",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
        tags: ["Android", "Google"],
        students: 820,
        lessons: [
          { id: 'kt1', title: "Jetpack Compose", duration: "25 min" },
          { id: 'kt2', title: "Coroutines", duration: "20 min" },
          { id: 'kt3', title: "Ktor Client", duration: "25 min" },
        ]
      },
      {
        id: 'dart',
        name: "Dart & Flutter",
        icon: <Smartphone />,
        color: "text-cyan-500",
        desc: "Multiplateforme haute performance.",
        longDesc: "Crée des apps iOS, Android, Web et Desktop avec une seule base de code.",
        code: "void main() => print('Flutter');",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        tags: ["Cross-platform", "UI"],
        students: 1100,
        lessons: [
          { id: 'dart1', title: "Widgets & State", duration: "18 min" },
          { id: 'dart2', title: "Flutter Navigation", duration: "20 min" },
          { id: 'dart3', title: "Provider / Riverpod", duration: "22 min" },
        ]
      }
    ]
  },
  {
    category: "🗄️ Backend & Performance",
    items: [
      {
        id: 'node',
        name: "Node.js",
        icon: <Server />,
        color: "text-green-500",
        desc: "JS côté serveur.",
        longDesc: "Gère des milliers de connexions simultanées avec l'event loop de Node.",
        code: "const http = require('http');",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
        tags: ["Backend", "JavaScript"],
        students: 1300,
        lessons: [
          { id: 'node1', title: "Express API & Middleware", duration: "22 min" },
          { id: 'node2', title: "Authentification JWT", duration: "25 min" },
        ]
      },
      {
        id: 'go',
        name: "Golang",
        icon: <Server />,
        color: "text-blue-300",
        desc: "Efficacité et simplicité.",
        longDesc: "Développé par Google pour la performance système et les microservices.",
        code: "package main\nfunc main() {}",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=800&q=80",
        tags: ["Google", "Cloud"],
        students: 670,
        lessons: [
          { id: 'go1', title: "Goroutines & Channels", duration: "20 min" },
          { id: 'go2', title: "Interfaces & Structs", duration: "25 min" },
        ]
      },
      {
        id: 'rust',
        name: "Rust",
        icon: <Shield />,
        color: "text-orange-700",
        desc: "Sécurité mémoire.",
        longDesc: "Performance du C++ sans les plantages mémoires. Devenu favori des développeurs.",
        code: "fn main() { println!(\"Hi\"); }",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1549605658-29ea39485b04?w=800&q=80",
        tags: ["Système", "Sûr"],
        students: 520,
        lessons: [
          { id: 'rust1', title: "Ownership & Borrowing", duration: "30 min" },
          { id: 'rust2', title: "Pattern Matching", duration: "25 min" },
        ]
      },
      {
        id: 'java',
        name: "Java",
        icon: <Coffee />,
        color: "text-red-400",
        desc: "Robuste et entreprise.",
        longDesc: "Le standard de l'industrie pour les applications backend critiques.",
        code: "public class Main { }",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        tags: ["Entreprise", "Backend"],
        students: 1800,
        lessons: [
          { id: 'java1', title: "POO & Interfaces", duration: "25 min" },
          { id: 'java2', title: "Streams & Lambda", duration: "20 min" },
        ]
      },
      {
        id: 'php',
        name: "PHP 8",
        icon: <FileCode />,
        color: "text-indigo-400",
        desc: "Le moteur du web.",
        longDesc: "Plus rapide et moderne que jamais. Idéal pour Laravel et WordPress.",
        code: "<?php echo 'Hi'; ?>",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97663?w=800&q=80",
        tags: ["Web", "Laravel"],
        students: 1400,
        lessons: [{ id: 'php1', title: "Laravel Intro", duration: "20 min" }]
      },
      {
        id: 'elixir',
        name: "Elixir",
        icon: <Sparkles />,
        color: "text-purple-400",
        desc: "Scalabilité distribuée.",
        longDesc: "Basé sur la VM Erlang, parfait pour les systèmes temps réel et hautement disponibles.",
        code: "def hello, do: :world",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80",
        tags: ["Fonctionnel", "Temps réel"],
        students: 310,
        lessons: [{ id: 'ex1', title: "Processus", duration: "25 min" }]
      }
    ]
  },
  {
    category: "📊 Data & Cloud",
    items: [
      {
        id: 'sql',
        name: "SQL & Postgres",
        icon: <Database />,
        color: "text-blue-400",
        desc: "Maîtrise des données.",
        longDesc: "Apprends à requêter des bases de données relationnelles complexes.",
        code: "SELECT * FROM users;",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        tags: ["Bases de données", "Requêtes"],
        students: 2200,
        lessons: [
          { id: 'sql1', title: "Requêtes JOIN & Unions", duration: "15 min" },
          { id: 'sql2', title: "Sous-requêtes & Index", duration: "20 min" },
        ]
      },
      {
        id: 'mongodb',
        name: "MongoDB",
        icon: <Database />,
        color: "text-green-600",
        desc: "NoSQL flexible.",
        longDesc: "Stocke tes données sous forme de documents JSON pour plus de scalabilité.",
        code: "db.users.find()",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        tags: ["NoSQL", "JSON"],
        students: 900,
        lessons: [
          { id: 'mongo1', title: "Documents & Schémas", duration: "12 min" },
          { id: 'mongo2', title: "Indexation & Performance", duration: "15 min" },
        ]
      },
      {
        id: 'r',
        name: "R Lang",
        icon: <Activity />,
        color: "text-blue-800",
        desc: "Statistiques & Data Science.",
        longDesc: "Le standard pour l'analyse de données, les graphiques et les bio-statistiques.",
        code: "summary(my_data)",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        tags: ["Statistiques", "Data Science"],
        students: 430,
        lessons: [{ id: 'r1', title: "Dataframes", duration: "18 min" }]
      },
      {
        id: 'julia',
        name: "Julia",
        icon: <Activity />,
        color: "text-purple-500",
        desc: "Calcul scientifique ultra-rapide.",
        longDesc: "Combine la facilité de Python et la rapidité du C pour la science des données.",
        code: "f(x) = 2x + 1",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        tags: ["Maths", "Haute Performance"],
        students: 280,
        lessons: [{ id: 'jl1', title: "Vectorisation", duration: "20 min" }]
      }
    ]
  },
  {
    category: "⚙️ DevOps & Outils",
    items: [
      {
        id: 'git',
        name: "Git & GitHub",
        icon: <Globe />,
        color: "text-red-500",
        desc: "Versionnage collaboratif.",
        longDesc: "L'outil indispensable pour tout développeur : branches, commits et travail en équipe.",
        code: "git commit -m \"fix\"",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        tags: ["Collab", "Version Control"],
        students: 2500,
        lessons: [{ id: 'git1', title: "Workflow", duration: "15 min" }]
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
        students: 1500,
        lessons: [{ id: 'bash1', title: "Scripts Basics", duration: "15 min" }]
      },
      {
        id: 'docker',
        name: "Docker",
        icon: <Box />,
        color: "text-blue-500",
        desc: "Conteneurisation.",
        longDesc: "Emballe tes applications pour qu'elles tournent partout sans frottement.",
        code: "docker build -t app .",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
        tags: ["DevOps", "Containers"],
        students: 1100,
        lessons: [{ id: 'docker1', title: "Images & Containers", duration: "20 min" }]
      },
      {
        id: 'json_yaml',
        name: "YAML & JSON",
        icon: <FileCode />,
        color: "text-yellow-600",
        desc: "Formats de données.",
        longDesc: "Indispensables pour la configuration Cloud, les API et le DevOps.",
        code: "apiVersion: v1",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
        tags: ["Config", "API"],
        students: 1900,
        lessons: [{ id: 'json1', title: "Structure & Schémas", duration: "10 min" }]
      }
    ]
  },
  {
    category: "🎨 Design & UX",
    items: [
      {
        id: 'figma',
        name: "Figma",
        icon: <Figma />,
        color: "text-pink-400",
        desc: "Design d'interfaces.",
        longDesc: "L'outil roi pour prototyper des interfaces web et mobiles modernes en collaboration.",
        code: "Auto-layout: On",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        tags: ["UI/UX", "Prototypage"],
        students: 1200,
        lessons: [{ id: 'figma1', title: "Composants", duration: "20 min" }]
      },
      {
        id: 'processing',
        name: "Processing",
        icon: <PenTool />,
        color: "text-blue-400",
        desc: "Art génératif et code.",
        longDesc: "Apprends à coder visuellement pour créer des œuvres d'art numériques et des animations.",
        code: "ellipse(50, 50, 80, 80);",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&q=80",
        tags: ["Art", "Créatif"],
        students: 350,
        lessons: [{ id: 'proc1', title: "Formes & Couleurs", duration: "15 min" }]
      }
    ]
  },
  {
    category: "🏗️ Architecture & Paradigmes",
    items: [
      {
        id: 'scala',
        name: "Scala",
        icon: <Layers />,
        color: "text-red-600",
        desc: "POO & Fonctionnel.",
        longDesc: "Langage puissant tournant sur la JVM, alliant le meilleur de deux mondes.",
        code: "val x = List(1, 2, 3)",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
        tags: ["JVM", "Mixte"],
        students: 420,
        lessons: [{ id: 'sc1', title: "Immuabilité", duration: "25 min" }]
      },
      {
        id: 'haskell',
        name: "Haskell",
        icon: <Cpu />,
        color: "text-purple-700",
        desc: "Pureté fonctionnelle.",
        longDesc: "Explore les monades et le typage fort pour une sécurité mathématique du code.",
        code: "f x = x * 2",
        level: "Expert",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
        tags: ["Maths", "Fonctionnel"],
        students: 150,
        lessons: [{ id: 'hs1', title: "Monades", duration: "40 min" }]
      },
      {
        id: 'lua',
        name: "Lua",
        icon: <Zap />,
        color: "text-blue-500",
        desc: "L'interprété rapide.",
        longDesc: "Léger et rapide, idéal pour l'embarqué et le scripting de jeux vidéo comme Roblox.",
        code: "print('Hello Lua')",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=80",
        tags: ["Jeux", "Script"],
        students: 600,
        lessons: [{ id: 'lua1', title: "Tables & Scripts", duration: "15 min" }]
      },
      {
        id: 'lisp',
        name: "Lisp",
        icon: <Code2 />,
        color: "text-indigo-500",
        desc: "Le code est de la donnée.",
        longDesc: "L'un des plus vieux langages, pionnier de l'IA et de la métaprogrammation.",
        code: "(print \"Hello\")",
        level: "Expert",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
        tags: ["IA", "Historique"],
        students: 90,
        lessons: [{ id: 'lisp1', title: "S-Expressions", duration: "35 min" }]
      }
    ]
  },
  {
    category: "⛓️ Futur & Spécialisation",
    items: [
      {
        id: 'solidity',
        name: "Solidity",
        icon: <Shield />,
        color: "text-gray-300",
        desc: "Smart Contracts Ethereum.",
        longDesc: "Le langage de la blockchain pour créer des applications décentralisées (dApps).",
        code: "contract MyToken {}",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
        tags: ["Blockchain", "Web3"],
        students: 750,
        lessons: [{ id: 'sol1', title: "Web3 Basics", duration: "25 min" }]
      },
      {
        id: 'arduino',
        name: "Arduino",
        icon: <Cpu />,
        color: "text-teal-500",
        desc: "Électronique & IoT.",
        longDesc: "Donne vie à tes objets en connectant le monde physique au code.",
        code: "void setup() {}",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1555412654-72a95a495858?w=800&q=80",
        tags: ["IoT", "Hardware"],
        students: 800,
        lessons: [{ id: 'ard1', title: "Circuits & LED", duration: "20 min" }]
      },
      {
        id: 'zig',
        name: "Zig",
        icon: <Zap />,
        color: "text-orange-500",
        desc: "Le C revisité.",
        longDesc: "Une alternative moderne au C pour la programmation système sans overhead.",
        code: "const std = @import(\"std\");",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?w=800&q=80",
        tags: ["Système", "Moderne"],
        students: 200,
        lessons: [{ id: 'zig1', title: "Comptime", duration: "30 min" }]
      },
      {
        id: 'scratch',
        name: "Scratch",
        icon: <Sparkles />,
        color: "text-orange-400",
        desc: "Apprendre en s'amusant.",
        longDesc: "Idéal pour les plus jeunes ou les débutants totaux pour comprendre la logique par blocs.",
        code: "quand drapeau cliqué",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
        tags: ["Enfants", "Logique"],
        students: 5000,
        lessons: [{ id: 'scratch1', title: "Logique par blocs", duration: "10 min" }]
      }
    ]
  }
];