import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import React from "react";
import echarts from "echarts/lib/echarts";

class WeeklyDeathNum extends React.Component {

    componentDidMount() {

        var id;
        // 初始化
        let myChart = echarts.init(document.getElementById(this.props.id));
        var colors = ['#5793f3', '#d14a61', '#675bba'];

        // 绘制图表
        myChart.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['本周', '上周']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '上周  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    //data: ["01.23", "01.24", "01.25", "01.26", "01.27", "01.28", "01.29", "01.30", "01.31", "02.01", "02.02", "02.03", "02.04", "02.05", "02.06", "02.07", "02.08", "02.09", "02.10", "02.11", "02.12", "02.13", "02.14", "02.15", "02.16", "02.17", "02.18", "02.19", "02.20", "02.21", "02.22", "02.23", "02.24", "02.25", "02.26", "02.27", "02.28", "02.29", "03.01", "03.02", "03.03", "03.04", "03.05", "03.06", "03.07", "03.08", "03.09", "03.10", "03.11", "03.12", "03.13", "03.14", "03.15", "03.16", "03.17", "03.18", "03.19", "03.20", "03.21", "03.22", "03.23", "03.24", "03.25", "03.26", "03.27", "03.28", "03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"]
                    data: this.props.data.lastdate
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '本周  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    //data: ["01.23", "01.24", "01.25", "01.26", "01.27", "01.28", "01.29", "01.30", "01.31", "02.01", "02.02", "02.03", "02.04", "02.05", "02.06", "02.07", "02.08", "02.09", "02.10", "02.11", "02.12", "02.13", "02.14", "02.15", "02.16", "02.17", "02.18", "02.19", "02.20", "02.21", "02.22", "02.23", "02.24", "02.25", "02.26", "02.27", "02.28", "02.29", "03.01", "03.02", "03.03", "03.04", "03.05", "03.06", "03.07", "03.08", "03.09", "03.10", "03.11", "03.12", "03.13", "03.14", "03.15", "03.16", "03.17", "03.18", "03.19", "03.20", "03.21", "03.22", "03.23", "03.24", "03.25", "03.26", "03.27", "03.28", "03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"]
                    data: this.props.data.thisdate
                }
            ],
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [
                {
                    name: '本周',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    //data: [5, 3, 4, 12, 7, 5, 11, 14, 15, 17, 9, 9, 5, 20, 9, 9, 5, 24, 8, 8, 5, 6, 13, 9, 10, 413, 111, 105, 92, 24, 21, 485, 239, 491, 365, 506, 913, 993, 1468, 1252, 1889, 2372, 1839, 2292, 3634, 3339, 3745, 3756, 4827, 4985, 7849, 9168, 10260, 12791, 12284, 12253, 17318, 20453, 28887, 30673, 31182, 32414, 44087, 43758, 50047, 62719, 67775, 66646, 59675, 63642, 76758, 79947, 73432, 98480]
                    data: this.props.data.thisweek
                },
                {
                    name: '上周',
                    type: 'line',
                    smooth: true,
                    //data: [457, 688, 769, 1771, 1459, 1762, 1984, 2101, 2590, 2827, 3233, 3892, 3697, 3151, 3387, 2653, 2984, 2473, 2022, 15152, 4050, 2644, 2008, 2051, 1893, 1751, 396, 1318, 399, 454, 416, 517, 411, 440, 329, 430, 579, 206, 128, 120, 143, 145, 103, 46, 45, 20, 31, 25, 23, 18, 27, 29, 39, 35, 84, 65, 116, 82, 102, 147, 99, 114, 118, 135, 128, 106, 98, 86, 93, 78, 73, 55]
                    data: this.props.data.lastweek
                }
            ]
        });

        // window.onresize = myChart.resize;
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

    render() {
        return (
            <div id={this.props.id} style={{width: '100%', height: 340}}/>
        );
    }
}

export default WeeklyDeathNum;