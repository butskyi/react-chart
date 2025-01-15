import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import imageBackground from "../../AdditionalFilesDirectory/traffic.jpg";

const trafficData = [
  { location: "Main St", date: "2025-01-09", morningTraffic: 500, eveningTraffic: 800, times: [{ time: "09:00", traffic: 600 }, { time: "12:00", traffic: 700 }, { time: "18:00", traffic: 800 }] },
  { location: "Broadway", date: "2025-01-09", morningTraffic: 450, eveningTraffic: 750, times: [{ time: "09:00", traffic: 500 }, { time: "12:00", traffic: 650 }, { time: "18:00", traffic: 750 }] },
  { location: "5th Ave", date: "2025-01-09", morningTraffic: 400, eveningTraffic: 700, times: [{ time: "09:00", traffic: 450 }, { time: "12:00", traffic: 600 }, { time: "18:00", traffic: 700 }] },
  { location: "Highway 1", date: "2025-01-09", morningTraffic: 600, eveningTraffic: 900, times: [{ time: "09:00", traffic: 650 }, { time: "12:00", traffic: 800 }, { time: "18:00", traffic: 900 }] },
  { location: "Elm St", date: "2025-01-09", morningTraffic: 300, eveningTraffic: 500, times: [{ time: "09:00", traffic: 350 }, { time: "12:00", traffic: 450 }, { time: "18:00", traffic: 500 }] },
];

const DumbbellChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.80;
    const margin = { top: 110, right: 150, bottom: 80, left: 200 };

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(trafficData.flatMap((loc) => loc.times.map((t) => t.traffic))) || 0,
        d3.max(trafficData.flatMap((loc) => loc.times.map((t) => t.traffic))) || 1,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(trafficData.map((loc) => loc.location))
      .range([margin.top, height - margin.bottom])
      .padding(0.5);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("background-color", "rgba(255, 255, 255, 0.1)");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(-height + margin.top + margin.bottom))
      .selectAll("text")
      .style("font-size", "20px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "20px");

      trafficData.forEach((loc) => {
        loc.times.forEach((timeData, index) => {
          
          const baseYPos = yScale(loc.location) || 0;
      
          
          const yPos = baseYPos + (index * (yScale.bandwidth() / loc.times.length)) - (yScale.bandwidth() / (2 * loc.times.length));
      
          
          svg
            .append("line")
            .attr("x1", xScale(loc.morningTraffic))
            .attr("x2", xScale(timeData.traffic))
            .attr("y1", yPos)
            .attr("y2", yPos)
            .attr("stroke", "#213123FF")
            .attr("stroke-width", 4);
      
          
          svg
            .append("circle")
            .attr("cx", xScale(loc.morningTraffic))
            .attr("cy", yPos)
            .attr("r", 7)
            .attr("fill", "#1e90ff");
      
          
          svg
            .append("circle")
            .attr("cx", xScale(timeData.traffic))
            .attr("cy", yPos)
            .attr("r", 7)
            .attr("fill", "#ff4500");
        });
      });
      

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-family", "'Caveat', cursive")
      .style("font-size", "85px")
      .style("font-weight", "bold")
      .style("fill", "#ff4500")
      .style("text-shadow", "8px 6px 3px #80a")
      .text("Traffic Volume Comparison");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "40px")
      .style("fill", "#30a")
      .style("text-shadow", "0px 2px 0px #3cc")
      .text("Source: Traffic Data");

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
      .text("Morning Traffic");

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
      .text("In-Play Traffic");

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
