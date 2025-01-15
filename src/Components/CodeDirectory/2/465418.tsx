import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import back from "../../AdditionalFilesDirectory/world_population.jpg"; 

interface DataItem {
  value: number;
  name: string;
}

const PopulationRoseChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      
      const populationData: DataItem[] = [
        { value: 1439, name: "China" },
        { value: 1380, name: "India" },
        { value: 331, name: "United States" },
        { value: 273, name: "Indonesia" },
        { value: 220, name: "Brazil" },
        { value: 206, name: "Pakistan" },
        { value: 164, name: "Nigeria" },
        { value: 146, name: "Bangladesh" },
        { value: 145, name: "Russia" },
        { value: 127, name: "Mexico" },
      ];

   
      const sortedPopulationData = populationData.sort((a, b) => b.value - a.value);

      const getGradient = (color1: string, color2: string) => {
        return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ]);
      };

      const option = {
        backgroundColor: 'transparent', 
        title: {
          text: "World Population by Country",
          left: "center",
          top: 20,
          textStyle: {
            fontSize: 75,
            fontWeight: "bold",
            fontFamily: "Pacifico, cursive",
            color: "#D0FF00FF",
            textShadowColor: "#13a",
            textShadowBlur: 5,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
          },
        },
        legend: {
          bottom: 20,
          textStyle: {
            color:"#0D0E0DFF",
            fontFamily: "Roboto",
            fontSize: 40,
            
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
            name: "Country Population",
            type: "pie",
            radius: [1, 350],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 2,
            },
            data: sortedPopulationData.map((item, index) => ({
              ...item,
              itemStyle:{
                color:getGradient(
                  `hsl(${(index * 36) % 360}, 100%, 60%)`,
                  `hsl(${(index * 36 + 180) % 360}, 100%, 50%)`
                ),
              }
            })),
            label:{
              show:true,
              position:'outside',
              formatter:'{b}: {c}M',
              textStyle:{
                fontFamily:"Pacifico,cursive",
                fontSize: 40,
                color:'#5A192DFF',
                textShadowColor:'#B2F007FF',
                textShadowBlur: 3,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
              }
            },
            labelLine:{
              show:true,
              length: 10,
              length2: 20,
              smooth:true,
              lineStyle:{
                width: 2,
                color:'#810333FF'
              }
            }
          }
        ],
        tooltip:{
          textStyle:{
            fontFamily:"Pacifico,cursive",
            fontSize: 30
          },
          formatter: '{b}: {c} million'
        }
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
        position:"relative",
        width:"100%",
        height:"100vh",
      }}
    >
      <div
        style={{
          position:"absolute",
          top: 0,
          left: 0,
  
          width: "100%",
          height: "100vh",
          backgroundImage:`url(${back})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          opacity: 0.5,
          zIndex: -1
        }}
      />
      <div
        ref={chartRef}
        style={{
          position:"absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2
        }}
      />
    </div>
  );
};

export default PopulationRoseChart;
