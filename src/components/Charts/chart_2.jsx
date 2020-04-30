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

    componentDidMount() {
        // 初始化
        let myChart = echarts.init(document.getElementById(this.props.id));

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
                data: this.props.data.xdata,
                axisLabel: {
                    interval: 5,
                    rotate: 45
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.props.data.ydata,
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
            <div id={this.props.id} style={{width: '100%', height: 340}}/>
        );
    }
}

export default Line_2;
