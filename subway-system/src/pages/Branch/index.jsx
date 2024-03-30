import React from "react";
import "./Styles/utilities.css";
import "./Styles/index.css";
import Layout from "./Components/Layout";
import Stations from "./Components/Stations";
import Rides from "./Components/Rides";
const Index = () => {
  return (
    <div className="content w-full">
      <Stations />
    </div>
  );
};

export default Index;
