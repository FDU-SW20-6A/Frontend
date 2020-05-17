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
import Line_2 from "@/components/Charts/chart_2";
import Line_3 from "@/components/Charts/chart_3";
import Conadd from "@/components/Charts/world/conadd"
import ConNum from "@/components/Charts/world/conNum";
import styles from "./Welcome.less";
import Scatter from "@/components/Charts/world/scatter"

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
        Italy: {},
        USA: {},
        Spain: {},
        France: {},
        German: {},
        Japan: {},
        Korea: {},
        Iran: {},
        index: '',
    };

    componentDidMount = () => {
        this.fetchCountryHistoryData();
        this.fetchSinaData();
        this.fetchChartsData();
        this.fetchContinentData();
    };

    fetchContinentData = () => {
        const url = 'http://127.0.0.1:8001/api/continent';
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            this.setState({
                list: data
            })
        })
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
                index: '1',
            });
        });
    };

    // Fetch country history data for rendering charts Line2
    fetchCountryHistoryData = () => {
        const url = "http://127.0.0.1:8001/api/countries_history/";
        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                Italy: data.Italy,
                USA: data.USA,
                Spain: data.Spain,
                France: data.France,
                German: data.German,
                Iran: data.Iran,
                Korea: data.Korea,
                Japan: data.Japan,
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
            //<Row gutter={[16, 16]}>
            //    <Col span={24}>
            <Affix offsetTop={90}>
                    <Card>
                        <Descriptions column={1} colon={false} layout="vertical" style={{ textAlign: 'center' }}>
                            <Item label="现存确诊" >
                                <h3
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
                                </h3>
                                <h2 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                                    {data.currentConfirmedCount}
                                </h2>
                            </Item>
                            <Item label="累计确诊" >
                                <h3
                                    style={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        paddingRight: '10px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {data.confirmedIncr > 0 ? `${data.confirmedIncr}` : data.confirmedIncr}
                                </h3>
                                <h2 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                                    {data.confirmedCount}
                                </h2>
                            </Item>
                            <Item label="累计治愈">
                                <h3
                                    style={{
                                        color: 'limegreen',
                                        fontWeight: 'bold',
                                        paddingRight: '10px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {data.curedIncr > 0 ? `${data.curedIncr}` : data.curedIncr}
                                </h3>
                                <h2 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                                    {data.curedCount}
                                </h2>
                            </Item>
                            <Item label="累计死亡" >
                                <h3
                                    style={{
                                        color: 'grey',
                                        fontWeight: 'bold',
                                        paddingRight: '10px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {data.deadIncr > 0 ? `${data.deadIncr}` : data.deadIncr}
                                </h3>
                                <h2 style={{ color: 'grey', fontWeight: 'bold', paddingRight: '10px' }}>
                                    {data.deadCount}
                                </h2>
                            </Item>
                        </Descriptions>
                    </Card>
                </Affix>
                //</Col>
            //</Row>
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
                <Tabs activeKey={this.state.index} onChange={(key)=>{
                    this.setState({index:key});
                }}>
                    <TabPane tab="新增确诊" key="1">                    
                        <Conadd data={{
                            China : this.state.history.conadd,
                            world : this.state.history.conaddw,
                            date : this.state.history.date,
                        }}/>
                    </TabPane>
                    <TabPane tab="累计确诊" key="2">
                        <ConNum data={{
                            China : this.state.history.conNum,
                            world : this.state.history.conNumw,
                            date : this.state.history.date,           
                        }}/>
                    </TabPane>
                    {/*<TabPane tab="现存确诊" key="3">*/}
                    {/*  Content of Tab Pane 3*/}
                    {/*</TabPane>*/}
                    <TabPane tab="死亡/治愈" key="3">
                        <Line_3 data={{
                            xdata: this.state.history.date,
                            death: this.state.history.deathNum,
                            cure: this.state.history.cureNum,
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
                <Tabs activeKey={this.state.index} onChange={(key)=>{
                    this.setState({index:key});
                }}>
                    <TabPane tab="意大利" key="1">                    
                        <Line_2 id="Italy" data={{
                            xdata: this.state.Italy.date,
                            ydata: this.state.Italy.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="美国" key="2">
                        <Line_2 id="USA" data={{
                            xdata: this.state.USA.date,
                            ydata: this.state.USA.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="韩国" key="3">
                        <Line_2 id="Korea" data={{
                            xdata: this.state.Korea.date,
                            ydata: this.state.Korea.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="伊朗" key="4">
                        <Line_2 id="Iran" data={{
                            xdata: this.state.Iran.date,
                            ydata: this.state.Iran.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="日本" key="5">
                        <Line_2 id="Japan" data={{
                            xdata: this.state.Japan.date,
                            ydata: this.state.Japan.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="法国" key="6">
                        <Line_2 id="France" data={{
                            xdata: this.state.France.date,
                            ydata: this.state.France.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="德国" key="7">
                        <Line_2 id="German" data={{
                            xdata: this.state.German.date,
                            ydata: this.state.German.conadd,
                        }}/>
                    </TabPane>
                    <TabPane tab="西班牙" key="8">
                        <Line_2 id="Spain" data={{
                            xdata: this.state.Spain.date,
                            ydata: this.state.Spain.conadd,
                        }}/>
                    </TabPane>
                </Tabs>
                    </Card>
        );
    };

    renderCureDeath = () => {
        return (
            <Card>
                <Meta title="治愈率/死亡率" avatar={<DotChartOutlined />} />
                <Scatter/>
            </Card>
        )
    }

    renderSider = () => {
        return (
            <Affix offsetTop={90}>
                <Menu
                    className = {styles.countrydetailssidemenu}
                    
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
                <Row gutter={[24, 8]}>
                    <Col span={4}>{this.renderSider()}</Col>
                    <Col span={16}>
                        <Col span={24}>
                            {this.renderMap1()}
                        </Col>
                        <Col span={24}>
                            {this.renderMap2()}
                        </Col>
                        <Col span={24}>
                            {this.renderCureDeath()}
                        </Col>
                        <Col span={24}>
                            {this.renderNewCovid()}
                        </Col>
                        <Col span={24}>
                            {this.renderTable()}
                        </Col>
                    </Col>
                    <Col span={4}>
                        {this.renderInfo()}
                    </Col>
                </Row>
            </div>
        );
    }
}