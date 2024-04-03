import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto";
const CoinDonutChart = ({ data }) => {
  const labels = [];
  const coinData = [];

  data.forEach((item) => {
    labels.push(item.status);
    coinData.push(item.count);
  });
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Coin Status",
        data: coinData,
        backgroundColor: [
          "rgb(245, 158, 11)",
          "rgb(53, 179, 104)",
          "rgb(237, 19, 19)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default CoinDonutChart;
