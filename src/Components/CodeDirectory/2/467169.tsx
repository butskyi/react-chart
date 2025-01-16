import React from 'react';
import ReactECharts from 'echarts-for-react';
import backImg from '../../AdditionalFilesDirectory/attendance.jpg'; // Change the image if needed

const EmployeeAttendanceHeatmap: React.FC = () => {
    const employees = ['John', 'Sarah', 'David', 'Alice', 'Michael', 'Emma'];
    const attendancePeriods = [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Week 5',
        'Week 6',
    ];

    const attendanceData = [
        [0, 0, 95], [1, 0, 90], [2, 0, 85], [3, 0, 80], [4, 0, 100], [5, 0, 92],
        [0, 1, 85], [1, 1, 88], [2, 1, 90], [3, 1, 78], [4, 1, 92], [5, 1, 80],
        [0, 2, 70], [1, 2, 75], [2, 2, 80], [3, 2, 85], [4, 2, 88], [5, 2, 82],
        [0, 3, 95], [1, 3, 85], [2, 3, 90], [3, 3, 92], [4, 3, 93], [5, 3, 89],
        [0, 4, 80], [1, 4, 82], [2, 4, 85], [3, 4, 92], [4, 4, 95], [5, 4, 91],
        [0, 5, 75], [1, 5, 70], [2, 5, 80], [3, 5, 85], [4, 5, 88], [5, 5, 90],
    ];

    const option = {
        title: {
            text: 'Employee Attendance Heatmap',
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
            top: 20,
        },
        tooltip: {
            position: 'right',
            formatter: (params: any) =>
                `Employee: ${employees[params.data[0]]}<br />Period: ${attendancePeriods[params.data[1]]}<br />Attendance: ${params.data[2]}%`,
        },
        grid: {
            height: '80%',
            top: '9%',
            right: '15%',
            left: '12%',
        },
        xAxis: {
            type: 'category',
            data: employees,
            nameLocation: 'center',
            nameTextStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 55,
                color: '#0DE2E9FF',
                padding: 10,
                fontWeight: 'bold',
            },
            axisLabel: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 40,
                rotate: 0,
                color: '#D92A1AFF',
                margin: 20,
            },
        },
        yAxis: {
            type: 'category',
            data: attendancePeriods,
            nameLocation: 'center',
            nameTextStyle: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 40,
                color: '#FFFFFFFF',
                padding: 30,
                fontWeight: 'bold',
            },
            splitArea: { show: true },
            axisLabel: {
                fontFamily: "'Indie Flower', cursive",
                fontSize: 40,
                color: '#EFEFEFFF',
                margin: 10,
            },
        },
        visualMap: {
            type: 'piecewise',
            min: 60,
            max: 100,
            pieces: [
                { min: 95, max: 100, label: '95-100%: Excellent' },
                { min: 90, max: 94, label: '90-94%: Good' },
                { min: 80, max: 89, label: '80-89%: Average' },
                { min: 70, max: 79, label: '70-79%: Below Average' },
                { min: 60, max: 69, label: '60-69%: Poor' },
            ],
            orient: 'vertical',
            right: 50,
            bottom: '20%',
            itemHeight: 150,
            textStyle: {
                fontSize: 30,
                color: '#000',
            },
            inRange: {
                color: [
                    '#F2D7D5', '#F5B7B1', '#691108FF', '#EC7063', '#E74C3C',
                    '#4C08DEFF', '#8F4D13FF', '#116EBBFF', '#F7816FFF', '#F4573FFF',
                    '#01D5FAFF', '#20DACAFF', '#52BD20FF', '#7763ECFF', '#E73CCBFF',
                ],
            },
        },
        series: [
            {
                name: 'Employee Attendance',
                type: 'heatmap',
                data: attendanceData,
                label: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowColor: 'rgba(0 ,0 ,0 ,0.5)',
                    },
                },
                itemStyle: {
                    normal: {
                        width: 60,
                        height: 60,
                        opacity: 0.7, // Set opacity for the chart
                    },
                },
            },
        ],
    };

    return (
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
                    filter: 'blur(5px)',
                    zIndex: 1
                }}
            ></div>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(22,222,22,0.1)',
                    zIndex: 2
                }}
            ></div>

            <ReactECharts option={option} style={{ height: '100%', width: '100%', position: 'relative', zIndex: 3 }} />
        </div>
    );
};

export default EmployeeAttendanceHeatmap;
