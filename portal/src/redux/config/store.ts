import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import modalReducer from "../features/modal.slice";

const listenerMiddleware = createListenerMiddleware();

const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;