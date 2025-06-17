import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type {Exercise} from "@/lib/types";
import type {ExerciseFormValues} from "@/lib/validation/ExerciseSchema";
import ExerciseForm from "@/components/forms/ExerciseForm";
import React from "react";

type ExerciseFormModalProps = {
    isOpen: boolean;
    exercise?: Exercise;
    onClose: () => void;
    onSave: (data: ExerciseFormValues) => void;
};

const MyExerciseModal: React.FC<ExerciseFormModalProps> = ({ isOpen, onClose, exercise, onSave }) => {
    const isEditing = !!exercise;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] max-h-screen md:max-w-xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edytuj Ćwiczenie" : "Dodaj Nowe Ćwiczenie"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Zaktualizuj dane ćwiczenia." : "Wypełnij pola, aby dodać nowe ćwiczenie."}
                    </DialogDescription>
                </DialogHeader>
                <ExerciseForm exercise={exercise} onSubmit={onSave} />
            </DialogContent>
        </Dialog>
    );
};

export default MyExerciseModal;