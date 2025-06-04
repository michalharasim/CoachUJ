import Footer from "@/components/Footer";
import SideNav from "@/components/navigation/SideNav";
import MobileNavBar from "@/components/navigation/MobileNavBar";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <SideNav/>
            <MobileNavBar/>
            <div className="flex flex-col flex-grow">
                <main className="flex-grow overflow-auto">
                    <Outlet />
                </main>
                <Footer/>
            </div>
        </div>
    );
}

export default Layout;