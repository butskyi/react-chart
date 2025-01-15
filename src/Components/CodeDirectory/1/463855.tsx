import React from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import GoogleFontLoader from "react-google-font-loader";
import back from "../../AdditionalFilesDirectory/income_trends_background.jpg"; 

const IncomeTrendsChart = () => {
  const data = {
    countries: [
      {
        name: "United States",
        incomeData: [
          { year: 2000, income: 45000 },
          { year: 2005, income: 50000 },
          { year: 2010, income: 55000 },
          { year: 2015, income: 60000 },
          { year: 2020, income: 65000 },
        ],
      },
      {
        name: "Germany",
        incomeData: [
          { year: 2000, income: 40000 },
          { year: 2005, income: 45000 },
          { year: 2010, income: 48000 },
          { year: 2015, income: 52000 },
          { year: 2020, income: 58000 },
        ],
      },
      {
        name: "China",
        incomeData: [
          { year: 2000, income: 10000 },
          { year: 2005, income: 15000 },
          { year: 2010, income: 25000 },
          { year: 2015, income: 40000 },
          { year: 2020, income: 50000 },
        ],
      },
      {
        name: "India",
        incomeData: [
          { year: 2000, income: 5000 },
          { year: 2005, income: 7000 },
          { year: 2010, income: 12000 },
          { year: 2015, income: 25000 },
          { year: 2020, income: 30000 },
        ],
      },
      {
        name: "United Kingdom",
        incomeData: [
          { year: 2000, income: 38000 },
          { year: 2005, income: 42000 },
          { year: 2010, income: 46000 },
          { year: 2015, income: 51000 },
          { year: 2020, income: 56000 },
        ],
      },
      {
        name: "Japan",
        incomeData: [
          { year: 2000, income: 35000 },
          { year: 2005, income: 37000 },
          { year: 2010, income: 42000 },
          { year: 2015, income: 45000 },
          { year: 2020, income: 50000 },
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
      text: "Income Trends Over Years by Country",
      font: {
        family: "Caveat",
        size: 70,
        color: "rgb(34, 139, 34)",
      },
      x: 0.5,
      y: 0.975,
      xanchor: "center",
    },
    annotations: [
      {
        text: "Income Trends Over Years by Country",
        font: {
          family: "Caveat",
          size: 70,
          color: "rgba(0, 0, 0, 0.3)", 
        },
        x: 0.59,
        y: 1.1,
        xref: "paper",
        yref: "paper",
        xanchor: "center",
        showarrow: false,
      },
    ],
    legend: {
      font: {
        family: "Caveat",
        size: 40,
        color: "#212220FF",
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
          color: "#235678",
        },
      },
      showgrid: true,
      gridcolor: "#3BB6CCFF",
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#E030BAFF",
      },
    },
    yaxis: {
      title: {
        text: "Income (USD)",
        font: {
          family: "Caveat",
          size: 40,
          color: "#235677",
        },
      },
      showgrid: true,
      gridcolor: "#2CBBDFFF",
      range: [0, 70000],
      tickfont: {
        family: "Caveat",
        size: 30,
        color: "#AC249AFF",
      },
    },
    paper_bgcolor: "rgba(0.4, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0.6, 0, 0)",
    width: 1800,
    height: 1300,
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
          data={data.countries.map((country) => ({
            x: country.incomeData.map((d) => d.year),
            y: country.incomeData.map((d) => d.income),
            type: "scatter",
            mode: "lines+markers",
            name: country.name,
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
          opacity: 0.2,
        }}
      />
    </div>
  );
};

export default IncomeTrendsChart;
