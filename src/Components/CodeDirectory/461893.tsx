import React from 'react';
import ReactECharts from 'echarts-for-react';
import backImg from '../AdditionalFilesDirectory/employeeHeatmap.jpg';

const EmployeePerformanceHeatmap: React.FC = () => {
    const departments = ['Sales', 'Marketing', 'Engineering', 'HR', 'Product', 'Customer Support'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const performanceData = [
        [0, 0, 7], [1, 0, 6], [2, 0, 8], [3, 0, 7], [4, 0, 6], [5, 0, 5],
        [0, 1, 6], [1, 1, 7], [2, 1, 6], [3, 1, 5], [4, 1, 7], [5, 1, 6],
        [0, 2, 8], [1, 2, 9], [2, 2, 8], [3, 2, 8], [4, 2, 9], [5, 2, 9],
        [0, 3, 6], [1, 3, 6], [2, 3, 5], [3, 3, 7], [4, 3, 6], [5, 3, 6],
        [0, 4, 8], [1, 4, 9], [2, 4, 7], [3, 4, 8], [4, 4, 9], [5, 4, 8],
        [0, 5, 7], [1, 5, 6], [2, 5, 7], [3, 5, 6], [4, 5, 5], [5, 5, 7],
        [0, 6, 9], [1, 6, 8], [2, 6, 9], [3, 6, 7], [4, 6, 8], [5, 6, 7],
        [0, 7, 8], [1, 7, 9], [2, 7, 8], [3, 7, 8], [4, 7, 9], [5, 7, 8],
        [0, 8, 7], [1, 8, 6], [2, 8, 7], [3, 8, 6], [4, 8, 8], [5, 8, 7],
        [0, 9, 8], [1, 9, 7], [2, 9, 8], [3, 9, 7], [4, 9, 9], [5, 9, 8],
        [0, 10, 7], [1, 10, 6], [2, 10, 7], [3, 10, 6], [4, 10, 5], [5, 10, 7],
        [0, 11, 8], [1, 11, 9], [2, 11, 8], [3, 11, 7], [4, 11, 9], [5, 11, 8],
    ];

    const option = {
        title: {
            text: 'Employee Performance',
            left: 'center',
            textStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 80,
                color: '#960808FF',
            },
            top: 20, 
        },
        tooltip: {
            position: 'right',
            formatter: (params: any) =>
                `Month: ${months[params.data[1]]}<br />Department: ${departments[params.data[0]]}<br />Performance: ${params.data[2]} Rating`,
        },
        grid: {
            height: '80%',
            top: '7%', 
            right: '10%',
        },
        xAxis: {
            type: 'category',
            data: departments,
            name: 'Departments',
            nameLocation: 'center',
            nameTextStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 55,
                color: '#E95E0DFF',
                padding: 60,
                fontWeight: 'bold',
            },
            axisLabel: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 40,
                rotate: 25,
                color: '#3E3D46FF',
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
                fontSize: 45,
                color: '#6413C0FF',
                padding: 100,
                fontWeight: 'bold',
            },
            splitArea: { show: true },
            axisLabel: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 40,
                color: '#4E4C52FF',
                margin: 10,
            },
        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'vertical',
            right: 80,
            bottom: '20%',
            itemHeight: 1000,
            inRange: {
                color: [
                    '#F2D7D5', '#F5B7B1', '#F1948A', '#EC7063', '#E74C3C', '#CB4335', '#A93226',
                    '#F9E79F', '#F7DC6F', '#F4D03F', '#F39C12', '#E67E22', '#D35400',
                    '#A3E4D7', '#48C9B0', '#16A085', '#1ABC9C', '#17A589', '#1D8348',
                    '#D5DBDB', '#AAB7B8', '#85929E', '#34495E', '#2C3E50', '#1B4F72',
                ],
            },
            textStyle: {
                fontSize: 40,
                color: '#000000',
            },
        },
        series: [
            {
                name: 'Employee Performance',
                type: 'heatmap',
                data: performanceData,
                label: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                itemStyle: {
                    normal: {
                        width: 60,
                        height: 60,
                    },
                },
            },
        ],
    };


    return (
        <div
            style={{
                position: 'relative',
                height: '100vh',
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
                    opacity: 0.3,
                    zIndex: 10,
                }}
            ></div>
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

export default EmployeePerformanceHeatmap;
