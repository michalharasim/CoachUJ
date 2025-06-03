import NavLink from "@/components/navigation/NavLink";
import {Dumbbell, LayoutDashboard, Mail, UserRound, Users} from "lucide-react";

const NavigationClientLinks = () => {
    return (
        <>
            <NavLink linkText="Panel" linkUrl="/dashboard" Svg={LayoutDashboard}/>
            <NavLink linkText="Profil" linkUrl="/profile" Svg={UserRound}/>
            <NavLink linkText="Trenerzy" linkUrl="/profile" Svg={Users}/>
            <NavLink linkText="Moje Treningi" linkUrl="/profile" Svg={Dumbbell}/>
            <NavLink linkText="Wiadomości" linkUrl="/profile" Svg={Mail}/>
        </>
    )
}

export default NavigationClientLinks;