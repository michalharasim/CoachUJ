import ProfileCard from "@/components/ProfileCard";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {trainerClientApi} from "@/lib/axios_instance";
import axios from "axios";
import useFetchClients from "@/custom_hooks/fetch_clients";

const ClientsPage = () => {
    const { clients, refetch } = useFetchClients();

    const deleteConnection = async (id: number) => {
        try {
            trainerClientApi.delete(`/connections/${id}`);
            refetch()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = 'An unknown error occurred deleting the connection. Please try again later.';

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

    return (
        <div className="w-full h-full mb-5">
            <p className="text-3xl text-center pt-5 font-semibold">Twoi Podopieczni</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {clients.map((userProfile) => (
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        givenName={userProfile.givenName}
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
                                <Link to={`/clients/logs/${userProfile.userID}`}>
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