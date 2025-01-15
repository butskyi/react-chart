import React from "react";
import { Chart } from "react-google-charts";
import backImg from '../../AdditionalFilesDirectory/company.jpg';

const CompanyGeoChartByCountry: React.FC = () => {
  const data = [
    ["Country", "Top Company", { role: "tooltip", type: "string" }],
    ["US", "Apple Inc.", "United States: Apple Inc. (Rank 1)"],
    ["US", "Microsoft Corporation", "United States: Microsoft Corp. (Rank 2)"],
    ["US", "Alphabet Inc.", "United States: Alphabet Inc. (Rank 3)"],
    ["JP", "Toyota", "Japan: Toyota Motor Corporation (Rank 4)"],
    ["DE", "Siemens", "Germany: Siemens AG (Rank 5)"],
    ["GB", "HSBC", "United Kingdom: HSBC Holdings plc (Rank 6)"],
    ["CN", "Alibaba", "China: Alibaba Group (Rank 7)"],
    ["HK", "Tencent", "Hong Kong: Tencent Holdings Ltd. (Rank 8)"],
  ];

  const options = {
    region: "world", 
    displayMode: "regions",
    resolution: "countries",
    colorAxis: { colors: ["#FFDD44", "#FF8844", "#DD4444"] }, 
    backgroundColor: 'transparent',
    datalessRegionColor: "#834B4BFF",
    tooltip: {
      isHtml: true,
      textStyle: {
        color: "red",
        fontSize: 20,
      },
      trigger: "focus",
    },
    chartArea: {
      backgroundColor: { fill: 'transparent' },
      left: '5%',
      top: '5%',
      width: '90%',
      height: '90%',
    },
  };

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.5,
        zIndex: 1,
      }}></div>

      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1a1a1a, #004080)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
        zIndex: -1,
      }}></div>

      <div style={{
        textAlign: "center",
        color: "white",
        zIndex: 2,
        padding: "2rem",
        backdropFilter: "blur(8px)",
        borderRadius: "15px",
        backgroundColor: "rgba(0.4, 0.5, 0.6, 0.2)",
      }}>
        <h2 style={{
          fontSize: "5rem",
          color:"orange",
          fontFamily: "'Courgette', cursive",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}>Top Companies by Country (2025)</h2>

        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          width="80vw"
          height="70vh"
        />
      </div>
    </div>
  );
}

export default CompanyGeoChartByCountry;
