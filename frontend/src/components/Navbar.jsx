// src/components/Navbar.jsx
import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    message.success("Logged out successfully!");
    navigate("/auth");
    window.location.reload(); // Force reload to ensure all state is cleared
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-700">Task Management</h1>
      <Button type="default" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
