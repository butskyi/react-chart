import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import back from "../AdditionalFilesDirectory/weather_threedscatter.jpeg"; // Adjust the path to your image

const WeatherChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ];

    const temperatures = [
      [30, 32, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
      [40, 42, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
      [20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
      [50, 52, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      [35, 37, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      [25, 27, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      [45, 47, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
      [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
    ];

    const humidity = [
      [70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 97],
      [60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 87],
      [50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 77],
      [80, 82, 85, 88, 90, 92, 95, 98, 100, 102, 105, 107],
      [40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 67],
      [30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 57],
      [75, 77, 80, 83, 85, 87, 90, 93, 95, 97, 100, 102],
      [25, 27, 30, 33, 35, 37, 40, 43, 45, 47, 50, 52],
      [65, 67, 70, 73, 75, 77, 80, 83, 85, 87, 90, 92],
      [55, 57, 60, 63, 65, 67, 70, 73, 75, 77, 80, 83],
    ];

    const weatherData: any = [];

    for (let cityIndex = 0; cityIndex < cities.length; cityIndex++) {
      for (let month = 0; month < 12; month++) {
        weatherData.push({
          value: [
            month,
            humidity[cityIndex][month],
            temperatures[cityIndex][month],
          ],
          city: cities[cityIndex],
        });
      }
    }

    const option = {
      title: {
        text: "Monthly Temperature and Humidity by City",
        subtext: "Weather Analysis",
        left: "center",
        textStyle: {
          color: "#234567",
          fontSize: 40
        },
        subTextStyle: {
          color: "#234567",
          fontSize: 40
        },
        top: 30
      },
      legend: {
        data: cities,
        orient: "vertical",
        left: "2%",
        textStyle: {
          color: "#785636",
          fontSize: 30
        },
        top: 100,
      },
      tooltip: {
        formatter: (params: any) => {
          const { value, city } = params.data;
          return `
            <div>
              <b>Month:</b> ${
                ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][value[0]]
              }<br/>
              <b>Humidity:</b> ${value[1]}%<br/>
              <b>Temperature:</b> ${value[2]}°F<br/>
              <b>City:</b> ${city}
            </div>
          `;
        },
      },
      xAxis3D: {
        type: "value",
        name: "Month",
        axisLabel: {
          formatter: (value: number) =>
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][value],
        },
      },
      yAxis3D: {
        type: "value",
        name: "Humidity (%)",
      },
      zAxis3D: {
        type: "value",
        name: "Temperature (°F)",
      },
      grid3D: {
        viewControl: {
          projection: "perspective",
        },
      },
      series: cities.map((city, index) => ({
        type: "scatter3D",
        name: city,
        data: weatherData
          .filter((data: any) => data.city === city)
          .map((data: any) => ({
            value: data.value,
            city: data.city,
          })),
      })),
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5, // Adjust opacity here
          zIndex: 1,
        }}
      ></div>
      <div
        ref={chartRef}
        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 2 }}
      />
    </div>
  );
};

export default WeatherChart;
