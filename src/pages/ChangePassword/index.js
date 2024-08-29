import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const userId = 1;//Gán giá trị id là 1
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      const user = response.data;

      if (user.password !== currentPassword) {
        setError("Mật khẩu hiện tại không đúng.");
        return;
      }

      await axios.patch(`http://localhost:8080/users/${userId}`, {
        password: newPassword,
      });

      setSuccess("Đổi mật khẩu thành công!");
      setError("");
    } catch (err) {
      setError("Đổi mật khẩu thất bại: " + err.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Đổi Mật Khẩu</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Mật khẩu hiện tại:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Xác nhận mật khẩu mới:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đổi mật khẩu</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default ChangePassword;
