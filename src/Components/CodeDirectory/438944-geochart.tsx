import React from "react";
import { Chart } from "react-google-charts";
import backImg from '../AdditionalFilesDirectory/medal_geochart.jpg';

function App() {
  const data = [
    ["Latitude", "Longitude", "Gold Medals", { role: "tooltip", type: "string" }],
    [37.0902, -95.7129, 39, "United States: 39 Gold Medals"], 
    [55.7558, 37.6173, 20, "Russia: 20 Gold Medals"], 
    [35.6895, 139.6917, 27, "Japan: 27 Gold Medals"], 
    [51.1657, 10.4515, 11, "Germany: 11 Gold Medals"], 
    [55.3781, -3.4360, 22, "United Kingdom: 22 Gold Medals"], 
    [46.6034, 1.8883, 10, "France: 10 Gold Medals"], 
    [37.5665, 126.9780, 6, "South Korea: 6 Gold Medals"], 
    [56.1304, -106.3468, 7, "Canada: 7 Gold Medals"], 
    [-25.2744, 133.7751, 17, "Australia: 17 Gold Medals"], 
    [20.5937, 78.9629, 7, "India: 7 Gold Medals"], 
    [-14.2350, -51.9253, 8, "Brazil: 8 Gold Medals"], 
    [35.8617, 104.1954, 38, "China: 38 Gold Medals"], 
    [23.6345, -102.5528, 4, "Mexico: 4 Gold Medals"], 
    [-30.5595, 22.9375, 3, "South Africa: 3 Gold Medals"], 
  ];

  const options = {
    region: "world",
    displayMode: "markers",
    colorAxis: { colors: ["#ffcccb", "#ff4500", "#8b0000"] },
    backgroundColor: "transparent",
    datalessRegionColor: "#f8f9fa",
    tooltip: {
      isHtml: true, // Enable HTML tooltips
      textStyle: {
        color: "black", // Tooltip text color
        fontSize: 12,
      },
      showColorCode: true, // Show color code with tooltip
      trigger: "focus", // Show tooltip on marker focus/hover
    },
  };

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    } as React.CSSProperties,
    imageBg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage: `url(${backImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.2, // Set opacity for the image only
      zIndex: 1,
    } as React.CSSProperties,
    gradientBg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #ff7e5f, #feb47b, #ff6a6a, #d72638)",
      backgroundSize: "400% 400%",
      animation: "gradientAnimation 10s ease infinite",
      zIndex: -1,
    } as React.CSSProperties,
    innerContent: {
      textAlign: "center",
      color: "white",
      zIndex: 1,
      padding: "2rem",
      backdropFilter: "blur(5px)",
      borderRadius: "10px",
    } as React.CSSProperties,
    title: {
      fontSize: "2rem",
      marginBottom: "1rem",
    } as React.CSSProperties,
    "@keyframes gradientAnimation": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageBg}></div>
      <div style={styles.gradientBg}></div>

      <div style={styles.innerContent}>
        <h2 style={styles.title}>Global Distribution of Gold Medals</h2>

        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          width="100%"
          height="70vh"
        />
      </div>
    </div>
  );
}

export default App;
