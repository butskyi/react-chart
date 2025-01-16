import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import imageBackground from "../../AdditionalFilesDirectory/SalesReturns.jpg";

const productData = [
  { region: "North", sales: 1200, returns: 10 },
  { region: "South", sales: 950, returns: 8 },
  { region: "East", sales: 780, returns: 12 },
  { region: "West", sales: 1100, returns: 6 },
  { region: "Central", sales: 890, returns: 9 },
];

const ClusteredBarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.90;
    const margin = { top: 150, right: 150, bottom: 80, left: 200 };

    const xScale = d3
      .scaleBand()
      .domain(productData.map((d) => d.region))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(productData.flatMap((d) => [d.sales, d.returns * 100])) || 1,
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("background-color", "rgba(25, 25, 25, 0.31)");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      .style("font-size", "30px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "30px");

    const barGroups = svg
      .selectAll(".bar-group")
      .data(productData)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${xScale(d.region)}, 0)`);

    // Sales Bars
    barGroups
      .append("rect")
      .attr("x", -xScale.bandwidth() / 4)
      .attr("y", (d) => yScale(d.sales))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - yScale(d.sales))
      .attr("fill", "#1e90ff");

    // Returns Bars
    barGroups
      .append("rect")
      .attr("x", xScale.bandwidth() / 4)
      .attr("y", (d) => yScale(d.returns * 100))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - yScale(d.returns * 100))
      .attr("fill", "#ff4500");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-family", "'Caveat', cursive")
      .style("font-size", "85px")
      .style("font-weight", "bold")
      .style("fill", "#F5F5F5FF")
      .style("text-shadow", "8px 6px 3px #80a")
      .text("Sales and Returns Comparison");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "40px")
      .style("fill", "#30a")
      .style("text-shadow", "0px 2px 0px #3cc")
      .text("Source: E-commerce Data");

    svg
      .append("g")
      .attr("transform", `translate(${width - 135}, ${margin.top})`)
      .append("rect")
      .attr("width", 300)
      .attr("height", 110)
      .attr("fill", "#E0A7F7FF")
      .attr("stroke", "#ccc");

    svg
      .append("text")
      .attr("x", width - 50)
      .attr("y", margin.top + 20)
      .style("font-size", "26px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("Legend:");

    svg
      .append("rect")
      .attr("x", width - 120)
      .attr("y", margin.top + 40)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#1e90ff");

    svg
      .append("text")
      .attr("x", width - 90)
      .attr("y", margin.top + 55)
      .style("font-size", "24px")
      .style("fill", "#333")
      .text("Sales (Units)");

    svg
      .append("rect")
      .attr("x", width - 120)
      .attr("y", margin.top + 70)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "#ff4500");

    svg
      .append("text")
      .attr("x", width - 90)
      .attr("y", margin.top + 85)
      .style("font-size", "24px")
      .style("fill", "#333")
      .text("Returns (%)");
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        background: `url(${imageBackground}) center/cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <GoogleFontLoader
          fonts={[
            {
              font: "Caveat",
              weights: [400, 700],
            },
          ]}
        />
        <svg ref={svgRef} width={window.innerWidth * 0.9} height={window.innerHeight * 0.85}></svg>
      </div>
    </div>
  );
};

export default ClusteredBarChart;
