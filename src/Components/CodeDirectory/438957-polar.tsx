import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import backimg from "../AdditionalFilesDirectory/vaccine_polarchart.webp"; // Import your background image

const App: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        title: {
          text: "Quarterly Vaccination Rates",
          subtext: "Percentage of population vaccinated in USA, India, and UK",
          left: "center",
          top: "8%",
          textStyle: {
            color: "#eaeaea",
            fontSize: 26,
            fontWeight: "bold",
            fontFamily: "'Pacifico', cursive",
            textShadowColor: "rgba(255, 255, 255, 0.4)",
            textShadowBlur: 5,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
          },
          subtextStyle: {
            color: "#dcdcdc",
            fontSize: 14,
            fontFamily: "'Pacifico', cursive",
          },
        },
        angleAxis: {
          type: "category",
          data: ["Q1", "Q2", "Q3", "Q4"],
          axisLabel: {
            color: "#d6d6d6",
            fontSize: 14,
            fontFamily: "'Pacifico', cursive",
          },
        },
        radiusAxis: {
          axisLabel: {
            color: "#a0a0a0",
            fontSize: 14,
            fontFamily: "'Pacifico', cursive",
          },
        },
        polar: {
          center: ["50%", "50%"],
          radius: "65%",
        },
        series: [
          {
            type: "bar",
            data: [45, 60, 75, 90],
            coordinateSystem: "polar",
            name: "USA",
            stack: "vaccination",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#73c8ff" },
                { offset: 1, color: "#005eff" },
              ]),
            },
          },
          {
            type: "bar",
            data: [30, 50, 70, 85],
            coordinateSystem: "polar",
            name: "India",
            stack: "vaccination",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ffc785" },
                { offset: 1, color: "#ff5e00" },
              ]),
            },
          },
          {
            type: "bar",
            data: [50, 65, 80, 95],
            coordinateSystem: "polar",
            name: "UK",
            stack: "vaccination",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#8effc8" },
                { offset: 1, color: "#00d37f" },
              ]),
            },
          },
        ],
        legend: {
          show: true,
          data: ["USA", "India", "UK"],
          textStyle: {
            color: "#eaeaea",
            fontFamily: "'Pacifico', cursive",
            fontSize: 14,
          },
          top: "90%",
          itemGap: 40,
          itemWidth: 25,
          itemHeight: 15,
        },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const country = params.seriesName;
            const quarter = params.name;
            const percentage = params.value;
            return `${country} - ${quarter}: <b>${percentage}% vaccinated</b>`;
          },
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "#ccc",
          borderWidth: 1,
          textStyle: {
            color: "#333",
            fontFamily: "'Pacifico', cursive",
          },
        },
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${backimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.8, // Opacity for the background image
        position: "relative",
      }}
    >
      {/* Chart container with its own styling */}
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          background: "rgba(0, 0, 0, 0.5)", // Ensures the chart is clear above the background
        }}
      ></div>
    </div>
  );
};

export default App;
