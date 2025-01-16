import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import imageBackground from "../../AdditionalFilesDirectory/Marketing.jpg";

const performanceData = [
  { department: "Sales", revenue: 120, satisfaction: 85 },
  { department: "Marketing", revenue: 95, satisfaction: 78 },
  { department: "HR", revenue: 50, satisfaction: 88 },
  { department: "Engineering", revenue: 140, satisfaction: 92 },
  { department: "Support", revenue: 80, satisfaction: 90 },
];

const DumbbellChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.9;
    const margin = { top: 150, right: 150, bottom: 80, left: 200 };

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(performanceData.flatMap((d) => [d.revenue, d.satisfaction])) || 0,
        d3.max(performanceData.flatMap((d) => [d.revenue, d.satisfaction])) || 1,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(performanceData.map((d) => d.department))
      .range([margin.top, height - margin.bottom])
      .padding(0.5);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("background-color", "rgba(255, 255, 255, 0.1)");

    // Add X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(-height + margin.top + margin.bottom))
      .selectAll("text")
      .style("font-size", "30px");

    // Add Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "30px");

    // Draw Dumbbells
    performanceData.forEach((d) => {
      const yPos = yScale(d.department) || 0;

      // Line connecting the circles
      svg
        .append("line")
        .attr("x1", xScale(d.revenue))
        .attr("x2", xScale(d.satisfaction))
        .attr("y1", yPos + yScale.bandwidth() / 2)
        .attr("y2", yPos + yScale.bandwidth() / 2)
        .attr("stroke", "#213123FF")
        .attr("stroke-width", 4);

      // Revenue Circle
      svg
        .append("circle")
        .attr("cx", xScale(d.revenue))
        .attr("cy", yPos + yScale.bandwidth() / 2)
        .attr("r", 7)
        .attr("fill", "#1e90ff");

      // Satisfaction Circle
      svg
        .append("circle")
        .attr("cx", xScale(d.satisfaction))
        .attr("cy", yPos + yScale.bandwidth() / 2)
        .attr("r", 7)
        .attr("fill", "#ff4500");
    });

    // Add Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-family", "'Caveat', cursive")
      .style("font-size", "85px")
      .style("font-weight", "bold")
      .style("fill", "#FFF8F5FF")
      .style("text-shadow", "8px 6px 3px #80a")
      .text("Performance Metrics Comparison");

    // Add Legend
    svg
      .append("g")
      .attr("transform", `translate(${width - 135}, ${margin.top})`)
      .append("rect")
      .attr("width", 300)
      .attr("height", 120)
      .attr("fill", "#E0A7F7FF")
      .attr("stroke", "#ccc");

    svg
      .append("circle")
      .attr("cx", width - 120)
      .attr("cy", margin.top + 50)
      .attr("r", 7)
      .attr("fill", "#1e90ff");

    svg
      .append("text")
      .attr("x", width - 100)
      .attr("y", margin.top + 55)
      .style("font-size", "24px")
      .style("fill", "#333")
      .text("Monthly Revenue");

    svg
      .append("circle")
      .attr("cx", width - 120)
      .attr("cy", margin.top + 80)
      .attr("r", 7)
      .attr("fill", "#ff4500");

    svg
      .append("text")
      .attr("x", width - 100)
      .attr("y", margin.top + 90)
      .style("font-size", "24px")
      .style("fill", "#333")
      .text("Satisfaction Score");
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
          backgroundColor: "rgba(255, 255, 255, 0.3)",
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

export default DumbbellChart;
