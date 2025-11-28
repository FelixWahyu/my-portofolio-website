import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Beranda from "./pages/Beranda";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Beranda />
  </StrictMode>
);
