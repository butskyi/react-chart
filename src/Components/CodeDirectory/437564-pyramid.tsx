import React, { useEffect } from "react";
import { Root } from "@amcharts/amcharts5";
import { SlicedChart } from "@amcharts/amcharts5/percent";
import { PyramidSeries } from "@amcharts/amcharts5/percent";
import { Legend, Label } from "@amcharts/amcharts5";
import Animated from "@amcharts/amcharts5/themes/Animated";
import { array } from "@amcharts/amcharts5";
import { color } from "@amcharts/amcharts5"; // Import the color function
import backimg from "../AdditionalFilesDirectory/pyramid_pyramid.jpg"; // Update with the correct path

interface ChartData {
  value: number;
  category: string;
}

const App: React.FC = () => {
  useEffect(() => {
    const root = Root.new("chartdiv");
    root.setThemes([Animated.new(root)]);

    // Create the chart container (SlicedChart)
    const chart = root.container.children.push(
      SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create the series (PyramidSeries)
    const series = chart.series.push(
      PyramidSeries.new(root, {
        orientation: "vertical",
        valueField: "value",
        categoryField: "category",
      })
    );

    // Apply custom font for labels
    series.labels.template.setAll({
      fontFamily: "Dancing Script",
      fontSize: 18,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: color("rgb(12,56,23)"), // White font color for labels
    });

    // New dataset: Product Sales Distribution by Category
    const data: ChartData[] = [
      { value: 5000, category: "Electronics" },
      { value: 8000, category: "Clothing" },
      { value: 12000, category: "Home Appliances" },
      { value: 15000, category: "Books" },
      { value: 20000, category: "Beauty Products" },
      { value: 25000, category: "Toys & Games" },
      { value: 30000, category: "Furniture" },
      { value: 35000, category: "Food & Beverages" },
      { value: 40000, category: "Sports Equipment" },
      { value: 45000, category: "Automotive Accessories" },
    ].reverse();

    series.data.setAll(data);
    series.appear();

    // Create the legend
    const legend = chart.children.push(
      Legend.new(root, {
        centerX: 50,
        x: 50,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 25,
      })
    );

    legend.data.setAll(array.copy(series.dataItems).reverse());

    // Change legend font color
    legend.labels.template.setAll({
      fill: color("rgb(56,97,12)"), // White font color for legend labels
    });

    // Add a title to the chart with text effect (shadow)
    const title = chart.children.push(
      Label.new(root, {
        text: "Product Sales Distribution by Category",
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Dancing Script",
        y: 10, // Position the title at the top of the chart
        paddingTop: 20,
        fill: color("rgb(255, 204, 0)"), // Gold color for title
        shadowColor: color("rgb(0, 0, 0)"), // Shadow color
        shadowBlur: 10, // Shadow blur effect
        shadowOffsetX: 5, // Shadow X-offset
        shadowOffsetY: 5, // Shadow Y-offset
      })
    );

    // Make everything animate on load
    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative", // Ensure positioning for the pseudo-element
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
            opacity: 0.5; /* Adjust opacity of background image */
            z-index: 100; /* Ensure the background image is behind the chart content */
          }
        `}
      </style>
    </div>
  );
};

export default App;
