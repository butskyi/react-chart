import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import backImg from "../../AdditionalFilesDirectory/financial_GDP.jpg"; // Replace with your image path

const TopGDPByCountry: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const chartData = {
    countries: [
      "United States", "China", "Japan", "Germany", "India",
      "United Kingdom", "France", "Italy", "Canada", "South Korea",
    ],
    gdp: [
      26.85, 19.37, 4.91, 4.30, 3.73, 3.19, 2.94, 2.17, 2.09, 2.00,
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(150, 150, 150, 0.2)",
          borderColor: "#ffffff",
          borderWidth: 1,
          textStyle: {
            fontFamily: "Arial, sans-serif",
            color: "#fff",
            fontSize: 16,
          },
        },
        legend: {
          data: ["GDP (in Trillions USD)"],
          top: "15%",
          right: "10%",
          textStyle: {
            fontFamily: "'Roboto', sans-serif",
            fontSize: 36,
            color: "#FFFFFF",
          },
        },
        grid: {
          left: "8%",
          right: "8%",
          bottom: "10%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "GDP (in Trillions USD)",
          nameLocation: "middle",
          nameGap: 40,
          axisLabel: {
            fontSize: 34,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            color: "#FF1E7CFF",
          },
          nameTextStyle: {
            fontSize: 38,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            color: "#00BFFF",
          },
          splitLine: {
            lineStyle: {
              color: "#444",
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "category",
          data: chartData.countries,
          axisLabel: {
            fontSize: 34,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            color: "#FFFFFFFF",
          },
        },
        series: [
          {
            name: "GDP (in Trillions USD)",
            type: "bar",
            barWidth: "60%",
            data: chartData.gdp,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#AAC532FF" },
                { offset: 1, color: "#CC00FAFF" },
              ]),
              shadowBlur: 8,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: [15, 15, 0, 0],
            },
          },
        ],
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(1, 1, 1, 0.1), rgba(1, 1, 1, 0.1)), url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "70px",
          fontWeight: "bold",
          color: "#00FA9A",
          textAlign: "center",
          textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)",
          fontFamily: "'Pacifico', cursive",
          zIndex: 1,
        }}
      >
        Top 10 Countries by GDP in 2023
      </div>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      />
    </div>
  );
};

export default TopGDPByCountry;
