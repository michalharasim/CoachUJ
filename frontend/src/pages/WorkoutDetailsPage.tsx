import {useParams, Link} from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {getName} from "@/lib/utils";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {workoutLogFormSchema, type WorkoutLogFormValues} from "@/lib/schemas/LoggingSchemas";
import {FormControl, FormField, Form, FormItem, FormMessage, FormLabel} from '@/components/ui/form';
import {Textarea} from "@/components/ui/textarea";
import {useAuth} from "@/contexts/auth-context";
import {useEffect, useState} from "react";
import {plansExercisesApi, trainerClientApi} from "@/lib/axios_instance";
import {type Profile} from "@/lib/types";
import ExerciseTableRow from "@/components/workouts/ExerciseTableRow";


const WorkoutDetailsPage = () => {
    const { workoutId, clientID } = useParams();
    const [trainingPlan, setTrainingPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { userData, isLoading: isLoadingUser } = useAuth();
    const [author, setAuthor] = useState<Profile>( {username: ""} as Profile);


    // Inicjalizujemy formularz z pustymi wartościami.
    // Zostanie on zaktualizowany danymi z API w useEffect.
    const form = useForm<WorkoutLogFormValues>({
        resolver: zodResolver(workoutLogFormSchema),
        defaultValues: {
            log_note: "",
            log_exercises: [],
        },
        mode: "onBlur"
    });

    useEffect(() => {
        const fetchPlanData = async () => {
            // Sprawdzamy tylko workoutId, ponieważ ID użytkownika jest w tokenie
            if (!workoutId) return;
            setIsLoading(true);
            try {
                if (!userData) {
                    return;
                }
                let response;
                if (userData.isCoach && clientID) {
                    response = await plansExercisesApi.get(`/plan/client/logs/${clientID}/${workoutId}`);
                }else {
                    response = await plansExercisesApi.get(`/plan/${workoutId}`);
                }
                // Przetwarzamy dane z backendu (np. stringi "10 8 6" na tablice)
                const transformedPlan = {
                    ...response.data,
                    exercises: response.data.exercises.map(ex => ({
                        ...ex,
                        name: ex.exercise.name,
                        reps: ex.repCount.split(' '),
                        weight: ex.weight.split(' ').map(Number),
                    }))
                };
                setTrainingPlan(transformedPlan);
                if (response.data.coachID) {
                    const coachResponse = await trainerClientApi.get(`/users/profile/${response.data.coachID}`);
                    setAuthor(coachResponse.data);
                }
            } catch (error) {
                console.error("Failed to fetch workout plan:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlanData();
    }, [workoutId, userData, clientID]);

    useEffect(() => {
        if (trainingPlan && trainingPlan.exercises) {
            const latestLog = trainingPlan.logs && trainingPlan.logs.length > 0 ? trainingPlan.logs[0] : null;

            const defaultFormValues = {
                // Jeśli jest log, użyj jego notatki, w przeciwnym razie pusty string
                log_note: latestLog ? latestLog.notes : "",
                log_exercises: trainingPlan.exercises.map((planExercise, index) => {
                    // Znajdź odpowiedni log ćwiczenia w najnowszym logu sesji
                    const loggedExercise = latestLog
                        ? latestLog.loggedExercises.find(le => le.planExerciseID === planExercise.id)
                        : null;

                    return {
                        actualReps: loggedExercise ? loggedExercise.actualReps.split(' ') : Array(planExercise.reps.length).fill(''),
                        actualWeight: loggedExercise ? loggedExercise.actualWeight.split(' ') : Array(planExercise.reps.length).fill(''),
                        actualBreakTime: loggedExercise ? (loggedExercise.breakTime || "").split(' ') : Array(planExercise.reps.length).fill(''),
                    };
                }),
            };

            // Zresetuj formularz z poprawnymi danymi (z logów lub pustymi)
            form.reset(defaultFormValues);
        }
    }, [trainingPlan, form.reset]);

    if (isLoading || isLoadingUser) {
        return <div className="text-center p-6">Ładowanie...</div>;
    }

    if (!userData) {
        return <div className="text-center p-6 text-red-500">Błąd: Użytkownik niezalogowany.</div>;
    }

    if (!trainingPlan) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Nie znaleziono treningu!</h1>
                <p className="text-lg text-gray-600 mb-6">Sprawdź, czy masz przypisany ten plan.</p>
                <Link to="/workouts">
                    <Button className="cursor-pointer">Wróć do treningów</Button>
                </Link>
            </div>
        );
    }

    const { handleSubmit, control} = form;

    const onLogSubmit = async (data: WorkoutLogFormValues) => {
        setIsSubmitting(true);
        try {
            const newLogPayload = {
                trainingPlanID: parseInt(workoutId, 10),
                notes: data.log_note,
                logID: trainingPlan.logs[0].id,
                // Dołącz wykonane ćwiczenia, transformując tablice na stringi
                exercises: data.log_exercises.map((logExercise, index) => {
                    const planExercise = trainingPlan.exercises[index];
                    return {
                        id: trainingPlan.logs[0].loggedExercises[index].id,
                        planExerciseID: planExercise.id,
                        actualReps: logExercise.actualReps.join(' ').trim(),
                        actualWeight: logExercise.actualWeight.join(' ').trim(),
                        actualBreakTime: logExercise.actualBreakTime.join(' ').trim(),
                    };
                })
            };
            await plansExercisesApi.post(`/plan/${trainingPlan.logs[0].id}`, newLogPayload);
            alert("Dziennik treningu został zapisany!");
        } catch (error) {
            console.error("Błąd podczas zapisywania dziennika:", error);
            alert("Wystąpił błąd. Spróbuj ponownie.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-xl md:text-4xl font-bold  md:mb-4">{trainingPlan.name}</h1>
            <p className="text-md md:text-lg mb-1">Trener: {getName(author)}</p>
            <span className="flex flex-col text-md md:text-lg mb-1">Notatka Trenera: <span>{trainingPlan.note}</span></span>
            <Form {...form}>
                <form onSubmit={handleSubmit(onLogSubmit)}>
            {!userData.isCoach ? (
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

            ) : (
                <span className="flex flex-col text-primary text-md md:text-lg mb-1">Notatka Ćwiczącego: <span>{trainingPlan.note}</span></span>
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
                    {trainingPlan.exercises.map((workoutExercise, index ) => (
                        <ExerciseTableRow
                            key={workoutExercise.exercise.name + workoutExercise.reps + workoutExercise.weight + workoutExercise.exercise.id + workoutExercise.breakTime}
                            exercise={workoutExercise.exercise}
                            reps={workoutExercise.reps}
                            weight={workoutExercise.weight}
                            breakTime={workoutExercise.breakTime}
                            actualBreakTime={trainingPlan.logs[0].loggedExercises[index].breakTime.split(" ")}
                            actualReps={trainingPlan.logs[0].loggedExercises[index].actualReps.split(" ")}
                            actualWeight={trainingPlan.logs[0].loggedExercises[index].actualWeight.split(" ")}
                            control={control}
                            exerciseIndex={index}
                            isCoach={userData.isCoach}
                        />
                    ))}

                </TableBody>
                    </Table>
                    {!userData.isCoach && (
                        <div className="text-center">
                            <Button
                                type="submit"
                                className="mt-6 cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Zapisywanie..." : "Zapisz Dziennik Treningu"}
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
}

export default WorkoutDetailsPage;