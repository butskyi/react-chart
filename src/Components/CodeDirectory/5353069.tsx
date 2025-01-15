import { memo, useEffect, useRef, useState } from "react";

interface TikzRendererProps {
  tikzCode: string;
  widthContainer: string;
  heightContainer: string;
  onRenderComplete?: () => void;
  onRenderError?: (error: Error) => void;
  backgroundImage?: string;
  logoImage?: string;
}

const TikzRenderer = memo(
  ({
    tikzCode,
    widthContainer,
    heightContainer,
    onRenderComplete,
    onRenderError,
    backgroundImage,
    logoImage,
  }: TikzRendererProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    const renderTikz = async () => {
      if (!containerRef.current) return;

      try {
        containerRef.current.innerHTML = "";
        const tikzScript = document.createElement("script");
        tikzScript.type = "text/tikz";
        tikzScript.textContent = tikzCode;
        containerRef.current.appendChild(tikzScript);
        if (Object.prototype.hasOwnProperty.call(window, "tikzjax") && window.onload) {
          (window as Window & typeof globalThis & { tikzjax: { process: () => void } }).tikzjax.process();
          onRenderComplete?.();
          setLoading(false);
        }
      } catch (error) {
        onRenderError?.(error as Error);
        setLoading(false);
      }
    };

    useEffect(() => {
      if (!("tikzjax" in window) && !window.onload) {
        const loadDependencies = async () => {
          try {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://tikzjax.com/v1/fonts.css";
            document.head.appendChild(link);

            await new Promise((resolve, reject) => {
              link.onload = resolve;
              link.onerror = reject;
            });
            const styleTag = document.createElement('style');
            styleTag.innerHTML = `
              svg text, .tikz-container svg text {
                font-family: 'cmr12' !important;
                font-style: italic;
              }
              .tikz-container svg {
                text-rendering: optimizeLegibility;
                width: ${widthContainer};              
                height: ${heightContainer};
              }
            `;
            document.head.appendChild(styleTag);

            const script = document.createElement("script");
            script.src = "https://tikzjax.com/v1/tikzjax.js";
            script.async = true;
            await new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });

            renderTikz();
            setLoading(false);
          } catch (error) {
            onRenderError?.(error as Error);
            setLoading(false);
          }
        };

        loadDependencies();
      } else {
        renderTikz();
      }
    }, [tikzCode]);

    return (
      <div className="container" style={{ position: "relative", minWidth: "1200px", width: widthContainer, height: heightContainer }}>
        {loading && <div>Loading...</div>}
        {containerRef && <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url('${backgroundImage || "https://upload.wikimedia.org/wikipedia/commons/d/d5/Nix_gray_map.png"}')`,
          backgroundSize: "cover",
          opacity: 0.3,
          zIndex: -1,
          padding: "2rem",
        }}></div>}
        <div
          ref={containerRef}
          className="tikz-container"
          style={{ minWidth: "1200px", padding: "2rem" }}
        />
        <div style={{
          marginTop: "20px",
          fontSize: "15px",
          fontWeight: "bold",
          color: "#555",
          position: "absolute",
          bottom: 0,
          left: "50%",
          textAlign: "right",
        }}>
          <img style={{
            width: "150px",
          }} src={logoImage} alt="Logo" />
        </div>
      </div>
    );
  }
);

TikzRenderer.displayName = "TikzRenderer";

type Data = {
  value: number;
  name: string;
};

interface Props {
  data: Data[];
  title: string;
  widthContainer: string;
  heightContainer: string;
  onTexReady?: (tex: string) => void;
  backgroundImage: string;
  logoImage: string;
  credit: string;
  watermark: string;
}



const ThreeDPieChart = memo(
  ({
    data,
    title = "",
    widthContainer = "1024px",
    heightContainer = "1024px",
    backgroundImage,
    logoImage,
    onTexReady,
    credit,
    watermark,
  }: Props) => {

    const colors = [
      { color: "color1", value: "rgb(124, 23, 94)" },
      { color: "color2", value: "rgb(209, 124, 20)" },
      { color: "color3", value: "rgb(83, 38, 187)" },
      { color: "color4", value: "rgb(35, 152, 206)" },
      { color: "color5", value: "rgb(196, 170, 28)" },
      { color: "color6", value: "rgb(0, 100, 0)" },
      { color: "color7", value: "rgb(21, 196, 108)" },
      { color: "color8", value: "rgb(28, 70, 184)" },
      { color: "color9", value: "rgb(139, 69, 19)" },
      { color: "color10", value: "rgb(189, 0, 104)" },
      { color: "titlecolor", value: "rgb(124, 109, 24)" },
      { color: "creditcolor", value: "rgb(27, 129, 90)" },
      { color: "watermarkcolor", value: "rgb(155, 38, 149)" },
      { color: "linecolor", value: "rgb(56, 48, 134)" },
      { color: "labelcolor", value: "rgb(124, 77, 168)" },
    ]

    const totalValue = data.reduce((sum, { value }) => sum + value, 0);

    const chartConfig = {
      basic: {
        scale: 1,
        xscale: 6,
        yscale: 5,
        innerRadius: "1cm",
        outerRadius: "1cm",
      },
      threeDEffect: {
        shadowOpacity: 0.4,
        shadowFading: 100,
        shadowYshift: -70,
        segmentDepth: 4,
      },
      colors: {
        mixColor: "gray",
        backgroundColor: "white",
        segmentMixRatio: 80,
        gradientLeft: 20,
        gradientRight: 5,
      },
      style: {
        lineWeight: "thin",
        cornerRadius: "2mm",
      },
    };

    const tikzCode = `
    \\usetikzlibrary{fadings}
    
    % Colors
    ${colors.map(({ color, value }) => {
      const rgbValues = value.match(/\d+/g);
      return `\\definecolor{${color}}{RGB}{${rgbValues!.join(',')}}`;
    }).join('\n')}
    
    \\pgfkeys{%
      /piechartthreed/.cd,
      scale/.code                =  {\\def\\piechartthreedscale{${chartConfig.basic.scale}}},
      mix color/.code            =  {\\def\\piechartthreedmixcolor{${chartConfig.colors.mixColor}}},
      background color/.code     =  {\\def\\piechartthreedbackcolor{${chartConfig.colors.backgroundColor}}},
      name/.code                 =  {\\def\\piechartthreedname{pc}}}
    
    \\newcommand\\piechartthreed[2][]{%
      \\pgfkeys{/piechartthreed/.cd,
        scale            = 1,
        mix color        = ${chartConfig.colors.mixColor},
        background color = ${chartConfig.colors.backgroundColor},
        name             = pc} 
      \\pgfqkeys{/piechartthreed}{#1}
      \\begin{scope}[scale=\\piechartthreedscale] 
      \\begin{scope}[xscale=${chartConfig.basic.xscale},yscale=${chartConfig.basic.yscale}] 
        \\path[preaction={fill=black,opacity=${chartConfig.threeDEffect.shadowOpacity},
            path fading=circle with fuzzy edge ${chartConfig.threeDEffect.shadowFading} percent,
            transform canvas={yshift=${chartConfig.threeDEffect.shadowYshift}mm*\\piechartthreedscale}}] 
            (0,0) circle (${chartConfig.basic.innerRadius});
        \\pgfmathsetmacro\\totan{0} 
        \\global\\let\\totan\\totan 
        \\pgfmathsetmacro\\bottoman{180} \\global\\let\\bottoman\\bottoman 
        \\pgfmathsetmacro\\toptoman{0}   \\global\\let\\toptoman\\toptoman 
        \\begin{scope}[draw=${chartConfig.colors.backgroundColor},${chartConfig.style.lineWeight}]
        \\foreach \\an/\\col [count=\\xi] in {#2}{%
        \\def\\space{ } 
            \\coordinate (\\piechartthreedname\\space\\xi) at (\\totan+\\an/2:0.75cm); 
            \\ifdim 180pt>\\totan pt 
            \\ifdim 0pt=\\toptoman pt
                \\pgfmathsetmacro\\toptoman{180} 
                \\global\\let\\toptoman\\toptoman         
                \\else
              \\fi
            \\fi   
            \\fill[\\col!${chartConfig.colors.segmentMixRatio}!gray,draw=black] 
              (0,0)--(\\totan:${chartConfig.basic.outerRadius})  
              arc(\\totan:\\totan+\\an:${chartConfig.basic.outerRadius})
              --cycle;     
          \\pgfmathsetmacro\\finan{\\totan+\\an}
          \\ifdim 180pt<\\finan pt 
            \\ifdim 180pt=\\bottoman pt
                \\shadedraw[
                  left color=\\col!${chartConfig.colors.gradientLeft}!${chartConfig.colors.mixColor},
                  right color=\\col!${chartConfig.colors.gradientRight}!${chartConfig.colors.mixColor},
                  draw=black,${chartConfig.style.lineWeight}
                ] (180:${chartConfig.basic.outerRadius}) 
                -- ++(0,-${chartConfig.threeDEffect.segmentDepth}mm) 
                arc (180:\\totan+\\an:${chartConfig.basic.outerRadius}) 
                -- ++(0,${chartConfig.threeDEffect.segmentDepth}mm)  
                arc (\\totan+\\an:180:${chartConfig.basic.outerRadius});
                \\pgfmathsetmacro\\bottoman{0}
                \\global\\let\\bottoman\\bottoman
                \\else
                \\shadedraw[
                  left color=\\col!${chartConfig.colors.gradientLeft}!${chartConfig.colors.mixColor},
                  right color=\\col!${chartConfig.colors.gradientRight}!${chartConfig.colors.mixColor},
                  draw=black,${chartConfig.style.lineWeight}
                ](\\totan:${chartConfig.basic.outerRadius})
                -- ++(0,-${chartConfig.threeDEffect.segmentDepth}mm) 
                arc(\\totan:\\totan+\\an:${chartConfig.basic.outerRadius})
                -- ++(0,${chartConfig.threeDEffect.segmentDepth}mm)  
                arc(\\totan+\\an:\\totan:${chartConfig.basic.outerRadius}); 
              \\fi
            \\fi
            \\pgfmathsetmacro\\totan{\\totan+\\an}  \\global\\let\\totan\\totan 
          } 
        \\end{scope}
      \\end{scope}  
    \\end{scope}
    }
    
    \\begin{document} 
    \\begin{tikzpicture}
      \\piechartthreed[scale=${chartConfig.basic.scale}, mix color=${chartConfig.colors.mixColor}] 
      {${data.map(({ value }, index) => {
      const angle = (value / totalValue) * 360;
      const color = colors[index].color;
      return `${angle}/${color}`
    }).join(',')}}
      
       % Labels
      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color1, fill=white] at (45:9) {English (18.8\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (45:8) -- (45:5.3);
      \\draw[color1, line width=2mm, -{>[length=10pt]}] (45:8) -- (45:5.3);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color2, fill=white] at (135:9) {Mandarin Chinese (13.8\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (135:8) -- (135:5.4);
      \\draw[color2, line width=2mm, -{>[length=10pt]}] (135:8) -- (135:5.4);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color3, fill=white] at (200:13) {Hindi (7.5\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (200:11) -- (200:6);
      \\draw[color3, line width=2mm, -{>[length=10pt]}] (200:11) -- (200:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color4, fill=white] at (250:9) {Spanish (6.9\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (250:8.3) -- (250:6);
      \\draw[color4, line width=2mm, -{>[length=10pt]}] (250:8.3) -- (250:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color5, fill=white] at (290:9) {French (3.4\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (290:8.5) -- (290:6);
      \\draw[color5, line width=2mm, -{>[length=10pt]}] (290:8.5) -- (290:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color6, fill=white] at (320:11.5) {Arabic (3.3\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (310:8.9) -- (310:6);
      \\draw[color6, line width=2mm, -{>[length=10pt]}] (310:8.9) -- (310:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color7, fill=white] at (328:9) {Bengali (3.2\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (328:8) -- (328:6);
      \\draw[color7, line width=2mm, -{>[length=10pt]}] (328:8) -- (328:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color8, fill=white] at (343:13.5) {Portuguese (3.1\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (339:10.8) -- (342:6);
      \\draw[color8, line width=2mm, -{>[length=10pt]}] (339:10.8) -- (342:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color9, fill=white] at (347:12) {Russian (2.5\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (347:10.1) -- (350:6);
      \\draw[color9, line width=2mm, -{>[length=10pt]}] (347:10.1) -- (350:6);

      \\node[scale=2, draw=black, double=black, double distance=1mm, text=color10, fill=white] at (356:11.5) {Others (37.5\\%)};
      \\draw[black, line width=3mm, -{>[length=12pt]}] (356:10) -- (359:6);
      \\draw[color10, line width=2mm, -{>[length=10pt]}] (356:10) -- (359:6);

      \\draw[black, line width=3mm, -{>[length=12pt]}] (356:9.3) -- (356:6);
      \\draw[color10, line width=2mm, -{>[length=10pt]}] (356:9.3) -- (356:6);
    
      % Title
      \\node[
        scale=4, 
        draw=black, 
        double=black, 
        double distance=1mm,
        rounded corners=2mm, 
        fill=white,
        text=titlecolor
      ] at (0,10) {${title}};
      
      % Watermark
      \\node[
        scale=9, 
        color=watermarkcolor, 
        opacity=0.3,
        rotate=0
      ] at (0,3) {${watermark}};
      
      % Credit
      \\node[
        scale=2, 
        text=creditcolor
      ] at (0,-15) {${credit}};
    
    \\end{tikzpicture}
    \\end{document}
    `;

    useEffect(() => {
      onTexReady?.(tikzCode);
    }, [tikzCode, onTexReady]);

    return (
      <TikzRenderer
        tikzCode={tikzCode}
        widthContainer={widthContainer}
        heightContainer={heightContainer}
        backgroundImage={backgroundImage}
        logoImage={logoImage}
      />
    );
  }
);

ThreeDPieChart.displayName = "ThreeDPieChart";

function App() {

  const data: Data[] = [
    { name: 'English', value: 18.8 },
    { name: 'Mandarin Chinese', value: 13.8 },
    { name: 'Hindi', value: 7.5 },
    { name: 'Spanish', value: 6.9 },
    { name: 'French', value: 3.4 },
    { name: 'Arabic', value: 3.3 },
    { name: 'Bengali', value: 3.2 },
    { name: 'Portuguese', value: 3.1 },
    { name: 'Russian', value: 2.5 },
    { name: 'Others', value: 37.5 }
    ];

  const title = "Distribution of World's Most Spoken Languages by Total Number of Speakers, 2023-2025";

  const Chart = (
    <ThreeDPieChart
      data={data}
      title={title}
      widthContainer="2000px"
      heightContainer="1000px"
      backgroundImage="https://upload.wikimedia.org/wikipedia/commons/3/37/Plastic007_8K_Roughness.png"
      logoImage="https://upload.wikimedia.org/wikipedia/commons/5/52/Wildlife_Conservation_Network.png"
      credit="Data Source: Wildlife Conservation Network"
      watermark="Budget Insights"
    />
  );

  return (
    <div style={{ padding: '2rem' }}>
      {Chart}
    </div>
  );
}

export default App;