import {Button} from "@/components/ui/button";
import MyWorkoutPlanModal from "@/components/MyWorkoutPlanModal";
import {useEffect, useState} from "react";
import {type WorkoutPlanFormValues} from "@/lib/schemas/WorkoutPlanSchema";
import PlanCard from "@/components/workouts/PlanCard";
import SelectUserModal from "@/components/SelectUserModal";
import {plansExercisesApi} from "@/lib/axios_instance";
import axios from "axios";
import useFetchClients from "@/custom_hooks/fetch_clients";

export type fetchedWorkoutPlanInfo = {
    id: number,
    name: string,
    date: Date,
}

const PlansPage = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedWorkoutPlanToEdit, setSelectedWorkoutPlanToEdit] = useState<fetchedWorkoutPlanInfo | undefined>(undefined);
    const [plans, setPlans] = useState<fetchedWorkoutPlanInfo[]>([]);
    const { clients } = useFetchClients();

    const transformWorkoutPlanDataInPlace = (data: WorkoutPlanFormValues) => {
        data.exercises.forEach((exerciseData, idx) => {
            (exerciseData as any).setCount = exerciseData.reps.length;
            (exerciseData as any).repCount = exerciseData.reps.join(" ");
            (exerciseData as any).weight = exerciseData.weight.join(" ");
            (exerciseData as any).order = idx;
        });

        return data;
    };

    const handleSaveWorkoutPlan = (data: WorkoutPlanFormValues) => {
        try {
            // Prepare data to for backend format
            data = transformWorkoutPlanDataInPlace(data)
            if (selectedWorkoutPlanToEdit && selectedWorkoutPlanToEdit.id) {
                plansExercisesApi.put(`trainer/plan/${selectedWorkoutPlanToEdit.id.toString()}`, data);
                alert("Pomyślnie zapisano plan treningowy.")
            } else {
                plansExercisesApi.post("trainer/plan", data)
                alert("Pomyślnie utworzono plan treningowy.")
            }
            setIsFormModalOpen(false);
            setSelectedWorkoutPlanToEdit(undefined);
            fetchPlans()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = "An unknown create/update workout plan error occurred.";

                if (responseData && typeof responseData === "object" && "error" in responseData) {
                    errorMessage = responseData.error;
                }

                alert(errorMessage);
            } else {
                console.error("Network error:", error);
                alert("Cannot connect to the server.");
            }
        }
    }

    const fetchPlans = async () => {
        try {
            const response = await plansExercisesApi.get('/trainer/plans');
            setPlans(response.data.plans);
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Access the server's response data
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch plans error occurred.';

                // Check if the response data is an object with an 'error' property
                if (responseData && typeof responseData === 'object' && 'error' in responseData) {
                    errorMessage = responseData.error;
                }

                alert(errorMessage);
            } else {
                console.error('Network error:', error);
                alert("Cannot connect to the server.");
            }
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const sendPlan = (userID: number, planID: number) => {
        try {
            plansExercisesApi.post(`trainer/plan/${planID}/${userID}`);
            alert("Pomyślnie wysłano plan do klienta.")
            setIsUserModalOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = "An unknown send plan to client error occurred.";

                if (responseData && typeof responseData === "object" && "error" in responseData) {
                    errorMessage = responseData.error;
                }

                alert(errorMessage);
            } else {
                console.error("Network error:", error);
                alert("Cannot connect to the server.");
            }
        }
    }


    const handleOpenCreateModal = () => {
        setSelectedWorkoutPlanToEdit(undefined);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (plan: fetchedWorkoutPlanInfo) => {
        setSelectedWorkoutPlanToEdit(plan);
        setIsFormModalOpen(true);
    };

    const handleOpenUserModal = (plan: fetchedWorkoutPlanInfo) => {
        setSelectedWorkoutPlanToEdit(plan);
        setIsUserModalOpen(true);
    }

    return(
        <div className="w-full h-full">
            <div className="flex flex-row w-full justify-center items-center gap-5 mt-5">
                <p className="text-3xl text-center font-semibold">Twoje Plany</p>
                <Button className="cursor-pointer" onClick={handleOpenCreateModal}>
                    Stwórz Plan
                </Button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-5 p-5">
                {plans && plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            onClick={() => handleOpenEditModal(plan)}
                            onButtonClick={() => handleOpenUserModal(plan)}
                        />
                    ))
                }
            </div>
            <MyWorkoutPlanModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                workoutPlan={selectedWorkoutPlanToEdit}
                onSave={handleSaveWorkoutPlan}
            />
            <SelectUserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onSave={(userID) => {
                    if (selectedWorkoutPlanToEdit && selectedWorkoutPlanToEdit.id) {
                        sendPlan(userID, selectedWorkoutPlanToEdit.id);
                    }
                }}
                users={clients}
            />
        </div>
    )
}

export default PlansPage;