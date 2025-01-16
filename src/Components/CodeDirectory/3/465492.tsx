import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../../AdditionalFilesDirectory/motivation.jpg"; // Background image for motivation

const MotivationalWordCloud: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const motivationalWords = [
      { text: "Inspire", size: 90 },
      { text: "Achieve", size: 80 },
      { text: "Dream", size: 75 },
      { text: "Believe", size: 70 },
      { text: "Create", size: 65 },
      { text: "Courage", size: 60 },
      { text: "Success", size: 55 },
      { text: "Happiness", size: 70 },
      { text: "Empower", size: 65 },
      { text: "Love", size: 60 },
      { text: "Strength", size: 55 },
      { text: "Hope", size: 50 },
      { text: "Focus", size: 50 },
      { text: "Gratitude", size: 70 },
      { text: "Joy", size: 60 },
      { text: "Energy", size: 55 },
      { text: "Passion", size: 50 },
      { text: "Persevere", size: 50 },
      { text: "Hustle", size: 80 },
      { text: "Faith", size: 60 },
    ];

    const layout = cloud()
      .size([1600, 1200])
      .words(motivationalWords)
      .padding(20)
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
        .style("stroke", "#f33")
        .style("stroke-width", "1px")
        .attr("text-anchor", "middle")
        .attr("transform", (d: any) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d: any) => d.text);
    }
  }, []);

  return (
    <>
      <GoogleFontLoader fonts={[{ font: "Impact", weights: [400, 700] }]} />
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <h2
          style={{
            fontFamily: "Dancing Script, cursive",
            color: "#DFF400FF",
            textShadow: "8px 5px 5px rgba(0.9, 0.5, 0, 0.5)",
            fontSize: "5em",
            marginBottom: "20px",
          }}
        >
          Motivational Word Cloud
        </h2>
        <svg ref={svgRef} style={{ width: "100%", height: "80vh" }}></svg>
        <div
          style={{
            marginTop: "10px",
            textAlign: "center",
            fontSize: "3em",
            color: "#EA08EAFF",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          <em>Words to inspire and uplift your spirit</em>
        </div>
      </div>
    </>
  );
};

export default MotivationalWordCloud;
