import {Power} from "lucide-react";
import {Button} from "@/components/ui/button";

const LogoutButton = () => {
    return (
        <Button variant="default" className="w-3/4 rounded-full gap-2 cursor-pointer" onClick={() => {}}>
            <Power size={18} strokeWidth={3}/>
            <span className="font-bold text-primary-foreground">Wyloguj się</span>
        </Button>
    )
}

export default LogoutButton;