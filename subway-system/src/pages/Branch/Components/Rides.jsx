import React from "react";
import Ride from "./Ride.jsx";
const Rides = () => {
  return (
    <>
      <div className="content w-full">
        <h1 className="p-relative fs-30">Rides</h1>
        <div className="rides-page d-grid gap-20 m-20">
          <Ride />
          <Ride />
        </div>
      </div>
    </>
  );
};

export default Rides;
