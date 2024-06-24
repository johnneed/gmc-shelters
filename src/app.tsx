import {createRoot} from "react-dom/client";
// import {Layout} from "./components/layout";
// import {MainPage} from "./pages/main-page";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
// import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store";
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";

const root = createRoot(document.getElementById("root"));


const router = createHashRouter([
    {
        path: "/",
        element: <div>MAIN</div>,
    },
    {
        path: "/map",
        element:
            <div>MAP</div>

    },
    {
        path: "/about",
        element:
            <div>About</div>
    
    },
]);


root.render(
    <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
</React.StrictMode>,
)
;



