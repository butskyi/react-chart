import React, { useEffect } from "react";
import { Root } from "@amcharts/amcharts5";
import { SlicedChart } from "@amcharts/amcharts5/percent";
import { PyramidSeries } from "@amcharts/amcharts5/percent";
import { Label } from "@amcharts/amcharts5";
import Animated from "@amcharts/amcharts5/themes/Animated";
import { color } from "@amcharts/amcharts5";
import backimg from "../../AdditionalFilesDirectory/military.jpg";
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
      fontFamily: "'Pacifico', cursive",
      fontSize: 30,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: color("rgb(255,255,255)"),
    });

    const colors = [
      "#FF3381FF",
      "#FF33B1FF",
      "#940675FF",
      "#F10FCBFF",
      "#9C0E79FF",
      "#A80B67FF",
      "#CC2EA4FF" 
    ];
    
    
    const data: ChartData[] = [
      { value: 9833517, category: "United States", color: colors[0] },
      { value: 9372610, category: "Russia", color: colors[1] },
      { value: 9372610, category: "China", color: colors[2] },
      { value: 8515767, category: "India", color: colors[3] },
      { value: 3287263, category: "South Korea", color: colors[4] },
      { value: 2780400, category: "Japan", color: colors[5] },
      { value: 2383900, category: "France", color: colors[6] },
    ].reverse();
    
    series.data.setAll(data);
    
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
        text: "Global Military Power Index",
        fontSize: 70,
        fontWeight: "bold",
        fontFamily: "'Caveat', cursive",
        y: 10,
        paddingTop: 30,
        fill: color("#EB0404FF"),
        shadowColor: color("#0CD6FAFF"),
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
              opacity: 0.8;
              z-index:-1;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default RevenuePyramid;
