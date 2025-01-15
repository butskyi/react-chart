import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../../AdditionalFilesDirectory/Topographic.jpg"; 

const TopographicChart = () => {
  const data = {
    terrain: [
      {
        name: "Elevation Levels",
        grid: [
          { x: 0, y: 0, elevation: 100 },
          { x: 0, y: 1, elevation: 200 },
          { x: 0, y: 2, elevation: 300 },
          { x: 1, y: 0, elevation: 150 },
          { x: 1, y: 1, elevation: 250 },
          { x: 1, y: 2, elevation: 350 },
          { x: 2, y: 0, elevation: 180 },
          { x: 2, y: 1, elevation: 280 },
          { x: 2, y: 2, elevation: 400 },
        ],
      },
    ],
  };

  const layout: Partial<Layout> = {
    title: {
      text: "Topographic Elevation Map",
      font: {
        family: "Caveat",
        size: 75,
        color: "rgb(94, 94, 58)",
      },
      x: 0.5,
    },
    xaxis: {
      title: {
        text: "Longitude",
        font: {
          family: "Caveat",
          size: 35,
          color: "rgb(134, 94, 168)",
        },
      },
      tickfont: {
        size: 20,
        color: "rgb(0, 0, 0)",
      },
      showgrid: true,
      gridcolor: "#ccc",
    },
    yaxis: {
      title: {
        text: "Latitude",
        font: {
          family: "Caveat",
          size: 35,
          color: "rgb(34, 94, 168)",
        },
      },
      tickfont: {
        size: 20, 
        color: "rgb(0, 0, 0)",
      },
      showgrid: true,
      gridcolor: "#c65",
    },
    legend: {
      font: {
        size: 30, 
        color: "rgb(0, 0, 0)",
      },
      orientation: "h",
    },
    width: 1200,
    height: 800,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 100, r: 50, t: 100, b: 80 },
  };
  
  

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, 
        }}
      >
        <img
          src={back}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5, 
          }}
        />
      </div>

      <GoogleFontLoader
        fonts={[{ font: "Caveat", weights: [800, 700] }]}
        subsets={["latin"]}
      />
      <Plot
        data={[
          {
            x: data.terrain[0].grid.map((point) => point.x),
            y: data.terrain[0].grid.map((point) => point.y),
            z: data.terrain[0].grid.map((point) => point.elevation),
            type: "contour",
            colorscale: "Earth",
            contours: {
              coloring: "heatmap",
              showlines: true,
            },
            name: data.terrain[0].name,
          },
        ]}
        layout={layout}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default TopographicChart;
