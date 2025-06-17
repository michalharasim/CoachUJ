import {yourCoaches} from "@/lib/example_data";
import ProfileCard from "@/components/ProfileCard";

const ClientsPage = () => {

    const onSendMessage = (username: string) => {
        alert(`Wiadomość dla ${username} zostało wysłane!`);
    }

    return (
        <div className="w-full h-full mb-5">
            <p className="text-3xl text-center pt-5 font-semibold">Twoi Podopieczni</p>
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
        </div>
    )
}


export default ClientsPage;