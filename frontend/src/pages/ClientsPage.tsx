import ProfileCard from "@/components/ProfileCard";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {trainerClientApi} from "@/lib/axios_instance";
import axios from "axios";
import {useEffect, useState} from "react";
import {type Profile} from "@/lib/types";

const ClientsPage = () => {
    const [clients, setClients] = useState<(Profile & { userID: number})[]>([]);

    const deleteConnection = async (id: number) => {
        try {
            trainerClientApi.delete(`/connections/${id}`);

            fetchClients()
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Access the server's response data
                const responseData = error.response?.data;
                let errorMessage = 'An unknown error occurred deleting the connection. Please try again later.';

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


    const fetchClients = async () => {
        try {
            const response = await trainerClientApi.get('/connections/clients');

            setClients(response.data);
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Access the server's response data
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch clients error occurred.';

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
        fetchClients();
    }, []);

    return (
        <div className="w-full h-full mb-5">
            <p className="text-3xl text-center pt-5 font-semibold">Twoi Podopieczni</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {clients.map((userProfile) => (
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        name={userProfile.name}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone={userProfile.phone}
                        picture={userProfile.picture}
                        description={userProfile.description}
                        buttonText="Usuń klienta"
                        OnClick={() => {deleteConnection(userProfile.userID)}}
                        SecondButton={
                            <Button
                                variant="link"
                                className="w-full cursor-pointer "
                            >
                                <Link to={`/clients/logs/${userProfile.username}`}>
                                    Sprawdź historię treningów
                                </Link>
                            </Button>
                        }
                    />
                ))}
            </div>
        </div>
    )
}


export default ClientsPage;