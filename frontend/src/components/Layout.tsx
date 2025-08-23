import Footer from "@/components/Footer";
import SideNav from "@/components/navigation/SideNav";
import MobileNavBar from "@/components/navigation/MobileNavBar";
import {Outlet} from "react-router-dom";
import {useAuth} from "@/contexts/auth-context";

const Layout = () => {
    const { userData, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-center p-6">Ładowanie...</div>;
    }

    if (!userData) {
        return <div className="text-center p-6 text-red-500">Błąd: Użytkownik niezalogowany.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <SideNav isCoach={userData.isCoach} username={userData.username} picture_url={userData.picture}/>
            <MobileNavBar isCoach={userData.isCoach} username={userData.username} picture_url={userData.picture}/>
            <main className="flex flex-col h-full w-full">
                <div className="h-full overflow-y-auto">
                    <Outlet />
                </div>
                <Footer/>
            </main>
        </div>
    );
}

export default Layout;