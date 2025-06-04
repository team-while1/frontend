import React from "react";
import Footer from "./Footer";
import "../styles/PageLayout.css";

export default function PageLayout({ children, showFooter = true }) {
  return (
    <div className="page-layout-wrapper">
      <div className="page-layout-content">
        {children}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}