import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import backImg from '../../AdditionalFilesDirectory/olympic_champions.jpg'; 

const OlympicGoldMedalsByCountry: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const chartData = {
    countries: [
      "United States", "China", "Japan", "Great Britain", "ROC",
      "Australia", "Netherlands", "France", "Germany", "Italy"
    ],
    goldMedals: [
      39, 
      38, 
      27, 
      22, 
      20, 
      17, 
      10, 
      10, 
      10, 
      10  
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
          data: ["Gold Medals"],
          top: "15%",
          right: "10%",
          textStyle: {
            fontFamily: "roboto",
            fontSize: 45,
            color: "#FFFFFFFF",
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
          name: "Number of Gold Medals",
          nameLocation: "middle",
          nameGap: 50,
          axisLabel: {
            fontSize: 30,
            fontFamily: "'roboto', cursive",
            fontWeight: "bold",
            color: "#033342FF",
            interval: 0,
          },
          nameTextStyle: {
            fontSize: 40,
            fontFamily: "'Pacifico', cursive",
            color: "#420C2CFF"
          },
        },
        yAxis: {
          type: "category",
          data: chartData.countries,
          axisLabel: {
            fontSize: 35,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#033603FF",
          },
        },
        series: [
          {
            name: "Gold Medals",
            type: "bar",
            barWidth: "50%",
            data: chartData.goldMedals,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#D1C68079" },
                { offset: 1, color: "#FFEE00FF" },
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
         `linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.5)), url(${backImg})`,
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
           fontSize:"60px",
           fontWeight:"bold",
           color:"#EEFF05FF",
           textAlign:"center",
           textShadow:"5px 10px 4px rgba(.80,.8,.8,.6)",
           fontFamily:"'Pacifico', cursive",
           zIndex:"1"
         }}
       >
         Olympic Gold Medals by Country (Tokyo 2020)
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

export default OlympicGoldMedalsByCountry;
