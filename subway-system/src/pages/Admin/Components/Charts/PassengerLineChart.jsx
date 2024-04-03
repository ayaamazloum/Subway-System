import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto";
const PassengerLineChart = ({ data }) => {
  const labels = [];
  const chartPassengerData = [];

  data.forEach((item) => {
    labels.push(item.month);
    chartPassengerData.push(item.count);
  });
  const chartData = {
    labels,
    datasets: [
      {
        label: "Passenger Register",
        data: chartPassengerData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default PassengerLineChart;
