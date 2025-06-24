import {sampleWorkoutPlans} from "@/lib/example_data";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import {useState} from "react";
import {Button} from "@/components/ui/button";

type WorkoutPageProps = {
    coach: boolean
}

const WorkoutPage = ({coach=false} : WorkoutPageProps) => {

    const [view, setView] = useState('current'); // current or archived workouts

    // Jezeli coach to pobieram username z adresu, jeżeli nie to z tokenu id

    const filteredWorkouts = sampleWorkoutPlans.filter(workout => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [year, month, day] = workout.date.split('-').map(Number);
        const workoutDate = new Date(year, month-1, day);
        if (view === 'current') {
            return workoutDate >= today;
        } else {
            return workoutDate < today;
        }
    });

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-center gap-4 mb-8">
                <Button
                    className="cursor-pointer"
                    variant={view === 'current' ? 'default' : 'outline'}
                    onClick={() => setView('current')}
                >
                    Aktualne
                </Button>
                <Button
                    className="cursor-pointer"
                    variant={view === 'archived' ? 'default' : 'outline'}
                    onClick={() => setView('archived')}
                >
                    Archiwalne
                </Button>
            </div>
            <h1 className="text-4xl font-bold text-center mb-10 ">
                {view == "current" ? "Treningi" : "Archiwalne Treningi"}
            </h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-5 p-5">
                {filteredWorkouts.length > 0 ? (
                    filteredWorkouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} workoutBaseUrl={coach ? "/clients/logs/plan" : "/workouts"} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg">Brak treningów do wyświetlenia w tej kategorii.</p>
                )}
            </div>
        </div>
    )
}

export default WorkoutPage;