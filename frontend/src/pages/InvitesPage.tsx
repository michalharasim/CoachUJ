import {yourCoaches} from "@/lib/example_data";
import ProfileCard from "@/components/ProfileCard";
import {Button} from "@/components/ui/button";

const InvitesPage = () => {

    const onAccept = (username: string) => {
        alert(`Zaproszenie od ${username} zostało zaakceptowane!`);
    }

    const onDecline = (username: string) => {
        alert(`Zaproszenie od ${username} zostało anulowane!`);
    }

    return (
        <div className="w-full h-full">
            <p className="text-3xl text-center pt-5 font-semibold">Zaproszenia do współpracy</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,2fr))] gap-5 p-5">
                {yourCoaches.map((userProfile) => (
                    <ProfileCard
                        key={userProfile.username}
                        username={userProfile.username}
                        name={userProfile.name}
                        surname={userProfile.surname}
                        location={userProfile.location}
                        phone=""
                        avatar={userProfile.avatar}
                        description={userProfile.description}
                        buttonText="Zaakceptuj"
                        OnClick={onAccept}
                        SecondButton={
                        <Button
                            variant="destructive"
                            className="w-full cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/50" onClick={() => onDecline(userProfile.username)}>
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