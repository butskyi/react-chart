import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import GoogleFontLoader from 'react-google-font-loader';
import backimg from "../../AdditionalFilesDirectory/player_profits.jpg"; 

const kernelDensityEstimation = (data: number[], bandwidth: number, steps: number = 100) => {
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const stepSize = (maxVal - minVal) / steps;
  const kernel = (u: number) => Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI);

  const density: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = minVal + i * stepSize;
    let sum = 0;
    data.forEach((xi) => {
      sum += kernel((x - xi) / bandwidth);
    });
    density.push({ x, y: sum / (data.length * bandwidth) });
  }
  return density;
};

const PlayerProfitKDEPlot: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Define yearly profits of top football players in millions
      const playerProfits = [218, 135, 84.31, 69, 79.71]; // Yearly profits
      const bandwidth = 10; // Adjust as necessary
      const density = kernelDensityEstimation(playerProfits, bandwidth);

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            const lines = params.map(
              (param: any) =>
                `<strong>${param.seriesName}</strong><br>
                 Yearly Profit: <strong>${param.value[0]} million</strong><br>
                 Density: <strong>${param.value[1].toFixed(2)}</strong>`
            );
            return lines.join('<br><br>');
          },
        },
        legend: {
          data: ['Player Profits'],
          textStyle: {
            fontSize: 48,
            color: '#CFCC05FF',
            fontFamily: "Zilla Slab Highlight, serif",
          },
        },
        xAxis: {
          type: 'value',
          name: 'Yearly Profit (in millions)',
          nameTextStyle: {
            fontSize: 36,
            fontWeight: 'bold',
            color: '#f333ff',
            fontFamily: "Dancing Script, cursive",
          },
          axisLabel: {
            fontSize: 34,
            color: '#03F3FCFF',
            fontFamily: "Dancing Script, cursive",
          },
          axisLine: {
            lineStyle: {
              width: 4, // Ensure this is a number
              color:'#f333ff',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'Estimated Density',
          nameTextStyle: {
            fontSize: 46,
            fontWeight:'bold',
            color:'#FC00E7FF',
            fontFamily:"Dancing Script, cursive",
          },
          axisLabel:{
            fontSize:'34',
            color:'#02FFF2FF',
            fontFamily:"Dancing Script, cursive",
          },
          axisLine:{
            lineStyle:{
              width: 4, // Ensure this is a number
              color:'#EE00FFFF',
            },
          },
        },
        series:[
          {
            name:'Player Profits',
            type:'line',
            data:density.map((point) => [point.x, point.y]),
            smooth:true,
            areaStyle:{
              color:'rgba(255, 165, 0, 0.8)',
            },
            lineStyle:{
              width: 3, // Ensure this is a number
              color:'#AF7405FF',
            },
          }
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
            font:'Roboto',
            weights:[400],
          },
          {
            font:'Dancing Script',
            weights:[400],
          },
        ]}
        subsets={['latin']}
      />
      <Container>
        <p
          style={{
            textAlign:'center',
            fontWeight:'bold',
            fontSize:'80px',
            fontFamily:"Dancing Script, cursive",
            color:'#20F804FF'
          }}
        >
          Yearly Profits of Top Football Players
        </p>
        <div ref={chartRef} style={{ height:'80vh', width:'85%', margin:'auto' }}></div>
      </Container>
    </>
  );
};

// Explicitly typing the children prop
const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div style={{
        position:'relative', 
        width:'100%', 
        height:'90%', 
        overflow:'hidden'
    }}>
      <div style={{
          position:'absolute', 
          top:'0', 
          left:'0', 
          right:'0', 
          bottom:'0', 
          backgroundImage:`url(${backimg})`, 
          backgroundSize:'cover', 
          backgroundPosition:'center', 
          opacity:'1', 
          zIndex:'0'
      }} />
      <div style={{ position:'relative', zIndex:'1' }}>{children}</div>
    </div>
);

export default PlayerProfitKDEPlot;
