import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./component/Header";

//  URL จาก App script ***************
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwTcrws8PZDZX6FzT6tyvwGGbL9sGL6RbMiyQ3jdpJLV47fIqFjS5q_6OeG_5LacYZSpg/exec";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Gender: "",
    Age: "",
    Phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers(); // เรียกใช้ฟังก์ชัน fetchUsers เมื่อคอมโพเนนต์ถูก mount   // เพื่อดึงข้อมูลผู้ใช้จาก Google Sheets เมื่อเริ่มต้นแอปพลิเคชัน
   
  }, []);

  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก Google Sheets ***************************
  // โดยใช้ Axios เพื่อทำ HTTP GET request ไปยัง Web App URL
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${WEB_APP_URL}?action=read`);
      if (response.data.success) {
        setUsers(response.data.data);  // อัพเดต state ของ users ด้วยข้อมูลที่ได้รับ
      } else {
        alert(
          "Failed to fetch users: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      alert("Error fetching users. Check console for details.");
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม *******************************
  // เมื่อผู้ใช้กรอกข้อมูลในฟอร์ม จะอัพเดต state ของ formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันจัดการการส่งข้อมูลฟอร์ม ***************************
  // เมื่อผู้ใช้กดปุ่ม Submit จะทำการส่งข้อมูลไปยัง Web App
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) { // ถ้ามีการกดปุ่ม Edit
        response = await axios.post(
          WEB_APP_URL,
          JSON.stringify({
            action: "update",
            id: editingId,
            data: formData,
          }),
          {
            headers: { "Content-Type": "text/plain" },
          }
        );
      } else { // default
        response = await axios.post(
          WEB_APP_URL,
          JSON.stringify({
            action: "create",
            data: formData,
          }),
          {
            headers: { "Content-Type": "text/plain" },
          }
        );
      }
      if (response.data.success) {
        alert(response.data.message);
        setFormData({ Name: "", Gender: "", Age: "", Phone: "" });
        setEditingId(null);
        fetchUsers();
      } else {
        alert(
          "Operation failed: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      alert("Error submitting form. Check console for details.");
    }
  };

  // ฟังก์ชันจัดการการแก้ไขข้อมูลผู้ใช้ **************************
  // เมื่อผู้ใช้กดปุ่ม Edit จะดึงข้อมูลของผู้ใช้ที่ต้องการแก้ไข
  const handleEdit = (user) => {
    setFormData({
      Name: user.Name,
      Gender: user.Gender,
      Age: user.Age,
      Phone: user.Phone,
    });
    setEditingId(user.ID);
  };

  // ฟังก์ชันจัดการการลบข้อมูลผู้ใช้  *****************************
  // เมื่อผู้ใช้กดปุ่ม Delete จะลบข้อมูลของผู้ใช้ที่เลือก
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.post(
          WEB_APP_URL,
          JSON.stringify({
            action: "delete",
            id: id,
          }),
          {
            headers: { "Content-Type": "text/plain" },
          }
        );
        if (response.data.success) {
          alert(response.data.message);
          fetchUsers();
        } else {
          alert(
            "Deletion failed: " + (response.data.message || "Unknown error")
          );
        }
      } catch (error) {
        alert("Error deleting user. Check console for details.");
      }
    }
  };

  // ฟังก์ชันจัดการการยกเลิกการแก้ไขข้อมูล ********************************
  // เมื่อผู้ใช้กดปุ่ม Cancel Edit จะรีเซ็ตข้อมูลฟอร์ม
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ Name: "", Gender: "", Age: "", Phone: "" });
  };

  return (
    <>
      <Header/>
      <div className="container py-5 mt-5">
        <h2 className="mb-4 text-center">CRUD with ReactJS & Google Sheets</h2>
        <div
          id="carouselExample"
          className="carousel slide py-4"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="carousel-inner">
            {/* Slide 1: แสดง 3 รูป */}
            <div className="carousel-item active">
              <div className="row">
                <div className="col-4">
                  {" "}
                  {/* แสดง 1 ใน 3 คอลัมน์ */}
                  <img
                    src="https://picsum.photos/400/300?random=1"
                    className="d-block w-100"
                    alt="Image 1"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=2"
                    className="d-block w-100"
                    alt="Image 2"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=3"
                    className="d-block w-100"
                    alt="Image 3"
                  />
                </div>
              </div>
            </div>

            {/* Slide 2: แสดง 3 รูปถัดไป */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=4"
                    className="d-block w-100"
                    alt="Image 4"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=5"
                    className="d-block w-100"
                    alt="Image 5"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=6"
                    className="d-block w-100"
                    alt="Image 6"
                  />
                </div>
              </div>
            </div>

            {/* Slide 3: แสดง 3 รูปถัดไป */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=7"
                    className="d-block w-100"
                    alt="Image 7"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=8"
                    className="d-block w-100"
                    alt="Image 8"
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://picsum.photos/400/300?random=9"
                    className="d-block w-100"
                    alt="Image 9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h3 className="card-title mb-3">
                  {editingId ? "Edit User" : "Add New User"}
                </h3>
                <form onSubmit={handleSubmit}>
                  {editingId && (
                    <div className="mb-3">
                      <label className="form-label">ID:</label>
                      <input
                        type="text"
                        name="ID"
                        value={editingId}
                        readOnly
                        className="form-control"
                        style={{ background: "#ebebeb" }}
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender:</label>
                    <input
                      type="text"
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age:</label>
                    <input
                      type="number"
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input
                      type="text"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    {editingId ? "Update User" : "Add User"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn btn-secondary"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mb-3">User List</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.ID}>
                  <td>{user.ID}</td>
                  <td>{user.Name}</td>
                  <td>{user.Gender}</td>
                  <td>{user.Age}</td>
                  <td>{user.Phone}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.ID)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
