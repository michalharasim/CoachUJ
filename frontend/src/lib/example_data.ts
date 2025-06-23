import type {Exercise, ExerciseCategory, Profile, WorkoutPlan} from "@/lib/types";

export const allCoaches : Profile[] = [
    {
        username: "fitnesstomasz",
        name: "Tomasz",
        surname: "Wojciechowski",
        location: "Warszawa, Polska",
        phone: "+48 601 234 567",
        avatar: "https://github.com/shadcn.png",
        description: "Certyfikowany trener personalny z ponad 10-letnim doświadczeniem w kształtowaniu sylwetki i poprawie kondycji. Specjalizuję się w treningu siłowym i funkcjonalnym. Pomagam osiągać cele zarówno początkującym, jak i zaawansowanym."
    }, {
        username: "powerania",
        name: "Anna",
        surname: "Kowalczyk",
        location: "Gdańsk, Polska",
        phone: "+48 720 987 654",
        avatar: "https://github.com/vercel.png",
        description: "Trenerka fitness i dietetyk, pasjonatka zdrowego stylu życia. Pomagam w budowaniu zdrowych nawyków, redukcji wagi i zwiększaniu energii. Moje podejście opiera się na równowadze między treningiem a odpowiednim odżywianiem."
    },{
        username: "strongmichał",
        name: "Michał",
        surname: "Nowak",
        location: "Kraków, Polska",
        phone: "+48 512 345 789",
        avatar: "https://github.com/octocat.png",
        description: "Trener przygotowania motorycznego i CrossFitu. Skupiam się na zwiększaniu siły, wytrzymałości i mobilności. Prowadzę zajęcia grupowe i indywidualne, pomagając sportowcom i entuzjastom poprawiać swoje wyniki."
    }
]

export const yourCoaches : Profile[] = [
    {
        username: "fitnesstomasz",
        name: "Tomasz",
        surname: "Wojciechowski",
        location: "Warszawa, Polska",
        phone: "+48 601 234 567",
        avatar: "https://github.com/shadcn.png",
        description: "Certyfikowany trener personalny z ponad 10-letnim doświadczeniem w kształtowaniu sylwetki i poprawie kondycji. Specjalizuję się w treningu siłowym i funkcjonalnym. Pomagam osiągać cele zarówno początkującym, jak i zaawansowanym."
    }
]

export const sampleCategories: ExerciseCategory[] = [
    {
        "id": "ramiona",
        "name": "Ramiona"
    },
    {
        "id": "nogi",
        "name": "Nogi"
    },
    {
        "id": "klatka-piersiowa",
        "name": "Klatka Piersiowa"
    },
    {
        "id": "plecy",
        "name": "Plecy"
    },
    {
        "id": "barki",
        "name": "Barki"
    },
    {
        "id": "brzuch",
        "name": "Brzuch"
    },
    {
        "id": "cale-cialo",
        "name": "Całe Ciało"
    },
    {
        "id": "cardio",
        "name": "Cardio"
    }
]

export const sampleExercises: Exercise[] = [
    {
        id: "ex1",
        name: "Wyciskanie sztangi na ławce płaskiej",
        description: "Klasyczne ćwiczenie na klatkę piersiową, triceps i barki.",
        categories: [sampleCategories[2]],
        isMyExercise: true,
        picture: ""
    },
    {
        id: "ex2",
        name: "Przysiady ze sztangą (przednie)",
        description: "Wielostawowe ćwiczenie na nogi i pośladki, angażuje także core.",
        categories: [sampleCategories[1]],
        picture: "",
        isMyExercise: false,
    },
    {
        id: "ex3",
        name: "Martwy ciąg (klasyczny)",
        description: "Kompleksowe ćwiczenie na całe ciało, wzmacnia plecy, nogi i core.",
        categories: [sampleCategories[6]],
        picture: "",
        isMyExercise: true,
    },
    {
        id: "ex4",
        name: "Wiosłowanie sztangą w opadzie tułowia",
        description: "Ćwiczenie na plecy i bicepsy, buduje grubość pleców.",
        categories: [sampleCategories[3]],
        picture: "",
        isMyExercise: false,
    },
    {
        id: "ex5",
        name: "Wyciskanie hantli nad głowę siedząc",
        description: "Ćwiczenie izolujące barki, wzmacnia mięśnie naramienne.",
        categories: [sampleCategories[0], sampleCategories[4]],
        picture: "",
        isMyExercise: true,
    },
    {
        id: "ex6",
        name: "Uginanie ramion ze sztangą (biceps)",
        description: "Ćwiczenie izolujące bicepsy, buduje masę ramion.",
        categories: [sampleCategories[0]],
        picture: "",
        isMyExercise: false,
    }
];

export const sampleWorkoutPlans: WorkoutPlan[] = [
    {
        id: "wp1_logged",
        name: "Trening Siłowy A - Klatka i Triceps (WYKONANY)",
        date: "2024-06-14", // Data w przeszłości
        author: allCoaches[0], // Tomasz Wojciechowski
        note: "",
        exercises: [
            {
                exercise: sampleExercises.find(ex => ex.id === "ex1")!, // Wyciskanie sztangi
                reps: ["5", "5", "5"],
                weight: [80, 85, 90],
                breakTime: 120, // sekundy
            },
            {
                exercise: {
                    id: "ex7",
                    name: "Wyciskanie hantli skos dodatni",
                    description: "Ćwiczenie na górną część klatki piersiowej.",
                    picture: "https://example.com/dumbbell_incline.jpg",
                    categories: [sampleCategories[1]],
                    isMyExercise: false,
                },
                reps: ["8", "8", "8"],
                weight: [25, 27.5, 30],
                breakTime: 90,
            },
            {
                exercise: {
                    id: "ex8",
                    name: "Pompki na poręczach",
                    description: "Ćwiczenie na triceps i dolną część klatki.",
                    picture: "https://example.com/dips.jpg",
                    categories: [sampleCategories[1]],
                    isMyExercise: false,
                },
                reps: ["10", "8", "6"],
                weight: [0, 5, 10],
                breakTime: 60,
            }
        ]
    },

    // --- TRENING DO ZROBIENIA (AKTUALNY) ---
    // Data ustawiona na przyszłość (lub aktualny dzień), bez logów
    {
        id: "wp2_todo",
        name: "Trening Siłowy B - Nogi i Barki (DO ZROBIENIA)",
        date: "2025-09-17", // Data w przyszłości
        author: allCoaches[1], // Anna Kowalczyk
        note: "",
        exercises: [
            {
                exercise: sampleExercises.find(ex => ex.id === "ex2")!, // Przysiady przednie
                reps: ["6", "6"," 6"],
                weight: [60, 65, 70],
                breakTime: 180
            },
            {
                exercise: sampleExercises.find(ex => ex.id === "ex5")!, // Wyciskanie hantli nad głowę
                reps: ["10", "10", "10"],
                weight: [15, 17.5, 20],
                breakTime: 90
            },
            {
                exercise: {
                    id: "ex9",
                    name: "Wykroki z hantlami",
                    description: "Ćwiczenie unilateralne na nogi i pośladki.",
                    categories: [sampleCategories[0]],
                    picture: "https://example.com/dumbbell_lunges.jpg",
                    isMyExercise: false,
                },
                reps: ["10", "10"], // Na każdą nogę
                weight: [10, 10],
                breakTime: 60
            }
        ]
    },

    // --- KOLEJNY TRENING DO ZROBIENIA (AKTUALNY) ---
    // Data ustawiona na przyszłość, bez logów
    {
        id: "wp3_todo",
        name: "Trening Siłowy C - Plecy i Biceps (DO ZROBIENIA)",
        date: "2025-09-19", // Data w przyszłości
        author: allCoaches[2], // Michał Nowak
        note: "",
        exercises: [
            {
                exercise: sampleExercises.find(ex => ex.id === "ex3")!, // Martwy ciąg
                reps: ["5", "5", "5"],
                weight: [100, 110, 120],
                breakTime: 240
            },
            {
                exercise: sampleExercises.find(ex => ex.id === "ex4")!, // Wiosłowanie sztangą
                reps: ["8", "8", "8"],
                weight: [60, 65, 70],
                breakTime: 120
            },
            {
                exercise: sampleExercises.find(ex => ex.id === "ex6")!, // Uginanie ramion ze sztangą
                reps: ["10", "10", "10"],
                weight: [25, 27.5, 30],
                breakTime: 60
            }
        ]
    }
];