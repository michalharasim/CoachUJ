import React from "react";
import Footer from "@/components/Footer";
import SideNav from "@/components/navigation/SideNav";
import MobileNavBar from "@/components/navigation/MobileNavBar";

type Props = {
    children: React.ReactNode;
}


const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <SideNav/>
            <MobileNavBar/>
            <div className="flex flex-col flex-grow">
                <main className="flex-grow">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    );
}

export default Layout;