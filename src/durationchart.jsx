import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Colors } from "chart.js/auto";

const DurationChart = ({ data }) => {
  const [barChart, setBarchart] = useState({
    labels: [],
    datasets: [{}],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const groupedData = data.reduce((total, workout) => {
        const date = new Date(workout.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        total[date] = (total[date] || 0) + workout.duration;
        return total;
      }, {});

      const labels = Object.keys(groupedData);
      const duration = Object.values(groupedData);

      setBarchart({
        labels,
        datasets: [
          {
            label: "Duration (minutes)",
            data: duration,
            borderColor: "rgba(1, 26, 196, 0.8)",
            backgroundColor: "rgba(1, 26, 196, 0.8)",
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="bar-chart">
      <h2>Duration of workout over Time</h2>
      {barChart.labels.length > 0 ? (
        <Bar data={barChart} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default DurationChart;
