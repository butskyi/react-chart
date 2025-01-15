import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../AdditionalFilesDirectory/etherusd_candlestickchart.jpg"; // Adjust the path to your background image

const upColor = "#00FA9A";
const upBorderColor = "#556B2F";
const downColor = "#DC143C";
const downBorderColor = "#8B0000";

interface SplitData {
  categoryData: string[];
  values: number[][];
}

const data0: SplitData = splitData([
  ["2023/12/01", 2000.55, 2025.80, 1980.45, 2030.75],
  ["2023/12/02", 2025.80, 2045.90, 2015.60, 2050.40],
  ["2023/12/03", 2045.90, 2035.75, 2020.55, 2060.35],
  ["2023/12/04", 2035.75, 2020.65, 2005.45, 2038.75],
  ["2023/12/05", 2020.65, 2040.25, 2010.35, 2055.65],
  ["2023/12/06", 2040.25, 2065.75, 2035.45, 2075.85],
  ["2023/12/07", 2065.75, 2080.15, 2055.50, 2085.90],
  ["2023/12/08", 2080.15, 2075.50, 2060.30, 2088.45],
  ["2023/12/09", 2075.50, 2095.85, 2070.60, 2100.55],
  ["2023/12/10", 2095.85, 2110.35, 2085.75, 2120.90],
]);

function splitData(
  rawData: [string, number, number, number, number][]
): SplitData {
  const categoryData: string[] = [];
  const values: number[][] = [];

  for (let i = 0; i < rawData.length; i++) {
    const category = String(rawData[i][0]);
    categoryData.push(category);

    values.push([
      +rawData[i][1],
      +rawData[i][2],
      +rawData[i][3],
      +rawData[i][4],
    ]);
  }

  return {
    categoryData: categoryData,
    values: values,
  };
}

const EtherUSDCandleStickChart: React.FC = () => {
  const option: echarts.EChartsOption = {
    title: {
      text: "ETH/USD Forex Candlestick Chart",
      left: "center",
      textStyle: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Berkshire Swash", // Updated unique font family
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowBlur: 5,
        textShadowOffsetX: 2,
        textShadowOffsetY: 2,
      },
      top: "2%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "rgba(50, 50, 50, 0.8)",
          color: "#fff",
        },
      },
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data0.categoryData,
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: "#457676",
        },
      },
      axisLabel: {
        color: "#345678",
      },
      axisPointer: {
        label: {
          show: true,
          backgroundColor: "#FF5733",
          color: "#345678",
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      scale: true,
      axisLine: {
        lineStyle: {
          color: "#435788",
        },
      },
      axisLabel: {
        color: "#345768",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(45, 44, 23, 0.8)",
        },
      },
      axisPointer: {
        label: {
          show: true,
          backgroundColor: "#FF5733",
          color: "#344657",
          fontWeight: "bold",
        },
      },
    },
    series: [
      {
        name: "Candlestick",
        type: "candlestick",
        data: data0.values,
        itemStyle: {
          color: upColor,
          borderColor: upBorderColor,
          color0: downColor,
          borderColor0: downBorderColor,
        },
      },
    ],
  };

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Berkshire Swash",
            weights: [400],
          },
        ]}
      />
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={backimg}
          alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
            opacity: 0.3,
            zIndex: -1,
          }}
        />
        <ReactECharts
          option={option}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>
    </>
  );
};

export default EtherUSDCandleStickChart;
