import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import {type Profile} from "@/lib/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AvatarFallBackImage} from "@/lib/tsx_utils";
import {Button} from "@/components/ui/button";
import React from "react";

type ProfileCardProps = Profile & {
    OnClick: (() => void);
    className?: string;
    buttonText: string;
    SecondButton?: React.ReactNode;
}

const ProfileCard = ({username, givenName, surname, location, phone, picture, description, OnClick, className, buttonText, SecondButton} : ProfileCardProps) => {
    return (
        <Card className={`w-full shadow-md shadow-primary gap-1 py-2 ${className || ''}`}>
            <CardTitle className="flex flex-row items-center justify-center gap-2">
                <Avatar className="w-[80px] h-[80px]">
                    <AvatarImage src={picture}/>
                    <AvatarFallback className="bg-accent">
                        {AvatarFallBackImage()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <CardDescription>@{username}</CardDescription>
                    <p className="p-0">{givenName} {surname}</p>
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
                {buttonText != "" && (
                    <Button className="w-full cursor-pointer" onClick={OnClick}>
                        {buttonText}
                    </Button>
                )}
                {SecondButton && (
                    SecondButton
                )}
            </CardFooter>
        </Card>
    )
}

export default ProfileCard;