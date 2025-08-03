import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: ('trener' | 'klient')[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Jeśli użytkownik ma niewłaściwą rolę, przekieruj go
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;