import {type WorkoutPlanFormInput, type WorkoutPlanFormValues, workoutPlanSchema} from "@/lib/schemas/WorkoutPlanSchema";
import {useFieldArray, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Loader2, MinusCircle} from "lucide-react";
import useFetchExercises from "@/custom_hooks/fetch_exercises";
import {useEffect, useState} from "react";
import {plansExercisesApi} from "@/lib/axios_instance";

type WorkoutPlanFormProps = {
    currentPlanId?: number;
    onSubmit: (workoutPlanData: WorkoutPlanFormValues) => void;
};

const transformBackendDataToForm = (backendData: any) => {
    const exercisesCount = backendData.exercises.length;
    const orderedArray = new Array(exercisesCount).fill(null);

    for (const ex of backendData.exercises) {
        orderedArray[ex.order] = {
            breakTime: ex.breakTime,
            exercise: {
                id: ex.exerciseID,
                name: ex.name,
            },
            reps: ex.repCount || "",
            weight: ex.weight || "",
        }
    }
    return {
        name: backendData.name,
        note: backendData.note || "",
        exercises: orderedArray,
    };
};

const WorkoutPlanForm = ({currentPlanId, onSubmit}: WorkoutPlanFormProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<WorkoutPlanFormInput, any, WorkoutPlanFormValues>({
        resolver: zodResolver(workoutPlanSchema),
        defaultValues: {
                name: "",
                note: "",
                exercises: [],
            },
        mode: "onBlur"
    });

    const { exercises } = useFetchExercises();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "exercises",
    });

    useEffect(() => {
        if (currentPlanId) {
            const fetchPlan = async () => {
                setIsLoading(true);
                try {
                    const response = await plansExercisesApi.get(`/trainer/plan/${currentPlanId}`);
                    const transformedData = transformBackendDataToForm(response.data);
                    form.reset(transformedData); // Użycie `reset` do wypełnienia formularza
                } catch (error) {
                    console.error("Failed to fetch workout plan:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPlan();
        }
    }, [currentPlanId, form]);

    const handleAddExercise = (exerciseId: string) => {
        const selectedExercise = exercises.find(ex => ex.id === Number(exerciseId));
        if (selectedExercise) {
            append({
                exercise: selectedExercise,
                reps: "0",
                weight: "0",
                breakTime: 0,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 border p-4 rounded-md">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nazwa Planu</FormLabel>
                            <FormControl>
                                <Input placeholder="Mój plan..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Opis (opcjonalnie)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Szczegółowy opis planu treningowego"
                                        {...field}
                                        className="w-full h-[200px] resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-4 border p-4 rounded-md">
                    <h3 className="text-lg font-semibold text-center p-0 m-0">Ćwiczenia</h3>
                    <p className="text-sm font-semibold text-center p-0 m-0">Wpisuj powtórzenia i ciężar dla serii po spacji</p>
                    <p className="text-sm font-semibold text-center p-0 mb-2">Możesz wpisać zakres powtórzeń przez "od-do".</p>
                    <Select
                        onValueChange={handleAddExercise}
                        value=""
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz ćwiczenie do dodania" />
                        </SelectTrigger>
                        <SelectContent>
                            {exercises
                                .filter(ex  => !fields.some(selected => selected.exercise.id === ex.id))
                                .map((exercise) => (
                                    <SelectItem key={exercise.id} value={String(exercise.id)}>
                                        {exercise.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <div className="space-y-4 mt-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="border p-3 rounded-md flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-primary">{field.exercise.name}</h4>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        className="shrink-0" // Zapobiega rozciąganiu przycisku
                                    >
                                        <MinusCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`exercises.${index}.reps`}
                                        render={({ field: exerciseRepsField }) => (
                                            <FormItem>
                                                <FormLabel>Powtórzenia</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="np. 8-12, do upadku"
                                                        {...exerciseRepsField}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`exercises.${index}.weight`}
                                        render={({ field: exerciseWeightField }) => (
                                            <FormItem>
                                                <FormLabel>Ciężar (kg)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="np. 50"
                                                        {...exerciseWeightField}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`exercises.${index}.breakTime`}
                                        render={({ field: exerciseBreakTimeField }) => (
                                            <FormItem>
                                                <FormLabel>Przerwa (sek.)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="np. 60"
                                                        {...exerciseBreakTimeField}
                                                        onChange={(e) => exerciseBreakTimeField.onChange(parseFloat(e.target.value) || 0)}
                                                        value={exerciseBreakTimeField.value || 0}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="submit" className="cursor-pointer">
                        {currentPlanId ? "Zapisz Zmiany" : "Dodaj Plan Treningowy"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default WorkoutPlanForm;