import ProfileCard from "@/components/ProfileCard";
import {yourCoaches} from "@/lib/example_data";
import {useEffect, useState} from "react";
import {type Profile} from "@/lib/types";
import axios from "axios";
import {trainerClientApi} from "@/lib/axios_instance";



const CoachPage = () => {
    const [allCoaches, setAllCoaches] = useState<Profile[]>([]);

    const onSendInvitation = (username: string) => {
        alert(`Zaproszenie do współpracy dla ${username} zostało wysłane!`);
    }

    const onSendMessage = (username: string) => {
        alert(`Wiadomość dla ${username} zostało wysłane!`);
    }

    const fetchCoaches = async () => {
        try {
            const response = await trainerClientApi.get('/trainers');
            const jsonData : Profile[] = response.data;
            console.log(jsonData);
            setAllCoaches(jsonData);
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
        <div className="w-full h-full mb-5">
            <p className="text-3xl text-center pt-5 text-shadow-primary text-shadow-md">Twoi Trenerzy</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {yourCoaches.map((userProfile) => (
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        name={userProfile.name}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone={userProfile.phone}
                        avatar={userProfile.avatar}
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
                        name={userProfile.name}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone={userProfile.phone}
                        avatar={userProfile.avatar}
                        description={userProfile.description}
                        OnClick={onSendInvitation}
                        buttonText="Wyślij zaproszenie do współpracy"
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachPage;