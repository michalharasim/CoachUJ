import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Shadcn/ui Avatar

type TestimonialCardProps = {
    quote: string,
    author: string,
    avatarSrc: string,
}

const TestimonialCard = ({ quote, author, avatarSrc } : TestimonialCardProps) => (
    <div className="bg-card p-6 rounded-lg shadow-md text-center flex flex-col items-center">
        <Avatar className="h-16 w-16 mb-4">
            <AvatarImage src={avatarSrc} alt={author} />
            <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <p className="text-lg italic text-card-foreground mb-4">"{quote}"</p>
        <p className="font-semibold text-primary">- {author}</p>
    </div>
);

const TestimonialsSection = () => {
    return (
        <section className="w-full max-w-6xl p-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Co Mówią Nasi Użytkownicy?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard
                    quote="Dzięki tej platformie znalazłam idealnego trenera, który pomógł mi osiągnąć moje cele!"
                    author="Anna Kowalska"
                    avatarSrc="https://avatar.iran.liara.run/public/girl"
                />
                <TestimonialCard
                    quote="Moja baza klientów znacznie wzrosła. Łatwo zarządzam rezerwacjami i komunikacją."
                    author="Paweł Nowak (Trener)"
                    avatarSrc="https://github.com/shadcn.png"
                />
                <TestimonialCard
                    quote="Intuicyjny interfejs i szeroki wybór trenerów. Polecam każdemu, kto szuka wsparcia."
                    author="Zofia Wiśniewska"
                    avatarSrc="https://avatar.iran.liara.run/public/86"
                />
            </div>
        </section>
    );
};

export default TestimonialsSection;