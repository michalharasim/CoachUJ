import { useParams, Link } from 'react-router-dom';
import { sampleWorkoutPlans } from "@/lib/example_data";
import { Button } from "@/components/ui/button";
import {getName} from "@/lib/utils";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import ExerciseTableRow from "@/components/workouts/ExerciseTableRow";
const WorkoutDetailsPage = () => {
    const { workoutId } = useParams();
    const workout = sampleWorkoutPlans.find(plan => plan.id === workoutId);
    if (!workout) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Nie znaleziono treningu!</h1>
                <p className="text-lg text-gray-600 mb-6">Wróć do listy treningów.</p>
                <Link to="/workouts">
                    <Button className="cursor-pointer">Wróć do treningów</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-xl md:text-4xl font-bold  md:mb-4">{workout.name}</h1>
            <p className="text-md md:text-lg mb-1 md:mb-6">Trener: {getName(workout.author)}</p>
            <p className="text-md md:text-lg mb-1 md:mb-6">Data: {workout.date}</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Nazwa Ćwiczenia</TableHead>
                        <TableHead className="hidden md:table-cell text-left">Opis</TableHead>
                        <TableHead className="hidden md:table-cell text-left">Serie</TableHead>
                        <TableHead className="text-left flex">Czas Przerwy &nbsp; <span className="hidden md:block">(s)</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workout.exercises.map(workoutExercise => (
                        <ExerciseTableRow
                            key={workoutExercise.exercise.name + workoutExercise.sets + workoutExercise.reps + workoutExercise.weight + workoutExercise.exercise.id + workoutExercise.breakTime}
                            exerciseName={workoutExercise.exercise.name}
                            exerciseID={workoutExercise.exercise.id}
                            sets={workoutExercise.sets}
                            reps={workoutExercise.reps}
                            weight={workoutExercise.weight}
                            notes={workoutExercise.notes}
                            breakTime={workoutExercise.breakTime}
                            actualBreakTime={100}
                            actualReps={[10, 12, 14]}
                            actualWeight={[50, 100, 20]}
                            actualSets={5}
                        />
                    ))}

                </TableBody>
            </Table>
        </div>
    );
}

export default WorkoutDetailsPage;