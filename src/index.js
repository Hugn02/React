import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
const user = {
	isAuthenticated: true,  // Người dùng đã đăng nhập
	role: 'user'  // Role của người dùng có thể là 'user' hoặc 'admin'
  };

  const ProtectedRoute = ({ component: Component, role, ...rest }) => (
	<Route
  {...rest}
  element={
	user.isAuthenticated ? (
	  user.role === role ? (
		<Component />
	  ) : (
		<Navigate to="/unauthorized" />  // Chuyển hướng đến trang không có quyền truy cập
	  )
	) : (
	  <Navigate to="/" />  // Chuyển hướng đến trang đăng nhập
	)
  }
/>
);
root.render(
	<BrowserRouter>
	<App>
	<Router>
	<Routes>
	
        <ProtectedRoute path="/admin" element={<Admin/>} role="admin" />
        <ProtectedRoute path="/" element={<Home />} role="user" />
		</Routes>
		</Router>
	</App>
		
	</BrowserRouter>
);
