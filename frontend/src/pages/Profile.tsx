import UserProfileForm from "@/components/forms/UserProfileForm";
import {useState, useEffect} from "react";
import type {User} from "@/lib/types";
import {trainerClientApi} from "@/lib/axios_instance"

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await trainerClientApi.get('/users/profile');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, []); // Empty dependency array ensures this runs only once

    const updateProfile = async (userProfileData: UserProfileFormValues) => {
        try {
            const response = await trainerClientApi.patch('/users/profile/update', userProfileData);
            return response.data;
        } catch (error) {
            console.error('Failed to update user profile:', error);
        }
    };

    if (isLoading) {
        return <div className="p-4 text-center">Ładowanie danych profilu...</div>;
    }

    // Render a message if no user data is found after fetching
    if (!user) {
        return <div className="p-4 text-center text-red-500">Nie udało się załadować profilu.</div>;
    }

    return (
        <div className={ "flex flex-col items-center gap-4 p-2"}>
            <div className="flex flex-col gap-4 w-full lg:w-[80%]">
            <h2 className="text-xl lg:text-4xl font-bold text-center">Profil Użytkownika {user.isCoach && "(Trener)"}</h2>
            <h4 className="text-l lg:text-xl text-center">Edytuj swój profil</h4>
            <UserProfileForm currentUser={user} onSubmit={updateProfile} isLoading={false}/>
            </div>
        </div>
    )
}

export default Profile;