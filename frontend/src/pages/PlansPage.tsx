import {Button} from "@/components/ui/button";
import MyWorkoutPlanModal from "@/components/MyWorkoutPlanModal";
import {useEffect, useState} from "react";
import type {WorkoutPlan} from "@/lib/types";
import {type WorkoutPlanFormValues} from "@/lib/schemas/WorkoutPlanSchema";
import PlanCard from "@/components/workouts/PlanCard";
import SelectUserModal from "@/components/SelectUserModal";
import {plansExercisesApi, trainerClientApi} from "@/lib/axios_instance";
import axios from "axios";
import useFetchClients from "@/custom_hooks/fetch_clients";

const PlansPage = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedWorkoutPlanToEdit, setSelectedWorkoutPlanToEdit] = useState<WorkoutPlan | undefined>(undefined);
    const [plans, setPlans] = useState<WorkoutPlan[]>([]);
    const { clients } = useFetchClients();

    const handleSaveWorkoutPlan = (data: WorkoutPlanFormValues) => {
        try {
            plansExercisesApi.post("trainer/plan", data);
            console.log(data)
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
            const response = await trainerClientApi.get('/trainer/plans');
            console.log(response.data);
            setPlans(response.data);
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

    const handleOpenEditModal = (plan: WorkoutPlan) => {
        setSelectedWorkoutPlanToEdit(plan);
        setIsFormModalOpen(true);
    };

    const handleOpenUserModal = () => {
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
                {plans.map((workout) => (
                        <PlanCard
                            key={workout.id}
                            workout={workout}
                            onClick={() => handleOpenEditModal(workout)}
                            onButtonClick={handleOpenUserModal}
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
                    console.log(`Sending Plan: ${selectedWorkoutPlanToEdit.id} to User ${userID}`);
                    if (selectedWorkoutPlanToEdit.id) {
                        sendPlan(userID, selectedWorkoutPlanToEdit.id);
                    }
                }}
                users={clients}
            />
        </div>
    )
}

export default PlansPage;