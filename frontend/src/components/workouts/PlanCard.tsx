import {type fetchedWorkoutPlanInfo}  from "@/pages/PlansPage";
import {Button} from "@/components/ui/button";

type PlanCardProps = {
    plan: fetchedWorkoutPlanInfo;
    onClick: (x: any) => void;
    onButtonClick: () => void;
}

const PlanCard = ({ plan, onClick, onButtonClick}: PlanCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-card rounded-lg shadow-sm shadow-primary p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2"
        >
            <div className="flex flex-col h-full gap-2 items-center justify-between">
                <h3 className="font-semibold text-sm lg:text-md text-center">{plan.name}</h3>
                <p className="text-card-foreground text-sm">
                    {new Date(plan.date).toLocaleDateString('pl-PL')}
                </p>
                <Button className="cursor-pointer w-full" onClick={(e) => {
                    e.stopPropagation();
                    onButtonClick();
                }}>
                    Wyślij Plan
                </Button>
            </div>
        </div>
    );
};


export default PlanCard;