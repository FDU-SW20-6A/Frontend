/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { Col, Row, Tooltip } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { RollbackOutlined, LeftCircleFilled } from '@ant-design/icons';
//import { router } from 'umi';
import router from '@/utils/router';
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

  rollBack = e => {
    e.stopPropagation();
    router.push('/china');
  }

  render() {
    const { jwsr } = this.props;
    return (
      <div style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <p style={{ fontWeight: 'bold', color: '#CA2B2D' }}>境外输入人员：{jwsr}</p>
          </Col>
          <Col span={1} offset={16}>
            <Tooltip title="回到上一级">
              <LeftCircleFilled style={{ fontSize: '20px' }} onClick={e => { this.rollBack(e) }} />
            </Tooltip>
          </Col>
        </Row>
        <ReactEcharts option={this.getOption()} />
        <p />
        <p style={{ fontStyle: 'italic' }}>*部分地区信息可能未采集到，显示NaN</p>
      </div>
    );
  }
}
