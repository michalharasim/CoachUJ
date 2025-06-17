import NavLink from "@/components/navigation/NavLink";
import {Dumbbell, LayoutDashboard, Mail, Mailbox, Notebook, UserRound, Users} from "lucide-react";

const NavigationCoachLinks = () => {
    return (
        <>
            <NavLink linkText="Panel" linkUrl="/dashboard" Svg={LayoutDashboard}/>
            <NavLink linkText="Profil" linkUrl="/profile" Svg={UserRound}/>
            <NavLink linkText="Podopieczni" linkUrl="/clients" Svg={Users}/>
            <NavLink linkText="Ćwiczenia" linkUrl="/exercises" Svg={Dumbbell}/>
            <NavLink linkText="Moje Plany" linkUrl="/plans" Svg={Notebook}/>
            <NavLink linkText="Wiadomości" linkUrl="/messages" Svg={Mail}/>
            <NavLink linkText="Zaproszenia" linkUrl="/invites" Svg={Mailbox}/>
        </>
    )
}

export default NavigationCoachLinks;