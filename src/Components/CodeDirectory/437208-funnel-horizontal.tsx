import React, { useEffect, useRef } from "react";
import { Root } from "@amcharts/amcharts5";
import { SlicedChart } from "@amcharts/amcharts5/percent";
import { FunnelSeries } from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Legend, p50 } from "@amcharts/amcharts5"; 
import backimg from "../AdditionalFilesDirectory/football_funnelhorizontal.jpeg"; 

const App: React.FC = () => {
  const chartDiv = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (chartDiv.current) {
      
      const root = Root.new(chartDiv.current);

      
      root.setThemes([am5themes_Animated.new(root)]);

      
      const chart = root.container.children.push(
        SlicedChart.new(root, {
          layout: root.verticalLayout,
        })
      );

      
      const series = chart.series.push(
        FunnelSeries.new(root, {
          alignLabels: false,
          orientation: "horizontal",
          valueField: "value",
          categoryField: "category",
          bottomRatio: 1,
        })
      );

      
      series.data.setAll([
        { value: 32, category: "Total Teams" },
        { value: 16, category: "Qualified Teams" },
        { value: 16, category: "Round of 16" },
        { value: 8, category: "Quarter-finals" },
        { value: 4, category: "Semi-finals" },
        { value: 2, category: "Finalists" },
        { value: 1, category: "Champion" },
      ]);

      
      series.appear();

      
      const legend = chart.children.push(
        Legend.new(root, {
          centerX: p50, 
          x: p50,
          marginTop: 15,
          marginBottom: 15,
        })
      );

      legend.data.setAll(series.dataItems);

      
      chart.appear(1000, 100);

      
      return () => {
        root.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={chartDiv}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        background: "linear-gradient(45deg, #00c6ff, #0072ff)", 
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4, 
          zIndex: 100, 
        }}
      />

      <h1
        style={{
          fontFamily: "Pacifico, sans-serif", 
          fontSize: "36px", 
          color: "#fff", 
          position: "absolute",
          top: "20px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", 
        }}
      >
        Football Tournament Funnel
      </h1>
    </div>
  );
};

export default App;
