import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

const LayoutCenter = () => {
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