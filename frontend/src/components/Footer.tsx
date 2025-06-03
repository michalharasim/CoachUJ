import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-secondary w-full p-4 text-center mt-auto">
            <Link to="/" className="text-secondary-foreground">
                &copy; 2025 CoachUJ
            </Link>
        </footer>
    )
}

export default Footer;