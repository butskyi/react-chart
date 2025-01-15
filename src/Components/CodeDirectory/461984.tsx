import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import back from "../AdditionalFilesDirectory/salesdata_polar.jpg"; 

interface DataItem {
  value: number;
  name: string;
}

const SalesdataPolar: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const salesData: DataItem[] = [
        { value: 2500, name: "North America" },
        { value: 3000, name: "Europe" },
        { value: 2200, name: "Asia" },
        { value: 1800, name: "South America" },
        { value: 1000, name: "Africa" },
        { value: 1500, name: "Australia" },
        { value: 850, name: "Middle East" },
        { value: 450, name: "India" },
        { value: 700, name: "China" },
        { value: 900, name: "Russia" },
        { value: 1100, name: "Mexico" },
        { value: 1200, name: "Brazil" },
        { value: 1300, name: "Japan" },
        { value: 1400, name: "South Korea" },
        { value: 1600, name: "Canada" },
      ];

      const getGradient = (color1: string, color2: string) => {
        return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ]);
      };

      const option = {
        backgroundColor: 'transparent', 
        title: {
          text: "Sales Data by Region",
          left: "center",
          top: 20, 
          textStyle: {
            fontSize: 70,
            fontWeight: "bold",
            fontFamily: "Pacifico, cursive",
            color: "#F05801FF",
            textShadowColor: "#330",
            textShadowBlur: 10,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
          },
        },
        legend: {
          
          bottom: 10, 
          
          textStyle: {
            color:"#2E1405FF",
            fontFamily: "roboto",
            fontSize: 30,
            
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
            fontFamily: "Pacifico, cursive",
            fontSize: 35,
          },
        },
        series: [
          {
            name: "Region Sales",
            type: "pie",
            radius: [50, 550],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 2,
            },
            data: salesData.map((item, index) => ({
              ...item,
              itemStyle: {
                color: getGradient(
                  `hsl(${(index * 45) % 360}, 100%, 60%)`,
                  `hsl(${(index * 45 + 180) % 360}, 100%, 50%)`
                ),
              },
            })),
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {c}',
              textStyle: {
                fontFamily: "Pacifico, cursive",
                fontSize: 35,
                color: '#86116DFF',
                textShadowColor: '#9C8C8CFF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
              },
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 20,
              smooth: true,
              lineStyle: {
                width: 2,
                color: '#2E00D6FF'
              }
            },
          },
        ],
        tooltip: {
          textStyle: {
            fontFamily: "Pacifico, cursive",
            fontSize: 20,
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
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          zIndex: 1,
        }}
      />
      <div
        ref={chartRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default SalesdataPolar;
