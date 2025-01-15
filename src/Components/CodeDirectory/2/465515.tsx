import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../../AdditionalFilesDirectory/Storms.jpg"; 

const StormChart = () => {
  const data = {
    regions: [
      {
        name: "North Atlantic",
        stormData: [
          { timeOfDay: 0, intensity: 20 },
          { timeOfDay: 1, intensity: 22 },
          { timeOfDay: 2, intensity: 25 },
          { timeOfDay: 3, intensity: 28 },
          { timeOfDay: 4, intensity: 30 },
          { timeOfDay: 5, intensity: 35 },
          { timeOfDay: 6, intensity: 40 },
          { timeOfDay: 7, intensity: 45 },
          { timeOfDay: 8, intensity: 50 },
          { timeOfDay: 9, intensity: 55 },
          { timeOfDay: 10, intensity: 60 },
          { timeOfDay: 11, intensity: 58 },
          { timeOfDay: 12, intensity: 55 },
          { timeOfDay: 13, intensity: 50 },
          { timeOfDay: 14, intensity: 48 },
          { timeOfDay: 15, intensity: 45 },
          { timeOfDay: 16, intensity: 40 },
          { timeOfDay: 17, intensity: 35 },
          { timeOfDay: 18, intensity: 30 },
          { timeOfDay: 19, intensity: 28 },
          { timeOfDay: 20, intensity: 25 },
          { timeOfDay: 21, intensity: 22 },
          { timeOfDay: 22, intensity: 20 },
          { timeOfDay: 23, intensity: 18 },
        ],
      },
      {
        name: "Pacific Ocean",
        stormData: [
          { timeOfDay: 0, intensity: 25 },
          { timeOfDay: 1, intensity: 30 },
         
        ],
      },
      {
        name: "Indian Ocean",
        stormData: [
          { timeOfDay: 0, intensity: 18 },
          { timeOfDay: 1, intensity: 20 },
        
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
      text: "Storm Intensity Over a Day by Ocean Region",
      font: {
        family: "Caveat",
        size: 75,
        color:"#44043CFF",
        
      },
      x: 0.5,
    },
    xaxis: {
      title: {
        text: "Time of Day (Hours)",
        font: {
          family: "Caveat",
          size: 40, 
          color: "#0066FF",
        },
      },
      showgrid: true,
      gridcolor: "#B0D4F1",
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#003366",
      },
    },
    yaxis: {
      title: {
        text: "Storm Intensity (Wind Speed, Pressure, etc.)",
        font: {
          family: "Caveat",
          size: 40, 
          color: "#003366",
        },
      },
      showgrid: true,
      gridcolor: "#679064",
      range: [0, 70], 
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#003366",
      },
    },
    legend: {
      font: {
        family: "Caveat",
        size: 20,
        color: "#1A0AA3FF",
      },
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(1, 0, 0, 0)",
    width: 1600,
    height: 800,
    hovermode: "closest",
    margin: {
      l: 100,
      r: 50,
      t: 100,
      b: 80,
    },
    showlegend: true,
  };
  

  return (
    <div style={containerStyle}>
      <GoogleFontLoader
        fonts={[{ font: "Caveat", weights: [800, 700] }]}
        subsets={["latin", "cyrillic"]}
      />
      <div style={plotStyle}>
        <Plot
          data={data.regions.map((region, index) => ({
            x: region.stormData.map((d) => d.timeOfDay),
            y: region.stormData.map((d) => d.intensity),
            type: "histogram2dcontour",
            name: region.name,
            colorscale: index === 0 ? "Blues" : index === 1 ? "PuBuGn" : "YlGnBu",
            showscale: true,
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
          opacity: 0.38,
        }}
      />
    </div>
  );
};

export default StormChart;
