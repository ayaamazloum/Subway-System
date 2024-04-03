import React, { useEffect, useState } from "react";
import "../Styles/index.css";
import PassengerChart from "./Charts/PassengerLineChart";
import TicketChart from "./Charts/TicketBarChart";
import CoinChart from "./Charts/CoinDonutChart";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
const OverView = () => {
  const [tickedData, setTickedData] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [coinRequestData, setCoinRequestData] = useState([]);
  const getData = () => {
    const response = sendRequest(requestMehods.GET, "overview").then(
      (response) => {
        if (response.data.status === "success") {
          console.log(response.data.data.passengersByMonth);
          setCoinRequestData(response.data.data.coinRequestsByStatus);
          setPassengerData(response.data.data.passengersByMonth);
          setTickedData(response.data.data.ticketsByMonth);
        }
      }
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="content w-full">
      <h1 className="p-relative fs-30">OverView</h1>
      <div className="charts">
        <div className="chart-1">
          <PassengerChart data={passengerData} />
        </div>
        <div className="chart-2">
          <CoinChart data={coinRequestData} />
        </div>
        <div className="chart-3">
          <TicketChart data={tickedData} />
        </div>
      </div>
    </div>
  );
};

export default OverView;
