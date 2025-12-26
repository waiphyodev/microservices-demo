import React from "react";
import { Route, Routes } from "react-router";
import NotFoundPage from "./pages/auth/not-found";
import AuthLayout from "./layouts/auth";
import { AUTH_ROUTES, PORTAL_ROUTES } from "./utils/constants/ROUTES";
import PortalLayout from "./layouts/portal";

const ProtectedRoute = ({ children, path }: { children: React.ReactNode; path: string }) => {
    // const navigate = useNavigate();

    // // check authentication
    // const auth = checkAuth();
    // if (auth.status === "unauthenticated") {
    //     return <Navigate to="/auth/login" replace />;
    // }
    return children;
};

const Router = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route element={<AuthLayout />}>
                    {AUTH_ROUTES.map((item, index: number) => (
                        <Route key={index} path={item.url} element={item.component} />
                    ))}
                </Route>
                <Route element={<PortalLayout />}>
                    {PORTAL_ROUTES.map((item, index: number) => (
                        <Route key={index} path={item.url} element={<ProtectedRoute path={item.url}>{item.component}</ProtectedRoute>} />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Router;
