import { Button } from "@/components/ui/button.tsx";
import { useTheme } from "@/contexts/theme-context.tsx";
import { Sun, Moon } from "lucide-react";

const ThemeToggler = () => {
    const { setTheme, theme } = useTheme();
    return (
        <div className="flex items-center gap-2">
            <span>Motyw</span>
            <Button className="cursor-pointer dark:hover:bg-primary hover:bg-primary" variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? (
                    <Moon/>
                ) : (
                    <Sun/>
                )}
                <span className="sr-only">Zmień motyw</span>
            </Button>
        </div>
    );
}

export default ThemeToggler;