import HeroSection from '@/components/mainPage/HeroSection';
import FeaturesSection from '@/components/mainPage/FeaturesSection';
import HowItWorksSection from '@/components/mainPage/HowItWorksSection';
import TestimonialsSection from '@/components/mainPage/TestImonialsSection';
import { Separator } from '@/components/ui/separator';

const MainPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <HeroSection />
            <Separator className="my-12" />

            <FeaturesSection />
            <Separator className="my-12" />

            <HowItWorksSection />
            <Separator className="my-12" />

            <TestimonialsSection />
        </div>
    );
};

export default MainPage;