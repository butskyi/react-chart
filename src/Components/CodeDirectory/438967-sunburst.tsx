import React from "react";
import ReactECharts from "echarts-for-react";
import GoogleFontLoader from "react-google-font-loader";
import './index.css';
import backImg from '../AdditionalFilesDirectory/cosmic_sunburst.jpeg'; // Replace with your image path

const SunburstChart = () => {
  const data = {
    name: "Cosmic Brand Trends",
    children: [
      {
        name: "Cosmic Apparel",
        children: [
          { name: "T-Shirts", value: 50 },
          { name: "Hoodies", value: 30 },
          { name: "Caps", value: 20 },
        ],
      },
      {
        name: "Cosmic Footwear",
        children: [
          { name: "Sneakers", value: 60 },
          { name: "Boots", value: 25 },
          { name: "Slippers", value: 15 },
        ],
      },
      {
        name: "Cosmic Accessories",
        children: [
          { name: "Watches", value: 35 },
          { name: "Bags", value: 45 },
          { name: "Sunglasses", value: 20 },
        ],
      },
      {
        name: "Cosmic Lifestyle",
        children: [
          { name: "Fitness Gear", value: 40 },
          { name: "Smart Wearables", value: 35 },
        ],
      },
    ],
  };

  return (
    <div
      className="container"
      style={{
        position: "relative",
        padding: "50px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Background image with opacity */}
      <img
        src={backImg}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          zIndex: 1,
        }}
      />

      {/* Load custom fonts */}
      <GoogleFontLoader
        fonts={[
          { font: "Abril Fatface", weights: [400] },
          { font: "Roboto", weights: [400, 700] },
        ]}
      />

      {/* Chart component */}
      <ReactECharts
        option={{
          title: {
            text: "{gradient|Cosmic Brand Trends}",
            left: "center",
            top: "20",
            textStyle: {
              rich: {
                gradient: {
                  fontSize: 36,
                  fontFamily: "Abril Fatface",
                  fontWeight: "bold",
                  lineHeight: 50,
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                  background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                  color: "#346785",
                  padding: [5, 5, 5, 5],
                  borderRadius: 5,
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
              color: "#000",
              fontFamily: "Roboto",
            },
          },
          series: [
            {
              type: "sunburst",
              data: data.children,
              radius: [0, "80%"], // Adjust the radius to make space for the title
              center: ["50%", "52%"], // Moves the chart down
              label: {
                rotate: "radial",
                color: "#784536",
                fontFamily: "Roboto",
                fontWeight: 'bold',
                fontSize: 16
              },
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 2,
              },
              emphasis: {
                focus: "ancestor",
              },
            },
          ],
        }}
        style={{ height: "800px", width: "100%" }}
      />
    </div>
  );
};

export default SunburstChart;
