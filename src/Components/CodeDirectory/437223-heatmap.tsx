import React from 'react';
import ReactECharts from 'echarts-for-react';
import backImg from '../AdditionalFilesDirectory/webtraffic_heatmap.jpg';

const WebsiteTrafficHeatmap: React.FC = () => {
    const trafficSources = ['Search', 'Direct', 'Social', 'Referral', 'Email'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

    const trafficData = [
        [0, 0, 5000], [1, 0, 4200], [2, 0, 6200], [3, 0, 5400], [4, 0, 7100], [5, 0, 8100], [6, 0, 9500], [7, 0, 8200], [8, 0, 9500], [9, 0, 11000], [10, 0, 8500], [11, 0, 7700],
        [0, 1, 3000], [1, 1, 3400], [2, 1, 3800], [3, 1, 2800], [4, 1, 3300], [5, 1, 3800], [6, 1, 4700], [7, 1, 4500], [8, 1, 4900], [9, 1, 5200], [10, 1, 5100], [11, 1, 4600],
        [0, 2, 2000], [1, 2, 2500], [2, 2, 3100], [3, 2, 2300], [4, 2, 2700], [5, 2, 3200], [6, 2, 3900], [7, 2, 4300], [8, 2, 4800], [9, 2, 5000], [10, 2, 4600], [11, 2, 4200],
        [0, 3, 4000], [1, 3, 4300], [2, 3, 4600], [3, 3, 3500], [4, 3, 4100], [5, 3, 4800], [6, 3, 5200], [7, 3, 5400], [8, 3, 6000], [9, 3, 6300], [10, 3, 5800], [11, 3, 5600],
        [0, 4, 1000], [1, 4, 1500], [2, 4, 2200], [3, 4, 1800], [4, 4, 2200], [5, 4, 2600], [6, 4, 3300], [7, 4, 3100], [8, 4, 3400], [9, 4, 3700], [10, 4, 3400], [11, 4, 3200],
    ];

    const option = {
        title: {
            text: 'Website Traffic',
            left: 'center',
            textStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 34,
                color: '#333333',
            },
        },
        tooltip: {
            position: 'top',
            formatter: (params: any) =>
                `Month: ${months[params.data[1]]}<br />Source: ${trafficSources[params.data[0]]}<br />Traffic: ${params.data[2]} Visits`,
        },
        grid: {
            height: '80%',
            top: '5%',
            right: '0%',
        },
        xAxis: {
            type: 'category',
            data: trafficSources,
            name: 'Traffic Sources',
            nameLocation: 'center',
            nameTextStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 24,
                color: '#333333',
                padding: 120,
                fontWeight: 'bold',
            },
            axisLabel: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 20,
                rotate: 45,
                color: '#555555',
                margin: 20,
            },
        },
        yAxis: {
            type: 'category',
            data: months,
            name: 'Months',
            nameLocation: 'center',
            nameTextStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 24,
                color: '#333333',
                padding: 100,
                fontWeight: 'bold',
            },
            splitArea: { show: true },
            axisLabel: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 20,
                color: '#555555',
                margin: 10,
            },
        },
        visualMap: {
            min: 0,
            max: 12000,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '3%',
            inRange: {
                color: ['#FFE5D9', '#FFAC81', '#FF928B', '#FF686B', '#783937'],
            },
        },
        series: [
            {
                name: 'Website Traffic',
                type: 'heatmap',
                data: trafficData,
                label: {
                    show: true,
                    color: '#000',
                    formatter: (params: any) => `${params.value[2]} Visits`,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return (
        <div
            style={{
                position: 'relative',
                height: '1100px',
                width: '100%',
            }}
        >
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
                    opacity: 0.1,  // Adjust opacity here
                    zIndex: 10,  // Ensure background is behind the chart
                }}
            ></div>
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

export default WebsiteTrafficHeatmap;
