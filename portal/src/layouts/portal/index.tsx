import React from "react";
import { Outlet } from "react-router";
import Navigation from "../../components/util/Navigation";
import PageHeader from "../../components/util/PageHeader";

const PortalLayout = () => {
    return (
        <main className="flex">
            <Navigation />
            <section className="w-full h-screen ">
                <PageHeader />
                <div className="h-[92vh] page-container overflow-hidden overflow-y-auto">
                    <Outlet />
                </div>
            </section>
        </main>
    );
};

export default PortalLayout;