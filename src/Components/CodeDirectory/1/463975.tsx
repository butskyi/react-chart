import React from 'react';
import ReactECharts from 'echarts-for-react';
import backImg from '../../AdditionalFilesDirectory/football_heatmap.jpg'; 

const FootballTeamsPerformanceHeatmap: React.FC = () => {
    const teams = ['Ohio State', 'Alabama', 'Oregon', 'Georgia', 'Texas', 'Penn State'];
    const matches = [
        'Ohio State vs. Alabama',
        'Oregon vs. Georgia',
        'Texas vs. Penn State',
        'Alabama vs. Oregon',
        'Georgia vs. Texas',
        'Penn State vs. Ohio State',
    ];

    const performanceData = [
        [0, 0, 30], [1, 0, 28], [2, 0, 35], [3, 0, 24], [4, 0, 27], [5, 0, 31],
        [0, 1, 21], [1, 1, 32], [2, 1, 29], [3, 1, 26], [4, 1, 33], [5, 1, 22],
        [0, 2, 25], [1, 2, 30], [2, 2, 27], [3, 2, 34], [4, 2, 29], [5, 2, 31],
        [0, 3, 28], [1, 3, 30], [2, 3, 21], [3, 3, 36], [4, 3, 22], [5, 3, 25],
        [0 ,4 ,32],[1 ,4 ,29],[2 ,4 ,34],[3 ,4 ,31],[4 ,4 ,27],[5 ,4 ,33],
        [0 ,5 ,24],[1 ,5 ,35],[2 ,5 ,30],[3 ,5 ,28],[4 ,5 ,26],[5 ,5 ,22],
    ];

    const option = {
        title: {
            text: 'Football Teams Performance Heatmap',
            left: 'center',
            textStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 80,
                color: '#7BFF00E5',
                textShadowColor: '#550', 
                textShadowBlur: 5,
                textShadowOffsetX: 5,
                textShadowOffsetY: 2
            },
            top:20,
            
        },
        tooltip: {
            position: 'right',
            formatter: (params:any) =>
                `Match: ${matches[params.data[1]]}<br />Team: ${teams[params.data[0]]}<br />Score: ${params.data[2]}`,
        },
        grid: {
            height: '80%',
            top:'9%',
            right:'10%',
            left:'20%',
        },
        xAxis: {
            type:'category',
            data: teams,
            nameLocation:'center',
            nameTextStyle:{
                fontFamily:"'Indie Flower', cursive",
                fontSize:55,
                color:'#E95E0DFF',
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
            data:matches,
            nameLocation:'center',
            nameTextStyle:{
                fontFamily:"'Indie Flower', cursive",
                fontSize:35,
                color:'#6413C0FF',
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
            min :0,
            max :40,
            calculable :true,
            orient :'vertical',
            right :10,
            bottom :'20%',
            itemHeight :1000,
            inRange:{
                color:[
                    '#F2D7D5', '#F5B7B1', '#F1948A', '#EC7063', '#E74C3C', 
                    '#CB4335', '#A93226', '#F9E79F', '#F7DC6F', '#F4D03F',
                    '#01D5FAFF', '#20DACAFF', '#20BD54FF', '#7763ECFF', '#E73CCBFF', 
                    
                ],
            },
            textStyle:{
                fontSize :40,
                color :'#000000',
            },
        },
        series:[
            {
                name :'Football Performance',
                type :'heatmap',
                data :performanceData,
                label :{
                    show :false,
                },
                emphasis :{
                    itemStyle :{
                        shadowBlur :10,
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
        <div
            style={{
                position:'relative',
                height:'100vh',
                width:'100%',
            }}
        >
            <div
                style={{
                    position:'absolute',
                    top :0,
                    left :0,
                    width :'100%',
                    height :'100%',
                    backgroundImage:`url(${backImg})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    opacity:.3,
                    zIndex:'10'
                 }}
             ></div>
             <ReactECharts option={option} style={{ height:'100%', width:'90%' }} />
         </div>
     );
};

export default FootballTeamsPerformanceHeatmap;
