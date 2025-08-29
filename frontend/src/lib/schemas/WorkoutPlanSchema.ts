import { z } from 'zod';

const planExerciseSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const workoutPlanSchema = z.object({
    name: z.string()
        .min(2, "Nazwa planu musi mieć przynajmniej 2 znaki.")
        .max(255, "Nazwa planu nie może mieć więcej niż 255 znaków."),
    exercises: z.array(z.object({
        exercise: planExerciseSchema,
        breakTime: z.number().min(0, "Czas przerwy nie może być ujemny"),
        weight: z.string()
            .min(1, "Ciężar nie może być pusty.")
            .transform(str => str.split(' ').filter(s => s.trim() !== '')), // Konwersja '8 10 12' na ['8', '10', '12']
        reps: z.string()
            .min(1, "Ilość powtórzeń nie może być pusta.")
            .transform(str => str.split(' ').filter(s => s.trim() !== '')), // Konwersja '8 10 12' na ['8', '10', '12']
    }).superRefine((data, ctx) => {
        const repsArray = data.reps;
        const weightArray = data.weight;

        if (repsArray.length !== weightArray.length) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Liczba powtórzeń i ciężarów musi być taka sama.",
                path: ['reps']
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Liczba ciężarów i powtórzeń musi być taka sama.",
                path: ['weight']
            });
        }

        // Dodatkowa walidacja dla ciężaru: muszą to być liczby
        if (weightArray.some(val => isNaN(Number(val)))) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Ciężary muszą być liczbami.",
                path: ['weight']
            });
        }
    })),
    note: z.string().optional()
});

export type WorkoutPlanFormValues = z.infer<typeof workoutPlanSchema>;

export type WorkoutPlanFormInput = z.input<typeof workoutPlanSchema>;