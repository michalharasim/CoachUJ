import Footer from "@/components/Footer";
import SideNav from "@/components/navigation/SideNav";
import MobileNavBar from "@/components/navigation/MobileNavBar";
import {Outlet} from "react-router-dom";
import {useAuth} from "@/contexts/auth-context";

const Layout = () => {
    const {user, isLoading} = useAuth();

    if (isLoading) {
        return <div className="text-center p-6">Ładowanie...</div>;
    }

    if (!user) {
        return <div className="text-center p-6 text-red-500">Błąd: Użytkownik niezalogowany.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <SideNav role={user.role}/>
            <MobileNavBar role={user.role}/>
            <div className="w-full h-full">
                <main className="md:overflow-auto flex flex-col h-full">
                    <div className="flex-grow">
                        <Outlet />
                    </div>
                    <Footer/>
                </main>
            </div>
        </div>
    );
}

export default Layout;