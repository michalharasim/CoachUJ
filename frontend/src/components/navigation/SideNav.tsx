import {CircleUserRound} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ThemeToggler from "@/components/ThemeToggler";
import NavigationClientLinks from "@/components/navigation/NavigationClientLinks";
import LogoutButton from "@/components/LogoutButton";

const AvatarFallBackImage = () => {
    return <CircleUserRound size={45} />;
}

const SideNav = () => {


    return (
        <div className="w-[250px] bg-secondary justify-between hidden md:flex md:flex-col">
            <div>
                <div className="my-4 flex flex-row items-center justify-center flex-1 gap-2">
                    <Avatar>
                        <AvatarFallback className="bg-accent">{AvatarFallBackImage()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-xl">Nazwa Użytkownika</span>
                </div>
                <Separator className="my-5"/>
                <nav className="grid grid-cols-1 gap-5">
                    <NavigationClientLinks/>
                </nav>
            </div>
            <div className="flex flex-col items-center mb-4 gap-4">
                <ThemeToggler/>
                <LogoutButton/>
            </div>
        </div>
    )
}

export default SideNav;