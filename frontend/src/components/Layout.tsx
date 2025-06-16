import Footer from "@/components/Footer";
import SideNav from "@/components/navigation/SideNav";
import MobileNavBar from "@/components/navigation/MobileNavBar";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <SideNav/>
            <MobileNavBar/>
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