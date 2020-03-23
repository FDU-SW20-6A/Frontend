import React, { PureComponent } from 'react';
import { Card, Descriptions, Empty, Row, Col, Tabs, Table, Carousel, Menu } from 'antd';
import {
  LineChartOutlined,
  PieChartOutlined,
  TableOutlined,
  RiseOutlined,
} from '@ant-design/icons';

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
export default class World extends PureComponent {
  state = {
    data: {},
  };

  componentDidMount = () => {};

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
            <Descriptions
              column={4}
              colon={false}
              layout="vertical"
              style={{ textAlign: 'center' }}
            >
              <Item label="现存确诊">
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>***</h3>
              </Item>
              <Item label="累计确诊">
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>***</h3>
              </Item>
              <Item label="累计治愈">
                <h3 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                  ***
                </h3>
              </Item>
              <Item label="累计死亡">
                <h3 style={{ color: 'grey', fontWeight: 'bold', paddingRight: '10px' }}>***</h3>
              </Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    );
  };

  renderMap1 = () => {
    console.log('世界地图');
    return (
      <Card>
        <Meta title="世界地图" avatar={<PieChartOutlined />} />
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
    console.log('世界曲线');
    return (
      <Card>
        <Meta title="世界曲线" avatar={<LineChartOutlined />} />
        <p />
        <Tabs defaultActiveKey="1" onChange={this.callback()}>
          <TabPane tab="新增确诊" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="累计确诊" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="累计死亡" key="3">
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

  renderNewCovid = () => {
    console.log('重点国家新增确诊');
    return (
      <Card>
        <Meta title="重点国家新增确诊" avatar={<RiseOutlined />} />
        <p />
        <Carousel autoplay>
          <Card bordered={false}>
            {' '}
            <Meta title="意大利" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="美国" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="韩国" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="伊朗" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="日本" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="法国" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="德国" />
          </Card>
          <Card bordered={false}>
            {' '}
            <Meta title="西班牙" />
          </Card>
        </Carousel>
      </Card>
    );
  };

  renderCureDeath = () => {};

  renderSider = () => {
    console.log('侧边栏');
    return (
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="0">
          <span role="img" aria-label="世界">
            🌍
          </span>
          <span>世界</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span role="img" aria-label="意大利">
            🇮🇹
          </span>
          <span>意大利</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span role="img" aria-label="美国">
            🇺🇸
          </span>
          <span>美国</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span role="img" aria-label="韩国">
            🇰🇷
          </span>
          <span>韩国</span>
        </Menu.Item>
        <Menu.Item key="4">
          <span role="img" aria-label="伊朗">
            🇮🇷
          </span>
          <span>伊朗</span>
        </Menu.Item>
        <Menu.Item key="5">
          <span role="img" aria-label="日本">
            🇯🇵
          </span>
          <span>日本</span>
        </Menu.Item>
        <Menu.Item key="6">
          <span role="img" aria-label="法国">
            🇫🇷
          </span>
          <span>法国</span>
        </Menu.Item>
        <Menu.Item key="7">
          <span role="img" aria-label="德国">
            🇩🇪
          </span>
          <span>德国</span>
        </Menu.Item>
        <Menu.Item key="8">
          <span role="img" aria-label="西班牙">
            🇪🇸
          </span>
          <span>西班牙</span>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={4}>{this.renderSider()}</Col>
          <Col span={19} offset={1}>
            {this.renderInfo()}
          </Col>
          <Col span={19} offset={1}>
            {this.renderMap1()}
          </Col>
          <Col span={19} offset={1}>
            {this.renderMap2()}
          </Col>
          <Col span={19} offset={5}>
            {this.renderTable()}
          </Col>
          <Col span={19} offset={5}>
            {this.renderNewCovid()}
          </Col>
        </Row>
      </div>
    );
  }
}
