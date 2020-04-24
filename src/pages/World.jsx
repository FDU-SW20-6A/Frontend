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
import WorldList from '@/components/WorldList';
import Line_3 from "@/components/Charts/chart_3";
import Conadd from "@/components/Charts/world/conadd"
import ConNum from "@/components/Charts/world/conNum";
import styles from "./Welcome.less";

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
export default class World extends PureComponent {
    state = {
        data: {},
        currData: {},
        totalData: {},
        list: [],
        history: {},
    };

    componentDidMount = () => {
        this.fetchSinaData();
        this.fetchChartsData();
    };

    fetchSinaData = () => {
        const self = this;
        //jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', (err, data) => {
        const url = 'http://127.0.0.1:8001/api/sina_api/';
        fetch(url)
        .then(res => res.json())
        .then(data => {
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
    
    fetchChartsData = () => {
    const url = 'http://127.0.0.1:8001/api/history/';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          history: data,
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
                    <TabPane tab="新增确诊" key="2">                    
                        <Conadd data={{
                            China : this.state.history.conadd,
                            world : this.state.history.conaddw,
                            date : this.state.history.date,
                        }}/>                        
                    </TabPane>
                    <TabPane tab="累计确诊" key="3">
                        <ConNum data={{
                            China : this.state.history.conNum,
                            world : this.state.history.conNumw,
                            date : this.state.history.date,           
                        }}/>
                    </TabPane>
                    {/*<TabPane tab="现存确诊" key="5">*/}
                    {/*  Content of Tab Pane 3*/}
                    {/*</TabPane>*/}
                    <TabPane tab="死亡/治愈" key="1">
                        <Line_3 data={{
                            xdata:["01.22", "01.23", "01.24", "01.25", "01.26", "01.27", "01.28", "01.29", "01.30", "01.31", "02.01", "02.02", "02.03", "02.04", "02.05", "02.06", "02.07", "02.08", "02.09", "02.10", "02.11", "02.12", "02.13", "02.14", "02.15", "02.16", "02.17", "02.18", "02.19", "02.20", "02.21", "02.22", "02.23", "02.24", "02.25", "02.26", "02.27", "02.28", "02.29", "03.01", "03.02", "03.03", "03.04", "03.05", "03.06", "03.07", "03.08", "03.09", "03.10", "03.11", "03.12", "03.13", "03.14", "03.15", "03.16", "03.17", "03.18", "03.19", "03.20", "03.21", "03.22", "03.23", "03.24", "03.25", "03.26", "03.27", "03.28", "03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                            death:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 5, 5, 8, 12, 21, 41, 53, 64, 79, 95, 119, 154, 185, 221, 293, 364, 452, 560, 764, 947, 1227, 1582, 1928, 2357, 2870, 3457, 4214, 4878, 5942, 7152, 8576, 10229, 11960, 13848, 16242, 18764, 21827, 25083, 28741, 31764, 35972, 40664, 45634, 51227, 57138],
                            cure:[0, 0, 0, 0, 0, 0, 5, 5, 7, 10, 12, 12, 13, 16, 17, 19, 19, 22, 28, 33, 37, 46, 47, 53, 71, 80, 88, 117, 129, 133, 152, 172, 182, 191, 219, 230, 277, 295, 435, 442, 659, 879, 1079, 1565, 1812, 2881, 2960, 3774, 4300, 5010, 5511, 6247, 7507, 8828, 9533, 11158, 13291, 15213, 17295, 20820, 22451, 26059, 27762, 30726, 41139, 51157, 55450, 69620, 80686, 96440, 108275, 121902, 138487, 151439]
                        }}/>
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
                <WorldList data={this.state.list} pagination={true} />
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
                    className = {styles.countrydetailssidemenu}
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