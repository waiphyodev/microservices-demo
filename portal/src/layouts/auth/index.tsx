import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "universal-cookie";

const AuthLayout = () => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const refreshToken = cookie.get("refreshToken");

    if (accessToken && refreshToken) return <Navigate to="/" replace />;
    
    return (
        <main>
            <Outlet />
        </main>
    );
};

export default AuthLayout;