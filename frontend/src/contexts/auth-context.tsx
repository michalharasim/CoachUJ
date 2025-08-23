import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType} from '@/lib/types';
import {trainerClientApi}  from "@/lib/axios_instance";

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<AuthContextType['userData'] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        try {
            const response = await trainerClientApi.get('/users/profile/nav');
            const user_data = response.data;

            setUserData({
                id: user_data.id,
                username: user_data.username,
                isCoach: user_data.isCoach,
                email: user_data.email,
                picture: `http://localhost:2137${user_data.picture}`
            });
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }else {
            fetchUserData().then(() => setIsLoading(false));
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        fetchUserData();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUserData(null);
    };

    const value: AuthContextType = {
        userData,
        isLoading,
        login,
        logout,
        setUserData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
};