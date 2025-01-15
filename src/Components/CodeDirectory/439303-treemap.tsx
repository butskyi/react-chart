import React from "react";
import { Treemap, Cell } from "recharts";
import backImg from "../AdditionalFilesDirectory/wine_treemapchart.jpeg"; // Replace with your wine background image

interface WineData {
  wine_name: string;
  price: number;
  category: string;
}

const App: React.FC = () => {
  const data: WineData[] = [
    { wine_name: "Cabernet Sauvignon", price: 50, category: "Red" },
    { wine_name: "Merlot", price: 45, category: "Red" },
    { wine_name: "Pinot Noir", price: 60, category: "Red" },
    { wine_name: "Chardonnay", price: 40, category: "White" },
    { wine_name: "Sauvignon Blanc", price: 35, category: "White" },
    { wine_name: "Riesling", price: 30, category: "White" },
    { wine_name: "Prosecco", price: 25, category: "Sparkling" },
    { wine_name: "Champagne", price: 100, category: "Sparkling" },
    { wine_name: "Cava", price: 20, category: "Sparkling" },
    { wine_name: "Zinfandel", price: 55, category: "Red" },
  ];

  const treemapData = [
    {
      name: "Wine Inventory",
      value: data.reduce((acc, wine) => acc + wine.price, 0),
      children: [
        {
          name: "Red",
          value: data
            .filter((wine) => wine.category === "Red")
            .reduce((acc, wine) => acc + wine.price, 0),
          fill: "url(#redGradient)",
          children: data
            .filter((wine) => wine.category === "Red")
            .map((wine) => ({
              name: wine.wine_name,
              value: wine.price,
              fill: "url(#redGradient)",
            })),
        },
        {
          name: "White",
          value: data
            .filter((wine) => wine.category === "White")
            .reduce((acc, wine) => acc + wine.price, 0),
          fill: "url(#whiteGradient)",
          children: data
            .filter((wine) => wine.category === "White")
            .map((wine) => ({
              name: wine.wine_name,
              value: wine.price,
              fill: "url(#whiteGradient)",
            })),
        },
        {
          name: "Sparkling",
          value: data
            .filter((wine) => wine.category === "Sparkling")
            .reduce((acc, wine) => acc + wine.price, 0),
          fill: "url(#sparklingGradient)",
          children: data
            .filter((wine) => wine.category === "Sparkling")
            .map((wine) => ({
              name: wine.wine_name,
              value: wine.price,
              fill: "url(#sparklingGradient)",
            })),
        },
      ],
    },
  ];

  const listData = data.map((wine) => ({
    name: wine.wine_name,
    price: wine.price,
    color:
      wine.category === "Red"
        ? "#8B0000"
        : wine.category === "White"
        ? "#FFD700"
        : "#DAA520", // Different colors for wine categories
  }));

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name } = props;

    const fontSize = Math.max(16, Math.min(14, props.value / 50));

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: props.fill,
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={fontSize}
        >
          {name}
        </text>
      </g>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "1400px",
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1,
        zIndex: 100
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            textAlign: "center",
            marginBottom: "40px",
            color: "#f54677",
          }}
        >
          Wine Inventory: Explore Our Selection
        </h1>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B0000" />
              <stop offset="100%" stopColor="#FF6347" />
            </linearGradient>
            <linearGradient id="whiteGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFFACD" />
            </linearGradient>
            <linearGradient id="sparklingGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#FFE4B5" />
            </linearGradient>
          </defs>
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ flex: 1, marginRight: "20px" }}>
            <Treemap
              width={1000}
              height={1000}
              data={treemapData}
              dataKey="value"
              nameKey="name"
              stroke="#fff"
              content={<CustomizedContent />}
            >
              {treemapData[0].children
                .map((child) => child.children)
                .reduce((acc, curr) => acc.concat(curr), [])
                .map((item) => (
                  <Cell key={item.name} fill={item.fill} />
                ))}
            </Treemap>
          </div>

          <div
            style={{
              flex: 1,
              marginLeft: "20px",
              backgroundColor: "#FAF0E6",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
              Wine Price
            </h2>
            <ul style={{ listStyle: "none", fontSize: "30px", padding: 0 }}>
              {listData.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    color: item.color, // Dynamic color
                  }}
                >
                  {item.name}: <span style={{ fontWeight: "bold" }}>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
            fontSize: "30px",
            color: "#fff",
          }}
        >
          <div
            style={{
              marginRight: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "linear-gradient(to right, #8B0000, #FF6347)", // Red wine gradient
                marginRight: "10px",
              }}
            ></div>
            Red Wines
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: "40px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "linear-gradient(to right, #FFD700, #FFFACD)", // White wine gradient
                marginRight: "10px",
              }}
            ></div>
            White Wines
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "linear-gradient(to right, #DAA520, #FFE4B5)", // Sparkling wine gradient
                marginRight: "10px",
              }}
            ></div>
            Sparkling Wines
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
