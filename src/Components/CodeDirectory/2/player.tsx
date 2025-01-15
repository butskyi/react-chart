import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import GoogleFontLoader from 'react-google-font-loader';
import backimg from "../../AdditionalFilesDirectory/boy_girl_growth.jpg"; // Use a relevant background image

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

const GrowthKDEPlot: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Example dataset for boys' height growth (in cm)
      const dataBoys = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140]; // Growth in height for boys
      const bandwidthBoys = 4;
      const densityBoys = kernelDensityEstimation(dataBoys, bandwidthBoys);

      // Example dataset for girls' height growth (in cm)
      const dataGirls = [48, 58, 68, 78, 88, 98, 108, 118, 128, 138]; // Growth in height for girls
      const bandwidthGirls = 4;
      const densityGirls = kernelDensityEstimation(dataGirls, bandwidthGirls);

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            const lines = params.map(
              (param: any) =>
                `<strong>${param.seriesName}</strong><br>
                 Height: <strong>${param.value[0]} cm</strong><br>
                 Density: <strong>${param.value[1].toFixed(2)}</strong> `
            );
            return lines.join('<br><br>');
          },
        },
        legend: {
          data: ['Boys', 'Girls'],
          textStyle: {
            fontSize: 48,
            color: '#CF3405FF',
            fontFamily: "Zilla Slab Highlight, serif"
          },
        },
        xAxis: {
          type: 'value',
          name: 'Height (cm)',
          nameTextStyle: {
            fontSize: 36,
            fontWeight: 'bold',
            color: '#FF3388FF',
            fontFamily: "Dancing Script, cursive"
          },
          axisLabel: {
            fontSize: 34,
            color: '#2A0D7AFF',
            fontFamily: "Dancing Script, cursive"
          },
          axisLine: {
            lineStyle: {
              width: 4,
              color: '#f333ff',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'Estimated Density',
          nameTextStyle: {
            fontSize: 46,
            fontWeight: 'bold',
            color: '#FC00E7FF',
            fontFamily: "Dancing Script, cursive"
          },
          axisLabel: {
            fontSize: 34,
            color: '#4D17CCFF',
            fontFamily: "Dancing Script, cursive"
          },
          axisLine: {
            lineStyle: {
              width: 4,
              color: '#2D0430FF',
            },
          },
        },
        series: [
          {
            name: 'Boys',
            type: 'line',
            data: densityBoys.map((point) => [point.x, point.y]),
            smooth: true,
            areaStyle: {
              color: 'rgba(255, 165, 0, 0.8)',
            },
            lineStyle: {
              width: 3,
              color: '#681837FF',
            },
          },
          {
            name: 'Girls',
            type: 'line',
            data: densityGirls.map((point) => [point.x, point.y]),
            smooth: true,
            areaStyle: {
              color: 'rgba(36, 191, 255, 0.8)',
            },
            lineStyle: {
              width: 3,
              color: '#068325FF',
            },
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
            font: 'Roboto',
            weights: [400],
          },
          {
            font: 'Dancing Script',
            weights: [400],
          },
        ]}
        subsets={['latin']}
      />
      <Container>
        <p style={{ textAlign:'center', fontWeight:'bold', fontSize:'80px', fontFamily:"Dancing Script,cursive", color:'#F804F8FF' }}>
          KDE Plot for Boys and Girls Growth (Up to 10 Years)
        </p>
        <div ref={chartRef} style={{ height:'80vh', width:'85%', margin:'auto' }}></div>
      </Container>
    </>
  );
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '110%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default GrowthKDEPlot;
