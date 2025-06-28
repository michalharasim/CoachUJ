import {Card, CardContent, CardTitle} from "@/components/ui/card";

type NextWorkoutProps = {
    workoutTitle: string;
    coachName: string;
}

const NextWorkout = ({workoutTitle, coachName} : NextWorkoutProps) => {
    return (

        <Card className="bg-primary shadow-primary shadow-sm hover:shadow-md text-primary-foreground max-w-[200px] max-h-[150px]">
            <CardTitle className="flex flex-col items-center gap-2">
                    <h1 className="text-xl">Następny trening</h1>
            </CardTitle>
            <CardContent>
                <h1 className="text-xl font-bold">{workoutTitle}</h1>
                <p className="text-sm">Trener: {coachName}</p>
            </CardContent>
        </Card>

    )
}

export default NextWorkout;