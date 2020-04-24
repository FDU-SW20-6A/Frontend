import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

class Line_3 extends React.Component {

    componentDidMount() {

        // 初始化
        let myChart = echarts.init(document.getElementById('heal_dead'));
        let colors = ['#5793f3', '#d14a61', '#675bba'];

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
                data:['治愈', '死亡']
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
                                return '死亡  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    // data: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
                    data:this.props.data.xdata,
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
                                return '治愈  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    // data: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
                    data:this.props.data.xdata,
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '治愈',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    // data: [819,730,590,504,459,456,491,401,537,383,477]
                    data:this.props.data.cure,
                },
                {
                    name: '死亡',
                    type: 'line',
                    smooth: true,
                    // data: [8,3,7,6,9,7,4,6,5,3,5]
                    data:this.props.data.death,
                }
            ]
        });

        // window.onresize = myChart.resize;
        window.addEventListener("resize",function(){
            myChart.resize();
        });

    }
    render() {
        return (
            <div id="heal_dead" style={{width: '100%', height: 340}}/>
        );
    }
}

export default Line_3;