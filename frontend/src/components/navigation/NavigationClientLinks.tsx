import NavLink from "@/components/navigation/NavLink";
import {Dumbbell, LayoutDashboard, Mail, UserRound, Users} from "lucide-react";

const NavigationClientLinks = () => {
    return (
        <>
            <NavLink linkText="Profil" linkUrl="/profile" Svg={UserRound}/>
            <NavLink linkText="Trenerzy" linkUrl="/coaches" Svg={Users}/>
            <NavLink linkText="Moje Treningi" linkUrl="/workouts" Svg={Dumbbell}/>
            <NavLink linkText="Wiadomości" linkUrl="/messages" Svg={Mail}/>
        </>
    )
}

export default NavigationClientLinks;