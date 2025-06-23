import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import React from "react";
import {type WorkoutPlan} from "@/lib/types";
import {type WorkoutPlanFormValues} from "@/lib/schemas/WorkoutPlanSchema";
import WorkoutPlanForm from "@/components/forms/WorkoutPlanForm";

type WorkoutPlanFormModalProps = {
    isOpen: boolean;
    workoutPlan?: WorkoutPlan;
    onClose: () => void;
    onSave: (data: WorkoutPlanFormValues) => void;
};

const MyWorkoutPlanModal: React.FC<WorkoutPlanFormModalProps> = ({ isOpen, onClose, workoutPlan, onSave }) => {
    const isEditing = !!workoutPlan;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-screen sm:max-w-2xl md:max-w-[80%] xl:max-w-[70%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edytuj plan" : "Stwórz nowy plan"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Zaktualizuj dane planu treningowego." : "Wypełnij pola, aby dodać nowy plan treningowy."}
                    </DialogDescription>
                </DialogHeader>
                <WorkoutPlanForm currentPlan={workoutPlan} onSubmit={onSave} />
            </DialogContent>
        </Dialog>
    );
};

export default MyWorkoutPlanModal;