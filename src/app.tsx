import { createRoot } from "react-dom/client";
import { Layout } from "./components/layout";
import { MainContent } from "./components/main-content";

const root = createRoot(document.body);
root.render(
  <Layout>
    <MainContent />
  </Layout>
);

