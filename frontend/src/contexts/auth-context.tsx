import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AuthContextType, DecodedToken, TokenUserData } from '@/lib/types';
import {isTokenExpired} from "@/lib/utils";

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<TokenUserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUser({
                    user_id: decodedToken.user_id,
                    role: decodedToken.role,
                });
            } catch (error) {
                console.error('Invalid token', error);
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser({
            user_id: decodedToken.user_id,
            role: decodedToken.role,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
    }
    return context;
};