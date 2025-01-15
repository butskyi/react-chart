import React, { useEffect, useRef } from "react";
import GoogleFontLoader from "react-google-font-loader";
import * as echarts from "echarts";
import backimg from "../../AdditionalFilesDirectory/tabletennis.jpg";

const TennisPerformanceFunnel: React.FC = () => {
  const chartDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartDom.current) {
      const myChart = echarts.init(chartDom.current);

      const option: echarts.EChartsOption = {
        title: {
          left: "center",
          
          textStyle: {
            color: "#09DEFAFF",
            fontSize: 75,
            fontWeight: "bold",
            fontFamily: "'Courgette', cursive",
            textShadowColor: "#fff",
            textShadowBlur: 5,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
          },
          text: "Table Tennis Performance Funnel",
        },
        color: ["#00B7FFFF", "#8A1FAAFF", "#D3287DFF", "#0CE466FF", "#EB3E09FF"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          data: [
            "Expected - Serve",
            "Actual - Serve",
            "Expected - Forehand",
            "Actual - Forehand",
            "Expected - Backhand",
            "Actual - Backhand",
          ],
          top: "bottom",
          left: "center",
          textStyle: {
            color: "#F7F7F7FF",
            fontSize: 26,
            padding: 15,
          },
        },
        series: [
          {
            name: "Expected",
            type: "funnel",
            left: "10%",
            top:"10%",
            width: "80%",
            label: {
              formatter: function(params) {
                return params.name.split(' - ')[1] + '\nExp: ' + params.value + '%';
              },
              fontSize: 26,
              color: "#FFFFFFFF",
              rotate: 0,
              align: 'left',
            },
            labelLine: {
              show: true,
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              opacity: 0.6,
              borderColor: "#fff",
              borderWidth: 2,
            },
            data: [
              { value: 100, name: "Expected - Serve" },
              { value: 90, name: "Expected - Forehand" },
              { value: 80, name: "Expected - Backhand" },
              { value: 70, name: "Expected - Footwork" },
              { value: 60, name: "Expected - Spin" },
            ],
          },
          {
            name: "Actual",
            type: "funnel",
            left: "10%",
            top:"10%",
            width: "80%",
            maxSize: "80%",
            label: {
              position: "inside",
              formatter: function(params) {
                return params.name.split(' - ')[1] + '\nAct: ' + params.value + '%';
              },
              fontSize: 36,
              color: "#C8FF01FF",
            },
            itemStyle: {
              opacity: 0.7,
              borderColor: "#f0f",
              borderWidth: 2,
            },
            data: [
              { value: 95, name: "Actual - Serve" },
              { value: 85, name: "Actual - Forehand" },
              { value: 75, name: "Actual - Backhand" },
              { value: 65, name: "Actual - Footwork" },
              { value: 55, name: "Actual - Spin" },
            ],
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${backimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, "400i"],
          },
          {
            font: "Courgette",
            weights: [400],
          },
        ]}
      />
      <div
        ref={chartDom}
        style={{
          width: "90%",
          height: "90%",
          marginTop: "100px",
        }}
      />
    </div>
  );
};

export default TennisPerformanceFunnel;
