import {type Profile} from "@/lib/types";
import ProfileCard from "@/components/ProfileCard";

const allCoaches : Profile[] = [
    {
        username: "fitnesstomasz",
        name: "Tomasz",
        surname: "Wojciechowski",
        location: "Warszawa, Polska",
        phone: "+48 601 234 567",
        avatar: "https://github.com/shadcn.png",
        description: "Certyfikowany trener personalny z ponad 10-letnim doświadczeniem w kształtowaniu sylwetki i poprawie kondycji. Specjalizuję się w treningu siłowym i funkcjonalnym. Pomagam osiągać cele zarówno początkującym, jak i zaawansowanym."
    }, {
        username: "powerania",
        name: "Anna",
        surname: "Kowalczyk",
        location: "Gdańsk, Polska",
        phone: "+48 720 987 654",
        avatar: "https://github.com/vercel.png",
        description: "Trenerka fitness i dietetyk, pasjonatka zdrowego stylu życia. Pomagam w budowaniu zdrowych nawyków, redukcji wagi i zwiększaniu energii. Moje podejście opiera się na równowadze między treningiem a odpowiednim odżywianiem."
    },{
        username: "strongmichał",
        name: "Michał",
        surname: "Nowak",
        location: "Kraków, Polska",
        phone: "+48 512 345 789",
        avatar: "https://github.com/octocat.png",
        description: "Trener przygotowania motorycznego i CrossFitu. Skupiam się na zwiększaniu siły, wytrzymałości i mobilności. Prowadzę zajęcia grupowe i indywidualne, pomagając sportowcom i entuzjastom poprawiać swoje wyniki."
    }
]

const yourCoaches : Profile[] = [
    {
        username: "fitnesstomasz",
        name: "Tomasz",
        surname: "Wojciechowski",
        location: "Warszawa, Polska",
        phone: "+48 601 234 567",
        avatar: "https://github.com/shadcn.png",
        description: "Certyfikowany trener personalny z ponad 10-letnim doświadczeniem w kształtowaniu sylwetki i poprawie kondycji. Specjalizuję się w treningu siłowym i funkcjonalnym. Pomagam osiągać cele zarówno początkującym, jak i zaawansowanym."
    }
]

const CoachPage = () => {

    const onSendInvitation = (username: string) => {
        alert(`Zaproszenie do współpracy dla ${username} zostało wysłane!`);
    }

    const onSendMessage = (username: string) => {
        alert(`Wiadomość dla ${username} zostało wysłane!`);
    }

    return (
        <div className="w-full h-full">
            <p className="text-3xl text-center pt-10 text-shadow-primary text-shadow-md">Twoi Trenerzy</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,2fr))] gap-5 p-10">
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
            <p className="text-3xl text-center pt-10 text-shadow-primary text-shadow-md">Poznaj naszych trenerów</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,2fr))] gap-5 p-10">
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