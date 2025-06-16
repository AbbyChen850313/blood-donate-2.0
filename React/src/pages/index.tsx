// src/pages/index.tsx
// 更新的路由配置 - Clean Code 重構版本

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Admin 頁面組件
import AdminNumber from "./admin/number/admin_numberView";
import AdminMoreSettings from "./admin/more/admin_moreSettingView";

// 統一的客戶頁面組件
import UnifiedCustomerPage from "../components/unified/UnifiedCustomerPage";

// 首頁組件
import HomePage from "./HomePage";

// 樣式文件 - 保留必要的樣式
import "../Css/adminCss.css";
import "../Css/publicCss.css";
import "../Css/numberBallCss.css";
import "../Css/phone/public_phone.css";
import "../Css/modalCss.css";
import "../Css/homePageCss.css";

/**
 * 主要的路由配置組件
 * 
 * 重構改進：
 * - 統一客戶頁面路由到 UnifiedCustomerPage
 * - 保留向後兼容性（舊路由重定向）
 * - 移除重複的客戶頁面組件
 * - 清理不必要的樣式導入
 * 
 * @returns 應用程式路由配置
 */
function PageIndex(): JSX.Element {
  return (
    <Router>
      <Routes>
        {/* 首頁 */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin 管理頁面 */}
        <Route path="/admin-number" element={<AdminNumber />} />
        <Route path="/admin-more" element={<AdminMoreSettings />} />
        
        {/* 統一的客戶頁面 - 新的主要路由 */}
        <Route path="/customer" element={<UnifiedCustomerPage />} />
        
        {/* 向後兼容性路由 - 重定向到統一頁面 */}
        <Route 
          path="/customerL" 
          element={<Navigate to="/customer" replace />} 
        />
        
        {/* 404 錯誤頁面重定向到首頁 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default PageIndex;