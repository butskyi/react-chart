import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../AdditionalFilesDirectory/web_trafic_contour_chart.jpg"; 

const TrafficContourChart = () => {
  const data = {
    regions: [
      {
        name: "North America",
        trafficReadings: [
          { timeOfDay: 0, visitors: 200 },
          { timeOfDay: 1, visitors: 180 },
          { timeOfDay: 2, visitors: 160 },
          { timeOfDay: 3, visitors: 150 },
          { timeOfDay: 4, visitors: 140 },
          { timeOfDay: 5, visitors: 130 },
          { timeOfDay: 6, visitors: 200 },
          { timeOfDay: 7, visitors: 300 },
          { timeOfDay: 8, visitors: 500 },
          { timeOfDay: 9, visitors: 700 },
          { timeOfDay: 10, visitors: 800 },
          { timeOfDay: 11, visitors: 850 },
          { timeOfDay: 12, visitors: 900 },
          { timeOfDay: 13, visitors: 950 },
          { timeOfDay: 14, visitors: 1000 },
          { timeOfDay: 15, visitors: 950 },
          { timeOfDay: 16, visitors: 850 },
          { timeOfDay: 17, visitors: 700 },
          { timeOfDay: 18, visitors: 650 },
          { timeOfDay: 19, visitors: 600 },
          { timeOfDay: 20, visitors: 550 },
          { timeOfDay: 21, visitors: 500 },
          { timeOfDay: 22, visitors: 400 },
          { timeOfDay: 23, visitors: 350 },
        ],
      },
      {
        name: "Europe",
        trafficReadings: [
          { timeOfDay: 0, visitors: 150 },
          { timeOfDay: 1, visitors: 140 },
          { timeOfDay: 2, visitors: 130 },
          { timeOfDay: 3, visitors: 120 },
          { timeOfDay: 4, visitors: 110 },
          { timeOfDay: 5, visitors: 100 },
          { timeOfDay: 6, visitors: 150 },
          { timeOfDay: 7, visitors: 250 },
          { timeOfDay: 8, visitors: 400 },
          { timeOfDay: 9, visitors: 600 },
          { timeOfDay: 10, visitors: 700 },
          { timeOfDay: 11, visitors: 750 },
          { timeOfDay: 12, visitors: 800 },
          { timeOfDay: 13, visitors: 850 },
          { timeOfDay: 14, visitors: 900 },
          { timeOfDay: 15, visitors: 850 },
          { timeOfDay: 16, visitors: 750 },
          { timeOfDay: 17, visitors: 650 },
          { timeOfDay: 18, visitors: 600 },
          { timeOfDay: 19, visitors: 550 },
          { timeOfDay: 20, visitors: 500 },
          { timeOfDay: 21, visitors: 450 },
          { timeOfDay: 22, visitors: 400 },
          { timeOfDay: 23, visitors: 350 },
        ],
      },
      {
        name: "Asia",
        trafficReadings: [
          { timeOfDay: 0, visitors: 500 },
          { timeOfDay: 1, visitors: 480 },
          { timeOfDay: 2, visitors: 470 },
          { timeOfDay: 3, visitors: 450 },
          { timeOfDay: 4, visitors: 430 },
          { timeOfDay: 5, visitors: 400 },
          { timeOfDay: 6, visitors: 500 },
          { timeOfDay: 7, visitors: 700 },
          { timeOfDay: 8, visitors: 1000 },
          { timeOfDay: 9, visitors: 1200 },
          { timeOfDay: 10, visitors: 1300 },
          { timeOfDay: 11, visitors: 1350 },
          { timeOfDay: 12, visitors: 1400 },
          { timeOfDay: 13, visitors: 1450 },
          { timeOfDay: 14, visitors: 1500 },
          { timeOfDay: 15, visitors: 1400 },
          { timeOfDay: 16, visitors: 1300 },
          { timeOfDay: 17, visitors: 1200 },
          { timeOfDay: 18, visitors: 1100 },
          { timeOfDay: 19, visitors: 1000 },
          { timeOfDay: 20, visitors: 900 },
          { timeOfDay: 21, visitors: 800 },
          { timeOfDay: 22, visitors: 700 },
          { timeOfDay: 23, visitors: 600 },
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
      text: "Website Traffic Over a Day by Region",
      font: {
        family: "Caveat",
        size: 65,
        color: "rgb(255, 0, 0)", 
      },
      x: 0.5,
    },
    xaxis: {
      title: {
        text: "Time of Day (Hours)",
        font: {
          family: "Caveat",
          size: 30,
          color: "#235678",
        },
      },
      showgrid: true,
      zeroline: false,
      gridcolor: "#315E83FF",
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#34095CFF",
      },
    },
    yaxis: {
      title: {
        text: "Visitors (Count)",
        font: {
          family: "Caveat",
          size: 30,
          color: "#235677",
        },
        standoff: 40, // Move the y-axis title further from the axis
      },
      showgrid: true,
      zeroline: false,
      gridcolor: "#679064",
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#3F0D4EFF",
      },
      range: [0, 1600], // Adjust this range based on your data
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    width: 1600,
    height: 1200,
    hovermode: "closest",
    margin: {
      l: 100, // Increase left margin
      r: 50,
      t: 100,
      b: 80
    },
  };

  return (
    <div style={containerStyle}>
      <GoogleFontLoader
        fonts={[
          {
            font: "Caveat",
            weights: [800, 700],
          },
        ]}
        subsets={["latin", "cyrillic"]}
      />
      <div style={plotStyle}>
        <Plot
          data={data.regions.map((region, index) => ({
            x: region.trafficReadings.map((d) => d.timeOfDay),
            y: region.trafficReadings.map((d) => d.visitors),
            type: "histogram2dcontour",
            name: region.name,
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
          opacity: 0.12, 
        }}
      />
    </div>
  );
};

export default TrafficContourChart;
