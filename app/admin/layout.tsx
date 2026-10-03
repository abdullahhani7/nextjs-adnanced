import React from "react";
import AdminSidebar from "./AdminSidebar";

interface IAdminLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: IAdminLayoutProps) => {
  return (
    <div>
      <div>
        <AdminSidebar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
