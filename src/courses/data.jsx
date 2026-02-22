import React from 'react';
import {
  Code2, Terminal, Layout, Palette, Globe, Server, Database, FileCode, Coffee, Box, Figma, Sparkles,
  Smartphone, Cloud, Shield, Cpu, Zap, Activity, Layers, PenTool, Hash, Gem, Search, Heart, User, Calendar, BookOpen, Users, Play, ShieldAlert, BadgeCheck
} from 'lucide-react';

const GemIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3 8 9l3 12" />
    <path d="m13 3 3 6-3 12" />
    <path d="M2 9h20" />
  </svg>
);

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
          { id: 'algo1', title: "Les variables" },
          { id: 'algo2', title: "Les boucles" },
          { id: 'algo3', title: "Les conditions" },
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
          { id: 'c1', title: "Syntaxe & Types" },
          { id: 'c2', title: "Pointeurs basics" },
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
          { id: 'py1', title: "Installation & Premier script" },
          { id: 'py2', title: "Les Listes & Dictionnaires" },
          { id: 'py3', title: "Les Fonctions & Modules" },
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
        lessons: [
          { id: 'rb1', title: "L'esprit Ruby" },
          { id: 'rb2', title: "Les Blocs & Procs" },
          { id: 'rb3', title: "Classes & Objets" },
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
        lessons: [
          { id: 'asm1', title: "Registres & Mémoire" },
          { id: 'asm2', title: "Instructions de base" },
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
          { id: 'cpp1', title: "Classes & Objets" },
          { id: 'cpp2', title: "La STL" },
        ]
      }
    ]
  },
  {
    category: "🌐 Web & Frontend",
    items: [
      {
        id: 'react',
        name: "React.js",
        icon: <Layout />,
        color: "text-cyan-400",
        desc: "Interfaces réactives.",
        longDesc: "Apprends à créer des composants modernes et performants avec la bibliothèque la plus utilisée.",
        code: "const App = () => {}",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        tags: ["Frontend", "UI"],
        lessons: [
          { id: 're1', title: "Introduction aux Composants" },
          { id: 're2', title: "Le State & useEffect" },
        ]
      },
      {
        id: 'tailwind',
        name: "Tailwind CSS",
        icon: <Palette />,
        color: "text-blue-400",
        desc: "Design rapide et flexible.",
        longDesc: "Stylise tes sites sans quitter ton HTML grâce aux classes utilitaires.",
        code: "class=\"flex p-4\"",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
        tags: ["CSS", "Design"],
        lessons: [
          { id: 'tw1', title: "Bases & Utilitaires" },
        ]
      },
      {
        id: 'nextjs',
        name: "Next.js",
        icon: <Globe />,
        color: "text-white",
        desc: "Le futur du React.",
        longDesc: "SSR, SSG, et performances ultimes pour tes applications de production.",
        code: "export default Page",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1629910260311-6733f52423bb?w=800&q=80",
        tags: ["Framework", "Fullstack"],
        lessons: [
          { id: 'nx1', title: "Routing & Layouts" },
        ]
      },
      {
        id: 'vue',
        name: "Vue.js",
        icon: <Layers />,
        color: "text-emerald-500",
        desc: "Progressif et intuitif.",
        longDesc: "Un framework accessible pour créer des interfaces web performantes.",
        code: "<template>{{ msg }}</template>",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        tags: ["JS", "Frontend"],
        lessons: [
          { id: 'vu1', title: "La Réactivité" },
        ]
      },
      {
        id: 'angular',
        name: "Angular",
        icon: <Layout />,
        color: "text-red-600",
        desc: "Le framework robuste.",
        longDesc: "Développe des applications d'entreprise puissantes avec TypeScript et une structure solide.",
        code: "@Component({})",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        tags: ["Enterprise", "Google"],
        lessons: [
          { id: 'ang1', title: "Modules & Services" },
        ]
      }
    ]
  },
  {
    category: "⚙️ Backend & Données",
    items: [
      {
        id: 'nodejs',
        name: "Node.js",
        icon: <Server />,
        color: "text-green-500",
        desc: "JS côté serveur.",
        longDesc: "Construis des API rapides et scalables avec JavaScript partout.",
        code: "http.createServer()",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=800&q=80",
        tags: ["Runtime", "API"],
        lessons: [
          { id: 'nd1', title: "Système de fichiers" },
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
          { id: 'mg1', title: "CRUD Basics" },
        ]
      },
      {
        id: 'postgresql',
        name: "PostgreSQL",
        icon: <Database />,
        color: "text-blue-600",
        desc: "Puissance relationnelle.",
        longDesc: "La base de données relationnelle la plus avancée au monde.",
        code: "SELECT * FROM users",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        tags: ["SQL", "Relationnel"],
        lessons: [
          { id: 'pg1', title: "Requêtes & Jointures" },
        ]
      },
      {
        id: 'graphql',
        name: "GraphQL",
        icon: <Zap />,
        color: "text-pink-600",
        desc: "API moderne.",
        longDesc: "Demande exactement ce dont tu as besoin, rien de plus, rien de moins.",
        code: "query { user { id } }",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        tags: ["API", "Meta"],
        lessons: [
          { id: 'gq1', title: "Schémas & Types" },
        ]
      }
    ]
  },
  {
    category: "📱 Mobile & Cloud",
    items: [
      {
        id: 'reactnative',
        name: "React Native",
        icon: <Smartphone />,
        color: "text-sky-400",
        desc: "iOS & Android.",
        longDesc: "Développe des applications mobiles natives avec React.",
        code: "<View><Text /></View>",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        tags: ["Native", "Mobile"],
        lessons: [
          { id: 'rn1', title: "Composants Natifs" },
        ]
      },
      {
        id: 'flutter',
        name: "Flutter",
        icon: <Smartphone />,
        color: "text-blue-400",
        desc: "UI magnifiques.",
        longDesc: "Le framework de Google pour créer des apps compilées en un clin d'œil.",
        code: "Widget build() {}",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        tags: ["Dart", "Google"],
        lessons: [
          { id: 'fl1', title: "Widgets Basics" },
        ]
      },
      {
        id: 'aws',
        name: "AWS",
        icon: <Cloud />,
        color: "text-orange-400",
        desc: "Cloud Computing.",
        longDesc: "Déploie tes applications sur l'infrastructure du leader mondial du cloud.",
        code: "s3://bucket-name",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        tags: ["Cloud", "DevOps"],
        lessons: [
          { id: 'aw1', title: "Services EC2 & S3" },
        ]
      },
      {
        id: 'cybersecurity',
        name: "Cybersécurité",
        icon: <Shield />,
        color: "text-red-500",
        desc: "Défendre le web.",
        longDesc: "Apprends les bases de la protection des systèmes et la chasse aux vulnérabilités.",
        code: "nmap -sV target",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        tags: ["Sécurité", "Réseau"],
        lessons: [
          { id: 'cs1', title: "Menaces & Protections" },
        ]
      }
    ]
  },
  {
    category: "🚀 Machine Learning & IA",
    items: [
      {
        id: 'pytorch',
        name: "PyTorch",
        icon: <Cpu />,
        color: "text-orange-600",
        desc: "Deep Learning.",
        longDesc: "Le framework de recherche par excellence pour créer des réseaux de neurones.",
        code: "torch.nn.Linear()",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80",
        tags: ["IA", "Deep Learning"],
        lessons: [
          { id: 'pt1', title: "Tenseurs & Gradients" },
        ]
      },
      {
        id: 'tensorflow',
        name: "TensorFlow",
        icon: <Activity />,
        color: "text-yellow-600",
        desc: "IA en production.",
        longDesc: "L'écosystème complet de Google pour l'IA, du mobile au serveur.",
        code: "tf.keras.Sequential()",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        tags: ["IA", "Google"],
        lessons: [
          { id: 'tf1', title: "Modèles de Base" },
        ]
      },
      {
        id: 'dataanalysis',
        name: "Data Analysis",
        icon: <Search />,
        color: "text-blue-500",
        desc: "Parler aux données.",
        longDesc: "Maîtrise Pandas et NumPy pour transformer tes données brutes en informations précieuses.",
        code: "df.describe()",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        tags: ["Pandas", "NumPy"],
        lessons: [
          { id: 'da1', title: "Manipulation de DataFrames" },
        ]
      },
      {
        id: 'julia',
        name: "Julia",
        icon: <Zap />,
        color: "text-purple-600",
        desc: "Calcul scientifique.",
        longDesc: "La rapidité du C avec la facilité de Python pour les sciences et les maths.",
        code: "println(sqrt(2))",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
        tags: ["Maths", "Science"],
        lessons: [
          { id: 'jl1', title: "Vectorisation" },
        ]
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
        lessons: [
          { id: 'git1', title: "Workflow" },
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
          { id: 'bash1', title: "Scripts Basics" },
        ]
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
        lessons: [
          { id: 'docker1', title: "Images & Containers" },
        ]
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
        lessons: [
          { id: 'json1', title: "Structure & Schémas" },
        ]
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
        lessons: [
          { id: 'figma1', title: "Composants" },
        ]
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
        lessons: [
          { id: 'proc1', title: "Formes & Couleurs" },
        ]
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
        lessons: [
          { id: 'sc1', title: "Immuabilité" },
        ]
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
        lessons: [
          { id: 'hs1', title: "Monades" },
        ]
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
        lessons: [
          { id: 'lua1', title: "Tables & Scripts" },
        ]
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
        lessons: [
          { id: 'lisp1', title: "S-Expressions" },
        ]
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
        lessons: [
          { id: 'sol1', title: "Web3 Basics" },
        ]
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
        lessons: [
          { id: 'ard1', title: "Circuits & LED" },
        ]
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
        lessons: [
          { id: 'zig1', title: "Comptime" },
        ]
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
        lessons: [
          { id: 'scratch1', title: "Logique par blocs" },
        ]
      }
    ]
  }
];