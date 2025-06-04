import { Dumbbell, Search, Users, CalendarCheck } from 'lucide-react';
import React from "react";

type FeatureCardProps = {
    icon: React.ElementType,
    title: string,
    description: string,
}

const FeatureCard = ({icon: Icon, title, description } : FeatureCardProps) => (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 shadow-primary">
        <Icon className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const FeaturesSection = () => {
    return (
        <section className="w-full max-w-6xl p-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Co Zyskujesz z Nami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                    icon={Search}
                    title="Łatwe Wyszukiwanie"
                    description="Szybko znajdź trenera personalnego dopasowanego do Twoich potrzeb i lokalizacji."
                />
                <FeatureCard
                    icon={Dumbbell}
                    title="Spersonalizowane Treningi"
                    description="Otrzymaj plany treningowe i wsparcie dostosowane do Twoich celów fitness."
                />
                <FeatureCard
                    icon={Users}
                    title="Zwiększ Zasięgi"
                    description="Trenerzy: Dotrzyj do szerszej grupy klientów i rozwijaj swoją markę online."
                />
                <FeatureCard
                    icon={CalendarCheck}
                    title="Elastyczny Grafik"
                    description="Zarządzaj rezerwacjami i harmonogramem w jednym miejscu, bez problemów."
                />
            </div>
        </section>
    );
};

export default FeaturesSection;