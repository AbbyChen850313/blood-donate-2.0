// src/pages/HomePage.tsx
// 更新的首頁組件 - 簡化路由邏輯

import React from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * 應用程式首頁組件
 * 
 * 重構改進：
 * - 移除複雜的設備檢測邏輯
 * - 統一客戶頁面入口
 * - 保持原有的管理員驗證邏輯
 * - 改善用戶體驗和可訪問性
 * 
 * @returns 首頁組件
 */
const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  /**
   * 處理管理員登入
   * 驗證密碼後導向管理頁面
   */
  const handleAdminClick = (): void => {
    const correctPassword = process.env.REACT_APP_ENTER_ADMIN_PASSWORD;
    const password = prompt("請輸入管理員密碼:");
    
    if (password === correctPassword) {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin-number");
    } else {
      alert("密碼錯誤！請聯繫系統管理員。");
    }
  };

  return (
    <div className="homePage">
      <h1 className="sr-only">血液庫存管理系統首頁</h1>
      
      {/* 管理頁面入口 */}
      <button 
        onClick={handleAdminClick} 
        className="adminLink"
        aria-label="進入管理頁面，需要密碼驗證"
      >
        管理頁面
      </button>
      
      {/* 客戶頁面入口 - 統一路由 */}
      <Link 
        to="/customer" 
        className="customerLink"
        aria-label="進入客戶檢視頁面"
      >
        客戶頁面
      </Link>
      
      {/* 版本資訊 */}
      <div className="version-info">
        <small>
          統一響應式版本 v2.0
          <br />
          支援桌面、平板、手機自動適應
        </small>
      </div>
    </div>
  );
};

export default HomePage;