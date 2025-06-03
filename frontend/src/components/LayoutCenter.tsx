import React from "react";
import Footer from "@/components/Footer";

type Props = {
    children: React.ReactNode;
}


const LayoutCenter = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-grow justify-center items-center">
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default LayoutCenter;