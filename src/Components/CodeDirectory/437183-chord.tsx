import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import backimg from "../AdditionalFilesDirectory/teamsales_chord.jpg"; 

type FlowData = {
  source: string;
  target: string;
  value: number;
};

const App: React.FC = () => {
  useEffect(() => {
    const root = am5.Root.new("chartdiv");

    const series = root.container.children.push(
      am5flow.Chord.new(root, {
        sourceIdField: "source",
        targetIdField: "target",
        valueField: "value",
      })
    );

    const colors = series.nodes.get("colors");
    if (colors) {
      colors.set("step", 2);
    }

    const data: FlowData[] = [
      { source: "North America", target: "Europe", value: 75 },
      { source: "North America", target: "Asia", value: 60 },
      { source: "North America", target: "Africa", value: 45 },
      { source: "North America", target: "Australia", value: 30 },

      { source: "Europe", target: "North America", value: 80 },
      { source: "Europe", target: "Asia", value: 55 },
      { source: "Europe", target: "Africa", value: 40 },
      { source: "Europe", target: "Australia", value: 50 },

      { source: "Asia", target: "North America", value: 85 },
      { source: "Asia", target: "Europe", value: 60 },
      { source: "Asia", target: "Africa", value: 50 },
      { source: "Asia", target: "Australia", value: 70 },

      { source: "Africa", target: "North America", value: 35 },
      { source: "Africa", target: "Europe", value: 25 },
      { source: "Africa", target: "Asia", value: 40 },
      { source: "Africa", target: "Australia", value: 60 },

      { source: "Australia", target: "North America", value: 40 },
      { source: "Australia", target: "Europe", value: 35 },
      { source: "Australia", target: "Asia", value: 60 },
      { source: "Australia", target: "Africa", value: 50 },
    ];

    series.data.setAll(data);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
      <h2
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "36px",
          color: "transparent", 
          backgroundImage: "linear-gradient(to right, #fff65f, #452689)", 
          backgroundClip: "text", 
          WebkitBackgroundClip: "text", 
          marginBottom: "20px",
        }}
      >
        Sales Flow Between Regions
      </h2>

      <div
        style={{
          width: "100%",
          height: "600px",
          marginTop: "20px",
          position: "relative", 
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
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            opacity: 0.5, 
            borderRadius: "10px",
          }}
        />
        <div
          id="chartdiv"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 1, 
          }}
        />
      </div>
    </div>
  );
};

export default App;
