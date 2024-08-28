import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Google = () => {

  const handleSuccess = (response) => {
    console.log("Google login successful, token:", response.credential);
    // Xử lý xác thực, gửi token đến backend hoặc lưu trữ trong localStorage
  };

  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h2>Đăng nhập bằng Google</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Google;
