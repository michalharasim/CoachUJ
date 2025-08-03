import {Power} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/auth-context";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <Button variant="default" className="w-3/4 rounded-full gap-2 cursor-pointer" onClick={onLogout}>
            <Power size={18} strokeWidth={3}/>
            <span className="font-bold text-primary-foreground">Wyloguj się</span>
        </Button>
    )
}

export default LogoutButton;