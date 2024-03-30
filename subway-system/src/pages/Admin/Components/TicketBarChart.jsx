import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto";
const TicketBarChart = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Ticket Purchase per Month",
        data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default TicketBarChart;
