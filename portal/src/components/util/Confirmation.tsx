import React, { JSX } from "react";
import { closeModal, selectModalState } from "../../redux/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../redux/config/hook";

type ConfirmationPropsType = {
    title?: string;
    description?: string;
    type?: "error" | "info";
    onConfirm: () => void;
};

const Confirmation = ({
    title = "Are you sure to do this action?",
    description = "This action couldn't be undone.",
    type = "error",
    onConfirm,
}: ConfirmationPropsType) => {
    const dispatch = useAppDispatch();
    const showModal = useAppSelector(selectModalState);

    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/5 backdrop-blur-xs" style={{ marginTop: "0px" }}>
                    <div className="bg-white border border-gray-200 p-6 2xl:p-8">
                        <h3 className="mb-2 2xl:mb-4 text-smallHeader">{title}</h3>
                        <p className="mb-4 2xl:mb-6 text-content">{description}</p>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                className="basis-1/2 btn btn-secondary"
                                onClick={() => {
                                    dispatch(closeModal());
                                }}
                            >
                                No
                            </button>
                            <button className={`basis-1/2 btn ${type === "error" ? "btn-filled-error" : "btn-filled-primary"}`} onClick={onConfirm}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Confirmation;
