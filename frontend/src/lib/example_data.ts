import type {Exercise, Profile, WorkoutExercise, WorkoutPlan} from "@/lib/types";

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

export const sampleExercises: Exercise[] = [
    {
        id: "ex1",
        name: "Wyciskanie sztangi na ławce płaskiej",
        description: "Klasyczne ćwiczenie na klatkę piersiową, triceps i barki.",
        picture: ""
    },
    {
        id: "ex2",
        name: "Przysiady ze sztangą (przednie)",
        description: "Wielostawowe ćwiczenie na nogi i pośladki, angażuje także core.",
        picture: ""
    },
    {
        id: "ex3",
        name: "Martwy ciąg (klasyczny)",
        description: "Kompleksowe ćwiczenie na całe ciało, wzmacnia plecy, nogi i core.",
        picture: ""
    },
    {
        id: "ex4",
        name: "Wiosłowanie sztangą w opadzie tułowia",
        description: "Ćwiczenie na plecy i bicepsy, buduje grubość pleców.",
        picture: ""
    },
    {
        id: "ex5",
        name: "Wyciskanie hantli nad głowę siedząc",
        description: "Ćwiczenie izolujące barki, wzmacnia mięśnie naramienne.",
        picture: ""
    },
    {
        id: "ex6",
        name: "Uginanie ramion ze sztangą (biceps)",
        description: "Ćwiczenie izolujące bicepsy, buduje masę ramion.",
        picture: ""
    }
];

export const sampleWorkoutPlans: WorkoutPlan[] = [
    // --- TRENING Z LOGAMI (WYKONANY) ---
    // Data ustawiona na przeszłość, żeby był "archiwalny"
    {
        id: "wp1_logged",
        name: "Trening Siłowy A - Klatka i Triceps (WYKONANY)",
        date: "2024-06-14", // Data w przeszłości
        author: allCoaches[0], // Tomasz Wojciechowski
        exercises: [
            {
                id: "we1_1",
                exercise: sampleExercises.find(ex => ex.id === "ex1")!, // Wyciskanie sztangi
                reps: [5, 5, 5],
                weight: [80, 85, 90],
                notes: "Zrobiłem jedną serię rozgrzewkową 60kg x 8.",
                order: 1,
                breakTime: 120, // sekundy
            } as WorkoutExercise,
            {
                id: "we1_2",
                exercise: { // Możesz też definiować inline, jeśli nie chcesz zaciągać z sampleExercises
                    id: "ex7",
                    name: "Wyciskanie hantli skos dodatni",
                    description: "Ćwiczenie na górną część klatki piersiowej.",
                    picture: "https://example.com/dumbbell_incline.jpg"
                },
                reps: [8, 8, 8],
                weight: [25, 27.5, 30],
                notes: "",
                order: 2,
                breakTime: 90,
            } as WorkoutExercise,
            {
                id: "we1_3",
                exercise: {
                    id: "ex8",
                    name: "Pompki na poręczach",
                    description: "Ćwiczenie na triceps i dolną część klatki.",
                    picture: "https://example.com/dips.jpg"
                },
                reps: [10, 8, 6],
                weight: [0, 5, 10], // Waga dodatkowa
                notes: "Z obciążeniem",
                order: 3,
                breakTime: 60,
            } as WorkoutExercise
        ]
    },

    // --- TRENING DO ZROBIENIA (AKTUALNY) ---
    // Data ustawiona na przyszłość (lub aktualny dzień), bez logów
    {
        id: "wp2_todo",
        name: "Trening Siłowy B - Nogi i Barki (DO ZROBIENIA)",
        date: "2025-09-17", // Data w przyszłości
        author: allCoaches[1], // Anna Kowalczyk
        exercises: [
            {
                id: "we2_1",
                exercise: sampleExercises.find(ex => ex.id === "ex2")!, // Przysiady przednie
                reps: [6, 6, 6],
                weight: [60, 65, 70],
                notes: "Skupić się na głębi.",
                order: 1,
                breakTime: 180
            },
            {
                id: "we2_2",
                exercise: sampleExercises.find(ex => ex.id === "ex5")!, // Wyciskanie hantli nad głowę
                reps: [10, 10, 10],
                weight: [15, 17.5, 20],
                notes: "Pełny zakres ruchu.",
                order: 2,
                breakTime: 90
            },
            {
                id: "we2_3",
                exercise: {
                    id: "ex9",
                    name: "Wykroki z hantlami",
                    description: "Ćwiczenie unilateralne na nogi i pośladki.",
                    picture: "https://example.com/dumbbell_lunges.jpg"
                },
                reps: [10, 10], // Na każdą nogę
                weight: [10, 10],
                notes: "Po 10 na nogę.",
                order: 3,
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
        exercises: [
            {
                id: "we3_1",
                exercise: sampleExercises.find(ex => ex.id === "ex3")!, // Martwy ciąg
                reps: [5, 5, 5],
                weight: [100, 110, 120],
                notes: "Poprawna technika przede wszystkim!",
                order: 1,
                breakTime: 240
            },
            {
                id: "we3_2",
                exercise: sampleExercises.find(ex => ex.id === "ex4")!, // Wiosłowanie sztangą
                reps: [8, 8, 8],
                weight: [60, 65, 70],
                notes: "Mocne ściągnięcie łopatek.",
                order: 2,
                breakTime: 120
            },
            {
                id: "we3_3",
                exercise: sampleExercises.find(ex => ex.id === "ex6")!, // Uginanie ramion ze sztangą
                reps: [10, 10, 10],
                weight: [25, 27.5, 30],
                notes: "Kontrolowany ruch.",
                order: 3,
                breakTime: 60
            }
        ]
    }
];