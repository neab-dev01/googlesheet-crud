// src/components/Layout.js
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header /> {/* ส่วนของเมนู/Header ที่อยู่คงที่ */}
      <main  className="flex-fill">
        <Outlet /> {/* **นี่คือช่องว่าง!** เนื้อหาของหน้าปัจจุบันจะมาแสดงตรงนี้ |  Outlet "ตัวแทน" ของคอมโพเนนต์ลูกที่ถูกกำหนดใน Route ด้านล่าง Layout*/}
      </main>
      <Footer /> {/* ส่วนของ Footer ที่อยู่คงที่ */}
    </div>
  );
}

export default Layout;