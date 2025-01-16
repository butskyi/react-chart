import React from "react";
import { Chart } from "react-google-charts";
import backImg from '../../AdditionalFilesDirectory/university_geo_chart_background.jpg';

const MilitaryGeoChart: React.FC = () => {
  const data = [
    ["Latitude", "Longitude", "University Rank", { role: "tooltip", type: "string" }],
    [40.7128, -74.0060, 1, "Harvard University: Rank 1"],
    [34.0522, -118.2437, 2, "Stanford University: Rank 2"],
    [51.5074, -0.1278, 3, "Imperial College London: Rank 3"],
    [48.8566, 2.3522, 4, "University of Oxford: Rank 4"],
    [35.6895, 139.6917, 5, "University of Tokyo: Rank 5"],
    [52.5200, 13.4050, 6, "Technical University of Munich: Rank 6"],
    [41.9028, 12.4964, 7, "Sapienza University of Rome: Rank 7"],
    [55.7558, 37.6173, 8, "Lomonosov Moscow State University: Rank 8"],
    [37.7749, -122.4194, 9, "University of California, Berkeley: Rank 9"],
    [39.9042, 116.4074, 10, "Tsinghua University: Rank 10"],
  ];

  const options = {
    region: "world",
    displayMode: "markers",
    colorAxis: { colors: ["#FFA07A", "#DC143C", "#8B0000"] },
    sizeAxis: { minValue: 1, maxValue: 1 },
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
    legend: {
      textStyle: {
        color: "white", 
        fontSize: 38,  
      },
      alignment: "center", 
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
        }}>Top Universities in the World (2025)</h2>

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
