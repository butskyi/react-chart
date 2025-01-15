import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../../AdditionalFilesDirectory/airplane_CandleStickChart.jpg";


const colorPairs = [
  { up: "#D66422FF", down: "#E74C3C" },
  { up: "#3498DB", down: "#E67E22" },
  { up: "#9B59B6", down: "#F1C40F" },
  { up: "#1ABC9C", down: "#E74C3C" },
  { up: "#7A5B86FF", down: "#95A5A6" },
  { up: "#27AE60", down: "#C0392B" },
  { up: "#2980B9", down: "#F39C12" },
  { up: "#8E44AD", down: "#D35400" },
  { up: "#16A085", down: "#C0392B" },
  { up: "#EC0404FF", down: "#BDC3C7" },
  { up: "#2ECC71", down: "#E67E22" },
  { up: "#3498DB", down: "#D35400" },
  { up: "#9B59B6", down: "#F39C12" },
  { up: "#1ABC9C", down: "#C0392B" },
];

interface SplitData {
  categoryData: string[];
  values: number[][];
}


const data0: SplitData = splitData([
  ["Boeing", 700, 800, 680, 750],
  ["Airbus", 720, 850, 700, 800],
  ["Embraer", 120, 150, 110, 140],
  ["Bombardier", 80, 100, 75, 95],
  ["COMAC", 20, 30, 15, 25],
  ["Sukhoi", 30, 40, 25, 35],
  ["Mitsubishi", 10, 20, 8, 18],
  ["ATR", 60, 80, 55, 75],
  ["Cessna", 400, 500, 380, 480],
  ["Gulfstream", 100, 120, 90, 110],
  ["Dassault", 40, 50, 35, 45],
  ["Pilatus", 110, 130, 100, 120],
  ["Beechcraft", 150, 180, 140, 170],
  ["Piper", 200, 250, 190, 240],
]);

function splitData(rawData: [string, number, number, number, number][]): SplitData {
  const categoryData: string[] = [];
  const values: number[][] = [];

  for (const item of rawData) {
    categoryData.push(item[0]); 
    values.push([item[1], item[2], item[3], item[4]]); 
  }

  return { categoryData, values };
}

const AirplaneProductionCandleStickChart: React.FC = () => {
  const option: echarts.EChartsOption = {
    title: {
      text: "Global Airplane Production Candlestick Chart",
      left: "center",
      textStyle: {
        color: "#00FF00FF",
        fontSize: 80,
        fontFamily: "Lobster",
        textShadowColor: "rgba(0.5, 1, 1, 1)",
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
      axisLine: { lineStyle: { color: "#FF0000FF" } },
      axisLabel: {
        color: "#4208ADFF",
        fontSize: 30,
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: "#FF0303FF" } },
      splitLine: { lineStyle: { color: "rgba(0.5, 0.7, 0.3, 0.8)" } },
      axisLabel: { fontSize: 30, color: "#FD00BEFF" },
    },
    series: [
      {
        name: "Production",
        type: "candlestick",
        data: data0.values.map((value, index) => ({
          value: value,
          itemStyle: {
            color: colorPairs[index].up,
            borderColor: colorPairs[index].up,
            color0: colorPairs[index].down,
            borderColor0: colorPairs[index].down,
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
          src={backimg}
          alt="background"
          style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.25 }}
        />
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
    </>
  );
};


export default AirplaneProductionCandleStickChart;
