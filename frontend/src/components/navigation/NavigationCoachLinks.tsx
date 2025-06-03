import NavLink from "@/components/navigation/NavLink";
import {Dumbbell, LayoutDashboard, Mail, Mailbox, UserRound, Users} from "lucide-react";

const NavigationCoachLinks = () => {
    return (
        <>
            <NavLink linkText="Panel" linkUrl="/dashboard" Svg={LayoutDashboard}/>
            <NavLink linkText="Profil" linkUrl="/profile" Svg={UserRound}/>
            <NavLink linkText="Podopieczni" linkUrl="/profile" Svg={Users}/>
            <NavLink linkText="Moje Plany" linkUrl="/profile" Svg={Dumbbell}/>
            <NavLink linkText="Wiadomości" linkUrl="/profile" Svg={Mail}/>
            <NavLink linkText="Zaproszenia" linkUrl="/profile" Svg={Mailbox}/>
        </>
    )
}

export default NavigationCoachLinks;