import {type Profile} from "@/lib/types";
import {getName} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AvatarFallBackImage} from "@/lib/tsx_utils";
import {Link} from "react-router-dom";
import {trainerClientApi} from "@/lib/axios_instance";
import {useEffect, useState} from "react";

type WorkoutCardProps = {
    workoutID: number;
    workoutName: string;
    workoutDate: Date;
    workoutAuthorId: number;
    workoutUrl: string;
}

const WorkoutCard = ({workoutUrl, workoutID, workoutAuthorId, workoutName, workoutDate }: WorkoutCardProps) => {
    const [user, setUser] = useState<Profile>();

    const fetchCoachProfileData = async () => {
        try {
            const response = await trainerClientApi.get(`/users/profile/${workoutAuthorId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch trainer data:', error);
        }
    };

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchCoachProfileData();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <Link to={workoutUrl}>
            <div className="bg-card rounded-lg shadow-sm shadow-primary p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2">
                <div className="flex flex-col h-full gap-2 items-center justify-between">
                    <h3 className="font-semibold text-sm lg:text-md text-center">{workoutName}</h3>
                    <div className="flex flex-row items-center gap-1">
                        <Avatar className="w-[40px] h-[40px]">
                            <AvatarImage src={user ? user.picture : ""}/>
                            <AvatarFallback className="bg-accent">
                                {AvatarFallBackImage()}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground text-sm">@{user ? getName(user) : "Trener"}</p>
                    </div>
                    <p className="text-card-foreground text-sm">
                        {workoutDate ? new Date(workoutDate).toLocaleDateString('pl-PL') : "Brak daty"}
                    </p>
                </div>
            </div>
        </Link>
    );
};


export default WorkoutCard;