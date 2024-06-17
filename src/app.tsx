import {createRoot} from "react-dom/client";
import {Layout} from "./components/layout";
import {MainPage} from "./pages/main-page";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = createRoot(document.getElementById("root"));
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
    {
        path: "/",
        element: <Layout><MainPage/></Layout>,
    },
    {
        path: "/map",
        element: <Layout>
            <div>MAP</div>
        </Layout>
    },
    {
        path: "/about",
        element: <Layout>
            <div>About</div>
        </Layout>
    },
]);

root.render(
    <RouterProvider router={router}/>
);

