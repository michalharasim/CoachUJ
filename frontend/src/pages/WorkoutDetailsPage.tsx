import {useParams, Link} from 'react-router-dom';
import {sampleWorkoutLogs, sampleWorkoutPlans} from "@/lib/example_data";
import { Button } from "@/components/ui/button";
import {getName} from "@/lib/utils";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import ExerciseTableRow from "@/components/workouts/ExerciseTableRow";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {workoutLogFormSchema, type WorkoutLogFormValues} from "@/lib/schemas/LoggingSchemas";
import {FormControl, FormField, Form, FormItem, FormMessage, FormLabel} from '@/components/ui/form';
import {Textarea} from "@/components/ui/textarea";
import {useAuth} from "@/contexts/auth-context";


const WorkoutDetailsPage = () => {
    const { workoutId } = useParams();
    const {user, isLoading} = useAuth();
    const workout = sampleWorkoutPlans.find(plan => plan.id === workoutId);
    if (!workout) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Nie znaleziono treningu!</h1>
                <p className="text-lg text-gray-600 mb-6">Wróć do listy treningów.</p>
                <Link to="/workouts">
                    <Button className="cursor-pointer">Wróć do treningów</Button>
                </Link>
            </div>
        );
    }

    const existingLogs = sampleWorkoutLogs.find(log => log.plan == workout);

    const form = useForm<WorkoutLogFormValues>({
        resolver: zodResolver(workoutLogFormSchema),
        defaultValues: {
            log_note: existingLogs?.log_note || "",
            log_exercises: workout.exercises.map((exercise, index) => ({
                actualReps: existingLogs?.log_exercises[index]?.actualReps || Array(exercise.reps.length).fill(''),
                actualWeight: existingLogs?.log_exercises[index]?.actualWeight || Array(exercise.reps.length).fill(0),
                actualBreakTime: existingLogs?.log_exercises[index]?.actualBreakTime || Array(exercise.reps.length).fill(0),
            })),
        },
        mode: "onBlur"
    });

    const { handleSubmit, control } = form;

    const onLogSubmit = (data: WorkoutLogFormValues) => {
        console.log("Logged workout data:", data);
        alert("Dane treningu zapisane w konsoli!");
    };

    if (isLoading) {
        return <div className="text-center p-6">Ładowanie...</div>;
    }

    if (!user) {
        return <div className="text-center p-6 text-red-500">Błąd: Użytkownik niezalogowany.</div>;
    }

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-xl md:text-4xl font-bold  md:mb-4">{workout.name}</h1>
            <p className="text-md md:text-lg mb-1">Trener: {getName(workout.author)}</p>
            <span className="flex flex-col text-md md:text-lg mb-1">Notatka Trenera: <span>{workout.note}</span></span>
            <p className="text-md md:text-lg mb-1 md:mb-3">{workout.date}</p>
            {!existingLogs && user.role == "klient" ? (
                <Form {...form}>
                    <form onSubmit={handleSubmit(onLogSubmit)}>
                        <FormField
                            control={control}
                            name="log_note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md md:text-lg mb-1">Twoja notatka z treningu (opcjonalnie)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Jak przebiegł trening? Twoje uwagi..."
                                            {...field}
                                            className="w-full h-[100px] resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            ) : (
                <span className="flex flex-col text-primary text-md md:text-lg mb-1">Notatka Ćwiczącego: <span>{existingLogs?.log_note}</span></span>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Nazwa Ćwiczenia</TableHead>
                        <TableHead className="hidden md:table-cell text-left">Serie</TableHead>
                        <TableHead className="text-left flex items-center">Czas Przerwy &nbsp; <span className="hidden md:block">(s)</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workout.exercises.map((workoutExercise, index ) => (
                        <ExerciseTableRow
                            key={workoutExercise.exercise.name + workoutExercise.reps + workoutExercise.weight + workoutExercise.exercise.id + workoutExercise.breakTime}
                            exercise={workoutExercise.exercise}
                            reps={workoutExercise.reps}
                            weight={workoutExercise.weight}
                            breakTime={workoutExercise.breakTime}
                            actualBreakTime={existingLogs ? existingLogs.log_exercises[index].actualBreakTime : []}
                            actualReps={existingLogs ? existingLogs.log_exercises[index].actualReps : []}
                            actualWeight={existingLogs ? existingLogs.log_exercises[index].actualWeight : []}
                            control={control}
                            exerciseIndex={index}
                        />
                    ))}

                </TableBody>
            </Table>
            {!existingLogs && (
                <Button
                    type="submit"
                    className="mt-6 cursor-pointer"
                    onClick={handleSubmit(onLogSubmit)}
                >
                    Zapisz Dziennik Treningu
                </Button>
            )}
        </div>
    );
}

export default WorkoutDetailsPage;