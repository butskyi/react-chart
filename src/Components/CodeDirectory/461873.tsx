import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import GoogleFontLoader from "react-google-font-loader";
import backimg from '../AdditionalFilesDirectory/booksold_VerticalLollipopChart.jpg'; 

interface AuthorPerformance {
    author: string;
    booksSold: number; 
}

const VerticalLollipopChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const data: AuthorPerformance[] = [
        { author: "J.K. Rowling", booksSold: 500 },
        { author: "George R.R. Martin", booksSold: 150 },
        { author: "J.R.R. Tolkien", booksSold: 200 },
        { author: "Stephen King", booksSold: 350 },
        { author: "Agatha Christie", booksSold: 450 },
        { author: "Dan Brown", booksSold: 300 },
        { author: "Haruki Murakami", booksSold: 250 },
        { author: "Jane Austen", booksSold: 100 },
        { author: "Mark Twain", booksSold: 180 },
        { author: "Leo Tolstoy", booksSold: 220 }
    ];

    useEffect(() => {
        if (!svgRef.current) return;
    
        const svg = d3.select(svgRef.current);
        const width = 2024;
        const height = 1224;
        const margin = { top: 150, right: 40, bottom: 160, left: 120 };
    
        svg.selectAll("*").remove();
    
        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.author))
            .range([margin.left, width - margin.right])
            .padding(0.4);
    
        const y = d3
            .scaleLinear()
            .domain([0, 600])  
            .range([height - margin.bottom, margin.top]);
    
        svg
            .attr("width", width)
            .attr("height", height);
    
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .text("Authors by Books Sold (in Millions)")
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "68px")
            .attr("fill", "#903234")
            .style("text-shadow", "2px 2px 4px rgba(0, 0, 0, 0.5)");
    
        svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(40)")
            .style("text-anchor", "start")
            .style("font-family", "'Courgette', cursive")
            .attr("font-size", "40px")
            .attr("fill", "#02420DFF");
    
        svg
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(10)) 
            .call((g) => g.select(".domain").remove())
            .style("font-family", "'Courgette', cursive")
            .selectAll("text")
            .attr("font-size", "40px")
            .attr("fill", "#02420DFF");
    
        const gradient = svg
            .append("defs")
            .append("radialGradient")
            .attr("id", "circle-gradient")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");
    
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#FFFFFFFF");
    
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#871234");
    

        svg
            .selectAll("line.lollipop-line")
            .data(data)
            .join("line")
            .attr("class", "lollipop-line")
            .attr("x1", (d) => x(d.author)! + x.bandwidth() / 2)
            .attr("x2", (d) => x(d.author)! + x.bandwidth() / 2)
            .attr("y1", y(0))  
            .attr("y2", (d) => y(d.booksSold))  
            .attr("stroke", "#774B4BFF")
            .attr("stroke-width", 11);
    
        svg
            .selectAll("circle.lollipop-circle")
            .data(data)
            .join("circle")
            .attr("class", "lollipop-circle")
            .attr("cx", (d) => x(d.author)! + x.bandwidth() / 2)
            .attr("cy", (d) => y(d.booksSold))
            .attr("r", 8)
            .attr("fill", "url(#circle-gradient)");
    
        
        const yTicks = y.ticks(10);  
    
        svg
            .selectAll("line.vertical-line")
            .data(yTicks)
            .join("line")
            .attr("class", "vertical-line")
            .attr("x1", margin.left)
            .attr("x2", width - margin.right)
            .attr("y1", (d) => y(d))  
            .attr("y2", (d) => y(d))
            .attr("stroke", "#B3B3B3")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4,4");
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
                    opacity: 0.3,
                    zIndex: -100,
                }}
            ></div>
            <svg ref={svgRef} style={{ minWidth: "1224px", minHeight: "80vh" }}></svg>
        </div>
    );
};

export default VerticalLollipopChart;
