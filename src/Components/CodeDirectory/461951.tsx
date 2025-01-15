import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import backImg from '../AdditionalFilesDirectory/econommy_growth.jpg';

const EconommyGrowthHorizontal: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const chartData = {
    developedEconomies: [2.1, 1.8, 2.3, 2.0, 2.5, 2.2, 1.9, 2.4, 2.6, 2.1],
    emergingMarkets: [4.5, 4.8, 5.2, 4.9, 5.5, 5.1, 4.7, 5.3, 5.6, 5.4],
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
          data: ["Developed Economies", "Emerging Markets"],
          top : "15%",
          right: "5%",
          textStyle: {
            fontFamily: "'Dancing Script', cursive",
            fontSize: 20,
            color: "#41491BFF",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "25%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "Growth Rate (%)",
          nameLocation: "middle",
          nameGap: 30,
          axisLabel: {
            fontSize: 25,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#074A77FF",
          },
          nameTextStyle: {
            fontSize: 30, 
            fontFamily: "'Pacifico', cursive",
            color: "#120777FF"
          },
        },
        yAxis: {
          type: "category",
          data: [
            "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
          ],
          axisLabel: {
            fontSize: 25,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#085A1CFF",
          },
        },
        series: [
          {
            name: "Developed Economies",
            type: "bar",
            stack: "total",
            barWidth: "50%",
            data: chartData.developedEconomies,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#F79400FF" },
                { offset: 1, color: "#120561FF" },
              ]),
            },
          },
          {
            name: "Emerging Markets",
            type: "bar",
            stack: "total",
            barWidth: "50%",
            data: chartData.emergingMarkets,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#648F14FF" },
                { offset: 1, color: "#58150EFF" },
              ]),
            },
          },
        ],
        backgroundStyle: {
          color: "rgba(0, 0.5, 0.3, 0)",
        },
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
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "45px",
          fontWeight: "bold",
          color: "#FF000080",
          textAlign: "center",
          textShadow: "5px 1px 4px rgba(0, 0.8, 0, 0.6)",
          fontFamily: "'Pacifico', cursive",
          zIndex: 1,
        }}
      >
        Economic Growth Rates: Developed vs Emerging Economies
        <div
          style={{
            fontSize: "30px",
            fontFamily: "'Dancing Script', cursive",
            color: "#218D00FF",
            marginTop: "5px",
          }}
        >
          Source: World Economic Outlook, 2025
        </div>
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

export default EconommyGrowthHorizontal;
