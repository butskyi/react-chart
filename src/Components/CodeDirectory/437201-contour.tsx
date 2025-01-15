import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../AdditionalFilesDirectory/temperature_contour.jpeg"; // This image remains the same as the background image

const ContourChart = () => {
  const data = {
    cities: [
      {
        name: "New York",
        temperatureReadings: [
          { timeOfDay: 0, temperature: 10 },
          { timeOfDay: 1, temperature: 9 },
          { timeOfDay: 2, temperature: 8 },
          { timeOfDay: 3, temperature: 8 },
          { timeOfDay: 4, temperature: 7 },
          { timeOfDay: 5, temperature: 7 },
          { timeOfDay: 6, temperature: 9 },
          { timeOfDay: 7, temperature: 12 },
          { timeOfDay: 8, temperature: 16 },
          { timeOfDay: 9, temperature: 18 },
          { timeOfDay: 10, temperature: 20 },
          { timeOfDay: 11, temperature: 21 },
          { timeOfDay: 12, temperature: 22 },
          { timeOfDay: 13, temperature: 23 },
          { timeOfDay: 14, temperature: 24 },
          { timeOfDay: 15, temperature: 23 },
          { timeOfDay: 16, temperature: 22 },
          { timeOfDay: 17, temperature: 20 },
          { timeOfDay: 18, temperature: 18 },
          { timeOfDay: 19, temperature: 16 },
          { timeOfDay: 20, temperature: 14 },
          { timeOfDay: 21, temperature: 12 },
          { timeOfDay: 22, temperature: 11 },
          { timeOfDay: 23, temperature: 10 },
        ],
      },
      {
        name: "Los Angeles",
        temperatureReadings: [
          { timeOfDay: 0, temperature: 18 },
          { timeOfDay: 1, temperature: 17 },
          { timeOfDay: 2, temperature: 17 },
          { timeOfDay: 3, temperature: 17 },
          { timeOfDay: 4, temperature: 17 },
          { timeOfDay: 5, temperature: 18 },
          { timeOfDay: 6, temperature: 20 },
          { timeOfDay: 7, temperature: 22 },
          { timeOfDay: 8, temperature: 24 },
          { timeOfDay: 9, temperature: 26 },
          { timeOfDay: 10, temperature: 28 },
          { timeOfDay: 11, temperature: 29 },
          { timeOfDay: 12, temperature: 30 },
          { timeOfDay: 13, temperature: 31 },
          { timeOfDay: 14, temperature: 32 },
          { timeOfDay: 15, temperature: 30 },
          { timeOfDay: 16, temperature: 28 },
          { timeOfDay: 17, temperature: 26 },
          { timeOfDay: 18, temperature: 24 },
          { timeOfDay: 19, temperature: 22 },
          { timeOfDay: 20, temperature: 21 },
          { timeOfDay: 21, temperature: 19 },
          { timeOfDay: 22, temperature: 18 },
          { timeOfDay: 23, temperature: 18 },
        ],
      },
      {
        name: "Chicago",
        temperatureReadings: [
          { timeOfDay: 0, temperature: 5 },
          { timeOfDay: 1, temperature: 4 },
          { timeOfDay: 2, temperature: 4 },
          { timeOfDay: 3, temperature: 3 },
          { timeOfDay: 4, temperature: 3 },
          { timeOfDay: 5, temperature: 3 },
          { timeOfDay: 6, temperature: 4 },
          { timeOfDay: 7, temperature: 6 },
          { timeOfDay: 8, temperature: 9 },
          { timeOfDay: 9, temperature: 11 },
          { timeOfDay: 10, temperature: 13 },
          { timeOfDay: 11, temperature: 14 },
          { timeOfDay: 12, temperature: 15 },
          { timeOfDay: 13, temperature: 16 },
          { timeOfDay: 14, temperature: 17 },
          { timeOfDay: 15, temperature: 16 },
          { timeOfDay: 16, temperature: 15 },
          { timeOfDay: 17, temperature: 13 },
          { timeOfDay: 18, temperature: 11 },
          { timeOfDay: 19, temperature: 9 },
          { timeOfDay: 20, temperature: 7 },
          { timeOfDay: 21, temperature: 6 },
          { timeOfDay: 22, temperature: 5 },
          { timeOfDay: 23, temperature: 5 },
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
      text: "Temperature Variation Throughout the Day by City",
      font: {
        family: "Caveat",
        size: 40,
        color: "rgb(255, 165, 0)",
      },
      x: 0.5,
    },
    xaxis: {
      title: {
        text: "Time of Day (Hours)",
        font: {
          family: "Caveat",
          size: 25,
          color: "#235678",
        },
      },
      showgrid: true,
      zeroline: false,
      gridcolor: "#567894",
      tickfont: {
        family: "Caveat",
        size: 14,
        color: "#456789",
      },
    },
    yaxis: {
      title: {
        text: "Temperature (°C)",
        font: {
          family: "Caveat",
          size: 25,
          color: "#235677",
        },
      },
      showgrid: true,
      zeroline: false,
      gridcolor: "#679064",
      tickfont: {
        family: "Caveat",
        size: 14,
        color: "#346789",
      },
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    width: 1200,
    height: 900,
    hovermode: "closest",
  };
  

  return (
    <div style={containerStyle}>
      <GoogleFontLoader
        fonts={[
          {
            font: "Caveat",
            weights: [400, 700],
          },
        ]}
        subsets={["latin", "cyrillic"]}
      />
      <div style={plotStyle}>
        <Plot
          data={data.cities.map((city, index) => ({
            x: city.temperatureReadings.map((d) => d.timeOfDay),
            y: city.temperatureReadings.map((d) => d.temperature),
            type: "histogram2dcontour",
            name: city.name,
            colorscale: index === 0 ? "YlOrRd" : index === 1 ? "YlGnBu" : "Cividis",
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
          opacity: 0.3, // Opacity for background image only
        }}
      />
    </div>
  );
};

export default ContourChart;
