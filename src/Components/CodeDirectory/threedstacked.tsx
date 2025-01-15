import React, { useEffect } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import './index.css';

const categories: string[] = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys", "Groceries"];
const months: string[] = ["January", "February", "March", "April", "May", "June"];

const salesData: [number, number, number][] = [
  [0, 0, 5000], [0, 1, 6000], [0, 2, 7500], [0, 3, 8000], [0, 4, 8500], [0, 5, 9000],
  [1, 0, 3000], [1, 1, 4500], [1, 2, 5000], [1, 3, 6000], [1, 4, 7000], [1, 5, 7500],
  [2, 0, 4000], [2, 1, 5000], [2, 2, 5500], [2, 3, 6000], [2, 4, 7000], [2, 5, 8000],
  [3, 0, 2000], [3, 1, 3000], [3, 2, 4000], [3, 3, 4500], [3, 4, 5000], [3, 5, 5500],
  [4, 0, 1500], [4, 1, 2000], [4, 2, 2500], [4, 3, 3000], [4, 4, 4000], [4, 5, 4500],
  [5, 0, 7000], [5, 1, 8000], [5, 2, 8500], [5, 3, 9000], [5, 4, 9500], [5, 5, 10000],
];

const option = {
  title: {
    text: "Monthly Sales Performance by Category",
    left: "center",
    top: "10%",
    textStyle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000",
      fontFamily: "'Dancing Script', cursive",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: (params: any) => {
      const categoryIndex = params.value[1];
      const monthIndex = params.value[0];
      const value = params.value[2];
      const categoryName = categories[categoryIndex] || "Unknown Category";
      const monthName = months[monthIndex] || "Unknown Month";

      return `<div style="color: #fff; font-size: 14px; font-weight: bold;">
        <strong>Month:</strong> ${monthName} <br>
        <strong>Category:</strong> ${categoryName} <br>
        <strong>Sales:</strong> $${value.toLocaleString()}
      </div>`;
    },
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderColor: "#2d2d2d",
    borderWidth: 1,
    padding: [10, 15],
  },
  visualMap: {
    min: 0,
    max: 10000,
    inRange: {
      color: ["#90EE90", "#FFD700", "#FF6347", "#FF4500", "#8B0000"],
    },
    orient: "horizontal",
    left: "center",
    bottom: "5%",
  },
  xAxis3D: {
    type: "category",
    data: months,
    axisLabel: {
      fontSize: 14,
      color: "#000",
      fontFamily: "'Dancing Script', cursive",
      rotate: 45,
    },
  },
  yAxis3D: {
    type: "category",
    data: categories,
    axisLabel: {
      fontSize: 14,
      color: "#000",
      fontFamily: "'Dancing Script', cursive",
    },
  },
  zAxis3D: {
    type: "value",
  },
  grid3D: {
    boxWidth: 220,
    boxDepth: 220,
    viewControl: {
      alpha: 30,
      beta: 40,
      distance: 600,
      rotateSensitivity: 5,
      zoomSensitivity: 2,
    },
    light: {
      main: { intensity: 2, shadow: true },
      ambient: { intensity: 0.5 },
    },
    backgroundColor: {
      type: "radial",
      x: 0.5,
      y: 0.5,
      r: 1,
      colorStops: [
        {
          offset: 0,
          color: "#f0f8ff", // Light Blue
        },
        {
          offset: 1,
          color: "#4682b4", // Steel Blue
        },
      ],
    },
  },
  series: [
    {
      type: "bar3D",
      data: salesData.map((item) => ({
        value: [item[1], item[0], item[2]],
      })),
      shading: "realistic",
      label: {
        fontSize: 14,
        borderWidth: 1,
        color: "#000",
        formatter: (params: any) => {
          return params.value[2] > 0 ? `$${params.value[2].toLocaleString()}` : "";
        },
      },
      emphasis: {
        label: {
          fontSize: 18,
          color: "#FFD700",
        },
        itemStyle: {
          color: "#FF6347",
          opacity: 1,
        },
      },
      itemStyle: {
        opacity: 0.8,
        color: (params: any) => {
          const val = params.value[2];
          if (val > 9000) return "#8B0000";
          if (val > 7500) return "#FF6347";
          if (val > 5000) return "#FFD700";
          return "#90EE90";
        },
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  ],
};

const App: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById("chart")!;
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }, []);

  return (
    <div
      id="chart-container"
      className="container"
    >
      <div
        id="chart"
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      />
      <div
        className="overlay-text"
      >
        Monthly Sales Performance
      </div>
    </div>
  );
};

export default App;
