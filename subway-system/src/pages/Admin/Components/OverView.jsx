import React from "react";
import "../Styles/index.css";
import PassengerChart from "./PassengerLineChart";
import TicketChart from "./TicketBarChart";
import CoinChart from "./CoinDonutChart";
const OverView = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [5, 8, 3, 12, 10, 15];
  return (
    <div className="content w-full">
      <h1 className="p-relative fs-30">OverView</h1>
      <div className="charts">
        <div className="chart-1">
          <PassengerChart labels={labels} data={data} />
        </div>
        <div className="chart-2">
          <CoinChart data={data} labels={labels} />
        </div>
        <div className="chart-3">
          <TicketChart data={data} labels={labels} />
        </div>
      </div>
    </div>
  );
};

export default OverView;
