import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import imageBackground from "../AdditionalFilesDirectory/stockopen.jpg";

const stockData = [
  { stock: "AAPL", date: "2025-01-09", openingPrice: 150, closingPrice: 155, prices: [{ time: "09:00", price: 151 }, { time: "12:00", price: 153 }, { time: "15:00", price: 155 }] },
  { stock: "GOOGL", date: "2025-01-09", openingPrice: 2800, closingPrice: 2850, prices: [{ time: "09:00", price: 2805 }, { time: "12:00", price: 2820 }, { time: "15:00", price: 2850 }] },
  { stock: "AMZN", date: "2025-01-09", openingPrice: 3300, closingPrice: 3320, prices: [{ time: "09:00", price: 3310 }, { time: "12:00", price: 3320 }, { time: "15:00", price: 3325 }] },
  { stock: "MSFT", date: "2025-01-09", openingPrice: 290, closingPrice: 295, prices: [{ time: "09:00", price: 291 }, { time: "12:00", price: 293 }, { time: "15:00", price: 295 }] },
  { stock: "TSLA", date: "2025-01-09", openingPrice: 650, closingPrice: 670, prices: [{ time: "09:00", price: 655 }, { time: "12:00", price: 660 }, { time: "15:00", price: 670 }] },
  { stock: "NFLX", date: "2025-01-09", openingPrice: 500, closingPrice: 510, prices: [{ time: "09:00", price: 505 }, { time: "12:00", price: 508 }, { time: "15:00", price: 510 }] },
  { stock: "FB", date: "2025-01-09", openingPrice: 365, closingPrice: 370, prices: [{ time: "09:00", price: 367 }, { time: "12:00", price: 368 }, { time: "15:00", price: 370 }] },
  { stock: "NVDA", date: "2025-01-09", openingPrice: 800, closingPrice: 820, prices: [{ time: "09:00", price: 805 }, { time: "12:00", price: 810 }, { time: "15:00", price: 820 }] },
  { stock: "BA", date: "2025-01-09", openingPrice: 220, closingPrice: 225, prices: [{ time: "09:00", price: 221 }, { time: "12:00", price: 223 }, { time: "15:00", price: 225 }] },
  { stock: "WMT", date: "2025-01-09", openingPrice: 145, closingPrice: 150, prices: [{ time: "09:00", price: 146 }, { time: "12:00", price: 148 }, { time: "15:00", price: 150 }] },
  { stock: "DIS", date: "2025-01-09", openingPrice: 180, closingPrice: 185, prices: [{ time: "09:00", price: 182 }, { time: "12:00", price: 183 }, { time: "15:00", price: 185 }] },
  { stock: "V", date: "2025-01-09", openingPrice: 230, closingPrice: 235, prices: [{ time: "09:00", price: 231 }, { time: "12:00", price: 233 }, { time: "15:00", price: 235 }] },
  { stock: "PYPL", date: "2025-01-09", openingPrice: 200, closingPrice: 205, prices: [{ time: "09:00", price: 202 }, { time: "12:00", price: 203 }, { time: "15:00", price: 205 }] },
  { stock: "AMD", date: "2025-01-09", openingPrice: 120, closingPrice: 125, prices: [{ time: "09:00", price: 121 }, { time: "12:00", price: 123 }, { time: "15:00", price: 125 }] },
  { stock: "INTC", date: "2025-01-09", openingPrice: 50, closingPrice: 52, prices: [{ time: "09:00", price: 51 }, { time: "12:00", price: 51.5 }, { time: "15:00", price: 52 }] }
];

const DumbbellChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.85;
    const margin = { top: 80, right: 150, bottom: 80, left: 200 };

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(stockData.flatMap((stock) => stock.prices.map((p) => p.price))) || 1,
        d3.max(stockData.flatMap((stock) => stock.prices.map((p) => p.price))) || 1,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(stockData.map((stock) => stock.stock))
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(-height + margin.top + margin.bottom));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    stockData.forEach((stock) => {
      stock.prices.forEach((priceData) => {
        const yPos = yScale(stock.stock) || 0;

        svg
          .append("line")
          .attr("x1", xScale(stock.openingPrice))
          .attr("x2", xScale(priceData.price))
          .attr("y1", yPos + yScale.bandwidth() / 2)
          .attr("y2", yPos + yScale.bandwidth() / 2)
          .attr("stroke", "#a9a9a9")
          .attr("stroke-width", 2);

        svg
          .append("circle")
          .attr("cx", xScale(stock.openingPrice))
          .attr("cy", yPos + yScale.bandwidth() / 2)
          .attr("r", 7)
          .attr("fill", "#1e90ff");

        svg
          .append("circle")
          .attr("cx", xScale(priceData.price))
          .attr("cy", yPos + yScale.bandwidth() / 2)
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
      .style("font-size", "66px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .style("text-shadow", "3px 3px 6px #aaa")
      .text("Stock Opening vs In-Play Prices");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("fill", "#666")
      .style("text-shadow", "2px 2px 4px #ccc")
      .text("Source: Stock Data");

    svg
      .append("g")
      .attr("transform", `translate(${width - 135}, ${margin.top})`)
      .append("rect")
      .attr("width", 300)
      .attr("height", 60)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#ccc");

    svg
      .append("text")
      .attr("x", width - 50)
      .attr("y", margin.top + 20)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("Legend:");

    svg
      .append("circle")
      .attr("cx", width - 120)
      .attr("cy", margin.top + 40)
      .attr("r", 7)
      .attr("fill", "#1e90ff");

    svg
      .append("text")
      .attr("x", width - 110)
      .attr("y", margin.top + 45)
      .style("font-size", "14px")
      .style("fill", "#333")
      .text("Opening Price");

    svg
      .append("circle")
      .attr("cx", width - 5)
      .attr("cy", margin.top + 40)
      .attr("r", 7)
      .attr("fill", "#ff4500");

    svg
      .append("text")
      .attr("x", width + 5)
      .attr("y", margin.top + 45)
      .style("font-size", "14px")
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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
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
