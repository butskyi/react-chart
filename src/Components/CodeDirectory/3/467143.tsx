import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import backimg from '../../AdditionalFilesDirectory/olympicsAthletes.jpg';

interface AthleteMedals {
    name: string;
    totalMedals: number; // Total number of medals won
}

const HorizontalLollipopChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const data: AthleteMedals[] = [
        { name: "Michael Phelps", totalMedals: 28 },
        { name: "Larisa Latynina", totalMedals: 18 },
        { name: "Nikolai Andrianov", totalMedals: 15 },
        { name: "Simone Biles", totalMedals: 19 },
        { name: "Mark Spitz", totalMedals: 11 },
        { name: "Usain Bolt", totalMedals: 8 },
        { name: "Carl Lewis", totalMedals: 10 },
        { name: "Paavo Nurmi", totalMedals: 12 },
        { name: "Ole Einar Bjørndalen", totalMedals: 13 },
        { name: "Birgit Fischer", totalMedals: 12 },
    ];

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = 1804;
        const height = 800;
        const margin = { top: 120, right: 160, bottom: 80, left: 300 };

        svg.selectAll("*").remove();

        // Scales
        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.4);

        const y = d3
            .scaleLinear()
            .domain([0, 30]) // Adjusted to fit total medals
            .range([height - margin.bottom, margin.top]);

        svg
            .attr("width", width)
            .attr("height", height);

        // Title
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .text("Olympic Athletes by Total Medals")
            .style("font-family", "'Dancing Script', cursive")
            .attr("font-size", "85")
            .attr("fill", "#00FF44FF")
            .attr("stroke", "#B3AC4D00")
            .style("text-shadow", "14px 12px 6px rgba(0.6, 0.6, 0, 0.5)");

        // X-axis
        svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .call((g) => g.selectAll(".domain").remove())
            .selectAll("text")
            .attr("transform", "rotate(25)")
            .style("text-anchor", "start")
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "30px")
            .attr("fill", "#000000FF")
            .attr("stroke", "#C80000FF")
            .attr("stroke-width", "1px");

        // Y-axis
        svg
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(10))
            .call((g) => g.select(".domain").remove())
            .style("font-family", "'Courgette', cursive")
            .selectAll("text")
            .attr("font-size", "40")
            .attr("fill", "#06F56AFF")
            .attr("stroke", "#907C99FF")
            .attr("stroke-width", "1px");

        // Gradient for circles
        const gradient = svg
            .append("defs")
            .append("radialGradient")
            .attr("id", "circle-gradient")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");

        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FFDD57FF");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#FF8008FF");

        // Lollipop lines
        svg
            .selectAll("line.lollipop-line")
            .data(data)
            .join("line")
            .attr("class", "lollipop-line")
            .attr("x1", (d) => x(d.name)! + x.bandwidth() / 2)
            .attr("x2", (d) => x(d.name)! + x.bandwidth() / 2)
            .attr("y1", y(0))
            .attr("y2", (d) => y(d.totalMedals))
            .attr("stroke", "#13FF07FF")
            .attr("stroke-width", 5);

        // Lollipop circles
        svg
            .selectAll("circle.lollipop-circle")
            .data(data)
            .join("circle")
            .attr("class", "lollipop-circle")
            .attr("cx", (d) => x(d.name)! + x.bandwidth() / 2)
            .attr("cy", (d) => y(d.totalMedals))
            .attr("r", 10)
            .attr("fill", "url(#circle-gradient)");

        // Gridlines
        const yTicks = y.ticks(10);

        svg
            .selectAll('line.horizontal-line')
            .data(yTicks)
            .join('line')
            .attr('class', 'horizontal-line')
            .attr('x1', margin.left)
            .attr('x2', width - margin.right)
            .attr('y1', (d) => y(d))
            .attr('y2', (d) => y(d))
            .attr('stroke', '#FFE4B5FF')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '8,8');
    }, [data]);

    return (
        <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "110vh",
              width: "100vw",
              position: "relative",
          }}
        >
          <GoogleFontLoader
              fonts={[
                  {
                      font: "Courgette",
                      weights: [400],
                  },
                  {
                      font: "Dancing Script",
                      weights: [400],
                  },
              ]}
          />
          <div
              style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${backimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.8,
                  zIndex: -100,
              }}
          ></div>
          <svg ref={svgRef} style={{ minWidth: "1224px", minHeight: "100vh" }}></svg>
      </div>
    );
};

export default HorizontalLollipopChart;
