import ProfileCard from "@/components/ProfileCard";
import {allCoaches, yourCoaches} from "@/lib/example_data";



const CoachPage = () => {

    const onSendInvitation = (username: string) => {
        alert(`Zaproszenie do współpracy dla ${username} zostało wysłane!`);
    }

    const onSendMessage = (username: string) => {
        alert(`Wiadomość dla ${username} zostało wysłane!`);
    }

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
                        onSendInvitation={onSendMessage}
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
                        onSendInvitation={onSendInvitation}
                        buttonText="Wyślij zaproszenie do współpracy"
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachPage;