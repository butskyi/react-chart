import React from "react";
import { Chart } from "react-google-charts";
import backImg from '../../AdditionalFilesDirectory/renewable_energy.jpg';

const RenewableEnergyGeoChart: React.FC = () => {
  const data = [
    ["Country", "Renewable Energy Usage (%)", { role: "tooltip", type: "string" }],
    ["US", 20, "United States: 20% Renewable Energy"],
    ["BR", 45, "Brazil: 45% Renewable Energy"],
    ["DE", 40, "Germany: 40% Renewable Energy"],
    ["CN", 25, "China: 25% Renewable Energy"],
    ["IN", 15, "India: 15% Renewable Energy"],
    ["NO", 98, "Norway: 98% Renewable Energy"],
    ["SE", 75, "Sweden: 75% Renewable Energy"],
    ["AU", 30, "Australia: 30% Renewable Energy"],
  ];

  const options = {
    region: "world",
    displayMode: "regions",
    resolution: "countries",
    colorAxis: {
      colors: ["#FFDD44", "#44DD88", "#004400"],
      minValue: 0, // Optional: Set the minimum value
      maxValue: 100, // Optional: Set the maximum value
      textStyle: {
        fontSize: 30, // Increase font size for the visual map (legend)
        color: "#333333", // Optional: Customize font color
        bold: true, // Optional: Make it bold
      },
    },
    backgroundColor: "transparent",
    datalessRegionColor: "#F0F0F0",
    tooltip: {
      isHtml: true,
      textStyle: {
        color: "black",
        fontSize: 24,
      },
      trigger: "focus",
    },
  };
  
  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.5,
        zIndex: 1,
      }}></div>

      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1a1a1a, #007700)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
        zIndex: -1,
      }}></div>

      <div style={{
        textAlign: "center",
        color: "white",
        zIndex: 2,
        padding: "3rem",
        backdropFilter: "blur(8px)",
        borderRadius: "15px",
        backgroundColor: "rgba(0.4, 0.5, 0.6, 0.2)",
      }}>
        <h2 style={{
          fontSize: "4rem",
          fontFamily: "'Courgette', cursive",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}>Renewable Energy Adoption by Country</h2>

        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          width="80vw"
          height="70vh"
        />
      </div>
    </div>
  );
};

export default RenewableEnergyGeoChart;
