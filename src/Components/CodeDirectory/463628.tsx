import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../AdditionalFilesDirectory/Cryptocurrencies.jpg"; 

const colorPairs = [
  { up: "#D66422FF", down: "#E74C3C" },
  { up: "#3498DB", down: "#E67E22" },
  { up: "#9B59B6", down: "#F1C40F" },
  { up: "#1ABC9C", down: "#E74C3C" },
  // Add more color pairs as needed
];

interface SplitData {
  categoryData: string[]; 
  values: number[][]; 
}

// Example data for futures market efficiency
const data0: SplitData = splitData([
  ["2025/01/01", 3000.00, 3050.00, 2950.00, 3100.00],
  ["2025/01/02", 3050.00, 3100.00, 3025.00, 3150.00],
  ["2025/01/03", 3100.00, 3200.00, 3080.00, 3250.00],
  ["2025/01/04", 3200.00, 3150.00, 3100.00, 3300.00],
  ["2025/01/05", 3150.00, 3250.00, 3125.00, 3350.00],
]);

function splitData(rawData: [string, number, number, number, number][]): SplitData {
  const categoryData: string[] = [];
  const values: number[][] = [];

  for (const item of rawData) {
    categoryData.push(item[0]); 
    values.push([item[1], item[2], item[3], item[4]]);
  }

  return { categoryData, values };
}

const FuturesMarketCandleStickChart: React.FC = () => {
  
   const option: echarts.EChartsOption = {
    title: {
      text: "The Efficiency of Futures Markets on Cryptocurrencies",
      left: "center",
      textStyle: {
        color: "#FCF80FFF",
        fontSize: 70,
        fontFamily: "Lobster",
        textShadowColor: "rgba(0.5,1,1,1)",
        textShadowBlur: 12,
      },
      top: "2%", 
    },
    grid: {
      top: "15%",
      left: "10%",
      right: "10%",
      bottom: "10%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    xAxis: {
      type: "category",
      data: data0.categoryData,
      axisLine: { lineStyle: { color: "#FF0000FF" } },
      axisLabel: { color: "#273A1EFF", fontSize:30 },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color:"#FF0303FF" } },
      splitLine:{ lineStyle:{ color:"rgba(0,0,0,.3)" }},
      axisLabel:{ fontSize :30,color:"#2B5C47FF"},
    },
    series:[
      {
        name:"Futures Market Efficiency",
        type:"candlestick",
        data:data0.values.map((value,index) => ({
          value:value,
          itemStyle:{
            color :colorPairs[index % colorPairs.length].up,
            borderColor :colorPairs[index % colorPairs.length].up,
            color0 :colorPairs[index % colorPairs.length].down,
            borderColor0 :colorPairs[index % colorPairs.length].down,
          }
        })),
      }
    ],
   };

   return (
     <>
       <GoogleFontLoader fonts={[{ font:"Lobster", weights:[400] }]} />
       <div style={{ height:"100vh", position:"relative", overflow:"hidden" }}>
         <img
           src={backimg}
           alt="background"
           style={{ position:"absolute", width:"100%", height:"100%", opacity:.4 }}
         />
         <ReactECharts option={option} style={{ height:"100%", width:"100%" }} />
       </div>
     </>
   );
};

export default FuturesMarketCandleStickChart;
