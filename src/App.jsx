import React from "react";
import { Routes, Route } from "react-router-dom"; // **1. Import Routes และ Route**
import Layout from "./component/Layout"; // Layout ที่เหมือนกันทุกหน้า****

// Page
import About from "./pages/About";
import Home from "./pages/Home";
import SubAbout from "./pages/SubAbout";

function App() {
  return (
    <Routes>
      {/* นี่คือ Layout Route ของเรา */}
      <Route path="/" element={<Layout />}>
        {/* เนื้อหาที่จะมาเติมในช่องว่างของ Layout */}
        <Route index element={<Home />} />{" "}  {/* หน้าหลักของ path -> /  ตอนนี้คือ Home สามารถเปลี่ยนได้*/}
        <Route path="about" element={<About />} /> {/* About เป็นหน้าเดี่ยวๆ */}
        <Route path="about/sub1" element={<SubAbout />} />{" "}  {/* SubAbout เป็นหน้าเดี่ยวๆ */}
        <Route path="*" element={<Home />} />{" "}     {/* ถ้าพิมพ์ path มั่วไม่มีจริงจะไปหน้า Home */}
      </Route>
    </Routes>
  );
}

export default App;
