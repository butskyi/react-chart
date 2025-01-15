import React, { useEffect, useRef } from "react";
import GoogleFontLoader from "react-google-font-loader";
import * as echarts from "echarts";
import backimg from "../../AdditionalFilesDirectory/sports_car.jpg"; // Replace with a relevant car image

const App: React.FC = () => {
  const chartDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartDom.current) {
      const myChart = echarts.init(chartDom.current);

      const option: echarts.EChartsOption = {
        title: {
          left: "center",
          textStyle: {
            color: "#4E0303FF",
            fontSize: 75,
            fontWeight: "bold",
            fontFamily: "'Stork', cursive", // Use the Stork font for the title
            textShadowColor: "#fff",
            textShadowBlur: 5,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
          },
          text: "Top Cars Performance Funnel",
        },
        color: ["#00B7FFFF", "#8A1FAAFF", "#D3287DFF", "#0CE466FF", "#EB3E09FF", "#FF5733FF", "#C70039FF", "#900C3FFF"],
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
            "Expected - Speed",
            "Actual - Speed",
            "Expected - Fuel Efficiency",
            "Actual - Fuel Efficiency",
            "Expected - Handling",
            "Actual - Handling",
            "Expected - Acceleration",
            "Actual - Acceleration",
            "Expected - Braking",
            "Actual - Braking",
            "Expected - Safety",
            "Actual - Safety",
            "Expected - Comfort",
            "Actual - Comfort",
          ],
          top: "bottom",
          left: "center",
          textStyle: {
            color: "#141010FF",
            fontSize: 26,
            padding: 15,
            fontFamily: "'Stork', cursive", // Apply "Stork" to the legend text
          },
        },
        series: [
          {
            name: "Expected",
            type: "funnel",
            left: "10%",
            top: "7%",
            width: "80%",
            label: {
              formatter: function (params) {
                return params.name.split(" - ")[1] + "\nExp: " + params.value + "%";
              },
              fontSize: 26,
              color: "white",
              fontFamily: "'Stork', cursive", // Use Stork font for series labels
              rotate: 0,
              align: "left",
            },
            labelLine: {
              show: true,
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              opacity: 0.6,
              borderColor: "#fff",
              borderWidth: 2,
            },
            data: [
              { value: 95, name: "Expected - Speed" },
              { value: 90, name: "Expected - Fuel Efficiency" },
              { value: 85, name: "Expected - Handling" },
              { value: 80, name: "Expected - Acceleration" },
              { value: 75, name: "Expected - Braking" },
              { value: 70, name: "Expected - Safety" },
              { value: 65, name: "Expected - Comfort" },
            ],
          },
          {
            name: "Actual",
            type: "funnel",
            left: "10%",
            top: "7%",
            width: "80%",
            maxSize: "80%",
            label: {
              position: "inside",
              formatter: function (params) {
                return params.name.split(" - ")[1] + "\nAct: " + params.value + "%";
              },
              fontSize: 36,
              color: "#C8FF01FF",
              fontFamily: "'Stork', cursive", // Use Stork font for series labels
            },
            itemStyle: {
              opacity: 0.7,
              borderColor: "#f0f",
              borderWidth: 2,
            },
            data: [
              { value: 90, name: "Actual - Speed" },
              { value: 85, name: "Actual - Fuel Efficiency" },
              { value: 80, name: "Actual - Handling" },
              { value: 75, name: "Actual - Acceleration" },
              { value: 70, name: "Actual - Braking" },
              { value: 65, name: "Actual - Safety" },
              { value: 60, name: "Actual - Comfort" },
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
    backgroundImage: `url(${backimg})`, // Consider replacing this image with a car-related image
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
            font: "Stork", // Load the Stork font
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

export default App;
