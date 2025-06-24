import {Button} from "@/components/ui/button";
import MyWorkoutPlanModal from "@/components/MyWorkoutPlanModal";
import {useState} from "react";
import type {WorkoutPlan} from "@/lib/types";
import {type WorkoutPlanFormValues} from "@/lib/schemas/WorkoutPlanSchema";
import {allCoaches, sampleWorkoutPlans} from "@/lib/example_data";
import PlanCard from "@/components/workouts/PlanCard";
import SelectUserModal from "@/components/SelectUserModal";

const PlansPage = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedWorkoutPlanToEdit, setSelectedWorkoutPlanToEdit] = useState<WorkoutPlan | undefined>(undefined);

    const handleSaveWorkoutPlan = (data: WorkoutPlanFormValues) => {
        console.log(data);
    }

    const handleOpenCreateModal = () => {
        setSelectedWorkoutPlanToEdit(undefined);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (plan: WorkoutPlan) => {
        setSelectedWorkoutPlanToEdit(plan);
        setIsFormModalOpen(true);
    };

    const handleOpenUserModal = () => {
        setIsUserModalOpen(true);
    }

    return(
        <div className="w-full h-full">
            <div className="flex flex-row w-full justify-center items-center gap-5 mt-5">
                <p className="text-3xl text-center font-semibold">Twoje Plany</p>
                <Button className="cursor-pointer" onClick={handleOpenCreateModal}>
                    Stwórz Plan
                </Button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-5 p-5">
                {sampleWorkoutPlans.map((workout) => (
                        <PlanCard
                            key={workout.id}
                            workout={workout}
                            onClick={() => handleOpenEditModal(workout)}
                            onButtonClick={handleOpenUserModal}
                        />
                    ))
                }
            </div>
            <MyWorkoutPlanModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                workoutPlan={selectedWorkoutPlanToEdit}
                onSave={handleSaveWorkoutPlan}
            />
            <SelectUserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onSave={(username) => {
                    alert("Wysłano plan do " + username);
                }}
                users={allCoaches}
            />
        </div>
    )
}

export default PlansPage;