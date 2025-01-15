import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../../AdditionalFilesDirectory/fuel_wordchart.jpg";

const FuelWordCloud: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fuels = [
      { text: "Gasoline", size: 60 },
      { text: "Diesel", size: 55 },
      { text: "Electric", size: 50 },
      { text: "Hydrogen", size: 45 },
      { text: "Ethanol", size: 40 },
      { text: "Biodiesel", size: 35 },
      { text: "CNG", size: 30 },
      { text: "LPG", size: 30 },
      { text: "Propane", size: 25 },
      { text: "Methanol", size: 25 },
      { text: "Solar", size: 40 },
      { text: "Nuclear", size: 35 },
      { text: "Wind", size: 30 },
      { text: "Geothermal", size: 25 },
      { text: "Biomass", size: 30 },
      { text: "Tidal", size: 20 },
      { text: "Hybrid", size: 45 },
      { text: "Synthetic", size: 30 },
      { text: "Biofuel", size: 35 },
      { text: "Natural Gas", size: 40 },
    ];

    const layout = cloud()
      .size([1600, 1200])
      .words(fuels)
      .padding(30)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d: any) => (d.size + 10) * 0.9) // Increased font size by 10
      .spiral("archimedean")
      .on("end", draw);

    layout.start();

    function draw(words: any) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      svg
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 1000 800")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", "translate(500,400)")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d: any) => `${d.size}px`)
        .style("font-family", "Impact")
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .style("stroke", "#020") // Adding a stroke to make the text stand out
        .style("stroke-width", "1px")
        .attr("text-anchor", "middle")
        .attr("transform", (d: any) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d: any) => d.text);
    }
  }, []);

  return (
    <>
      <GoogleFontLoader fonts={[{ font: 'Courgette', weights: [400, 700] }]} />
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          zIndex: -1
        }} />
        <h2 style={{
          fontFamily: "'Courgette', cursive",
          color: "#0d5",
          textShadow: "6px 2px 4px rgba(0.3, 0.7, 0, 1)",
          fontSize: "6em",
          marginBottom: "10px"
        }}>
          Fuel Types Word Cloud
        </h2>
        <svg ref={svgRef} style={{ width: "100%", height: "80vh" }}></svg>
        <div style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "3em",
          color: "#f52",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
        }}>
          <em>Data showcases the popularity of different fuel types based on usage and demand.</em>
        </div>
      </div>
    </>
  );
};

export default FuelWordCloud;
