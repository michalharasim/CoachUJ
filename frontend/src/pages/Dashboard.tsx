import NextWorkout from "@/components/dashboard/NextWorkout";
import {TotalWorkoutInfoCard} from "@/components/dashboard/TotalWorkoutInfo";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center w-full h-full pt-3">
            <h1 className="text-4xl font-bold pb-2">Witaj </h1>
            <div className="flex flex-wrap p-5 w-[95%] gap-5 bg-secondary rounded-2xl">
                <NextWorkout workoutTitle="Nogi XXL" coachName="Andrzej Wołyga"/>
                <TotalWorkoutInfoCard totalWorkouts={10} totalTimeInMinutes={1000} totalSets={256}/>
            </div>
        </div>
    )
}

export default Dashboard;