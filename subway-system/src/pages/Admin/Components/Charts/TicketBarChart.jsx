import React from "react";
import { Bar } from "react-chartjs-2";

const TicketBarChart = ({ data }) => {
  const labels = [];
  const chartTicketData = [];

  data.forEach((item) => {
    labels.push(item.month);
    chartTicketData.push(item.count);
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Ticket Purchase per Month",
        data: chartTicketData, // Use the chartTicketData array here
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
