import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const App: React.FC = () => {
  const chartDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartDom.current) {
      const myChart = echarts.init(chartDom.current);

      const option: echarts.EChartsOption = {
        title: {
          text: "Solar Energy Conversion Analysis",
          subtext: "Expected vs Actual Efficiency",
          left: "center",
          top: "5%",
          textStyle: {
            color: "#228B22",
            fontSize: 24,
            fontWeight: "bold",
            textShadowColor: "#000",
            textShadowBlur: 8,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
          },
          subtextStyle: {
            color: "#20B2AA",
            fontSize: 16,
            textShadowColor: "#000",
            textShadowBlur: 6,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
          },
        },
        color: ["#FFD700", "#FF8C00", "#00CED1", "#32CD32", "#6A5ACD"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          data: [
            "Expected - Solar Energy Absorbed",
            "Actual - Solar Energy Absorbed",
            "Expected - Photovoltaic Conversion",
            "Actual - Photovoltaic Conversion",
            "Expected - Energy Stored",
            "Actual - Energy Stored",
            "Expected - Energy Distributed",
            "Actual - Energy Distributed",
            "Expected - Energy Utilized",
            "Actual - Energy Utilized",
          ],
          top: "95%",
          left: "center",
          textStyle: {
            color: "#228B22", // Set the desired color for the legend text
            fontSize: 14, // Adjust the font size if needed
          },
        },
        series: [
          {
            name: "Expected",
            type: "funnel",
            left: "10%",
            width: "80%",
            label: {
              formatter: "{b} Expected",
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              opacity: 0.7,
            },
            data: [
              { value: 100, name: "Expected - Solar Energy Absorbed" },
              { value: 85, name: "Expected - Photovoltaic Conversion" },
              { value: 70, name: "Expected - Energy Stored" },
              { value: 60, name: "Expected - Energy Distributed" },
              { value: 50, name: "Expected - Energy Utilized" },
            ],
          },
          {
            name: "Actual",
            type: "funnel",
            left: "10%",
            width: "80%",
            maxSize: "80%",
            label: {
              position: "inside",
              formatter: "{c}%",
            },
            itemStyle: {
              opacity: 0.5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            data: [
              { value: 95, name: "Actual - Solar Energy Absorbed" },
              { value: 80, name: "Actual - Photovoltaic Conversion" },
              { value: 65, name: "Actual - Energy Stored" },
              { value: 55, name: "Actual - Energy Distributed" },
              { value: 45, name: "Actual - Energy Utilized" },
            ],
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(to bottom, #f0f8ff, #1a1a1a)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "32px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #ffa07a, #ffd700, #adff2f)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        Renewable Energy Funnel
      </div>
      <div
        ref={chartDom}
        style={{
          width: "80%",
          height: "80%",
        }}
      />
    </div>
  );
};

export default App;
