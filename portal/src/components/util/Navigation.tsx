import React from "react";
import { NAV_MENUS } from "../../utils/constants/NAV_MENUS";
import { NavLink, useLocation } from "react-router";
import { authenticate } from "../../utils/helpers/auth.helper";

const Navigation = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const auth = authenticate();

    return (
        <div className="w-60 border-r border-gray-200 py-4">
            <div className="mx-4 flex items-center gap-1 2xl:gap-2">
                <h3 className="flex flex-col font-semibold">CMS Panel</h3>
            </div>
            <div className="mt-16 flex flex-col gap-2">
                {NAV_MENUS.map((item, index: number) => {
                    const isActive = (pathname.includes(item.url) && item.url !== "/") || (item.url === "/" && pathname === "/");
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={index}
                            to={item.url}
                            className={`h-12 px-4 flex items-center gap-1 2xl:gap-2 text-content ${isActive ? "bg-primary text-white" : ""}`}
                        >
                            <Icon color={isActive ? "white" : "black"} className="icon-content" />
                            <span>{item.title}</span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Navigation;
