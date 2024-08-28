import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để ẩn/hiện mật khẩu
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Giả sử ID của người dùng hiện tại là 1
    const userId = 1;

    // Lấy thông tin người dùng từ API khi component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Giả sử ID của người dùng hiện tại là 1
      const userId = 1;

      // Gửi yêu cầu cập nhật thông tin người dùng
      await axios.patch(`http://localhost:8080/users/${userId}`, userData);

      setSuccess("Cập nhật thông tin thành công!");
      setError("");
    } catch (err) {
      setError("Cập nhật thông tin thất bại: " + err.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Chỉnh sửa thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên người dùng:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái showPassword
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <div>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle showPassword khi click checkbox
            />
            <label>Hiện mật khẩu</label>
          </div>
        </div>
        <button type="submit">Cập nhật thông tin</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Profile;
