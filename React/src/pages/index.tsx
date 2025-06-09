// index.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminNumber from "./admin/number/admin_numberView";
import AdminMoreSettings from "./admin/more/admin_moreSettingView";
import CustomerComponent from "./customer/customer_view";
import CustomerComponentPC from "./customer/customer_view_PC";
import HomePage from "./HomePage";
import "../Css/adminCss.css";
import "../Css/customerCss.css";
import "../Css/publicCss.css";
import "../Css/numberBallCss.css";
import "../Css/phone/public_phone.css";
import "../Css/modalCss.css";
import "../Css/homePageCss.css";

function PageIndex() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-number" element={<AdminNumber />} />
        <Route path="/admin-more" element={<AdminMoreSettings />} />
        <Route
          path="/customer"
          element={<CustomerComponent />}
        />
        <Route
          path="/customerL"
          element={<CustomerComponentPC />}
        />
      </Routes>

    </Router>
  );
}

export default PageIndex;
