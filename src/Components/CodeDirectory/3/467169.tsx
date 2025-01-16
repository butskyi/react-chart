import React from 'react';
import ReactECharts from 'echarts-for-react';
import GoogleFontLoader from 'react-google-font-loader';
import backImg from '../../AdditionalFilesDirectory/electonic_sales.jpg';

const SalesPerformanceHeatmap: React.FC = () => {
    const products = ['Laptop', 'Phone', 'Tablet', 'Headphones', 'Monitor', 'Keyboard'];
    const salesPeriods = ['Q1', 'Q2', 'Q3', 'Q4'];

    const salesData = [
        [0, 0, 500], [1, 0, 450], [2, 0, 480], [3, 0, 520], [4, 0, 470], [5, 0, 490],
        [0, 1, 400], [1, 1, 420], [2, 1, 450], [3, 1, 430], [4, 1, 440], [5, 1, 470],
        [0, 2, 550], [1, 2, 600], [2, 2, 580], [3, 2, 620], [4, 2, 590], [5, 2, 610],
        [0, 3, 700], [1, 3, 720], [2, 3, 750], [3, 3, 730], [4, 3, 710], [5, 3, 740],
    ];

    const option = {
        title: {
            text: 'Sales Performance Heatmap',
            left: 'center',
            textStyle: {
                fontFamily: 'Pacifico, cursive', // Use the imported font family
                fontSize: 70,
                color: '#5E344AFF',
            },
            top: 50,
        },
        tooltip: {
            position: 'top',
            formatter: (params: any) =>
                `Product: ${products[params.data[0]]}<br />Quarter: ${salesPeriods[params.data[1]]}<br />Sales: $${params.data[2]}`,
        },
        grid: {
            height: '70%',
            top: '15%',
            left: '10%',
            right: '10%',
        },
        xAxis: {
            type: 'category',
            data: products,
            axisLabel: {
                fontSize: 28,
                color: '#2C3E50',
            },
        },
        yAxis: {
            type: 'category',
            data: salesPeriods,
            axisLabel: {
                fontSize: 28,
                color: '#2C3E50',
            },
        },
        visualMap: {
            min: 400,
            max: 800,
            orient: 'horizontal',
            left: 'center',
            bottom: 20,
            textStyle: {
                fontSize: 20,
                color: '#2C502EFF',
            },
            inRange: {
                color: ['#E8F7FF', '#69C0FF', '#0066CC'],
            },
        },
        series: [
            {
                name: 'Sales',
                type: 'heatmap',
                data: salesData,
                label: {
                    show: true,
                    formatter: '{c}',
                    color: '#EE0B57FF',
                    fontSize: 30, // Increase font size here
                },
                emphasis: {
                    itemStyle: {
                        borderColor: '#f33',
                        borderWidth: 1,
                    },
                },
            },
        ],
        
    };

    return (
        <>
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Roboto',
                        weights: [400, 700],
                    },
                ]}
                subsets={['latin']}
            />

            <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
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
                        zIndex: 1,
                        filter: 'blur(5px)',
                    }}
                ></div>

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(211, 155, 255, 0.8)', // Adjust opacity/color
                        zIndex: 2,
                    }}
                ></div>

                <ReactECharts option={option} style={{ height: '100%', width: '100%', position: 'relative', zIndex: 3 }} />
            </div>
        </>
    );
};

export default SalesPerformanceHeatmap;
