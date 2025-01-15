import React from 'react';
import ReactECharts from 'echarts-for-react';
import backImg from '../../AdditionalFilesDirectory/trip.jpg'; // Update with your travel background image

const TravelPerformanceHeatmap: React.FC = () => {
    const destinations = ['Paris', 'Tokyo', 'New York', 'London', 'Sydney', 'Dubai'];
    const trips = [
        'Trip to Paris',
        'Trip to Tokyo',
        'Trip to New York',
        'Trip to London',
        'Trip to Sydney',
        'Trip to Dubai',
    ];

    const performanceData = [
        [0, 0, 90], [1, 0, 85], [2, 0, 75], [3, 0, 88], [4, 0, 92], [5, 0, 80],
        [0, 1, 78], [1, 1, 82], [2, 1, 88], [3, 1, 91], [4, 1, 84], [5, 1, 76],
        [0, 2, 85], [1, 2, 90], [2, 2, 92], [3, 2, 89], [4, 2, 87], [5, 2, 81],
        [0, 3, 80], [1, 3, 86], [2, 3, 90], [3, 3, 93], [4, 3, 79], [5, 3, 88],
        [0 ,4 ,95],[1 ,4 ,90],[2 ,4 ,85],[3 ,4 ,92],[4 ,4 ,91],[5 ,4 ,87],
        [0 ,5 ,70],[1 ,5 ,75],[2 ,5 ,80],[3 ,5 ,82],[4 ,5 ,78],[5 ,5 ,72],
    ];

    const option = {
        title: {
            text: 'Travel Performance Heatmap',
            left: 'center',
            textStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 80,
                color: '#76FF07FF',
                textShadowColor: '#350', 
                textShadowBlur: 5,
                textShadowOffsetX: 5,
                textShadowOffsetY: 2
            },
            top:20,
        },
        tooltip: {
            position: 'right',
            formatter: (params:any) =>
                `Trip: ${trips[params.data[1]]}<br />Destination: ${destinations[params.data[0]]}<br />Satisfaction Rating: ${params.data[2]}`,
        },
        grid: {
            height: '80%',
            top:'9%',
            right:'10%',
            left:'20%',
        },
        xAxis: {
            type:'category',
            data: destinations,
            nameLocation:'center',
            nameTextStyle:{
                fontFamily:"'Indie Flower', cursive",
                fontSize:55,
                color:'#0DE2E9FF',
                padding:10,
                fontWeight:'bold',
            },
            axisLabel:{
                fontFamily:"'Indie Flower', cursive",
                fontSize:35,
                rotate:0,
                color:'#FF01E1FF',
                margin:20,
            },
        },
        yAxis:{
            type:'category',
            data: trips,
            nameLocation:'center',
            nameTextStyle:{
                fontFamily:"'Indie Flower', cursive",
                fontSize:35,
                color:'#B1BD9EFF',
                padding:30,
                fontWeight:'bold',
            },
            splitArea:{ show:true },
            axisLabel:{
                fontFamily:"'Indie Flower', cursive",
                fontSize:35,
                color:'#6D39D6FF',
                margin:10,
            },
        },
        visualMap:{
            min :60,
            max :100,
            calculable :true,
            orient :'vertical',
            right :10,
            bottom :'20%',
            itemHeight :1000,
            inRange:{
                color:[
                    '#F9E79F', '#F7DC6F', '#F4D03F', '#F1948A', '#EC7063', 
                    '#3CE753FF', '#35B4CBFF', '#DB0000FF'
                ],
            },
            textStyle:{
                fontSize :40,
                color :'#000000',
            },
        },
        series:[
            {
                name :'Travel Performance',
                type :'heatmap',
                data :performanceData,
                label :{
                    show :false,
                },
                emphasis :{
                    itemStyle :{
                        shadowBlur :5,
                        shadowColor :'rgba(0 ,0 ,0 ,0.5)',
                    },
                },
                itemStyle :{
                    normal :{
                        width :60,
                        height :60,
                    },
                },
            },
        ],
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            
            {/* Blurred Background Image */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${backImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)', // Apply blur effect
                    zIndex: 1 // Ensure it's behind the chart
                }}
            ></div>

            {/* Overlay with Full Opacity */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(22,222,22,0.1)', // Adjust opacity as needed
                    zIndex: 2 // Ensure it's above the blurred image
                }}
            ></div>

             {/* Chart Component */}
             <ReactECharts option={option} style={{ height:'100%', width:'90%', position:'relative', zIndex: 3 }} />
         </div>
     );
};

export default TravelPerformanceHeatmap;
