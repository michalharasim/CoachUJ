import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children,  defaultTheme = "system",  storageKey = "vite-ui-theme",  ...props  }: {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}) {
    const [theme, setThemeState] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme); // Dodaj klasę "dark" lub "light" na podstawie preferencji systemu
        } else {
            root.classList.add(theme); // Dodaj wybraną klasę "dark" lub "light"
        }
    }, [theme]); // Za każdym razem, gdy zmieni się motyw

    const setTheme = (theme: Theme) => {
        localStorage.setItem(storageKey, theme); // Zapisz motyw w Local Storage
        setThemeState(theme);
    };

    return (
        <ThemeProviderContext.Provider {...props} value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};