import {yourCoaches} from "@/lib/example_data";
import ProfileCard from "@/components/ProfileCard";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

const ClientsPage = () => {

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
                        picture={userProfile.picture}
                        description={userProfile.description}
                        buttonText=""
                        OnClick={null}
                        SecondButton={
                            <Button
                                variant="link"
                                className="w-full cursor-pointer "
                            >
                                <Link to={`/clients/logs/${userProfile.username}`}>
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