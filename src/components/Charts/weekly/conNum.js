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

class WeeklyConNum extends React.Component {

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
                    data: this.props.data.lastdate
                    //data: ["01.23", "01.24", "01.25", "01.26", "01.27", "01.28", "01.29", "01.30", "01.31", "02.01", "02.02", "02.03", "02.04", "02.05", "02.06", "02.07", "02.08", "02.09", "02.10", "02.11", "02.12", "02.13", "02.14", "02.15", "02.16", "02.17", "02.18", "02.19", "02.20", "02.21", "02.22", "02.23", "02.24", "02.25", "02.26", "02.27", "02.28", "02.29", "03.01", "03.02", "03.03", "03.04", "03.05", "03.06", "03.07", "03.08", "03.09", "03.10", "03.11", "03.12", "03.13", "03.14", "03.15", "03.16", "03.17", "03.18", "03.19", "03.20", "03.21", "03.22", "03.23", "03.24", "03.25", "03.26", "03.27", "03.28", "03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"]
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
                    areaStyle: {},
                    //data: [5, 7, 11, 23, 30, 35, 46, 60, 75, 93, 102, 111, 116, 136, 145, 154, 159, 183, 191, 199, 204, 210, 223, 232, 242, 655, 766, 871, 962, 986, 1007, 1492, 1731, 2222, 2587, 3093, 3949, 4942, 6349, 7723, 9613, 11985, 13824, 16121, 19750, 23089, 26834, 30590, 35417, 40402, 48251, 57419, 67677, 80468, 92752, 104959, 122277, 142730, 171617, 202290, 233472, 265885, 309972, 353730, 403777, 466496, 534271, 600917, 660574, 724216, 800974, 880921, 954353, 1052789]
                    data: this.props.data.thisweek
                },
                {
                    name: '上周',
                    type: 'line',
                    smooth: true,
                    areaStyle: {},
                    //data: [830,1287, 1975, 2744, 4515, 5974, 7736, 9720, 11821, 14411, 17238, 20471, 24363, 28060, 31211, 34598, 37251, 40235, 42708, 44730, 59882, 63932, 66576, 68584, 70635, 72528, 74279, 74675, 75993, 76392, 76846, 77262, 77779, 78190, 78630, 78959, 79389, 79968, 80174, 80302, 80422, 80565, 80710, 80813, 80859, 80904, 80924, 80955, 80980, 81003, 81021, 81048, 81077, 81116, 81151, 81235, 81300, 81416, 81498, 81600, 81747, 81846, 81960, 82078, 82213, 82341, 82447, 82545, 82631, 82724, 82802, 82875, 82930]
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

export default WeeklyConNum;