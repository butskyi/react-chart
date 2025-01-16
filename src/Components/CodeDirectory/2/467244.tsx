import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../../AdditionalFilesDirectory/animal_species.jpg";

const AnimalSpeciesChart = () => {
  const data = {
    species: [
      {
        name: "African Elephant",
        populationData: [
          { year: 2000, population: 4700 },
          { year: 2005, population: 4500 },
          { year: 2010, population: 4200 },
          { year: 2015, population: 4000 },
          { year: 2020, population: 4150 },
        ],
      },
      {
        name: "Bengal Tiger",
        populationData: [
          { year: 2000, population: 3200 },
          { year: 2005, population: 3500 },
          { year: 2010, population: 3800 },
          { year: 2015, population: 4100 },
          { year: 2020, population: 4500 },
        ],
      },
      {
        name: "Giant Panda",
        populationData: [
          { year: 2000, population: 1000 },
          { year: 2005, population: 1200 },
          { year: 2010, population: 1600 },
          { year: 2015, population: 1800 },
          { year: 2020, population: 2000 },
        ],
      },
      {
        name: "Blue Whale",
        populationData: [
          { year: 2000, population: 5000 },
          { year: 2005, population: 7000 },
          { year: 2010, population: 10000 },
          { year: 2015, population: 15000 },
          { year: 2020, population: 20000 },
        ],
      },
      {
        name: "Mountain Gorilla",
        populationData: [
          { year: 2000, population: 620 },
          { year: 2005, population: 700 },
          { year: 2010, population: 780 },
          { year: 2015, population: 880 },
          { year: 2020, population: 1000 },
        ],
      },
      {
        name: "Sumatran Rhino",
        populationData: [
          { year: 2000, population: 300 },
          { year: 2005, population: 275 },
          { year: 2010, population: 250 },
          { year: 2015, population: 100 },
          { year: 2020, population: 80 },
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
      text: "Animal Species Population Trends",
      font: {
        family: "Caveat",
        size: 70,
        color: "rgb(134, 22, 134)",
      },
      x: 0.48,
      y: 0.975,
      xanchor: "center",
    },
    
    legend: {
      font: {
        family: "Caveat",
        size: 40,
        color: "#050505FF",
      },
      traceorder: "normal",
      orientation: "v",
      x: 1.05,
      xanchor: "left",
      y: 1,
      yanchor: "top",
    },
    xaxis: {
      title: {
        text: "Year",
        font: {
          family: "Caveat",
          size: 40,
          color: "#002944FF",
        },
      },
      showgrid: true,
      gridcolor: "#3BB6CCFF",
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#4B033BFF",
      },
    },
    yaxis: {
      title: {
        text: "Population",
        font: {
          family: "Caveat",
          size: 40,
          color: "#520052FF",
        },
      },
      showgrid: true,
      gridcolor: "#2CBBDFFF",
      range: [0, 10000],
      tickfont: {
        family: "Caveat",
        size: 40,
        color: "#035311FF",
      },
    },
    paper_bgcolor: "rgba(0.4, 0, 0.9, 0.2)",
    plot_bgcolor: "rgba( 0, 0, 0, 0.1)",
    width: 1800,
    height: 900,
    hovermode: "closest",
    margin: {
      l: 80,
      r: 150,
      t: 120,
      b: 80,
    },
  };

  return (
    <div style={containerStyle}>
      <GoogleFontLoader
        fonts={[{ font: "Caveat", weights: [700, 800] }]}
        subsets={["latin", "cyrillic"]}
      />
      <div className="plot-container" style={plotStyle}>
        <Plot
          data={data.species.map((species) => ({
            x: species.populationData.map((d) => d.year),
            y: species.populationData.map((d) => d.population),
            type: "scatter",
            mode: "lines+markers",
            name: species.name,
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
          opacity: 0.25,
        }}
      />
    </div>
  );
};

export default AnimalSpeciesChart;
