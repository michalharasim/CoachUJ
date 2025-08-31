import { z } from 'zod';

const fileSchema = z
    .union([
        z.instanceof(File)
            .refine((file) => file.size < 5 * 1024 * 1024, `Maksymalny rozmiar zdjęcia to 5MB.`)
            .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), "Obsługiwane formaty to JPG, PNG, WEBP."),
        z.undefined(),
        z.null()
    ])

export const userProfileSchema = z.object({
    email: z.string(),
    username: z.string(),

    givenName: z.string()
        .min(2, "Imię musi mieć co najmniej 2 znaki.")
        .max(50, "Imię może mieć maksymalnie 50 znaków.")
        .or(z.literal(''))
        .optional(),

    surname: z.string()
        .min(2, "Nazwisko musi mieć co najmniej 2 znaki.")
        .max(50, "Nazwisko może mieć maksymalnie 50 znaków.")
        .or(z.literal(''))
        .optional(),

    phone: z.string()
        .regex(/^\+?\d{9,15}$/, "Nieprawidłowy format numeru telefonu.")
        .or(z.literal(''))
        .optional(),

    description: z.string()
        .max(1000, "Opis może mieć maksymalnie 1000 znaków.")
        .optional(),

    location: z.string()
        .max(100, "Adres może mieć maksymalnie 100 znaków.")
        .optional(),

    profilePicture: fileSchema,
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;