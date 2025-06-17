import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import {type Profile} from "@/lib/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AvatarFallBackImage} from "@/lib/tsx_utils";
import {Button} from "@/components/ui/button";

type ProfileCardProps = Profile & {
    OnClick?: (username: string) => void;
    className?: string;
    buttonText: string;
    OnSecondOptionClick?: (username: string) => void;
}

const ProfileCard = ({username, name, surname, location, phone, avatar, description, OnClick, className, buttonText, OnSecondOptionClick} : ProfileCardProps) => {

    const handleSendInvitation = () => {
        if (OnClick) {
            OnClick(username);
        } else {

        }
    };

    return (
        <Card className={`w-full shadow-md shadow-primary gap-1 py-2 ${className || ''}`}>
            <CardTitle className="flex flex-row items-center justify-center gap-2">
                <Avatar className="w-[80px] h-[80px]">
                    <AvatarImage src={avatar}/>
                    <AvatarFallback className="bg-accent">
                        {AvatarFallBackImage()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <CardDescription>@{username}</CardDescription>
                    <p className="p-0">{name} {surname}</p>
                    <p className="p-0">{location}</p>
                </div>
            </CardTitle>
            <CardContent className="w-full text-justify p-4 py-0">
                <span className="text-sm">
                    {description}
                </span>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-2">
                <CardDescription className="text-center w-full">
                    {phone ? `Telefon: ${phone}` : ''}
                </CardDescription>
                <Button className="w-full cursor-pointer" onClick={handleSendInvitation}>
                    {buttonText}
                </Button>
                {OnSecondOptionClick && (
                    <Button variant="destructive" className="w-full cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/50" onClick={() => OnSecondOptionClick(username)}>Anuluj</Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default ProfileCard;