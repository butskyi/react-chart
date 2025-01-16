import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import imageBackground from "../../AdditionalFilesDirectory/drinks_DumbbellChart.jpg";

const drinkData = [
  { drink: "Coke", date: "2025-01-09", openingPrice: 1.5, closingPrice: 1.8, prices: [{ time: "09:00", price: 1.6 }, { time: "12:00", price: 1.7 }, { time: "15:00", price: 1.8 }] },
  { drink: "Pepsi", date: "2025-01-09", openingPrice: 1.4, closingPrice: 1.6, prices: [{ time: "09:00", price: 1.5 }, { time: "12:00", price: 1.55 }, { time: "15:00", price: 1.6 }] },
  { drink: "Sprite", date: "2025-01-09", openingPrice: 1.3, closingPrice: 1.5, prices: [{ time: "09:00", price: 1.35 }, { time: "12:00", price: 1.45 }, { time: "15:00", price: 1.5 }] },
  { drink: "Fanta", date: "2025-01-09", openingPrice: 1.2, closingPrice: 1.4, prices: [{ time: "09:00", price: 1.25 }, { time: "12:00", price: 1.35 }, { time: "15:00", price: 1.4 }] },
  { drink: "Dr. Pepper", date: "2025-01-09", openingPrice: 1.6, closingPrice: 1.8, prices: [{ time: "09:00", price: 1.65 }, { time: "12:00", price: 1.75 }, { time: "15:00", price: 1.8 }] },
];

const DumbbellChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.85;
    const margin = { top: 130, right: 150, bottom: 80, left: 200 };

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(drinkData.flatMap((drink) => drink.prices.map((p) => p.price))) || 0,
        d3.max(drinkData.flatMap((drink) => drink.prices.map((p) => p.price))) || 1,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(drinkData.map((drink) => drink.drink))
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
      .style("font-size", "40px")
      .style("color","#01C615FF");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "40px")
      .style("color","#35FF03FF");

    drinkData.forEach((drink) => {
      drink.prices.forEach((priceData, index) => {
        const baseYPos = yScale(drink.drink) || 0;
        const yPos = baseYPos + (index * (yScale.bandwidth() / drink.prices.length)) - (yScale.bandwidth() / (2 * drink.prices.length));

        svg
          .append("line")
          .attr("x1", xScale(drink.openingPrice))
          .attr("x2", xScale(priceData.price))
          .attr("y1", yPos)
          .attr("y2", yPos)
          .attr("stroke", "#213123FF")
          .attr("stroke-width", 4);

        svg
          .append("circle")
          .attr("cx", xScale(drink.openingPrice))
          .attr("cy", yPos)
          .attr("r", 7)
          .attr("fill", "#1e90ff");

        svg
          .append("circle")
          .attr("cx", xScale(priceData.price))
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
      .style("fill", "#F6FF00FF")
      .style("text-shadow", "8px 6px 3px #80a")
      .text("Drink Price Comparison");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 4+20)
      .attr("text-anchor", "middle")
      .style("font-size", "50px")
      .style("fill", "#30a")
      .style("text-shadow", "0px 2px 0px #3cc")
      .text("Source: Drink Data");

    svg
      .append("g")
      .attr("transform", `translate(${width - 135}, ${margin.top-30})`)
      .append("rect")
      .attr("width", 300)
      .attr("height", 160)
      .attr("fill", "#E0A7F7FF")
      .attr("stroke", "#ccc");

    svg
      .append("text")
      .attr("x", width - 50)
      .attr("y", margin.top + 20)
      .style("font-size", "36px")
      .style("font-weight", "bold")
      .style("fill", "#333333")
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
      .style("font-size", "34px")
      .style("fill", "#333")
      .text("Opening Price");

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
      .style("font-size", "34px")
      .style("fill", "#333")
      .text("In-Play Price");
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
        <svg ref={svgRef} width={window.innerWidth * 0.9} height={window.innerHeight * 0.9}></svg>
      </div>
    </div>
  );
};

export default DumbbellChart;
