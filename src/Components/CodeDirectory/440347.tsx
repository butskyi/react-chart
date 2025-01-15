import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import GoogleFontLoader from "react-google-font-loader";
import backgroundImage from "../AdditionalFilesDirectory/baby_threedscatterchart.jpg";

const Baby_threedscatterchart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const countries: string[] = [
      "USA", "India", "Brazil", "Germany", "China",
      "Japan", "UK", "France", "Canada", "Australia"
    ];

    const generateRandomData = (baseValue: number, range: number): number[] => {
      return Array.from({ length: 12 }, () => baseValue + Math.random() * range);
    };

    const birthRatesMen: number[][] = [
      generateRandomData(12, 5),
      generateRandomData(15, 8),
      generateRandomData(10, 6),
      generateRandomData(8, 4),
      generateRandomData(14, 6),
      generateRandomData(11, 5),
      generateRandomData(9, 4),
      generateRandomData(10, 5),
      generateRandomData(13, 6),
      generateRandomData(12, 5)
    ];

    const birthRatesWomen: number[][] = [
      generateRandomData(11, 5),
      generateRandomData(14, 8),
      generateRandomData(9, 6),
      generateRandomData(7, 4),
      generateRandomData(13, 6),
      generateRandomData(10, 5),
      generateRandomData(8, 4),
      generateRandomData(9, 5),
      generateRandomData(12, 6),
      generateRandomData(11, 5)
    ];

    const birthRateData: any[] = [];

    for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
      for (let month = 0; month < 12; month++) {
        birthRateData.push({
          value: [
            month,
            birthRatesMen[countryIndex][month],
            birthRatesWomen[countryIndex][month],
          ],
          country: countries[countryIndex],
        });
      }
    }

    const option = {
      title: {
        text: "Monthly Birth Rates by Gender",
        subtext: "Global Birth Rate Analysis",
        left: "center",
        textStyle: {
          color: "#F305CBFF",
          fontSize: 65,
          fontFamily: "'Dancing Script', cursive",
          fontWeight: "bold",
          textShadowColor: "#20BD6EFF",
          textShadowBlur: 2,
          textShadowOffsetX: 2,
          textShadowOffsetY: 2,
        },
        subtextStyle: {
          color: "#456789",
          fontSize: 45,
          fontFamily: "'Poppins', sans-serif",
          fontStyle: "italic",
          textShadowColor: "#d0d0d0",
          textShadowBlur: 4,
        },
        top: 20,
      },
      legend: {
        data: countries,
        orient: "vertical",
        left: "5%",
        textStyle: {
          color: "#785636",
          fontSize: 40,
          fontFamily: "'Poppins', sans-serif",
        },
        top: 150,
      },
      tooltip: {
        formatter: (params: any) => {
          const { value, country } = params.data;
          return `
            <div>
              <b>Month:</b> ${
                ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][value[0]]
              }<br/>
              <b>Men Birth Rate:</b> ${value[1].toFixed(2)}<br/>
              <b>Women Birth Rate:</b> ${value[2].toFixed(2)}<br/>
              <b>Country:</b> ${country}
            </div>
          `;
        },
      },
      xAxis3D: {
        type: "value",
        name: "Month",
        nameGap: 20,
        nameTextStyle: {
          fontSize: 28,
          fontFamily: "'Poppins', sans-serif",
          color: "#333",
          align: "center",
          verticalAlign: "top",
        },
        axisLabel: {
          formatter: (value: number) =>
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][value],
          fontSize: 20,
          fontFamily: "'Poppins', sans-serif",
        },
      },
      yAxis3D: {
        type: "value",
        name: "Men Birth Rate",
        nameGap: 20,
        nameTextStyle: {
          fontSize: 28,
          fontFamily: "'Poppins', sans-serif",
          color: "#333",
          align: "right",
          verticalAlign: "middle",
        },
        axisLabel: {
          fontSize: 20,
          fontFamily: "'Poppins', sans-serif",
        },
      },
      zAxis3D: {
        type: "value",
        name: "Women Birth Rate",
        nameGap: 20,
        nameTextStyle: {
          fontSize: 28,
          fontFamily: "'Poppins', sans-serif",
          color: "#333",
          align: "right",
          verticalAlign: "middle",
        },
        axisLabel: {
          fontSize: 20,
          fontFamily: "'Poppins', sans-serif",
        },
      },
      grid3D: {
        viewControl: {
          projection: "perspective",
          autoRotate: false,
          rotateSpeed: 1,
          zoomSpeed: 1,
        },
        axisLabel: {
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
        },
        axisName: {
          show: true,
        },
        boxWidth: 220,
        boxHeight: 120,
        boxDepth: 100,
        top: -20,
        left: 0,
      },
      series: countries.map((country: string, index: number) => ({
        type: "line3D",
        name: country,
        data: birthRateData
          .filter((data: any) => data.country === country)
          .map((data: any) => ({
            value: data.value,
            country: data.country,
          })),
        lineStyle: {
          width: 4,
        },
        emphasis: {
          lineStyle: {
            width: 6,
          },
        },
      })),
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <GoogleFontLoader
        fonts={[
          {
            font: "Poppins",
            weights: [400, 600, 700],
          },
          {
            font: "Dancing Script",
            weights: [400, 700],
          },
        ]}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 1,
        }}
      ></div>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default Baby_threedscatterchart;
