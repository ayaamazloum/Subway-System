import React from "react";
import CoinRequest from "./CoinRequest";

const CoinRequests = () => {
  return (
    <div className="content w-full">
      <h1 className="fs-30">CoinRequests</h1>
      <div className="coinrequests-page d-grid gap-20 m-20">
        <CoinRequest />
      </div>
    </div>
  );
};

export default CoinRequests;
