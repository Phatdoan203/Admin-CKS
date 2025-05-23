import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/use-auth";
import type { JSX } from "react";
import { clearToken, isTokenExpired } from "@/utils/auth";


export default function RequireAuth({ children } : {children : JSX.Element}){
    const isAuthenticanted = useAuth();
    const location = useLocation();
    
    const expiresInStr = localStorage.getItem("expiresIn")
    const expired = expiresInStr ? isTokenExpired(parseInt(expiresInStr)) : true;

    if (!isAuthenticanted || expired) {
        clearToken();
        return <Navigate to="/login-page" state={{ from : location }} replace />
    }
    // if (isTokenExpired()) {
    //     clearToken();
    //     return <Navigate to="/login-page" state={{ from : location }} replace />
    // }
    return children;
}