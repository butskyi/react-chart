import React from "react";
import ReactECharts from "echarts-for-react";
import GoogleFontLoader from "react-google-font-loader";
import '../index.css';
import backImg from '../../AdditionalFilesDirectory/clothes.jpg'; // Replace with your image path

const SunburstChart = () => {
  const data = {
    name: "",
    children: [
      {
        name: "Men's Wear",
        itemStyle: { color: "#FF5733" }, // Color for Men's Wear
        children: [
          { name: "Nike", value: 40, itemStyle: { color: "#C70039" } },
          { name: "Adidas", value: 30, itemStyle: { color: "#FFC300" } },
          { name: "Puma", value: 20, itemStyle: { color: "#DAF7A6" } },
        ],
      },
      {
        name: "Women's Wear",
        itemStyle: { color: "#33FF57" }, // Color for Women's Wear
        children: [
          { name: "Zara", value: 50, itemStyle: { color: "#581845" } },
          { name: "H&M", value: 35, itemStyle: { color: "#900C3F" } },
          { name: "Uniqlo", value: 15, itemStyle: { color: "#FFC300" } },
        ],
      },
      {
        name: "Children's Wear",
        itemStyle: { color: "#3357FF" }, // Color for Children's Wear
        children: [
          { name: "Gap", value: 60, itemStyle: { color: "#FF33A1" } },
          { name: "Next", value: 25, itemStyle: { color: "#33FFF7" } },
          { name: "Mothercare", value: 25, itemStyle: { color: "#FF5733" } },
        ],
      },
      {
        name: "Luxury Wear",
        itemStyle: { color: "#FF33D4" }, // Color for Luxury Wear
        children: [
          { name: "Gucci", value: 60, itemStyle: { color: "#C70039" } },
          { name: "Louis Vuitton", value: 30, itemStyle: { color:"#FFC300"} },
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
        overflow:"",
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
          height:"100vh",
          objectFit:"cover",
          opacity:"1",
          zIndex:"0",
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
            text: "{gradient| Famous Clothing Brands in the World}",
            left: "center",
            top: "120", // Adjusted as needed
            textStyle: {
              rich: {
                gradient: {
                  fontSize: "75",
                  fontFamily: "Dancing Script,cursive",
                  fontWeight: "bold",
                  lineHeight: "10",
                  textShadow: "4px 7px 2px rgba(1, 0.5, 0.5, 0.8)", // Shadow color and offset
                  background: "linear-gradient(60deg, #9B0A83FF, #A5A5A5FF)",
                  color: "#FF0464FF",
                  padding: [5, 5, 0, 0],
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
              color: "#0f0",
              fontFamily: "Roboto",
            },
          },
          series: [
            {
              type: "sunburst",
              data: data.children,
              radius: [10, "83%"], // Keep as per your preference
              center: ["50%", "56%"], // Retain this setting
              label: {
                rotate: "tangential",
                color: "#0F0F0FFF",
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: 30,
              },
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 2,
                opacity: 0.7, // Apply opacity here
              },
              emphasis: {
                focus: "ancestor",
              },
            },
          ],
        }}
        style={{ height: "100vh", width: "100%" }} // Increase to 100vh to avoid cutting off
      />
    </div>
  );
};

export default SunburstChart;
