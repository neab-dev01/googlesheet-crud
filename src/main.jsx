import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // **1. Import BrowserRouter**
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css"; // **นี่คือส่วนสำคัญสำหรับ Bootstrap Icons**

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* **2. ห่อหุ้ม App Component ด้วย BrowserRouter** */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
