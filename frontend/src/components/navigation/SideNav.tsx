import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ThemeToggler from "@/components/ThemeToggler";
import NavigationClientLinks from "@/components/navigation/NavigationClientLinks";
import LogoutButton from "@/components/LogoutButton";
import {AvatarFallBackImage} from "@/lib/tsx_utils";

const SideNav = () => {


    return (
        <div className="min-w-[200px] bg-secondary justify-between hidden md:flex md:flex-col">
            <div>
                <div className="my-4 flex flex-row items-center justify-center flex-1 gap-2">
                    <Avatar>
                        <AvatarFallback className="bg-accent">{AvatarFallBackImage(45)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-l">Nazwa Użytkownika</span>
                </div>
                <Separator className="my-5"/>
                <nav className="flex flex-col items-start ps-5 gap-5">
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