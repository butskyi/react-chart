import React, { useEffect } from "react";
import { Root } from "@amcharts/amcharts5";
import { SlicedChart } from "@amcharts/amcharts5/percent";
import { PyramidSeries } from "@amcharts/amcharts5/percent";
import { Label } from "@amcharts/amcharts5";
import Animated from "@amcharts/amcharts5/themes/Animated";
import { color } from "@amcharts/amcharts5";
import GoogleFontLoader from "react-google-font-loader";
import backimg from "../../AdditionalFilesDirectory/WorkPriorities.jpg"; // Path to your background image

interface ChartData {
  value: number;
  category: string;
  color: string;
}

const WorkPrioritiesPyramid: React.FC = () => {
  useEffect(() => {
    const root = Root.new("chartdiv");
    root.setThemes([Animated.new(root)]);

    const chart = root.container.children.push(
      SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    const series = chart.series.push(
      PyramidSeries.new(root, {
        orientation: "vertical",
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.labels.template.setAll({
      fontFamily: "'Roboto', sans-serif",
      fontSize: 25,
      
      fontStyle: "normal",
      fontWeight: "bold",
      fill: color("#FF0000"),
    });

    // Real Priority Tasks Data
    const data: ChartData[] = [
      { value: 100, category: "Fix Production Bug", color: "#FF0000" }, // Bright Red
      { value: 80, category: "Prepare Client Presentation", color: "#FF8C00" }, // Orange
      { value: 60, category: "Code Review for Key Feature", color: "#FFD700" }, // Yellow
      { value: 40, category: "Weekly Team Meeting", color: "#32CD32" }, // Lime Green
      { value: 20, category: "Organize Files", color: "#1E90FF" }, // Dodger Blue
    ].reverse();

    series.data.setAll(data);

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: color("#4FC36AFF"),
      fillOpacity: 0.9,
    });

    // Correct implementation of color assignment
    series.slices.template.adapters.add("fill", (_fill, target) => {
      const dataContext = target.dataItem?.dataContext as ChartData | undefined;
      if (dataContext && dataContext.color) {
        return color(dataContext.color);
      }
      return _fill;
    });

    series.appear(1000, 100);

    const title = chart.children.push(
      Label.new(root, {
        text: "Hierarchy of Real Priority Tasks",
        fontSize: 70,
        fontWeight: "bold",
        fontFamily: "'Impact', sans-serif",
        y: 20,
       
        fill: color("#EBE009FF"),
      })
    );

    chart.appear(800, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, 700],
          },
        ]}
      />
      <div
        id="chartdiv"
        style={{
          width: "100%",
          height: "110vh",
          position: "relative",
        }}
      >
        <style>
          {`
            #chartdiv::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-image: url(${backimg});
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              opacity: 0.8;
              z-index: -1;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default WorkPrioritiesPyramid;
