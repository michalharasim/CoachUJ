import { z } from 'zod';

export const logExerciseSchema = z.object({
    actualReps: z.array(z.string().min(1, "Wymagane powtórzenia")),
    actualWeight: z.array(z.number().min(0, "Ciężar >= 0")),
    actualBreakTime: z.array(z.number().min(0, "Przerwa >= 0")),
});

export const workoutLogFormSchema = z.object({
    log_note: z.string().optional(),
    log_exercises: z.array(logExerciseSchema),
});

export type WorkoutLogFormValues = z.infer<typeof workoutLogFormSchema>;