import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import back from "../AdditionalFilesDirectory/music_polar.jpg";  // Import your background image here

interface DataItem {
  value: number;
  name: string;
}

const App: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const musicData: DataItem[] = [
        { value: 1800, name: "Pop" },
        { value: 1500, name: "Rock" },
        { value: 1200, name: "Hip Hop" },
        { value: 800, name: "Classical" },
        { value: 600, name: "Jazz" },
        { value: 1000, name: "EDM" },
        { value: 400, name: "Country" },
        { value: 500, name: "Blues" },
      ];

      const getGradient = (color1: string, color2: string) => {
        return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ]);
      };

      const option = {
        title: {
          text: "Music Genre Popularity",
          left: "center",
          textStyle: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "Pacifico, cursive",
            color: "#f61231", // Title color changed
            textShadowColor: "#000", // Shadow color for the title
            textShadowBlur: 10, // Blur effect for the title shadow
            textShadowOffsetX: 2, // Shadow offset for X-axis
            textShadowOffsetY: 2, // Shadow offset for Y-axis
          },
        },
        legend: {
          top: "bottom",
          textStyle: {
            color: "#fff", // Changed legend text color
            fontFamily: "Pacifico, cursive", // Apply same font to legend
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          textStyle: {
            fontFamily: "Pacifico, cursive", // Apply same font to toolbox
          },
        },
        series: [
          {
            name: "Genre Popularity",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: musicData.map((item, index) => ({
              ...item,
              itemStyle: {
                color: getGradient(
                  `hsl(${(index * 45) % 360}, 100%, 60%)`,
                  `hsl(${(index * 45 + 180) % 360}, 100%, 50%)`
                ),
              },
            })),
            label: {
              textStyle: {
                fontFamily: "Pacifico, cursive", // Apply same font to labels
              },
            },
            labelLine: {
              lineStyle: {
                fontFamily: "Pacifico, cursive", // Apply font to label lines
              },
            },
          },
        ],
        tooltip: {
          textStyle: {
            fontFamily: "Pacifico, cursive", // Apply font to tooltip
          },
        },
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${back})`, // Set the background image
        backgroundSize: "cover", // Make sure the image covers the entire area
        backgroundPosition: "center", // Position the image in the center
        opacity: 0.8, // Apply opacity to the background image only
      }}
    />
  );
};

export default App;
