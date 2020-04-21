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

class Line_1 extends React.Component {
    
    state = {
        data : [],
        date : [],
    };
    
    componentDidMount() {
        /*
        var base = +new Date(2020, 1, 11);
        var oneDay = 24 * 3600 * 1000;
        var data = [34, 34, 33, 33, 33, 36, 41, 94, 169, 227, 406, 524, 771, 1208, 1870, 2613, 4349, 5739, 7442, 9336, 11319, 13779, 16402, 19414, 22980, 26343, 29032, 31823, 33788, 36043, 37693, 38874, 52599, 55823, 56951, 57493, 58010, 58097, 57886, 56386, 55488, 53371, 51494, 49910, 47760, 45697, 43352, 40011, 37502, 35420, 32741, 30096, 27524, 25441, 23872, 22263, 20616, 19097, 17802, 16226, 14920, 13607, 12178, 10822, 9996, 9086, 8184, 7438, 6763, 6279, 5849, 5483, 5165, 4768, 4471, 4043, 3790, 3435, 3199, 3006, 2895, 2787, 2686, 2556, 2382];
        */
        const url = 'http://127.0.0.1:8001/api/history/';
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                data : data.econNum,
                date : data.date,
            }),
            console.log(this.state),
            this.charts()
        });
    }
        
    charts () {    
        /*    
        for (var i = 1; i < 88; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth(), now.getDate()].join('/'));
        }
        */
        // 初始化
        let myChart = echarts.init(document.getElementById('main'));

        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '现存确诊',
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '20%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name: '现存确诊',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    },
                    data: this.state.data
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

export default Line_1;
