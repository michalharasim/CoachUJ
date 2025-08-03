import Footer from "@/components/Footer";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "@/contexts/auth-context";
import {useEffect} from "react";

type LayoutCenterProps = {
    preventLoggedPaths: string[];
}

const LayoutCenter = ({ preventLoggedPaths = [] }: LayoutCenterProps) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Logika przekierowania powinna działać tylko, gdy dane użytkownika są już załadowane
        if (!isLoading) {
            const shouldRedirect = user && preventLoggedPaths.includes(location.pathname);

            if (shouldRedirect) {
                navigate('/profile', { replace: true });
            }
        }
    }, [user, isLoading, location.pathname, navigate, preventLoggedPaths]);

    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-grow justify-center items-center">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default LayoutCenter;