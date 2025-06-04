import UserProfileForm from "@/components/forms/UserProfileForm";
import type {User} from "@/lib/types";

const user: User = {
    username: "Geniusz",
    email: "wewewe@wp.pl",
    picture: undefined,
    givenName: undefined,
    surname: undefined,
    description: undefined,
    location: undefined,
    phone: undefined,
    isCoach: true
}

const Profile = () => {
    return (
        <div className={ "flex flex-col items-center gap-4 p-8"}>
            <div className="flex flex-col gap-4 w-full lg:w-[80%]">
            <h2 className="text-xl lg:text-4xl font-bold text-center">Profil Użytkownika {user.isCoach && "(Trener)"}</h2>
            <h4 className="text-l lg:text-xl text-center">Edytuj swój profil</h4>
            <UserProfileForm currentUser={user} onSubmit={() => alert("Zapisano")} isLoading={false}/>
            </div>
        </div>
    )
}

export default Profile;