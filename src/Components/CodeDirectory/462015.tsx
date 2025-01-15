import React, { useEffect } from "react";
import { Root } from "@amcharts/amcharts5";
import { SlicedChart } from "@amcharts/amcharts5/percent";
import { PyramidSeries } from "@amcharts/amcharts5/percent";
import { Label } from "@amcharts/amcharts5";
import Animated from "@amcharts/amcharts5/themes/Animated";
import { color } from "@amcharts/amcharts5";
import backimg from "../AdditionalFilesDirectory/Revenue_Distribution_pyramid.jpg";
import GoogleFontLoader from "react-google-font-loader";

interface ChartData {
  value: number;
  category: string;
  color: string;
}

const RevenuePyramid: React.FC = () => {
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
      fontFamily: "Dancing Script",
      fontSize: 40,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: color("rgb(61,6,23)"),
    });

    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
      "#98D8C8", "#F06292", "#AED581"
    ];

    const data: ChartData[] = [
      { value: 100000, category: "Technology", color: colors[0] },
      { value: 120000, category: "Healthcare", color: colors[1] },
      { value: 150000, category: "Retail", color: colors[2] },
      { value: 170000, category: "Finance", color: colors[3] },
      { value: 200000, category: "Energy", color: colors[4] },
      { value: 250000, category: "Telecommunications", color: colors[5] },
      { value: 300000, category: "Manufacturing", color: colors[6] },
    ].reverse();

    series.data.setAll(data);

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: color("#ffffff"),
      fillOpacity: 0.8,
    });

    series.slices.template.adapters.add("fill", (fill, target) => {
      if (target.dataItem && target.dataItem.dataContext && typeof target.dataItem.dataContext === 'object' && 'color' in target.dataItem.dataContext) {
        return color(target.dataItem.dataContext.color as string);
      }
      return fill;
    });

    series.appear(1000, 100);

    const title = chart.children.push(
      Label.new(root, {
        text: "Annual Revenue Distribution by Industry",
        fontSize: 70,
        fontWeight: "bold",
        fontFamily: "'Caveat', cursive",
        y: 10,
        paddingTop: 10,
        fill: color("#D4C707FF"),
        shadowColor: color("#650ACCFF"),
        shadowBlur: 2,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
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
            font: 'Caveat',
            weights: [400, 700],
          },
        ]}
      />
      <div
        id="chartdiv"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.9,
          }}
        />
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
              opacity: 0.3;
              z-index: -1;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default RevenuePyramid;
