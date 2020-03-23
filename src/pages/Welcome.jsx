import React, { PureComponent } from 'react';
import { Card, Descriptions, Empty, Row, Col, Tabs, Table } from 'antd';
import { LineChartOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons';

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
export default class Welcome extends PureComponent {
  state = {
    data: {},
  };

  componentDidMount = () => {
    const url = 'https://lab.isaaclin.cn/nCoV/api/overall';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.results[0],
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
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.currentConfirmedCount}
                </h3>
              </Item>
              <Item label="现存疑似">
                <h3 style={{ color: 'orange', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.suspectedCount}
                </h3>
              </Item>
              <Item label="现存重症">
                <h3 style={{ color: 'dodgerblue', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.seriousCount}
                </h3>
              </Item>
              <Item label="累计确诊">
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.confirmedCount}
                </h3>
              </Item>
              <Item label="累计治愈">
                <h3 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.curedCount}
                </h3>
              </Item>
              <Item label="累计死亡">
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

  renderMap1 = () => {
    console.log('中国地图');
    return (
      <Card>
        <Meta title="疫情地图" avatar={<PieChartOutlined />} />
        <p />
        <Tabs defaultActiveKey="1" onChange={this.callback()}>
          <TabPane tab="现存" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="累计" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  callback = () => {
    console.log('tab change');
  };

  renderMap2 = () => {
    console.log('总体曲线');
    return (
      <Card>
        <Meta title="总体曲线" avatar={<LineChartOutlined />} />
        <p />
        <Tabs defaultActiveKey="1" onChange={this.callback()}>
          <TabPane tab="现存" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="新增" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="治愈 / 死亡率" key="3">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  renderTable = () => {
    console.log('数据列表');
    return (
      <Card>
        <Meta title="数据列表" avatar={<TableOutlined />} />
        <p />
        <Table />
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
