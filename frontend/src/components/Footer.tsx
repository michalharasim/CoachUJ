import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="flex bg-secondary w-full items-center justify-center min-h-[40px]">
            <Link to="/" className="text-secondary-foreground">
                &copy; 2025 CoachUJ
            </Link>
        </footer>
    )
}

export default Footer;