import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import backimg from "../AdditionalFilesDirectory/fruits_wordchart.jpg"; // Update with the correct path

const FruitWordCloud: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fruits = [
      { text: "Apple", size: 50 },
      { text: "Banana", size: 40 },
      { text: "Orange", size: 45 },
      { text: "Mango", size: 55 },
      { text: "Pineapple", size: 50 },
      { text: "Grapes", size: 35 },
      { text: "Strawberry", size: 30 },
      { text: "Blueberry", size: 50 },
      { text: "Watermelon", size: 60 },
      { text: "Peach", size: 40 },
      { text: "Cherry", size: 50 },
      { text: "Pear", size: 30 },
      { text: "Kiwi", size: 35 },
      { text: "Papaya", size: 25 },
      { text: "Guava", size: 45 },
      { text: "Coconut", size: 55 },
      { text: "Fig", size: 30 },
      { text: "Pomegranate", size: 25 },
      { text: "Blackberry", size: 40 },
      { text: "Lemon", size: 30 },
    ];

    const layout = cloud()
      .size([1000, 800])
      .words(fruits)
      .padding(10) // Increase padding to reduce overlap
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d: any) => d.size)
      .spiral("archimedean") // Improve word placement
      .on("end", draw);

    layout.start();

    function draw(words: any) {
      const svg = d3.select(svgRef.current);
      svg
        .attr("viewBox", `0 0 1000 800`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .selectAll("*")
        .remove(); // Clear previous SVG content

      svg
        .append("g")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d: any) => `${d.size}px`)
        .style("font-family", "Impact")
        .style(
          "fill",
          () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
        )
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
        )
        .text((d: any) => d.text);
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        backgroundImage: `url(${backimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          fontSize: "2em",
          marginBottom: "20px",
        }}
      >
        Popular Fruits Word Cloud
      </h2>
      <svg ref={svgRef} style={{ width: "100%", height: "800px" }}></svg>
      <div
        style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "0.9em",
          color: "#000",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <em>Data showcases the popularity of fruits based on demand.</em>
      </div>
    </div>
  );
};

export default FruitWordCloud;
