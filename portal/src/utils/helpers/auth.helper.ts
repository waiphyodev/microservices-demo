import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "universal-cookie";

export const authenticate = () => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const refreshToken = cookie.get("refreshToken");

    if (accessToken && refreshToken) {
        const decoded: JwtPayload & { id: string; role: "admin" | "user" } = jwtDecode(accessToken);
        return { status: "authenticated", data: decoded };
    } else if (!accessToken && refreshToken) {
        const decoded: JwtPayload & { id: string; role: "admin" | "user" } = jwtDecode(refreshToken);
        return { status: "expired", data: decoded };
    } else {
        return { status: "unauthenticated", data: null };
    }
};
