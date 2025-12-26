import { CaretRightIcon, HouseLineIcon, SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";
import React, { Fragment } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "../../redux/config/hook";
import { closeModal, openModal, selectModalMode } from "../../redux/features/modal.slice";
import Confirmation from "./Confirmation";

const PageHeader = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const urlPaths = pathname.split("/").filter(Boolean);

    const dispatch = useAppDispatch();
    const modalMode = useAppSelector(selectModalMode);
    const navigate = useNavigate();
    const cookie = new Cookies();

    const onLogOut = () => {
        dispatch(closeModal());
        cookie.remove("accessToken");
        cookie.remove("refreshToken");
        navigate("/auth/login");
    };

    return (
        <div className="h-[8vh] border-b border-gray-200">
            <div className="h-full px-4 2xl:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <NavLink to="/">
                        <HouseLineIcon className="icon-content" />
                    </NavLink>
                    {urlPaths.map((path, index: number) => (
                        <Fragment key={index}>
                            <CaretRightIcon className="icon-content" />
                            <NavLink to={`${urlPaths.slice(0, index + 1).join("/")}`} className="text-content capitalize">
                                {path.replace("-", " ")}
                            </NavLink>
                        </Fragment>
                    ))}
                </div>
                <div className="flex items-center gap-2 2xl:gap-4">
                    <NavLink to="/profile" className="btn-icon tooltip tooltip-down hover:before:content-['Profile']">
                        <UserCircleIcon className="icon-content" />
                    </NavLink>
                    <button
                        type="button"
                        className="btn-icon tooltip tooltip-down hover:before:text-error hover:before:content-['Log-Out']"
                        onClick={() => dispatch(openModal("logout"))}
                    >
                        <SignOutIcon className="icon-content" />
                    </button>
                </div>
            </div>
            {modalMode === "logout" ? <Confirmation title="Are you sure to logout?" onConfirm={onLogOut} /> : null}
        </div>
    );
};

export default PageHeader;
