import WorkoutCard from "@/components/workouts/WorkoutCard";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/auth-context";
import {plansExercisesApi} from "@/lib/axios_instance";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";

export type fetchedWorkoutPlanInfoClient = {
    id: number,
    name: string,
    date: Date,
    coachID: number,
}

const WorkoutPage = () => {
    const [view, setView] = useState('current');
    const [plans, setPlans] = useState<fetchedWorkoutPlanInfoClient[]>([]);
    const { userData, isLoading } = useAuth();

    const { clientID } = useParams();

    const fetchPlans = async () => {
        try {
            if (!userData) {
                return;
            }
            let response;
            if (userData.isCoach && clientID) {
                response = await plansExercisesApi.get(`/plan/client/${clientID}/plans`);
            } else if (!userData.isCoach) {
                response = await plansExercisesApi.get('/plan/all');
            } else {
                return;
            }
            const parsedPlans = response.data.plans.map((plan: any) => ({
                ...plan,
                date: new Date(plan.date),
            }));
            setPlans(parsedPlans);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch client plans error occurred.';

                if (responseData && typeof responseData === 'object' && 'error' in responseData) {
                    errorMessage = responseData.error;
                }
                alert(errorMessage);
            } else {
                console.error('Network error:', error);
                alert("Cannot connect to the server.");
            }
        }
    }

    useEffect(() => {
        fetchPlans();
    }, [userData, location.pathname, clientID]);


    const filteredWorkouts = plans.filter(workout => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (view === 'current') {
            return workout.date >= today;
        } else {
            return workout.date < today;
        }
    });

    if (isLoading) {
        return <div className="text-center p-6">Ładowanie...</div>;
    }

    if (!userData) {
        return <div className="text-center p-6 text-red-500">Błąd: Użytkownik niezalogowany.</div>;
    }

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
                        <WorkoutCard
                            key={workout.id}
                            workoutID={workout.id}
                            workoutDate={workout.date}
                            workoutAuthorId={workout.coachID}
                            workoutName={workout.name}
                            workoutUrl={userData.isCoach ? `/clients/logs/plan/${workout.id}/${clientID}` : `/workouts/${workout.id}`
                        } />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg">Brak treningów do wyświetlenia w tej kategorii.</p>
                )}
            </div>
        </div>
    )
}

export default WorkoutPage;