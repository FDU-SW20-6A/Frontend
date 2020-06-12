/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
//import router from 'umi/router';
import router from '@/utils/router';
import 'echarts/map/js/china.js';

export default class ProvincesConfirm extends Component {
  state = {};

  onMapClick = e => {
    const {name} = e.data;
    router.push(`/china/details/${name}`);
  }
  
  onclick = {
    'click': this.onMapClick
  };

  getOption = () => {
    const { data, isCurr } = this.props;
    const myLabel = {
      show: true,
      color: isCurr ? 'black' : 'white',
      fontSize: '8',
    };
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
    const formatString = isCurr ? '省份: {b} <br/> 现存确诊：{c}' : '省份: {b} <br/> 累计确诊：{c}';
    return {
      tooltip: {
        // 提示框
        trigger: 'item',
        formatter: formatString,
      },
      series: [
        {
          type: 'map',
          map: 'china',
          roam: true,
          data,
          selectedMode: 'single',
          itemStyle: {
            borderColor: 'grey', // 区域边框线
          },
          label: {
            normal: myLabel,
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
        <ReactEcharts option={this.getOption()} onEvents={this.onclick}/>
      </div>
    );
  }
}
