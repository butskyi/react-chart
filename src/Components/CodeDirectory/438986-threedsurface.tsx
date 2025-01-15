import React from "react";
import ReactECharts from "echarts-for-react";
import "echarts-gl";
import backImg from "../AdditionalFilesDirectory/sea_threedsurfacechart.jpg"; // Replace with your actual image path
import * as echarts from "echarts";

interface Data {
  [year: string]: { [region: string]: number };
}

const SeaDepthChart: React.FC = () => {
  const data: Data = {
    "2010": { Pacific: 5000, Atlantic: 4000, Indian: 4500, Arctic: 2000, Southern: 5500 },
    "2011": { Pacific: 5100, Atlantic: 4200, Indian: 4600, Arctic: 2100, Southern: 5600 },
    "2012": { Pacific: 5200, Atlantic: 4300, Indian: 4700, Arctic: 2200, Southern: 5700 },
    "2013": { Pacific: 5300, Atlantic: 4400, Indian: 4800, Arctic: 2300, Southern: 5800 },
    "2014": { Pacific: 5400, Atlantic: 4500, Indian: 4900, Arctic: 2400, Southern: 5900 },
    "2015": { Pacific: 5500, Atlantic: 4600, Indian: 5000, Arctic: 2500, Southern: 6000 },
    "2016": { Pacific: 5600, Atlantic: 4700, Indian: 5100, Arctic: 2600, Southern: 6100 },
  };

  const years: string[] = Object.keys(data);
  const regions: string[] = Object.keys(data[years[0]]);

  const formattedData: [number, number, number][] = [];
  const highlightPoints: [number, number, number][] = [];
  years.forEach((year, xIndex) => {
    regions.forEach((region, yIndex) => {
      const value = data[year][region];
      formattedData.push([xIndex, yIndex, value]);
      if (value % 500 === 0) {
        highlightPoints.push([xIndex, yIndex, value]);
      }
    });
  });

  const option = {
    title: {
      text: "Sea Depth Analysis",
      subtext: "Interactive 3D Visualization",
      left: "center",
      top: "5%",
      textStyle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1E90FF",
        fontFamily: "Arial",
      },
      subtextStyle: {
        fontSize: 16,
        color: "#4682B4",
      },
    },
    tooltip: {
      show: true,
      formatter: (params: any) => `Depth: ${params.value[2]} meters`,
    },
    xAxis3D: {
      type: "category",
      name: "Years",
      data: years,
    },
    yAxis3D: {
      type: "category",
      name: "Regions",
      data: regions,
    },
    zAxis3D: {
      type: "value",
      name: "Depth (m)",
    },
    grid3D: {
      boxWidth: 80,
      boxHeight: 80,
      boxDepth: 80,
      environment: "#ffffff", // Sets a plain background color
    },
    series: [
      {
        name: "Depth",
        type: "surface",
        wireframe: { show: false },
        shading: "color",
        data: formattedData,
        itemStyle: {
          color: "rgba(30, 144, 255, 0.6)",
          opacity: 0.9,
        },
      },
      {
        name: "Highlights",
        type: "scatter3D",
        symbolSize: 18,
        itemStyle: { color: "yellow" },
        data: highlightPoints,
      },
    ],
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          content: "",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2, // Adjust opacity here
          zIndex: 1, // Ensures background is behind the content
        }}
      ></div>
      <ReactECharts option={option} style={{ height: "100%", width: "100%", background: "transparent" }} />
    </div>
  );
};

export default SeaDepthChart;
