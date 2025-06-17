import { z } from 'zod';

const exerciseCategorySchema = z.object({
    id: z.string(),
    name: z.string(),
});

const exerciseFileSchema = z
    .union([
        z.instanceof(File)
            .refine((file) => file.size < 10 * 1024 * 1024, `Maksymalny rozmiar pliku to 10MB.`)
            .refine((file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), "Obsługiwane formaty to JPG, PNG, WEBP, GIF."),
        z.undefined(),
        z.null()
    ]);

export const exerciseSchema = z.object({
    name: z.string()
        .min(2, "Nazwa ćwiczenia musi mieć co najmniej 2 znaki.")
        .max(100, "Nazwa ćwiczenia może mieć maksymalnie 100 znaków."),

    description: z.string()
        .max(1000, "Opis może mieć maksymalnie 1000 znaków.")
        .optional(),

    categories: z.array(exerciseCategorySchema)
        .min(1, "Wybierz co najmniej jedną kategorię dla ćwiczenia."),

    picture: exerciseFileSchema,
});

export type ExerciseFormValues = z.infer<typeof exerciseSchema>;