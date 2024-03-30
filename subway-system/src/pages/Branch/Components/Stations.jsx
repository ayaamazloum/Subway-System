import React from "react";
import Station from "./Station";

const Stations = () => {
  return (
    <>
      <h1 className="p-relative fs-30">Stations</h1>
      <div className="stations-page d-grid gap-20 m-20">
        <Station />
        <Station />
      </div>
    </>
  );
};

export default Stations;
