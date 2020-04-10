/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import './world';

export default class KeyCountries extends Component {
    state = {};

    getOption = () => {
        const path = window.location.pathname.split('/');
        const country = decodeURIComponent(path[path.length - 1]);
        const { data, isCurr, nameMapping } = this.props;
        const myLabel = {
            show: true,
            color: isCurr ? 'black' : 'white',
            fontSize: '5',
        };
        const myLabel1 = {
            show: false
        }
        const myLabel2 = {
            show: true,
            color: 'black',
            fontSize: '5',
        };
        const myItemStyle = {
            label: {
                normal: myLabel,
                emphasis: myLabel2,
            },
            areaColor: 'lightyellow',
        };
        const formatString = isCurr ? '地区: {b} <br/> 今日新增确诊：{c}' : '地区: {b} <br/> 累计确诊：{c}';
        return {
            tooltip: {
                // 提示框
                trigger: 'item',
                formatter: formatString,
            },
            series: [
                {
                    type: 'map',
                    map: country,
                    roam: true,
                    zoom: 1.2,
                    nameMap: nameMapping,
                    data,
                    itemStyle: {
                        borderColor: 'grey', // 区域边框线
                    },
                    label: {
                        normal: myLabel1,
                        emphasis: myLabel2,
                    },
                    emphasis: {
                        // 高亮显示
                        itemStyle: myItemStyle,
                    },
                },
            ],
            visualMap: {
                type: 'piecewise',
                inverse: true,
                show: true,
                pieces: [
                    { min: 100000 },
                    { min: 10000, max: 99999 },
                    { min: 1000, max: 9999 },
                    { min: 500, max: 999 },
                    { min: 100, max: 499 },
                    { min: 10, max: 99 },
                    { min: 1, max: 9 },
                    { value: 0 },
                ],
                inRange: {
                    color: ['#FFFFFF', '#FDEBCA', '#E25552', '#CA2B2D', '#831A26', '#500312', '#000000'],
                },
            },
        };
    };

    render() {
        return (
            <div style={{ padding: 20 }}>
                <ReactEcharts option={this.getOption()}/>
                <p/>
                <p style={{fontStyle: 'italic', fontSize: 'small'}}>*部分地区信息可能未采集到，显示NaN</p>
            </div>
        );
    }
}
