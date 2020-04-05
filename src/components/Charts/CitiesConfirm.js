/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import './province';

export default class ProvincesConfirm extends Component {
  state = {};

  getOption = () => {
    const path = window.location.pathname.split('/');
    const province = decodeURIComponent(path[path.length - 1]);
    const { data, isCurr } = this.props;
    const myLabel = {
      show: true,
      color: isCurr ? 'black' : 'white',
      fontSize: '8',
    };
    const myLabel1 = {
        show: false
    }
    const myLabel2 = {
      show: true,
      color: 'black',
      fontSize: '8',
    };
    const myItemStyle = {
      label: {
        normal: myLabel,
        emphasis: myLabel2,
      },
      areaColor: 'lightyellow',
    };
    const formatString = isCurr ? '地区: {b} <br/> 现存确诊：{c}' : '地区: {b} <br/> 累计确诊：{c}';
    return {
      tooltip: {
        // 提示框
        trigger: 'item',
        formatter: formatString,
      },
      series: [
        {
          type: 'map',
          map: province,
          roam: true,
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
          { min: 10000 },
          { min: 1000, max: 9999 },
          { min: 500, max: 999 },
          { min: 100, max: 499 },
          { min: 10, max: 99 },
          { min: 1, max: 9 },
          { value: 0 },
        ],
        inRange: {
          color: ['#FFFFFF', '#FDEBCA', '#E25552', '#CA2B2D', '#831A26', '#500312'],
        },
      },
    };
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <ReactEcharts option={this.getOption()}/>
      </div>
    );
  }
}
