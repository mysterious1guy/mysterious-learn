import React from 'react';
import { Terminal, Cpu, MemoryStick, Layers } from 'lucide-react';

export const coursesData = [
  {
    category: "⚡ Masterclass Langage C (Exclusif)",
    items: [
      {
        id: 'c-fondations-compilation',
        name: "1. Fondations & Compilation GCC",
        icon: <Terminal />,
        color: "text-blue-500",
        desc: "Architecture binaire, RAM, octets et entrées/sorties.",
        longDesc: "Plongez au cœur du processeur et de la mémoire RAM. Comprenez la chaîne de compilation GCC, le système de types stricts et les E/S standard.",
        code: "#include <stdio.h>\nint main() { printf(\"C Masterclass\\n\"); return 0; }",
        level: "Débutant",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        tags: ["C", "GCC", "RAM", "Compilation"],
        lessons: [
          { id: 'c-fondations-compilation-ch1', title: "1. Architecture ordinateur & Philosophie du C" },
          { id: 'c-fondations-compilation-ch2', title: "2. Chaîne de Compilation GCC" },
          { id: 'c-fondations-compilation-ch3', title: "3. Types Primitifs, Octets & Modificateurs" },
          { id: 'c-fondations-compilation-ch4', title: "4. Entrées / Sorties Standard (Printf/Scanf)" },
          { id: 'c-fondations-compilation-ch5', title: "5. Projet Pratique : Calculateur Binaire" }
        ]
      },
      {
        id: 'c-flux-fonctions-modularite',
        name: "2. Contrôle de Flux & Modularité",
        icon: <Layers />,
        color: "text-purple-500",
        desc: "Boucles, fonctions, prototypes et fichiers headers .h.",
        longDesc: "Structurez votre code avec des boucles performantes, créez des fonctions réutilisables et découpez votre projet en fichiers headers `.h`.",
        code: "#ifndef HEADER_H\n#define HEADER_H\nvoid init();\n#endif",
        level: "Intermédiaire",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        tags: ["C", "Boucles", "Headers", "Modularité"],
        lessons: [
          { id: 'c-flux-fonctions-modularite-ch1', title: "1. Embranchements & Conditions" },
          { id: 'c-flux-fonctions-modularite-ch2', title: "2. Boucles d'Itération & Optimisation" },
          { id: 'c-flux-fonctions-modularite-ch3', title: "3. Fonctions & Call Stack" },
          { id: 'c-flux-fonctions-modularite-ch4', title: "4. Modularité Professionnelle (.h / .c)" },
          { id: 'c-flux-fonctions-modularite-ch5', title: "5. Tableaux 1D et 2D (Matrices)" }
        ]
      },
      {
        id: 'c-pointeurs-ram-chaines',
        name: "3. Pointeurs & Adressage RAM",
        icon: <Cpu />,
        color: "text-amber-500",
        desc: "Déréférencement, passage par référence et arithmétique.",
        longDesc: "Démystifiez le concept le plus puissant du C : l'accès direct aux adresses mémoire RAM, le passage par référence et la manipulation des chaînes.",
        code: "int val = 42;\nint *ptr = &val;\n*ptr = 100;",
        level: "Avancé",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        tags: ["C", "Pointeurs", "RAM", "Adresses"],
        lessons: [
          { id: 'c-pointeurs-ram-chaines-ch1', title: "1. Concept des Pointeurs en C" },
          { id: 'c-pointeurs-ram-chaines-ch2', title: "2. Passage par Référence" },
          { id: 'c-pointeurs-ram-chaines-ch3', title: "3. Arithmétique des Pointeurs" },
          { id: 'c-pointeurs-ram-chaines-ch4', title: "4. Chaînes de Caractères char*" },
          { id: 'c-pointeurs-ram-chaines-ch5', title: "5. Projet Pratique : Algorithmes par Pointeurs" }
        ]
      },
      {
        id: 'c-allocation-dynamique-structures',
        name: "4. Allocation Malloc & Structures",
        icon: <MemoryStick />,
        color: "text-green-500",
        desc: "Gestion du Tas (Heap), Struct, Listes chaînées & Fichiers.",
        longDesc: "Gérez le Tas (Heap) avec malloc/free, créez vos propres types structurés (Struct) et construisez des structures de données dynamiques.",
        code: "int *data = (int*)malloc(10 * sizeof(int));\nfree(data);",
        level: "Expert",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        tags: ["C", "Malloc", "Free", "Struct", "Files"],
        lessons: [
          { id: 'c-allocation-dynamique-structures-ch1', title: "1. Mémoire Tas (Heap) vs Pile (Stack)" },
          { id: 'c-allocation-dynamique-structures-ch2', title: "2. Allocation Malloc, Calloc & Free" },
          { id: 'c-allocation-dynamique-structures-ch3', title: "3. Structures Personnalisées (Struct & Typedef)" },
          { id: 'c-allocation-dynamique-structures-ch4', title: "4. Listes Chaînées Simples" },
          { id: 'c-allocation-dynamique-structures-ch5', title: "5. Entrées / Sorties Fichiers (FILE*)" }
        ]
      }
    ]
  }
];
