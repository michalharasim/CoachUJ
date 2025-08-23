import ProfileCard from "@/components/ProfileCard";
import {useEffect, useState} from "react";
import {type Profile} from "@/lib/types";
import axios from "axios";
import {trainerClientApi} from "@/lib/axios_instance";
import {useNavigate} from "react-router-dom";



const CoachPage = () => {
    const [allCoaches, setAllCoaches] = useState<(Profile & { userID: number, isConnected: boolean })[]>([]);
    const [yourCoaches, setYourCoaches] = useState<(Profile & { userID: number, isConnected: boolean })[]>([]);
    const navigate = useNavigate();

    const onSendInvitation = async (userID: number) => {
        try {
            await trainerClientApi.post('/invitations/', {
                inviteeID: userID
            });
            alert("Zaproszenie wysłane prawidłowo");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert("Zaproszenie zostało już wysłane");
                console.error("Failed to send invitation:", error.response?.data || error.message);
            } else {
                alert("Nieoczekiwany błąd, spróbuj ponownie");
                console.error("An unexpected error occurred:", error);
            }
        }
    }

    const onSendMessage = () => {
        navigate('/messages');
    }

    const fetchCoaches = async () => {
        try {
            const response = await trainerClientApi.get('/trainers');
            const jsonData : (Profile & { userID: number, isConnected: boolean})[] = response.data;
            const connected = jsonData.filter(coach => coach.isConnected);
            const notConnected = jsonData.filter(coach => !coach.isConnected);
            setYourCoaches(connected);
            setAllCoaches(notConnected);
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Access the server's response data
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch trainers error occurred.';

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
        fetchCoaches();
    }, []);

    return (
        <div className="w-full h-full">
            <p className="text-3xl text-center pt-5 text-shadow-primary text-shadow-md">Twoi Trenerzy</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {yourCoaches.map((userProfile) => (
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        givenName={userProfile.givenName}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone={userProfile.phone}
                        picture={`http://localhost:2137${userProfile.picture}`}
                        description={userProfile.description}
                        buttonText="Wyślij wiadomość"
                        OnClick={onSendMessage}
                    />
                ))}
            </div>
            <p className="text-3xl text-center pt-5 text-shadow-primary text-shadow-md">Poznaj naszych trenerów</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {allCoaches.map((userProfile) => (
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        givenName={userProfile.givenName}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone={userProfile.phone}
                        picture={`http://localhost:2137${userProfile.picture}`}
                        description={userProfile.description}
                        OnClick={() => onSendInvitation(userProfile.userID)}
                        buttonText="Wyślij zaproszenie do współpracy"
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachPage;