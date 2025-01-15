import React from "react";
import { Chart } from "react-google-charts";
import backImg from '../AdditionalFilesDirectory/military.jpg';

interface CustomCSSProperties extends React.CSSProperties {
  backdropFilter?: string;
}

const MilitaryGeoChart: React.FC = () => {
  const data = [
    ["Latitude", "Longitude", "Weapon Exports (Millions USD)", { role: "tooltip", type: "string" }],
    [37.0902, -95.7129, 107870, "United States: $107,870 million"],
    [55.7558, 37.6173, 81740, "Russia: $81,740 million"],
    [48.8566, 2.3522, 40800, "France: $40,800 million"],
    [51.1657, 10.4515, 32490, "Germany: $32,490 million"],
    [31.0461, 34.8516, 30800, "Israel: $30,800 million"],
    [55.3781, -3.4360, 26790, "United Kingdom: $26,790 million"],
    [35.8617, 104.1954, 19770, "China: $19,770 million"],
    [41.9028, 12.4964, 15880, "Italy: $15,880 million"],
    [60.1282, 18.6435, 11100, "Sweden: $11,100 million"],
    [52.1326, 5.2913, 10650, "Netherlands: $10,650 million"],
    [35.6895, 139.6917, 9600, "Japan: $19,600 million"],
    [-25.2744, 133.7751, 8200, "Australia: $8,200 million"],
    [40.7128, -74.0060, 7500, "Canada: $7,500 million"],
    [39.9042, 116.4074, 6800, "China (Secondary): $6,800 million"],
    [-30.5595, 22.9375, 5800, "South Africa: $5,800 million"],
    [-14.2350, -51.9253, 4500, "Brazil: $4,500 million"],
    [19.4326, -99.1332, 3500, "Mexico: $3,500 million"],
    [1.3521, 103.8198, 3100, "Singapore: $3,100 million"],
    [39.3999, -8.2245, 2500, "Portugal: $2,500 million"],
    [56.1304, -106.3468, 2100, "Canada (Secondary): $2,100 million"],
  ];

  const options = {
    region: "world",
    displayMode: "markers",
    colorAxis: { colors: ["#FFA07A", "#DC143C", "#8B0000"] },
    sizeAxis: { minValue: 0, maxValue: 12000 },
    backgroundColor: "transparent",
    datalessRegionColor: "#2F4F4F",
    tooltip: {
      isHtml: true,
      textStyle: {
        color: "red",
        fontSize: 20,
      },
      showColorCode: true,
      trigger: "focus",
    },
    chartArea: {
      backgroundColor: { fill: 'transparent' },
      left: '5%',
      top: '5%',
      width: '90%',
      height: '90%',
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
        background: "linear-gradient(135deg, #1a1a1a, #2c3e50)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
        zIndex: -1,
      }}></div>

      <div style={{
        textAlign: "center",
        color: "white",
        zIndex: 2,
        padding: "2rem",
        backdropFilter: "blur(8px)",
        borderRadius: "15px",
        backgroundColor: "rgba(0.4, 0.5, 0.6, 0.3)",
      }}>
        <h2 style={{
          fontSize: "5rem",
          marginBottom: "1.5rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}>Global Weapon Exports (2020)</h2>

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
}

export default MilitaryGeoChart;
