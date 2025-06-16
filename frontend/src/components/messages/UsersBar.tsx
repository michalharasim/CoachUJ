import {yourCoaches} from "@/lib/example_data";
import {getName} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {Profile} from "@/lib/types";

type UsersBarProps = {
    setSelectedUser: (user: Profile) => void;
}

const UsersBar = ({setSelectedUser} : UsersBarProps)  => {
    return (
        <div className="p-1 w-[100px] md:w-[200px] h-full bg-primary overflow-auto">
            {yourCoaches.map((userProfile) => (
                <div
                    key={userProfile.username}
                    onClick={() => setSelectedUser(userProfile)}
                    className="flex gap-0 flex-col items-center justify-center text-xs md:text-sm w-full bg-secondary border-1 border-secondary-foreground cursor-pointer hover:bg-primary-foreground min-h-[100px]">
                    <span className="text-center">{getName(userProfile)}</span>
                    <Avatar className="w-[60px] h-[60px]">
                        <AvatarImage src={userProfile.avatar}/>
                        <AvatarFallback className="bg-accent">
                            {userProfile.name.charAt(0) + userProfile.surname.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            ))}
        </div>
    )
}

export default UsersBar;