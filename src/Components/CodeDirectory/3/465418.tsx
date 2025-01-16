import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import GoogleFontLoader from "react-google-font-loader";
import futuristicBackground from "../../AdditionalFilesDirectory/CulturalFootprints.jpg";

interface DataItem {
  value: number;
  name: string;
}

const CulturalFootprintsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const culturalData: DataItem[] = [
        { value: 1.5, name: "China" },
        { value: 1.3, name: "India" },
        { value: 0.4, name: "United States" },
        { value: 0.3, name: "France" },
        { value: 0.3, name: "Italy" },
        { value: 0.2, name: "Japan" },
        { value: 0.2, name: "Mexico" },
        { value: 0.15, name: "Brazil" },
        { value: 0.1, name: "Nigeria" },
        { value: 0.1, name: "Russia" },
      ];

      const sortedCulturalData = culturalData.sort((a, b) => b.value - a.value);

      const getGradient = (color1: string, color2: string) => {
        return new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ]);
      };

      const option = {
        backgroundColor: "transparent",
        title: {
          text: "Cultural Footprints of Leading Nations",
          left: "center",
          top: "1%",
          textStyle: {
            fontSize: 60,
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            color: "#FFFFFF",
            textShadowColor: "#00FFFF",
            textShadowBlur: 10,
          },
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 18,
            color: "#FFFFFF",
            fontFamily: "Poppins, sans-serif",
          },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          formatter: "{b}<br>Influence Index: {c}",
        },
        series: [
          {
            name: "Cultural Influence",
            type: "pie",
            radius: [50, "75%"],
            center: ["50%", "55%"],
            roseType: "radius",
            label: {
              show: true,
              formatter: "{b}\nIndex: {c}",
              color: "#4B0909FF",
              fontSize: 28,
              fontFamily: "Poppins, sans-serif",
            },
            labelLine: {
              lineStyle: {
                color: "#FFFFFF",
                width: 2,
              },
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: "#000",
              borderWidth: 2,
            },
            data: sortedCulturalData.map((item, index) => ({
              ...item,
              itemStyle: {
                color: getGradient(
                  `hsl(${(index * 36) % 360}, 90%, 55%)`,
                  `hsl(${(index * 36 + 180) % 360}, 90%, 35%)`
                ),
              },
            })),
          },
        ],
      };
      

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Poppins",
            weights: [400, 700],
          },
        ]}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${futuristicBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
            zIndex: -1,
          }}
        />
        <div
          ref={chartRef}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        />
      </div>
    </>
  );
};

export default CulturalFootprintsChart;
