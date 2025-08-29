import { useState, useEffect } from "react";
import axios from "axios";
import { trainerClientApi } from "@/lib/axios_instance";
import type {Profile} from "@/lib/types";

const useFetchClients = () => {
    const [clients, setClients] = useState<(Profile & { userID: number})[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async () => {
        try {
            const response = await trainerClientApi.get('/connections');
            setClients(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const responseData = err.response?.data;
                const errorMessage = responseData && typeof responseData === 'object' && 'error' in responseData
                    ? responseData.error
                    : 'Wystąpił nieznany błąd podczas pobierania klientów.';
                setError(errorMessage);
            } else {
                setError("Nie można połączyć się z serwerem.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return { clients, isLoading, error, refetch: fetchClients};
};

export default useFetchClients;