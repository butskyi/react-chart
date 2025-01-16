import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../../AdditionalFilesDirectory/EnergyConsumption.jpg"; // Replace with an appropriate energy-related background image

const EnergyConsumptionChart = () => {
  const data = {
    sectors: [
      {
        name: "Residential",
        consumptionData: [
          { timeOfDay: 0, consumption: 50 },
          { timeOfDay: 1, consumption: 45 },
          { timeOfDay: 2, consumption: 40 },
          { timeOfDay: 3, consumption: 38 },
          { timeOfDay: 4, consumption: 35 },
          { timeOfDay: 5, consumption: 40 },
          { timeOfDay: 6, consumption: 55 },
          { timeOfDay: 7, consumption: 70 },
          { timeOfDay: 8, consumption: 65 },
          { timeOfDay: 9, consumption: 60 },
          { timeOfDay: 10, consumption: 58 },
          { timeOfDay: 11, consumption: 62 },
          { timeOfDay: 12, consumption: 65 },
          { timeOfDay: 13, consumption: 63 },
          { timeOfDay: 14, consumption: 60 },
          { timeOfDay: 15, consumption: 62 },
          { timeOfDay: 16, consumption: 68 },
          { timeOfDay: 17, consumption: 75 },
          { timeOfDay: 18, consumption: 80 },
          { timeOfDay: 19, consumption: 85 },
          { timeOfDay: 20, consumption: 82 },
          { timeOfDay: 21, consumption: 75 },
          { timeOfDay: 22, consumption: 65 },
          { timeOfDay: 23, consumption: 55 },
        ],
      },
      {
        name: "Commercial",
        consumptionData: [
          { timeOfDay: 0, consumption: 40 },
          { timeOfDay: 1, consumption: 35 },
          { timeOfDay: 2, consumption: 30 },
          { timeOfDay: 3, consumption: 28 },
          { timeOfDay: 4, consumption: 30 },
          { timeOfDay: 5, consumption: 35 },
          { timeOfDay: 6, consumption: 45 },
          { timeOfDay: 7, consumption: 60 },
          { timeOfDay: 8, consumption: 80 },
          { timeOfDay: 9, consumption: 90 },
          { timeOfDay: 10, consumption: 95 },
          { timeOfDay: 11, consumption: 98 },
          { timeOfDay: 12, consumption: 100 },
          { timeOfDay: 13, consumption: 98 },
          { timeOfDay: 14, consumption: 95 },
          { timeOfDay: 15, consumption: 93 },
          { timeOfDay: 16, consumption: 90 },
          { timeOfDay: 17, consumption: 85 },
          { timeOfDay: 18, consumption: 75 },
          { timeOfDay: 19, consumption: 65 },
          { timeOfDay: 20, consumption: 60 },
          { timeOfDay: 21, consumption: 55 },
          { timeOfDay: 22, consumption: 50 },
          { timeOfDay: 23, consumption: 45 },
        ],
      },
      {
        name: "Industrial",
        consumptionData: [
          { timeOfDay: 0, consumption: 70 },
          { timeOfDay: 1, consumption: 68 },
          { timeOfDay: 2, consumption: 65 },
          { timeOfDay: 3, consumption: 67 },
          { timeOfDay: 4, consumption: 70 },
          { timeOfDay: 5, consumption: 75 },
          { timeOfDay: 6, consumption: 80 },
          { timeOfDay: 7, consumption: 85 },
          { timeOfDay: 8, consumption: 90 },
          { timeOfDay: 9, consumption: 95 },
          { timeOfDay: 10, consumption: 98 },
          { timeOfDay: 11, consumption: 100 },
          { timeOfDay: 12, consumption: 98 },
          { timeOfDay: 13, consumption: 95 },
          { timeOfDay: 14, consumption: 93 },
          { timeOfDay: 15, consumption: 90 },
          { timeOfDay: 16, consumption: 88 },
          { timeOfDay: 17, consumption: 85 },
          { timeOfDay: 18, consumption: 83 },
          { timeOfDay: 19, consumption: 80 },
          { timeOfDay: 20, consumption: 78 },
          { timeOfDay: 21, consumption: 75 },
          { timeOfDay: 22, consumption: 73 },
          { timeOfDay: 23, consumption: 70 },
        ],
      },
    ],
  };

  const containerStyle: React.CSSProperties = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const plotStyle = {
    marginTop: "40px",
  };

  const layout: Partial<Layout> = {
    title: {
      text: "Energy Consumption Over a Day by Sector",
      font: {
        family: "Roboto",
        size: 64,
        color: "#0D0175FF",
      },
      x: 0.5,
    },
    xaxis: {
      title: {
        text: "Time of Day (Hours)",
        font: {
          family: "Roboto",
          size: 28,
          color: "#53F105FF",
        },
      },
      showgrid: true,
      gridcolor: "#E0E0E0",
      tickfont: {
        family: "Roboto",
        size: 22,
        color: "#750B0BFF",
      },
    },
    yaxis: {
      title: {
        text: "Energy Consumption (kWh)",
        font: {
          family: "Roboto",
          size: 28,
          color: "#42FE09FF",
        },
      },
      showgrid: true,
      gridcolor: "#E0E0E0",
      range: [0, 120],
      tickfont: {
        family: "Roboto",
        size: 22,
        color: "#911D1DFF",
      },
    },
    legend: {
      font: {
        family: "Roboto",
        size: 22,
        color: "#333333",
      },
    },
    paper_bgcolor: "rgba(255, 255, 255, 0.2)",
    plot_bgcolor: "rgba(255, 255, 255, 0.8)",
    width: 1600,
    height: 850,
    hovermode: "closest",
    margin: {
      l: 80,
      r: 50,
      t: 150,
      b: 80,
    },
    showlegend: true,
  };

  return (
    <div style={containerStyle}>
      <GoogleFontLoader
        fonts={[{ font: "Roboto", weights: [400, 700] }]}
        subsets={["latin"]}
      />
      <div style={plotStyle}>
        <Plot
          data={data.sectors.map((sector, index) => ({
            x: sector.consumptionData.map((d) => d.timeOfDay),
            y: sector.consumptionData.map((d) => d.consumption),
            type: "histogram2dcontour",
            name: sector.name,
            colorscale: index === 0 ? "Reds" : index === 1 ? "Blues" : "Greens",
            showscale: false,
            contours: {
              coloring: "heatmap",
            },
          }))}
          layout={layout}
          config={{ responsive: true }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.8,
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default EnergyConsumptionChart;
