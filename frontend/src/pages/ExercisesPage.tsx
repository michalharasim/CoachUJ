import ExerciseDetailsModal from "@/components/workouts/ExerciseDetailsModal";
import {Tag} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import type {Exercise} from "@/lib/types";
import MyExerciseModal from "@/components/MyExerciseModal"
import {plansExercisesApi} from "@/lib/axios_instance";
import axios from "axios";
import useFetchExercises from "@/custom_hooks/fetch_exercises";

const ExercisesPage = () => {

    const { exercises, refetch: refetch_exercises } = useFetchExercises();
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [selectedExerciseToEdit, setSelectedExerciseToEdit] = useState<Exercise | undefined>(undefined);

    const handleOpenCreateModal = () => {
        setSelectedExerciseToEdit(undefined);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (exercise: Exercise) => {
        setSelectedExerciseToEdit(exercise);
        setIsFormModalOpen(true);
    };


    const handleSaveExercise = async (data: FormData) => {
        try {
            if(selectedExerciseToEdit){  // update
                data.append('id', selectedExerciseToEdit.id.toString());
                await plansExercisesApi.put("trainer/exercise", data);
            }else { // create
                await plansExercisesApi.post("trainer/exercise", data);
            }
            setIsFormModalOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = "An unknown create/update exercise error occurred.";

                if (responseData && typeof responseData === "object" && "error" in responseData) {
                    errorMessage = responseData.error;
                }

                alert(errorMessage);
            } else {
                console.error("Network error:", error);
                alert("Cannot connect to the server.");
            }
        }
        refetch_exercises();
    }

    // filtrowanie
    const myExercises = exercises.filter(exercise => exercise.isMyExercise !== null);   // prywatne
    const publicExercises = exercises.filter(exercise => exercise.isMyExercise === null);

    return (
        <div className="w-full h-full">
            <div className="flex flex-row w-full justify-center items-center gap-5 mt-5">
                <p className="text-3xl text-center font-semibold">Twoje Ćwiczenia</p>
                <Button className="cursor-pointer" onClick={handleOpenCreateModal}>
                    Stwórz Ćwiczenie
                </Button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {myExercises.map((exercise) => (
                    <div
                        className="flex flex-col items-center justify-center p-3 bg-secondary rounded-2xl cursor-pointer"
                        onClick={() => handleOpenEditModal(exercise)}
                        key={exercise.name}
                    >
                        <span className="semibold text-center">{exercise.name}</span>
                        <span className="text-center flex flex-row gap-2">
                            <Tag />
                            {exercise.categories && exercise.categories.map((category, index) => (
                                <span className="text-sm font-semibold" key={exercise.name + category.name + index.toString()}>
                                    {category.name}
                                    {index < exercise.categories.length - 1 && ", "}
                                </span>
                            ))}
                        </span>
                    </div>
                ))}
            </div>
            <p className="text-3xl text-center pt-5 font-semibold">Ogólnodostępne Ćwiczenia</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {publicExercises.map((exercise) => (
                    <ExerciseDetailsModal exercise={exercise} key={exercise.name}>
                        <div className="flex flex-col items-center justify-center p-3 bg-secondary rounded-2xl cursor-pointer">
                            <span className="semibold text-center">{exercise.name}</span>

                            <span className="text-center flex flex-row gap-2">
                                <Tag />
                                {exercise.categories.map((category, index) => (
                                    <span className="text-sm font-semibold" key={exercise.name + category.name + index.toString()}>
                                        {category.name}
                                        {index < exercise.categories.length - 1 && ", "}
                                    </span>
                                ))}
                            </span>
                        </div>
                    </ExerciseDetailsModal>
                ))}

            </div>
            <MyExerciseModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                exercise={selectedExerciseToEdit}
                onSave={handleSaveExercise}
            />
        </div>
    )
}

export default ExercisesPage;