import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";

import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./app/store.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
