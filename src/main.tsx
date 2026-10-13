import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// No StrictMode on purpose: it runs effects twice in development, which would
// attach the site's click handlers twice.
createRoot(document.getElementById("root")!).render(<App />);
