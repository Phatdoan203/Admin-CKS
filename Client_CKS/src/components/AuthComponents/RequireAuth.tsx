import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/use-auth";
import type { JSX } from "react";


export default function RequireAuth({ children } : {children : JSX.Element}){
    const isAuthenticanted = useAuth();
    const location = useLocation();

    if (!isAuthenticanted){
        return <Navigate to="/login-page" state={{ from : location }} replace />
    }

    return children;
}