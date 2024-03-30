import React from "react";
import "../Common/utilities.css";
import "./Styles/index.css";
import SideBar from "./Components/SideBar";
import Stations from "./Components/Stations";
const Index = () => {
  return (
    <>
      <div className="page d-flex">
        <SideBar />
        <div className="content w-full">
          <Stations />
        </div>
      </div>
    </>
  );
};

export default Index;
