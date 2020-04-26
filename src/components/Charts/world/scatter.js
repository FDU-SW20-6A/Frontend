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

class Scatter extends React.Component {

    componentDidMount() {

        // 初始化
        let myChart = echarts.init(document.getElementById('main'));

        var data_now=[
            [26.29, 13.22, 178972, 47055, 23660, 3047, 2128, 433, "意大利"],
            [76.02, 2.21, 10674, 8114, 236, 13, 72, 2,"韩国"],
            [9.34, 5.35, 760570, 71011, 40702, 25204, 4157, 1607,"美国"],
            [70.98, 6.24, 83505, 59273, 5209, 1294, 2250, 91, "伊朗"],
            [11.11, 2.36, 11154, 1239, 263, 348, 170, 27, "日本"],
            [24.13, 12.81, 154098, 37188, 19744, 1120, 600, 395, "法国"],
            [63.37, 3.21, 146551, 92863, 4708, 2203, 0, 161, "德国"],
            [40.25, 10.61, 200210, 80587, 21238, 4266, 3230, 599, "西班牙"],
        ];

        var data_week=[
            [22.21, 12.83, 159516, 35435, 20465, 3153, 1224, 566,"意大利"],
            [7.54, 4.04, 587752, 44319, 23765, 29226, 1584, 1619,"美国"],
            [71.32, 2.10, 10564, 7534, 222, 27, 87, 5,"韩国"],
            [64.28, 6.25, 74877, 48129, 4683, 1574, 2146, 98,"伊朗"],
            [10.44, 1.95, 8167, 853, 159, 553, 91, 21,"日本"],
            [20.31, 10.87, 137887, 28011, 14986, 4215, 542, 574,"法国"],
            [52.03, 2.46, 131074, 68200, 3221, 2408, 3900, 173,"德国"],
            [39.12, 10.46, 172541, 67504, 18056, 3045, 2777, 567,"西班牙"],
        ];

        var data_2_week=[
            [16.92, 12.32, 128948, 21815, 15887, 4316, 819, 525, "意大利"],
            [5.20, 2.86, 337933, 17582, 9653, 25688, 2561, 1150, "美国"],
            [64.16, 1.81, 10284, 6598, 186, 47, 135, 3, "韩国"],
            [40.06, 6.18, 60500, 24236, 3739, 2274, 2225, 136, "伊朗"],
            [14.50, 2.38, 4083, 592, 97, 225, 78, 4, "日本"],
            [17.44, 8.63, 93780, 16354, 8093, 2927, 780, 519, "法国"],
            [35.05, 1.58, 100123, 35095, 1584, 4031, 8695, 140, "德国"],
            [29.95, 9.67, 135032, 40437, 13055, 4273, 2357, 637, "西班牙"],
        ];
        var data_month=[
            [11.33, 9.01, 53578, 6072, 4825, 6557, 943, 793, "意大利"],
            [0.64, 1.27, 26747, 171, 341, 7123, 24, 73, "美国"],
            [32.70, 1.17, 8897, 2909, 104, 98, 297, 2, "韩国"],
            [36.57, 7.79, 21638, 7913, 1685, 1028, 278, 129, "伊朗"],
            [19.53, 3.72, 1101, 215, 41, 47, 0, 5, "日本"],
            [12.17, 3.89, 14459, 1760, 562, 1847, 0, 112, "法国"],
            [1.00, 0.35, 23921, 239, 84, 3340, 30, 12, "德国"],
            [5.56, 6.02, 28572, 1588, 1720, 3646, 0, 394, "西班牙"],
        ]

        var schema = [
            {name: '治愈率', index: 0, text: '治愈率'},
            {name: '死亡率', index: 1, text: '死亡率'},
            {name: '累计确诊', index: 2, text: '累计确诊'},
            {name: '累计治愈', index: 3, text: '累计治愈'},
            {name: '累计死亡', index: 4, text: '累计死亡'},
            {name: '新增确诊', index: 5, text: '新增确诊'},
            {name: '新增治愈', index: 6, text: '新增治愈'},
            {name: '新增死亡', index: 7, text: '新增死亡'},
            {name: '国家', index: 8, text: ''},
        ];


        var itemStyle = {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        };

        // 绘制图表oo
        myChart.setOption({
            backgroundColor: '#fff',
            color: [
                '#dd4444', '#fec42c', '#80F1BE','#53C6F1'
            ],
            legend: {
                top: 10,
                data: ['当天', '一周前', '两周前','一月前'],
                textStyle: {
                    color: '#404a59',
                    fontSize: 14
                }
            },
            grid: {
                left: '10%',
                right: 150,
                top: '18%',
                bottom: '10%'
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + obj.seriesName + ' ' + value[8]
                        + '</div>'
                        + schema[0].text + '：' + value[0] + '<br>'
                        + schema[1].text + '：' + value[1] + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>'
                        + schema[3].text + '：' + value[3] + '<br>'
                        + schema[4].text + '：' + value[4] + '<br>'
                        + schema[5].text + '：' + value[5] + '<br>'
                        + schema[6].text + '：' + value[6] + '<br>'
                        + schema[7].text + '：' + value[7] + '<br>';
                }
            },
            xAxis: {
                type: 'value',
                name: '治愈率%',
                nameGap: 20,
                nameTextStyle: {
                    color: '#404a59',
                    fontSize: 12
                },
                max: 80,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#404a59'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '死亡率%',
                nameLocation: 'end',
                nameGap: 20,
                max: 20,
                nameTextStyle: {
                    color: '#404a59',
                    fontSize: 12
                },

                axisLine: {
                    lineStyle: {
                        color: '#404a59'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            visualMap: [
                {
                    left: 'right',
                    top: '10%',
                    dimension: 5,
                    min: 0,
                    max: 5000,
                    itemWidth: 30,
                    itemHeight: 60,
                    calculable: true,
                    precision: 0.1,
                    text: ['圆形大小：新增确诊'],
                    textGap: 30,
                    textStyle: {
                        color: '#404a59'
                    },
                    inRange: {
                        symbolSize: [10, 70]
                    },
                    outOfRange: {
                        symbolSize: [10, 70],
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                },
                {
                    left: 'right',
                    bottom: '5%',
                    dimension: 2,
                    min: 0,
                    max: 200000,
                    itemHeight: 60,
                    precision: 0.1,

                    text: ['明暗：累计确诊'],
                    textGap: 30,
                    textStyle: {
                        color: '#404a59'
                    },
                    inRange: {
                        colorLightness: [1, 0.5]
                    },
                    outOfRange: {
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                }
            ],
            series: [
                {
                    name: '当天',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data_now
                },
                {
                    name: '一周前',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data_week
                },
                {
                    name: '两周前',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data_2_week
                },
                {
                    name: '一月前',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data_month
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
            <div id="main" style={{width: '100%', height: 340}}/>
        );
    }
}

export default Scatter;