import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import backImg from '../../AdditionalFilesDirectory/housing_price.jpg'; // Update with your housing cost background image

const HousingCostByCountry: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const chartData = {
    countries: [
      "United States", "Canada", "United Kingdom", "Germany", "Australia",
      "France", "Japan", "India", "Brazil", "South Africa"
    ],
    averageHousePrices: [
      350000, // United States (in USD)
      450000, // Canada
      300000, // United Kingdom
      250000, // Germany
      500000, // Australia
      300000, // France
      200000, // Japan
      100000, // India
      120000, // Brazil
      150000  // South Africa
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        legend: {
          data: ["Average House Price"],
          top: "15%",
          right: "5%",
          textStyle: {
            fontFamily: "'Pacifico', cursive", // Replace with your desired font family
            fontSize: 35,
            color: "#41491BFF",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "Average House Price (USD)",
          nameLocation: "middle",
          nameGap: 50, // Increased gap to avoid overlap
          axisLabel: {
            fontSize: 35,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#074A77FF",
            interval: 0, // Show all labels to avoid overlap
          },
          nameTextStyle: {
            fontSize: 45,
            fontFamily: "'Pacifico', cursive",
            color: "#120777FF"
          },
        },
        yAxis: {
          type: "category",
          data: chartData.countries,
          axisLabel: {
            fontSize: 35,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#085A1CFF",
          },
        },
        series: [
          {
            name: "Average House Price",
            type: "bar",
            barWidth: "50%",
            data: chartData.averageHousePrices,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color:"#11F342FF" },
                { offset: 1, color:"#D114C1FF" },
              ]),
            },
          }
        ],
        backgroundStyle:{
          color:"rgba(0, 0.5, 0.3, 0)",
        }
      };

      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [chartData]);

  return (
    <div
      style={{
        position:"relative",
        width:"100%",
        height:"100vh",
        backgroundImage:
         `linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(${backImg})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat"
      }}
    >
      <div
        style={{
           position:"absolute",
           top:"2%",
           left:"50%",
           transform:"translateX(-50%)",
           fontSize:"70px",
           fontWeight:"bold",
           color:"#F16D02FF",
           textAlign:"center",
           textShadow:"5px 1px 4px rgba(0,.8,.8,.6)",
           fontFamily:"'Pacifico', cursive",
           zIndex:"1"
         }}
       >
         Average Housing Costs by Country (2023)
       </div>
       <div
         ref={chartRef}
         style={{
           width:"100%",
           height:"100%",
           position:"relative"
         }}
       />
     </div>
   );
};

export default HousingCostByCountry;
