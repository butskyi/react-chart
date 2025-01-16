import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../../AdditionalFilesDirectory/co2_emissions.jpg";

const GlobalCO2EmissionsChart = () => {
  const data = {
    regions: [
      {
        name: "North America",
        emissionsData: [
          { year: 2000, emissions: 5000 },
          { year: 2005, emissions: 5200 },
          { year: 2010, emissions: 4900 },
          { year: 2015, emissions: 4700 },
          { year: 2020, emissions: 4600 },
        ],
      },
      {
        name: "Europe",
        emissionsData: [
          { year: 2000, emissions: 4300 },
          { year: 2005, emissions: 4200 },
          { year: 2010, emissions: 4000 },
          { year: 2015, emissions: 3800 },
          { year: 2020, emissions: 3500 },
        ],
      },
      {
        name: "Asia",
        emissionsData: [
          { year: 2000, emissions: 8000 },
          { year: 2005, emissions: 8500 },
          { year: 2010, emissions: 9000 },
          { year: 2015, emissions: 11000 },
          { year: 2020, emissions: 12500 },
        ],
      },
      {
        name: "Africa",
        emissionsData: [
          { year: 2000, emissions: 1500 },
          { year: 2005, emissions: 1700 },
          { year: 2010, emissions: 1900 },
          { year: 2015, emissions: 2200 },
          { year: 2020, emissions: 2500 },
        ],
      },
      {
        name: "South America",
        emissionsData: [
          { year: 2000, emissions: 2000 },
          { year: 2005, emissions: 2100 },
          { year: 2010, emissions: 2200 },
          { year: 2015, emissions: 2300 },
          { year: 2020, emissions: 2400 },
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
    marginTop: "10px",
  };

  const layout: Partial<Layout> = {
    title: {
      text: "Global CO₂ Emissions Trends by Region",
      font: {
        family: "Roboto",
        size: 60,
        color: "rgb(40, 80, 160)",
      },
      x: 0.5,
      y: 0.95,
      xanchor: "center",
    },
    legend: {
      font: {
        family: "Roboto",
        size: 25,
        color: "#333333",
      },
      traceorder: "normal",
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: -0.2,
      yanchor: "top",
    },
    xaxis: {
      title: {
        text: "Year",
        font: {
          family: "Roboto",
          size: 30,
          color: "#003366",
        },
      },
      showgrid: true,
      gridcolor: "#DDDDDD",
      tickfont: {
        family: "Roboto",
        size: 25,
        color: "#333333",
      },
    },
    yaxis: {
      title: {
        text: "CO₂ Emissions (Million Metric Tons)",
        font: {
          family: "Roboto",
          size: 30,
          color: "#003366",
        },
      },
      showgrid: true,
      gridcolor: "#5E0ABE65",
      tickfont: {
        family: "Roboto",
        size: 25,
        color: "#333333",
      },
    },
    paper_bgcolor: "rgba(45, 43, 154, 0.1)",
    plot_bgcolor: "rgba(155, 155, 155, 0.5)",
    width: 1600,
    height: 800,
    hovermode: "closest",
    margin: {
      l: 80,
      r: 80,
      t: 100,
      b: 100,
    },
  };

  return (
    <div style={containerStyle}>
      <GoogleFontLoader fonts={[{ font: "Roboto", weights: [400, 700] }]} />
      <div className="plot-container" style={plotStyle}>
        <Plot
          data={data.regions.map((region) => ({
            x: region.emissionsData.map((d) => d.year),
            y: region.emissionsData.map((d) => d.emissions),
            type: "scatter",
            mode: "lines+markers",
            name: region.name,
            line: { shape: "spline", width: 3 },
            marker: { size: 8 },
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
          opacity: 0.35,
        }}
      />
    </div>
  );
};

export default GlobalCO2EmissionsChart;
