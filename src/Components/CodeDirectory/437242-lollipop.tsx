import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import backimg from '../AdditionalFilesDirectory/artist_lolipop.jpeg'; // Import the background image

interface ArtistPerformance {
    artist: string;
    averageMonthlyStreams: number; // in millions
}

const VerticalLollipopChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const data: ArtistPerformance[] = [
        { artist: "Taylor Swift", averageMonthlyStreams: 75 },
        { artist: "Drake", averageMonthlyStreams: 85 },
        { artist: "Billie Eilish", averageMonthlyStreams: 60 },
        { artist: "Ed Sheeran", averageMonthlyStreams: 70 },
        { artist: "Ariana Grande", averageMonthlyStreams: 80 },
        { artist: "Post Malone", averageMonthlyStreams: 65 },
        { artist: "The Weeknd", averageMonthlyStreams: 90 },
        { artist: "Kendrick Lamar", averageMonthlyStreams: 50 },
        { artist: "Harry Styles", averageMonthlyStreams: 55 },
        { artist: "Beyoncé", averageMonthlyStreams: 95 }
    ];

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = 1224;
        const height = 1020;
        const margin = { top: 100, right: 40, bottom: 160, left: 120 };

        svg.selectAll("*").remove();

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.artist))
            .range([margin.left, width - margin.right])
            .padding(0.4);

        const y = d3
            .scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top]);

        svg
            .attr("width", width)
            .attr("height", height);

        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .text("Music Artist Popularity (Monthly Streams in Millions)")
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "48px")
            .attr("fill", "#903234")
            .style("text-shadow", "2px 2px 4px rgba(0, 0, 0, 0.5)");

        svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(20)")
            .style("text-anchor", "start")
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "20px")
            .attr("fill", "#456781");

        svg
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(10))
            .call((g) => g.select(".domain").remove())
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "20px");

        const gradient = svg
            .append("defs")
            .append("radialGradient")
            .attr("id", "circle-gradient")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#42a5f5");

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#871234");

        svg
            .selectAll("line.lollipop-line")
            .data(data)
            .join("line")
            .attr("class", "lollipop-line")
            .attr("x1", (d) => x(d.artist)! + x.bandwidth() / 2)
            .attr("x2", (d) => x(d.artist)! + x.bandwidth() / 2)
            .attr("y1", y(0))
            .attr("y2", (d) => y(d.averageMonthlyStreams))
            .attr("stroke", "#456894")
            .attr("stroke-width", 2);

        svg
            .selectAll("circle.lollipop-circle")
            .data(data)
            .join("circle")
            .attr("class", "lollipop-circle")
            .attr("cx", (d) => x(d.artist)! + x.bandwidth() / 2)
            .attr("cy", (d) => y(d.averageMonthlyStreams))
            .attr("r", 8)
            .attr("fill", "url(#circle-gradient)");

        svg
            .selectAll("text.lollipop-label")
            .data(data)
            .join("text")
            .attr("class", "lollipop-label")
            .attr("x", (d) => x(d.artist)! + x.bandwidth() / 2)
            .attr("y", (d) => y(d.averageMonthlyStreams) - 12)
            .text((d) => `${d.averageMonthlyStreams}M`)
            .attr("fill", "#234956")
            .attr("font-size", "20px")
            .style("font-family", "'Courgette', cursive")
            .attr("text-anchor", "middle");
    }, [data]);

    return (
        <div
            style={{
                display: "flex", // Use flexbox to center the content
                justifyContent: "center", // Horizontally center the content
                alignItems: "center", // Vertically center the content
                height: "100vh", // Ensure the container takes the full height of the viewport
                width: "100vw", // Ensure the container takes the full width of the viewport
                position: "relative", // Allow absolute positioning of the background
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${backimg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.3, // Apply opacity only to the background image
                    zIndex: -1, // Ensure the image stays behind the chart
                }}
            ></div>
            <svg ref={svgRef} style={{ minWidth: "1224px", minHeight: "80vh" }}></svg>
        </div>
    );
};

export default VerticalLollipopChart;
