import ProfileCard from "@/components/ProfileCard";
import {Button} from "@/components/ui/button";
import {trainerClientApi} from "@/lib/axios_instance";
import type {Profile} from "@/lib/types";
import axios from "axios";
import {useEffect, useState} from "react";

const InvitesPage = () => {
    const [clients, setClients] = useState<(Profile & { userID: number, id: number})[]>([]);

    const handleInvitation = async (id: number, action: 'accept' | 'reject') => {
        try {
            await trainerClientApi.post(`/invitations/${id}/respond`, {
                action: action
            });
            fetchInvitations()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = 'An unknown error occurred handling the invitation.';

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


    const onAccept = (invitationID: number) => {
        handleInvitation(invitationID, 'accept')
    }

    const onDecline = (invitationID: number) => {
        handleInvitation(invitationID, 'reject')
    }

    const fetchInvitations = async () => {
        try {
            const response = await trainerClientApi.get('/invitations');

            setClients(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch invitations error occurred.';

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
        fetchInvitations();
    }, []);

    return (
        <div className="w-full h-full">
            <p className="text-3xl text-center pt-5 font-semibold">Zaproszenia do współpracy</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {clients.map((userProfile) => (
                    // userProfile.id -> invitationID; userProfileUserID -> userID
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        givenName={userProfile.givenName}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone={userProfile.phone}
                        picture={userProfile.picture}
                        description={userProfile.description}
                        buttonText="Zaakceptuj"
                        OnClick={() => onAccept(userProfile.id)}
                        SecondButton={
                        <Button
                            variant="destructive"
                            className="w-full cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/50" onClick={() => onDecline(userProfile.id)}>
                            Anuluj
                        </Button>
                    }
                    />
                ))}
            </div>
        </div>
    )
}

export default InvitesPage;