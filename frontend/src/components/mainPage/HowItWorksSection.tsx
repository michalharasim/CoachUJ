type StepCardProps = {
    number: string,
    title: string,
    description: string,
}

const StepCard = ({ number, title, description } : StepCardProps) => (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
        <div className="text-4xl font-bold text-primary mb-4">{number}</div>
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const HowItWorksSection = () => {
    return (
        <section className="w-full max-w-6xl p-8 bg-muted py-16 rounded-lg">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Jak To Działa?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StepCard
                    number="1"
                    title="Zarejestruj się"
                    description="Stwórz darmowe konto jako klient lub trener."
                />
                <StepCard
                    number="2"
                    title="Znajdź/Stwórz Profil"
                    description="Klienci szukają, trenerzy budują atrakcyjny profil."
                />
                <StepCard
                    number="3"
                    title="Rozpocznij Trening"
                    description="Połącz się i zacznij swoją drogę do lepszej formy!"
                />
            </div>
        </section>
    );
};

export default HowItWorksSection;