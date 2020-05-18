import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

let cellSize = [68, 68];
let pieRadius = 30;

function getVirtulData(history) {
    console.log('Pie ', history);
    var date = +echarts.number.parseDate('2020-'+history.date[0].replace('.', '-'));
    /*
    let year = parseInt(month.substring(0, 4)), mon = parseInt(month.substring(5, 7));
    mon += 1;
    if (mon > 12) {
        year += 1;
        mon = 1;
    }
    let next_month = year.toString() + '-' + ((mon<10) ? '0': '') + mon.toString();
    var end = +echarts.number.parseDate(next_month+'-01');
    */
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (let i = 0, time = date; i < history.date.length; i += 1, time += dayTime) {
        data.push({
            time: [
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ],
            data: [
                //{name: '治愈', value: history.cureNum[i]},
                {name: '死亡', value: history.deathNum[i]},
                {name: '现存确诊', value: history.econNum[i]},
                //{name: '新增确诊', value: history.conadd[i]},
            ]});
    }
    console.log('Pie ', data);
    return data;
}

function getPieSeries(scatterData, chart) {
    return echarts.util.map(scatterData, function (item, index) {
        var center = chart.convertToPixel('calendar', item.time);
        return {
            id: index + 'pie',
            type: 'pie',
            center: center,
            label: {
                normal: {
                    formatter: '{c}',
                    position: 'inside'
                }
            },
            radius: pieRadius,
            data: item.data
        };
    });
}

class PieSeries extends React.Component {
      

    componentDidMount() {  
        /*    
        for (var i = 1; i < 88; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth(), now.getDate()].join('/'));
        }
        */
        // 初始化
        let myChart = echarts.init(document.getElementById('pie'));

        // 绘制图表
        myChart.setOption({
            title: {
                text: '2020年4月病患类型比例',
                x: 'center',
                y: 'top',
            },
            tooltip : {},
            //color: ['#002fa7', '#faad14', '#d14a61'],
            color: ['#2f54eb', '#ffc53d', '#5793f3'],
            legend: {
                data: ['现存确诊', '新增确诊', '死亡'],
                bottom: 20
            },
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: cellSize,
                yearLabel: {
                    show: false,
                    textStyle: {
                        fontSize: 30
                    }
                },
                dayLabel: {
                    margin: 20,
                    firstDay: 1,
                    nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                },
                monthLabel: {
                    show: false
                },
                range: [this.props.month]
            },
        });

        let scatterData = getVirtulData(this.props.data);
        myChart.setOption({
            series: getPieSeries(scatterData, myChart)
        });

        // window.onresize = myChart.resize;
        window.addEventListener("resize",function(){
            myChart.resize();
        });

    }

    componentWillUpdate(newProps, newState) {
        console.log("Update Pie Series!");
        let myChart = echarts.init(document.getElementById('pie'));
        let scatterData = getVirtulData(newProps.data);
        myChart.setOption({
            series: getPieSeries(scatterData, myChart)
        });
    }

    render() {
        return (
            <div id="pie" style={{width: '100%', height: 470}}/>
        );
    }
}

export default PieSeries;
