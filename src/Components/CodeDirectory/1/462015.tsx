import React, { useEffect } from "react";
import { Root } from "@amcharts/amcharts5";
import { SlicedChart } from "@amcharts/amcharts5/percent";
import { PyramidSeries } from "@amcharts/amcharts5/percent";
import { Label } from "@amcharts/amcharts5";
import Animated from "@amcharts/amcharts5/themes/Animated";
import { color } from "@amcharts/amcharts5";
import backimg from "../../AdditionalFilesDirectory/countrysize_pyramid.jpg";
import GoogleFontLoader from "react-google-font-loader";

interface ChartData {
  value: number; // Size of the country in square kilometers
  category: string; // Country name
  color: string; // Color for the slice
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
      fontSize: 50,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: color("rgb(255,255,255)"),
    });

    const colors = [
      "#FF5733", // Bright Red
      "#FF8533FF", // Bright Green
      "#B6BEE0FF", // Bright Blue
      "#F1C40F", // Bright Yellow
      "#AFA0B6FF", // Bright Purple
      "#E67E22", // Bright Orange
      "#2ECC71"  // Bright Teal
    ];
    
    // Data representing country sizes (in square kilometers)
    const data: ChartData[] = [
      { value: 9833517, category: "Russia", color: colors[0] },
      { value: 9372610, category: "Canada", color: colors[1] },
      { value: 9372610, category: "United States", color: colors[2] },
      { value: 8515767, category: "China", color: colors[3] },
      { value: 3287263, category: "Brazil", color: colors[4] },
      { value: 2780400, category: "Australia", color: colors[5] },
      { value: 2383900, category: "India", color: colors[6] },
    ].reverse(); // Reverse to have the largest at the top
    
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
        text: "Country Sizes (in sq km)",
        fontSize: 70,
        fontWeight: "bold",
        fontFamily: "'Caveat', cursive",
        y: 10,
        paddingTop: 20,
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
              opacity: 0.5;
              z-index:-1;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default RevenuePyramid;
