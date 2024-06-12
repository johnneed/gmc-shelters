import { createRoot } from "react-dom/client";


window.api.foobar();
window.api.doThings("DO THINGS PAYLOAD");

const root = createRoot(document.body);
root.render(<h2>Hello from React!</h2>);

