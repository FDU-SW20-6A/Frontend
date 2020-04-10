import React, { PureComponent } from 'react';
import { Card, Descriptions, Empty, Row, Col, Tabs, Table, Carousel, Menu, Affix } from 'antd';
import {
  LineChartOutlined,
  PieChartOutlined,
  TableOutlined,
  RiseOutlined,
  DotChartOutlined
} from '@ant-design/icons';
import jsonp from 'jsonp'; // 接口jsonp实现跨域
import CountriesConfirm from '@/components/Charts/CountriesConfirm';
import DataList from '@/components/DataList';

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
export default class World extends PureComponent {
  state = {
    data: {},
    currData: {},
    totalData: {},
    list: []
  };

  componentDidMount = () => {
    this.fetchSinaData();
  };

  fetchSinaData = () => {
    const self = this;
    jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', (err, data) => {
      const curr = data.data.otherlist.map(item => ({
        name: item.name,
        value: item.econNum,
      }));
      const othertotal = data.data.othertotal;
      self.setState({
        data:{currentConfirmedIncr:othertotal.ecertain_inc,
          currentConfirmedCount: othertotal.ecertain,
          deadCount: othertotal.die,
          curedCount: othertotal.recure,
          deadIncr: othertotal.die_inc,
          curedIncr: othertotal.recure_inc, 
          confirmedCount: othertotal.certain,
          confirmedIncr: othertotal.certain_inc

        }
      })
      curr.push({ name: '中国', value: data.data.econNum });
      self.setState({
        currData: curr,
      });
      const total = data.data.otherlist.map(item => ({
        name: item.name,
        value: item.conNum,
      }));
      total.push({ name: '中国', value: data.data.gntotal });
      self.setState({
        totalData: total,
        list: data.data.otherlist
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
          <Descriptions column={4} colon={false} layout="vertical" style={{ textAlign: 'center' }}>
                            <Item label="现存确诊" >
                                <h4
                                    style={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        paddingRight: '10px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {data.currentConfirmedIncr > 0
                                        ? `${data.currentConfirmedIncr}`
                                        : data.currentConfirmedIncr}
                                </h4>
                                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                                    {data.currentConfirmedCount}
                                </h3>
                            </Item>
                            <Item label="累计确诊" >
                                <h4
                                    style={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        paddingRight: '10px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {data.confirmedIncr > 0 ? `${data.confirmedIncr}` : data.confirmedIncr}
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
                                    {data.curedIncr > 0 ? `${data.curedIncr}` : data.curedIncr}
                                </h4>
                                <h3 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                                    {data.curedCount}
                                </h3>
                            </Item>
                            <Item label="累计死亡" >
                                <h4
                                    style={{
                                        color: 'grey',
                                        fontWeight: 'bold',
                                        paddingRight: '10px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {data.deadIncr > 0 ? `${data.deadIncr}` : data.deadIncr}
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

  currMap1 = currData => <CountriesConfirm data={currData} isCurr />;

  sumMap1 = totalData => <CountriesConfirm data={totalData} isCurr={false} />;

  renderMap1 = () => {
    const { currData, totalData } = this.state;
    return (
      <Card>
        <Meta title="世界地图" avatar={<PieChartOutlined />} />
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

  callback = () => {
  };

  renderMap2 = () => {
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
    return (
      <Card>
        <Meta title="数据列表" avatar={<TableOutlined />} />
        <p />
        <DataList data={this.state.list} isjwsr='' pagination={true} country='world'/>
      </Card>
    );
  };

  renderNewCovid = () => {
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

  renderCureDeath = () => {
    return (
      <Card>
        <Meta title="治愈率 / 死亡率散点图" avatar={<DotChartOutlined />} />
      </Card>
    )
  }

  renderSider = () => {
    return (
      <Affix offsetTop={90}>
        <Menu
          style={{ width: 256, height: 700 }}
          defaultSelectedKeys={['0']}
          mode="inline"
        >
          <Menu.Item key="0">
            <a href="/world">
            <span role="img" aria-label="世界">
              🌍 世界
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="1">
          <a href="/world/details/意大利">
            <span role="img" aria-label="意大利">
              🇮🇹 意大利
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="2">
          <a href="/world/details/美国">
            <span role="img" aria-label="美国">
              🇺🇸 美国
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="3">
          <a href="/world/details/韩国">
            <span role="img" aria-label="韩国">
              🇰🇷 韩国
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="4">
          <a href="/world/details/伊朗">
            <span role="img" aria-label="伊朗">
              🇮🇷 伊朗
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="5">
          <a href="/world/details/日本">
            <span role="img" aria-label="日本">
              🇯🇵 日本
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="6">
          <a href="/world/details/法国">
            <span role="img" aria-label="法国">
              🇫🇷 法国
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="7">
          <a href="/world/details/德国">
            <span role="img" aria-label="德国">
              🇩🇪 德国
          </span>
          </a>
          </Menu.Item>
          <Menu.Item key="8">
          <a href="/world/details/西班牙">
            <span role="img" aria-label="西班牙">
              🇪🇸 西班牙
          </span>
          </a>
          </Menu.Item>
        </Menu>
      </Affix>
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
          <Col span={19} offset={5}>
            {this.renderMap2()}
          </Col>
          <Col span={19} offset={5}>
            {this.renderTable()}
          </Col>
          <Col span={19} offset={5}>
            {this.renderCureDeath()}
          </Col>
          <Col span={19} offset={5}>
            {this.renderNewCovid()}
          </Col>
        </Row>
      </div>
    );
  }
}
