import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Dumbbell, Clock, Repeat2 } from 'lucide-react';
import {type JSX} from "react";

type InfoProps = {
    icon: JSX.Element;
    label: string;
    value: string,
}

const Info = ({icon: Icon, label, value} : InfoProps) => {
    return (
        <div className="flex items-center justify-between p-2 bg-secondary border rounded-lg">
            <div className="flex items-center gap-3">
                {Icon}
                <span className="text-md font-semibold text-secondary-foreground">{label}</span>
            </div>
            <span className="text-lg font-bold text-secondary-foreground ">{value}</span>
        </div>
    );
}

type TotalWorkoutInfoCardProps = {
    totalWorkouts: number; //
    totalTimeInMinutes: number;
    totalSets: number;
};

export const TotalWorkoutInfoCard = ({totalWorkouts, totalTimeInMinutes, totalSets }: TotalWorkoutInfoCardProps) => {

    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours > 0) {
            return `${hours} godz. ${remainingMinutes} min.`;
        }
        return `${remainingMinutes} min.`;
    };

    return (
        <Card className="w-full max-w-md shadow-primary shadow-sm hover:shadow-md transition-shadow duration-300 border-2 bg-primary">
            <CardHeader className="text-center pb-4 text-primary-foreground">
                <CardTitle className="text-3xl font-bold ">Twoje Postępy Treningowe</CardTitle>
                <CardDescription className="text-primary-foreground font-semibold">Podsumowanie Twoich dotychczasowych osiągnięć!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <Info icon={<Dumbbell className="w-8 h-8 text-secondary-foreground "/>} label="Ukończone treningi:" value={totalWorkouts.toString()}/>
                <Info icon={<Clock className="w-8 h-8 text-secondary-foreground"/>} label="Poświęcony czas:" value={formatTime(totalTimeInMinutes)}/>
                <Info icon={<Repeat2 className="w-8 h-8 text-secondary-foreground" />} label="Wykonane serie:" value={totalSets.toString()}/>
            </CardContent>
        </Card>
    );
};