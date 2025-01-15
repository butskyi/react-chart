import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../../AdditionalFilesDirectory/vegetable.jpg";

const VegetableWordCloud: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const vegetables = [
      { text: "Tomato", size: 60 },
      { text: "Carrot", size: 55 },
      { text: "Broccoli", size: 50 },
      { text: "Spinach", size: 45 },
      { text: "Cucumber", size: 40 },
      { text: "Lettuce", size: 35 },
      { text: "Pepper", size: 30 },
      { text: "Onion", size: 30 },
      { text: "Garlic", size: 25 },
      { text: "Potato", size: 25 },
      { text: "Eggplant", size: 40 },
      { text: "Zucchini", size: 35 },
      { text: "Cauliflower", size: 30 },
      { text: "Asparagus", size: 25 },
      { text: "Celery", size: 30 },
      { text: "Radish", size: 20 },
      { text: "Kale", size: 45 },
      { text: "Pumpkin", size: 30 },
      { text: "Cabbage", size: 35 },
      { text: "Beetroot", size: 40 },
    ];

    const layout = cloud()
      .size([1600, 1200])
      .words(vegetables)
      .padding(30)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d: any) => (d.size + 10) * 0.9)
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
        .style("stroke", "#020")
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
          opacity: 0.7,
          zIndex: -1
        }} />
        <h2 style={{
          fontFamily: "'Courgette', cursive",
          color: "#32F800FF",
          textShadow: "12px 2px 4px rgba(0.5, 1, 0, 0.5)",
          fontSize: "6em",
          marginBottom: "10px"
        }}>
          Vegetable Word Cloud
        </h2>
        <svg ref={svgRef} style={{ width: "100%", height: "80vh" }}></svg>
        <div style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "3em",
          color: "#04F1F1FF",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
        }}>
          <em>Showcasing the diversity of vegetables in our diets</em>
        </div>
      </div>
    </>
  );
};

export default VegetableWordCloud;
