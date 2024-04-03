import React from "react";
import { Doughnut } from "react-chartjs-2";

const CoinDonutChart = ({ data }) => {
  const colors = {
    Pending: "rgb(245, 250, 11)",
    Approved: "rgb(53, 209, 104)",
    Rejected: "rgb(237, 190, 19)",
  };

  const chartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Coin Status",
        data: data.map((item) => item.count),
        backgroundColor: [colors.Pending, colors.Approved, colors.Rejected],
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
