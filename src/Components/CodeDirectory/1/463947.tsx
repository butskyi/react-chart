import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import backimg from '../../AdditionalFilesDirectory/music_LollipopChart.jpg'; 

interface MusicianPerformance {
    musician: string;
    albumsSold: number;
}

const VerticalLollipopChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const data: MusicianPerformance[] = [
        { musician: "Elvis Presley", albumsSold: 500 },
        { musician: "Michael Jackson", albumsSold: 350 },
        { musician: "Madonna", albumsSold: 300 },
        { musician: "The Beatles", albumsSold: 600 },
        { musician: "Rihanna", albumsSold: 230 },
        { musician: "Pink Floyd", albumsSold: 180 },
        { musician: "Eminem", albumsSold: 220 },
        { musician: "Elton John", albumsSold: 250 },
        { musician: "Led Zeppelin", albumsSold: 200 },
        { musician: "Mariah Carey", albumsSold: 200 }
    ];

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        const width = 2024;
        const height = 1154;
        const margin = { top: 150, right: 140, bottom: 100, left: 300 };
    
        svg.selectAll("*").remove();
    
        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.musician))
            .range([margin.left, width - margin.right])
            .padding(0.4);
    
        const y = d3
            .scaleLinear()
            .domain([0, 700])
            .range([height - margin.bottom, margin.top]);
    
        svg.attr("width", width).attr("height", height);
    
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .text("Musicians by Albums Sold (in Millions)")
            .style("font-family", "'Dancing Script', cursive")
            .attr("font-size", "85")
            .attr("fill", "#C8FF00FF")
            .attr("stroke", "#B3AC4D00")
            .style("text-shadow", "14px 12px 4px rgba(0.6, 0, 0, 0.5)");
    
        // X-axis (Musicians)
        svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(30)") // Rotate labels for better fit
        .attr("text-anchor", "start") // Align labels correctly after rotation
        .attr("dx", "0.5em") // Horizontal adjustment for rotated labels
        .attr("dy", "0.75em") // Adjust vertical spacing
        .style("font-family", "'Courgette', cursive")
        .attr("font-size", "40px")
        .attr("fill", "#3A0A36FF")
        .attr("stroke", "#000000")
        .attr("stroke-width", "1px");
    

    
        // Y-axis (Albums Sold)
        svg
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(10))
            .call((g) => g.select(".domain").remove())
            .style("font-family", "'Courgette', cursive")
            .selectAll("text")
            .attr("font-size", "40")
            .attr("fill", "#FF4800FF")
            .attr("stroke", "#4E4A4AFF")
            .attr("stroke-width", "1px");
    
        // Gradient for circles
        const gradient = svg
            .append("defs")
            .append("radialGradient")
            .attr("id", "circle-gradient")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");
    
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FFFFFFFF");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#0DB5F8FF");
    
        // Lollipop Lines
        svg
            .selectAll("line.lollipop-line")
            .data(data)
            .join("line")
            .attr("class", "lollipop-line")
            .attr("x1", (d) => x(d.musician)! + x.bandwidth() / 2)
            .attr("x2", (d) => x(d.musician)! + x.bandwidth() / 2)
            .attr("y1", height - margin.bottom)
            .attr("y2", (d) => y(d.albumsSold))
            .attr("stroke", "#FC20CCFF")
            .attr("stroke-width", 8);
    
        // Lollipop Circles
        svg
            .selectAll("circle.lollipop-circle")
            .data(data)
            .join("circle")
            .attr("class", "lollipop-circle")
            .attr("cx", (d) => x(d.musician)! + x.bandwidth() / 2)
            .attr("cy", (d) => y(d.albumsSold))
            .attr("r", 8)
            .attr("fill", "url(#circle-gradient)");
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
                    opacity: 0.6,
                    zIndex: -100,
                }}
            ></div>
            <svg ref={svgRef} style={{ minWidth: "1024px", minHeight: "80vh" }}></svg>
        </div>
    );
};

export default VerticalLollipopChart;
