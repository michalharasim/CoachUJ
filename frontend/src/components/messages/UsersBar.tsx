import {getName} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {Profile} from "@/lib/types";
import {trainerClientApi} from "@/lib/axios_instance";
import axios from "axios";
import {useEffect, useState} from "react";

type UsersBarProps = {
    setSelectedUser: (user: Profile & { userID: number} | null) => void;
}

const UsersBar = ({setSelectedUser} : UsersBarProps)  => {
    const [users, setUsers] = useState<(Profile & { userID: number})[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const response = await trainerClientApi.get('/connections');

            setUsers(response.data);
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Access the server's response data
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch users error occurred.';

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
        fetchUsers().then(() => setIsLoading(false));
    }, []);

    if(isLoading){
        return <div>Ładowanie...</div>
    }

    return (
        <div className="p-1 w-[100px] md:w-[200px] h-full bg-primary overflow-auto">
            {users.map((userProfile) => (
                <div
                    key={userProfile.username}
                    onClick={() => setSelectedUser(userProfile)}
                    className="flex gap-0 flex-col items-center justify-center text-xs md:text-sm w-full bg-secondary border-1 border-secondary-foreground cursor-pointer hover:bg-primary-foreground min-h-[100px]">
                    <span className="text-center">{getName(userProfile)}</span>
                    <Avatar className="w-[60px] h-[60px]">
                        <AvatarImage src={userProfile.picture}/>
                        <AvatarFallback className="bg-background">
                            {userProfile.givenName && userProfile.surname
                                ? userProfile.givenName.charAt(0) + userProfile.surname.charAt(0)
                                : userProfile.username}
                        </AvatarFallback>
                    </Avatar>
                </div>
            ))}
        </div>
    )
}

export default UsersBar;