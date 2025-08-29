import { useState, useEffect } from "react";
import axios from "axios";
import { plansExercisesApi } from "@/lib/axios_instance";
import type {Exercise} from "@/lib/types";

const useFetchExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExercises = async () => {
        try {
            const response = await plansExercisesApi.get("trainer/exercises");

            const mappedExercises = response.data.map((ex) => ({
                ...ex,
                isMyExercise: ex.coachID !== null,
            }));
            setExercises(mappedExercises);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const responseData = err.response?.data;
                let errorMessage = "An unknown fetch exercises error occurred.";

                if (responseData && typeof responseData === "object" && "error" in responseData) {
                    errorMessage = responseData.error;
                }

                setError(errorMessage);
            } else {
                setError("Cannot connect to the server.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return { exercises, isLoading, error, refetch: fetchExercises };
};

export default useFetchExercises;