import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import backImg from '../AdditionalFilesDirectory/revenue_horizontalchart.jpeg'; // Import your background image

const App: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const chartData = {
    revenue: [12000, 15000, 18000, 16000, 20000, 22000, 24000, 25000, 27000, 28000, 30000, 32000],
    expenses: [5000, 7000, 8000, 7000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000],
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
          data: ["Revenue", "Expenses"],
          top: "15%",
          textStyle: {
            fontFamily: "'Dancing Script', cursive",
            fontSize: 16,
            color: "#121221",
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
          name: "Amount (USD)",
          nameLocation: "middle",
          nameGap: 30,
          axisLabel: {
            fontSize: 12,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
        yAxis: {
          type: "category",
          data: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
          axisLabel: {
            fontSize: 12,
            fontFamily: "'Pacifico', cursive",
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
        series: [
          {
            name: "Revenue",
            type: "bar",
            stack: "total",
            barWidth: "50%",
            data: chartData.revenue,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#2980b9" },
                { offset: 1, color: "#8e44ad" },
              ]),
            },
          },
          {
            name: "Expenses",
            type: "bar",
            stack: "total",
            barWidth: "50%",
            data: chartData.expenses,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#e74c3c" },
                { offset: 1, color: "#c0392b" },
              ]),
            },
          },
        ],
        backgroundStyle: {
          color: "rgba(0, 0, 0, 0)",
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
        backgroundImage: `url(${backImg})`,
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
          fontSize: "24px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #ff6f61, #6a5acd, #40e0d0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
          fontFamily: "'Pacifico', cursive",
          zIndex: 1,
        }}
      >
        Monthly Revenue vs Expenses
        <div
          style={{
            fontSize: "14px",
            fontFamily: "'Dancing Script', cursive",
            color: "#cccccc",
            marginTop: "5px",
          }}
        >
          Source: Company Financials, 2024
        </div>
      </div>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative", // Chart container positioned above the background
        }}
      />
      <style>
        {`
          @keyframes gradientBackground {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
