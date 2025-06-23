import {type WorkoutPlan} from "@/lib/types";

type PlanCardProps = {
    workout: WorkoutPlan;
    onClick: (x: any) => void;
}

const PlanCard = ({ workout, onClick }: PlanCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-card rounded-lg shadow-sm shadow-primary p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2"
        >
            <div className="flex flex-col h-full gap-2 items-center justify-between">
                <h3 className="font-semibold text-sm lg:text-md text-center">{workout.name}</h3>
                <p className="text-card-foreground text-sm">
                    {new Date(workout.date).toLocaleDateString('pl-PL')}
                </p>
            </div>
        </div>
    );
};


export default PlanCard;