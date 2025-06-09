// HomePage.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

const handleAdminClick = () => {
  const correctPassword = process.env.REACT_APP_ENTER_ADMIN_PASSWORD;
  const password = prompt("請輸入密碼:");
  if (password === correctPassword) {
    localStorage.setItem("isAdminAuthenticated", "true"); // 设置标记
    navigate("/admin-number");
  } else {
    alert("密碼錯誤！");
  }
};

  const customerURL:string=(window.innerWidth < 768)?"/customer":"/customerL"
  return (
    <div className="homePage">
      <button onClick={handleAdminClick} className="adminLink">
        管理頁面
      </button>
      <Link to= {customerURL} className="customerLink">
        客戶頁面
      </Link>
    </div>
  );
};

export default HomePage;
