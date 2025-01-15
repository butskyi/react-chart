import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import backimg from '../../AdditionalFilesDirectory/richman.jpg'; 

interface WealthyIndividual {
    name: string;
    netWorth: number; // in billions
}

const VerticalLollipopChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const data: WealthyIndividual[] = [
        { name: "Elon Musk", netWorth: 230 },
        { name: "Jeff Bezos", netWorth: 200 },
        { name: "Bernard Arnault", netWorth: 190 },
        { name: "Bill Gates", netWorth: 130 },
        { name: "Mark Zuckerberg", netWorth: 120 },
        { name: "Warren Buffett", netWorth: 100 },
        { name: "Larry Ellison", netWorth: 95 },
        { name: "Larry Page", netWorth: 90 },
        { name: "Sergey Brin", netWorth: 85 },
        { name: "Mukesh Ambani", netWorth: 80 }
    ];

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = 2024;
        const height = 1224;
        const margin = { top: 150, right: 40, bottom: 160, left: 300 };

        svg.selectAll("*").remove();

        const x = d3
            .scaleLinear()
            .domain([0, 250]) // Adjusted for net worth in billions
            .range([margin.left, width - margin.right - 50]);

        const y = d3
            .scaleBand()
            .domain(data.map((d) => d.name))
            .range([height - margin.bottom, margin.top])
            .padding(0.4);

        svg
            .attr("width", width)
            .attr("height", height);

        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .text("Rich Individuals by Net Worth (in Billions)")
            .style("font-family", "'Dancing Script', cursive")
            .attr("font-size", "85")
            .attr("fill", "#1100FFFF")
            .attr("stroke", "#B3AC4D00")
            .style("text-shadow", "14px 12px 6px rgba(0.6, 0.6, 0, 0.5)");

        svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(10))
            .selectAll("text")
            .attr("transform", "rotate(0)")
            .style("text-anchor", "start")
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "40px")
            .attr("fill", "#000000FF")
            .attr("stroke", "#FCFCFCFF")
            .attr("stroke-width", "1px");

        svg
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.select(".domain").remove())
            .style("font-family", "'Courgette', cursive")
            .selectAll("text")
            .attr("font-size", "40")
            .attr("fill", "#06F56AFF")
            .attr("stroke", "#907C99FF")
            .attr("stroke-width", "1px");

        const gradient = svg
            .append("defs")
            .append("radialGradient")
            .attr("id", "circle-gradient")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");

        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FFFFFFFF");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#0DB5F8FF");

        svg
            .selectAll("line.lollipop-line")
            .data(data)
            .join("line")
            .attr("class", "lollipop-line")
            .attr("x1", margin.left)
            .attr("x2", (d) => x(d.netWorth))
            .attr("y1", (d) => y(d.name)! + y.bandwidth() / 2)
            .attr("y2", (d) => y(d.name)! + y.bandwidth() / 2)
            .attr("stroke", "#E6FC20FF")
            .attr("stroke-width", 5);

        svg
            .selectAll("circle.lollipop-circle")
            .data(data)
            .join("circle")
            .attr("class", "lollipop-circle")
            .attr("cx", (d) => x(d.netWorth))
            .attr("cy", (d) => y(d.name)! + y.bandwidth() / 2)
            .attr("r", 8)
            .attr("fill", "url(#circle-gradient)");

        const xTicks = x.ticks(10);

        svg
          .selectAll('line.vertical-line')
          .data(xTicks)
          .join('line')
          .attr('class', 'vertical-line')
          .attr('x1', (d) => x(d))
          .attr('x2', (d) => x(d))
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom)
          .attr('stroke', '#FFEEFBFF')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '18,18');
    }, [data]);

    return (
        <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
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
          <svg ref={svgRef} style={{ minWidth: "1224px", minHeight: "80vh" }}></svg>
      </div>
    );
};

export default VerticalLollipopChart;
