import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import back from "../../AdditionalFilesDirectory/football.jpg"; 

interface DataItem {
  value: number;
  name: string;
}

const SalesdataRoseChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      // Football rankings data (example values)
      const footballData: DataItem[] = [
        { value: 1, name: "Brazil" },
        { value: 2, name: "France" },
        { value: 3, name: "Argentina" },
        { value: 4, name: "Belgium" },
        { value: 5, name: "England" },
        { value: 6, name: "Portugal" },
        { value: 7, name: "Spain" },
        { value: 8, name: "Netherlands" },
        { value: 9, name: "Italy" },
        { value: 10, name: "Mexico" },
      ];

      // Sort footballData by rank (value) in ascending order
      const sortedFootballData = footballData.sort((a, b) => a.value - b.value);

      // Reverse the sorted data to have rank 1 on top
      const reversedFootballData = sortedFootballData.reverse();

      const getGradient = (color1: string, color2: string) => {
        return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ]);
      };

      const option = {
        backgroundColor: 'transparent', 
        title: {
          text: "Football Rankings by Country",
          left: "center",
          top: 75,
          textStyle: {
            fontSize: 70,
            fontWeight: "bold",
            fontFamily: "Pacifico, cursive",
            color: "#F15555FF",
            textShadowColor: "#13a",
            textShadowBlur: 5,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
          },
        },
        legend: {
          bottom: 20,
          textStyle: {
            color:"#D6EC0FFF",
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
            name: "Country Rankings",
            type: "pie",
            radius: [50, 450],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 2,
            },
            data:
              reversedFootballData.map((item, index) => ({
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
                formatter:'{b}: Rank {c}',
                textStyle:{
                  fontFamily:"Pacifico,cursive",
                  fontSize :55,
                  color:'#00FFBFFF',
                  textShadowColor:'#313131FF',
                  textShadowBlur :3,
                  textShadowOffsetX :1,
                  textShadowOffsetY :1,
                }
              },
              labelLine:{
                show:true,
                length :10,
                length2 :20,
                smooth:true,
                lineStyle:{
                  width :2,
                  color:'#770381FF'
                }
              }
          }
        ],
        tooltip:{
          textStyle:{
            fontFamily:"Pacifico,cursive",
            fontSize :30
          }
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
          top :0,
          left :0,
          width :"100%",
          height :"100%",
          backgroundImage:`url(${back})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          opacity :0.7,
          zIndex :1
        }}
      />
      <div
        ref={chartRef}
        style={{
          position:"absolute",
          top :0,
          left :0,
          width :"100%",
          height :"100%",
          zIndex :2
        }}
      />
    </div>
  );
};

export default SalesdataRoseChart;
