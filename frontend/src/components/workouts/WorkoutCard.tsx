import {type WorkoutPlan} from "@/lib/types";
import {getName} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AvatarFallBackImage} from "@/lib/tsx_utils";
import {Link} from "react-router-dom";

type WorkoutCardProps = {
    workout: WorkoutPlan;
    workoutBaseUrl: string;
}

const WorkoutCard = ({workoutBaseUrl, workout }: WorkoutCardProps) => {
    return (
        <Link to={`${workoutBaseUrl}/${workout.id}`}>
            <div className="bg-card rounded-lg shadow-sm shadow-primary p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2">
                <div className="flex flex-col h-full gap-2 items-center justify-between">
                    <h3 className="font-semibold text-sm lg:text-md text-center">{workout.name}</h3>
                    <div className="flex flex-row items-center gap-1">
                        <Avatar className="w-[40px] h-[40px]">
                            <AvatarImage src={workout.author.avatar}/>
                            <AvatarFallback className="bg-accent">
                                {AvatarFallBackImage()}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground text-sm">@{getName(workout.author)}</p>
                    </div>
                    <p className="text-card-foreground text-sm">
                        {new Date(workout.date).toLocaleDateString('pl-PL')}
                    </p>
                </div>
            </div>
        </Link>
    );
};


export default WorkoutCard;