import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link และ NavLink สำหรับลิงค์หน้าอื่นๆ

function Header() {
  return (
    <div>
      {/*
        Navbar หลัก:
        - navbar-dark bg-primary: สีพื้นหลัง
        - fixed-top: ตรึงด้านบน
        - navbar-expand-lg: จะขยายเมนูเต็มรูปแบบเมื่อหน้าจอ >= lg (desktop),
                              และจะพับเก็บเป็น Hamburger เมื่อหน้าจอ < lg (mobile/tablet)
      */}
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg fixed-top">
        <div className="container-fluid">
          {/* Logo/Brand */}
          <Link className="navbar-brand" to="/">
            <i className="bi bi-apple me-2"></i>{" "}
            {/* เพิ่ม me-2 เพื่อเว้นระยะจากข้อความ */}
            Brand
          </Link>

          {/*
            Navbar Toggler (ปุ่ม Hamburger)
            - data-bs-target จะชี้ไปที่ Offcanvas
            - Bootstrap จะจัดการซ่อนปุ่มนี้อัตโนมัติบนหน้าจอ >= lg (ตาม navbar-expand-lg)
          */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" // เปลี่ยน ID ให้ชัดเจนขึ้น
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/*
            Offcanvas (สำหรับ Mobile/Tablet)
            - จะเป็น container สำหรับ Navbar Collapse บนหน้าจอเล็ก
            - text-bg-primary: สีพื้นหลังของ Offcanvas (ควรจะเหมือน Navbar หลัก)
            - Bootstrap จะจัดการซ่อน/แสดง Offcanvas นี้ (ด้วย JavaScript)
            - เนื่องจาก navbar-expand-lg, บนหน้าจอใหญ่ Offcanvas นี้จะ "ไม่มีผล" (แต่โครงสร้างยังมีอยู่)
          */}
          <div
            className="offcanvas offcanvas-end text-bg-primary" // bg-primary เพื่อให้เข้ากับ Navbar
            tabIndex="-1"
            id="offcanvasNavbar" // ID ต้องตรงกับ data-bs-target ของ Toggler
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Link className="navbar-brand" to="/">
                  <i className="bi bi-apple me-2"></i>{" "}
                  {/* เพิ่ม me-2 เพื่อเว้นระยะจากข้อความ */}
                  Brand
                </Link>
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              {/*
                Navbar Collapse (เมนูหลัก)
                - collapse: จะถูกยุบเก็บตอนเริ่มต้น
                - navbar-collapse: คลาสสำหรับ Bootstrap Navbar
                - justify-content-end: จัดเมนูชิดขวา
                - **สำคัญ:** บนหน้าจอ >= lg, Bootstrap จะ "เปิด" .navbar-collapse นี้ออกโดยอัตโนมัติ
                            และทำให้มันแสดงผลแบบ inline ใน Navbar.
                            บนหน้าจอ < lg, มันจะยังคงถูก "ยุบ" และจะแสดงผลเมื่อ Offcanvas เปิด.
              */}
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/">
                        Product A
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Product B
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        View All
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
