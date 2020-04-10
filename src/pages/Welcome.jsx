/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { Card, Descriptions, Empty, Row, Col, Tabs } from 'antd';
import { LineChartOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons';
import ProvincesConfirm from '@/components/Charts/ProvincesConfirm';
import jsonp from 'jsonp'; // 接口jsonp实现跨域
import DataList from '@/components/DataList';
import Line1 from'@/components/Charts/chart_1';
import Line2 from'@/components/Charts/chart_2'
import Line3 from "@/components/Charts/chart_3";

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
const ROOT = 'https://lab.isaaclin.cn/nCoV/api/';

export default class Welcome extends PureComponent {
  state = {
    data: {}, // 国内疫情总览
    currData: {}, // 国内各省市现存确诊
    totalData: {}, // 国内各省市累计确诊
    list: [],
  };

  componentDidMount = () => {
    this.fetchOverall();
    this.fetchSinaData();
  };

  fetchOverall = () => {
    const url = `${ROOT}overall`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.results[0],
        });
      });
  };

  fetchSinaData = () => {
    const self = this;
    jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', (err, data) => {
      const curr = data.data.list.map(item => ({
        name: item.name,
        value: item.econNum,
      }));
      console.log(data)
      self.setState({
        currData: curr,
      });
      const total = data.data.list.map(item => ({
        name: item.name,
        value: item.value,
      }));
      self.setState({
        totalData: total,
      });

      // to data list
      self.setState({
        list: data.data.list,
      });
    });
  };

  renderInfo = () => {
    const { data } = this.state;
    if (data === {}) {
      return <Empty />;
    }
    const curDate = new Date();
    curDate.setTime(data.updateTime);
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Descriptions colon={false} layout="vertical" style={{ textAlign: 'center' }}>
              <Item label="现存确诊">
                <h4
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    marginBottom: '0',
                  }}
                >
                  {data.currentConfirmedIncr > 0
                    ? `+${data.currentConfirmedIncr}`
                    : data.currentConfirmedIncr}
                </h4>
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.currentConfirmedCount}
                </h3>
              </Item>
              <Item label="现存疑似">
                <h4
                  style={{
                    color: 'orange',
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    marginBottom: '0',
                  }}
                >
                  {data.suspectedIncr > 0 ? `+${data.suspectedIncr}` : data.suspectedIncr}
                </h4>
                <h3 style={{ color: 'orange', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.suspectedCount}
                </h3>
              </Item>
              <Item label="现存重症">
                <h4
                  style={{
                    color: 'dodgerblue',
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    marginBottom: '0',
                  }}
                >
                  {data.seriousIncr > 0 ? `+${data.seriousIncr}` : data.seriousIncr}
                </h4>
                <h3 style={{ color: 'dodgerblue', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.seriousCount}
                </h3>
              </Item>
              <Item label="累计确诊">
                <h4
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    marginBottom: '0',
                  }}
                >
                  {data.confirmedIncr > 0 ? `+${data.confirmedIncr}` : data.confirmedIncr}
                </h4>
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.confirmedCount}
                </h3>
              </Item>
              <Item label="累计治愈">
                <h4
                  style={{
                    color: 'limegreen',
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    marginBottom: '0',
                  }}
                >
                  {data.curedIncr > 0 ? `+${data.curedIncr}` : data.curedIncr}
                </h4>
                <h3 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.curedCount}
                </h3>
              </Item>
              <Item label="累计死亡">
                <h4
                  style={{
                    color: 'grey',
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    marginBottom: '0',
                  }}
                >
                  {data.deadIncr > 0 ? `+${data.deadIncr}` : data.deadIncr}
                </h4>
                <h3 style={{ color: 'grey', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.deadCount}
                </h3>
              </Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    );
  };

  currMap1 = currData => <ProvincesConfirm data={currData} isCurr />;

  sumMap1 = totalData => <ProvincesConfirm data={totalData} isCurr={false} />;

  renderMap1 = () => {
    // 疫情地图
    const { currData } = this.state;
    const { totalData } = this.state;
    return (
      <Card>
        <Meta title="疫情地图" avatar={<PieChartOutlined />} />
        <p />
        <Tabs defaultActiveKey="1" onChange={this.callback()}>
          <TabPane tab="现存" key="1">
            {this.currMap1(currData)}
          </TabPane>
          <TabPane tab="累计" key="2">
            {this.sumMap1(totalData)}
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  callback = () => {};

  renderMap2 = () => (
      <Card>
        <Meta title="总体曲线" avatar={<LineChartOutlined/>}/>
        <p/>
        <Tabs defaultActiveKey="1" onChange={this.callback()}>
          <TabPane tab="现存" key="1">
            <Line1 data={{
              xdata: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
              ydata: [34,39,41,46,39,78,47,67,55,54]
            } }/>
          </TabPane>
          <TabPane tab="新增" key="2">
            <Line2 data={{
              xdata: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
              ydata: [34,39,41,46,39,78,47,67,55,54]
            } }/>
          </TabPane>
          <TabPane tab="治愈 / 死亡" key="3">
            <Line3/>
          </TabPane>
        </Tabs>
      </Card>
    );

  renderTable = () => {
    let c;
    console.log(this.state.list)
    if(this.state.list){
    }
    return (
      <Card>
        <Meta title="数据列表" avatar={<TableOutlined />} />
        <p />
        <DataList data={this.state.list} isjwsr='含境外输入' country='china' pagination={false}/>
      </Card>
    );
  };

  render() {
    return (
      <div>
        {this.renderInfo()}
        <Row gutter={[16, 16]}>
          <Col span={12}>{this.renderMap1()}</Col>
          <Col span={12}>{this.renderMap2()}</Col>
          <Col span={24}>{this.renderTable()}</Col>
        </Row>
      </div>
    );
  }
}
