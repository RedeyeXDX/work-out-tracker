import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Colors } from "chart.js/auto";
import "./App.css";

const CaloriesChart = ({ data }) => {
  const [chartData, setChartData] = useState({
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
        total[date] = (total[date] || 0) + workout.caloriesBurned;
        return total;
      }, {});

      const labels = Object.keys(groupedData);
      const calories = Object.values(groupedData);

      setChartData({
        labels,
        datasets: [
          {
            label: "Calories Burned",
            data: calories,
            borderColor: "rgba(221, 33, 33, 0.8)",
            backgroundColor: "rgba(221, 33, 33, 0.8)",
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="line-chart">
      <h2>Calories Burned Over Time</h2>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default CaloriesChart;
