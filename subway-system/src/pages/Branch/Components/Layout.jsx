import React from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="page d-flex">
      <SideBar />
      <div className="content w-full">{children}</div>
    </div>
  );
};

export default Layout;
