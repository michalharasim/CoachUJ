import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {SquareMenu} from "lucide-react";
import NavigationClientLinks from "@/components/navigation/NavigationClientLinks";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ThemeToggler from "@/components/ThemeToggler";
import LogoutButton from "@/components/LogoutButton";
import {AvatarFallBackImage} from "@/lib/tsx_utils";
import NavigationCoachLinks from "@/components/navigation/NavigationCoachLinks";

type MobileNavBarProps = {
    isCoach: boolean,
    username: string,
    picture_url: string,
}

const MobileNavBar = ({ isCoach, username, picture_url }: MobileNavBarProps) => {

    return (
        <div className="md:hidden flex flex-row bg-sidebar justify-between items-center p-1">
            <Link to="/" className="text-2xl tracking-wider ms-5">CoachUJ</Link>
            <Sheet>
                <SheetTrigger className="cursor-pointer"><SquareMenu className="text-secondary-foreground" strokeWidth={2.0} size={45}/></SheetTrigger>
                <SheetContent className="w-full sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle className="flex flex-row items-center justify-center gap-5">
                            <Avatar>
                                <AvatarImage src={picture_url}  alt="Your profile info" />
                                <AvatarFallback className="bg-accent">{AvatarFallBackImage(45)}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-xl">{username}</span>
                        </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-3 pt-3 font-semibold text-xl items-center">
                        {isCoach  ? <NavigationCoachLinks/> : <NavigationClientLinks/>}
                    </nav>
                    <SheetFooter className="flex flex-col justify-center items-center gap-5">
                        <ThemeToggler/>
                        <LogoutButton/>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}


export default MobileNavBar;