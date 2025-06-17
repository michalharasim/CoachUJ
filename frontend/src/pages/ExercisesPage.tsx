import {sampleExercises} from "@/lib/example_data";
import ExerciseDetailsModal from "@/components/workouts/ExerciseDetailsModal";
import {Tag} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import type {Exercise} from "@/lib/types";
import MyExerciseModal from "@/components/MyExerciseModal";
import type {ExerciseFormValues} from "@/lib/validation/ExerciseSchema";

const ExercisesPage = () => {

    const myExercises = sampleExercises.filter(exercise => exercise.isMyExercise);
    const publicExercises = sampleExercises.filter(exercise => !exercise.isMyExercise);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [selectedExerciseToEdit, setSelectedExerciseToEdit] = useState<Exercise | undefined>(undefined);

    const handleOpenCreateModal = () => {
        setSelectedExerciseToEdit(undefined); // Upewnij się, że nie ma danych do edycji
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (exercise: Exercise) => {
        setSelectedExerciseToEdit(exercise);
        setIsFormModalOpen(true);
    };

    const handleSaveExercise = (data: ExerciseFormValues) => {
        console.log(data);
    }

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
                            {exercise.categories.map((category, index) => (
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