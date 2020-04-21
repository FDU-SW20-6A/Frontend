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


class Line_2 extends React.Component {

    state = {
        data : [],
        date : [],
    };
    
    componentDidMount() {
    
        const url = 'http://127.0.0.1:8001/api/history/';
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                data : data.conadd,
                date : data.date,
            }),
            console.log(this.state),
            this.charts()
        });
    }

    charts() {
        // 初始化
        // let myChart = echarts.init(document.getElementById('increase'));
        let myChart = echarts.init(document.getElementById('increase'));

        // 绘制图表
        myChart.setOption({

            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {
                        show: true,
                        type: 'jpg'
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: this.state.date,
                axisLabel: {
                    interval: 0,
                    rotate: 45
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.data,
                type: 'line'
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
            <div id="increase" style={{width: '100%', height: 340}}/>
        );
    }
}

export default Line_2;
