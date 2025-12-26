import LoginPage from "../../pages/auth/login";
import HomePage from "../../pages/portal/home";

export const PORTAL_ROUTES = [
    {
        url: "/",
        component: <HomePage />,
    },
];

export const AUTH_ROUTES = [
    {
        url: "/auth/login",
        component: <LoginPage />,
    },
];
