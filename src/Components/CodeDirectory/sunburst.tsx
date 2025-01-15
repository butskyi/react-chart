import React from "react";
import ReactECharts from "echarts-for-react";
import GoogleFontLoader from "react-google-font-loader";
import './index.css';
import backImg from "../AdditionalFilesDirectory/car_market.jpg"; // Replace with your image path

const SunburstChart = () => {
  const data = {
    name: "Car Brands",
    children: [
      {
        name: "Sedans",
        itemStyle: { color: "#FF5733" }, // Color for Sedans
        children: [
          { name: "Toyota", value: 40, itemStyle: { color: "#C70039" } },
          { name: "Honda", value: 30, itemStyle: { color: "#FFC300" } },
          { name: "Ford", value: 20, itemStyle: { color: "#DAF7A6" } },
        ],
      },
      {
        name: "SUVs",
        itemStyle: { color: "#33FF57" }, // Color for SUVs
        children: [
          { name: "BMW", value: 50, itemStyle: { color: "#581845" } },
          { name: "Audi", value: 35, itemStyle: { color: "#900C3F" } },
          { name: "Nissan", value: 15, itemStyle: { color: "#FFC300" } },
        ],
      },
      {
        name: "Trucks",
        itemStyle: { color: "#3357FF" }, // Color for Trucks
        children: [
          { name: "Ford", value: 60, itemStyle: { color: "#FF33A1" } },
          { name: "Chevrolet", value: 25, itemStyle: { color: "#33FFF7" } },
          { name: "Ram", value: 15, itemStyle: { color: "#FF5733" } },
        ],
      },
      {
        name: "Electric Vehicles",
        itemStyle: { color: "#FF33D4" }, // Color for Electric Vehicles
        children: [
          { name: "Tesla", value: 60, itemStyle: { color: "#C70039" } },
          { name: "Nissan Leaf", value: 30, itemStyle: { color:"#FFC300"} },
        ],
      },
    ],
  };

  return (
    <div
      className="container"
      style={{
        position: "relative",
        padding: "0px",
        borderRadius: "0px",
        overflow:"hidden",
      }}
    >
      <img
        src={backImg}
        alt="Background"
        style={{
          position:"absolute",
          top:"0",
          left:"0",
          width:"100%",
          height:"100%",
          objectFit:"cover",
          opacity:"0.2",
          zIndex:"1",
        }}
      />

      <GoogleFontLoader
        fonts={[
          { font:"Abril Fatface", weights:[400] },
          { font:"Roboto", weights:[400, 700] },
        ]}
      />

<ReactECharts
  option={{
    title: {
      text: "{gradient|Car Brands}",
      left: "center",
      top: "80", // Adjust this value for spacing
      textStyle: {
        rich: {
          gradient: {
            fontSize: "65",
            fontFamily: "'Caveat', cursive",
            fontWeight: "bold",
            lineHeight: "0",
            // Add shadow effect here
            textShadow: "20px 20px 50px rgba(1, 0, 0, 0.2)", // Shadow color and offset
            background: "linear-gradient(60deg, #EE3203FF, #A5A5A5FF)",
            color: "#535754FF",
            padding: [5, 5, 0, 0],
            borderRadius: 0,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      left: "right",
      top: "center",
      textStyle: {
        color: "#0f0",
        fontFamily: "Roboto",
      },
    },
    series: [
      {
        type: "sunburst",
        data: data.children,
        radius: [0, "80%"],
        center: ["50%", "55%"],
        label: {
          rotate: "tangential",
          color: "#131212FF",
          fontFamily: "Roboto",
          fontWeight: 'bold',
          fontSize: 20,
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          focus: "ancestor"
        }
      }
    ],
  }}
  style={{ height:"1000px", width:"100%" }}
/>

    </div>
  );
};

export default SunburstChart;
