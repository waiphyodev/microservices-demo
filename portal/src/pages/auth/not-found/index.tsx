import React from "react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center">
                <h3 className="text-smallHeader font-semibold">404</h3>
                <p className="mb-6 2xl:mb-8 text-content">Page is not found.</p>
                <div className="flex items-center gap-4">
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                        Back
                    </button>
                    <button type="button" className="btn btn-filled-primary" onClick={() => navigate("/")}>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
