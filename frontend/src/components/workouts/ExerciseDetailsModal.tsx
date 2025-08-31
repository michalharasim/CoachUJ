import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React from "react";
import type {Exercise} from "@/lib/types";
import {Tag} from "lucide-react";

interface ExerciseDetailsModalProps {
    exercise: Exercise;
    children: React.ReactNode;
}

const ExerciseDetailsModal: React.FC<ExerciseDetailsModalProps> = ({ exercise, children }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{exercise?.name}</DialogTitle>
                    <DialogDescription>
                        Szczegóły dotyczące ćwiczenia
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py">
                    <div className="flex flex-row gap-2">
                        <Tag/>
                        {exercise.Categories.map((category, index) => (
                            <span className="text-sm font-semibold" key={category.name + "_" + index}>
                                {category.name}
                                {index < exercise.Categories.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-center mb-4">
                        <img
                            src={exercise?.picture ? exercise.picture : "https://placehold.co/400x300"}
                            alt={exercise?.name}
                            className="max-w-full h-auto rounded-md"
                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                        />
                    </div>
                    <p className="text-sm">
                        <span className="font-semibold">{exercise?.description || "Brak opisu."} </span>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExerciseDetailsModal;