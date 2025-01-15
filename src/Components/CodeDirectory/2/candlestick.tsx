import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import GoogleFontLoader from "react-google-font-loader";
import cakeImg from "../../AdditionalFilesDirectory/cake.jpg"; // Ensure this path is correct

// Define the SplitData type
interface SplitData {
  categoryData: string[]; // Cake type names
  values: number[][]; // Production values for each cake
}

// Define color pairs for different cake types
const colorPairs = [
  { up: "#FF8C00", down: "#FFA500" },
  { up: "#FF6347", down: "#FF4500" },
  { up: "#DA70D6", down: "#EE82EE" },
  { up: "#98FB98", down: "#00FA9A" },
  { up: "#FFD700", down: "#FFA07A" },
  { up: "#87CEFA", down: "#4682B4" },
];

// Data with cake types and production values
const data0: SplitData = splitData([
  ["Chocolate Cake", 100, 120, 90, 115],
  ["Vanilla Cake", 80, 110, 70, 100],
  ["Red Velvet", 50, 70, 45, 65],
  ["Carrot Cake", 60, 85, 55, 80],
  ["Cheesecake", 40, 60, 35, 55],
  ["Fruit Cake", 30, 50, 25, 45],
]);

function splitData(rawData: [string, number, number, number, number][]): SplitData {
  const categoryData: string[] = [];
  const values: number[][] = [];

  for (const item of rawData) {
    categoryData.push(item[0]); // Cake type as category
    values.push([item[1], item[2], item[3], item[4]]); // Production values for each cake
  }

  return { categoryData, values };
}

const CakeProductionCandleStickChart: React.FC = () => {
  const option: echarts.EChartsOption = {
    title: {
      text: "Global Cake Production (2025)",
      left: "center",
      textStyle: {
        color: "#36FF04FF",
        fontSize: 80,
        fontFamily: "Lobster",
        textShadowColor: "rgba(1, 0.6, 0.4, 0.5)",
        textShadowBlur: 4,
      },
      top: "5%",
    },
    grid: {
      top: "20%",
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    xAxis: {
      type: "category",
      data: data0.categoryData,
      axisLine: { lineStyle: { color: "#E90101FF" } },
      axisLabel: {
        color: "#B3058DFF",
        fontSize: 40,
        rotate: 0,
        interval: 0,
      },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: "#00D824FF",width:2, } },
      splitLine: { lineStyle: { color: "#17B6B6A6",width:2, } },
      axisLabel: { fontSize: 40, color: "#8B0084FF" },
    },
    series: [
      {
        name: "Production",
        type: "candlestick",
        data: data0.values.map((value, index) => ({
          value: value,
          itemStyle: {
            color: colorPairs[index % colorPairs.length].up,
            borderColor: colorPairs[index % colorPairs.length].up,
            color0: colorPairs[index % colorPairs.length].down,
            borderColor0: colorPairs[index % colorPairs.length].down,
          },
        })),
        itemStyle: {
          borderWidth: 2,
        },
        barWidth: '50%',
      },
    ],
  };

  return (
    <>
      <GoogleFontLoader fonts={[{ font: "Lobster", weights: [400] }]} />
      <div style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <img
          src={cakeImg}
          alt="background"
          style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.7 }}
        />
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
    </>
  );
};

export default CakeProductionCandleStickChart;
