import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { userData, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;