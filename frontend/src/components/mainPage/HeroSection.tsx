import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="w-full rounded-2xl min-h-[30vh] bg-gradient-to-r from-primary to-accent flex items-center justify-center text-center text-secondary-foreground p-4">
            <div className="space-y-6">
                <h1 className="text-xl md:text-5xl font-extrabold leading-tight">
                    Znajdź Swojego Idealnego Trenera Personalnego
                    <br /> lub Rozwiń Swój Biznes
                </h1>
                <p className="text-xl md:text-l opacity-90">
                    Platforma, która łączy pasjonatów zdrowego stylu życia z najlepszymi specjalistami.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link to="/login">
                        <Button size="lg" className="cursor-pointer">
                            Zaloguj Sie
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="lg" variant="default" className="shadow-lg cursor-pointer">
                            Zarejestruj Się
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;