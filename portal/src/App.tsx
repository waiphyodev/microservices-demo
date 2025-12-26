import React from "react";
import Router from "./Router";
import { HashRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/config/store";
import { Toaster } from "sonner";

const App = () => {
    return (
        <>
            <HashRouter>
                <Provider store={store}>
                    <Router />
                    <Toaster position="top-right" />
                </Provider>
            </HashRouter>
        </>
    );
};

export default App;