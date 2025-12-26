import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../config/store";

const initialState = {
    isModalOpen: false,
    mode: "add",
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.mode = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalState = (state: RootState) => state.modal.isModalOpen;
export const selectModalMode = (state: RootState) => state.modal.mode;
export default modalSlice.reducer;
