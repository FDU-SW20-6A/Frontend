/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { Card, Descriptions, Empty, Row, Col, Tabs } from 'antd';
import { LineChartOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons';
import CitiesConfirm from '@/components/Charts/CitiesConfirm';
import jsonp from 'jsonp'; // 接口jsonp实现跨域
import DataList from '@/components/DataList';
import Line1 from '@/components/Charts/chart_1';
import Line2 from '@/components/Charts/chart_2'
import Line3 from "@/components/Charts/chart_3";

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
const ROOT = 'https://lab.isaaclin.cn/nCoV/api/';

export default class Welcome extends PureComponent {
    state = {
        data: {}, // 省市疫情总览
        currData: {}, // 省内各城市现存确诊
        totalData: {}, // 省内各城市累计确诊
        list: [],
        jwsr_e: '', // 省内境外输入现存
        jwsr: '', // 省内境外输入累计
        history: {},
        index: '',
    };

    componentDidMount = () => {
        const path = window.location.pathname.split('/');
        const province = decodeURIComponent(path[path.length - 1]);
        this.fetchOverall();
        this.fetchSinaData(province);
        this.fetchChartsData(province);
    };

    fetchOverall = () => {
        /*
        const url = `${ROOT}overall`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.results[0],
                });
            });
        */
    };

    fetchSinaData = province => {
        //jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', (err, data) => {
        const url = "http://127.0.0.1:8001/api/province/?province=\'"+province+"\'";
        fetch(url)
        .then(res => res.json())
        .then(data => {
            /*
            const curr = data.data.list;
            let idx = -1;
            let provinceObj = {};
            for (let i = 0; i < curr.length; i += 1) {
                if (curr[i].name === province) {
                    idx = i;
                    break;
                }
            }
            if (idx !== -1) provinceObj = curr[idx];
            */
            let provinceObj = data;
            if (provinceObj) {
                this.setState({
                    data: {
                        currentConfirmedIncr: provinceObj.adddaily.econadd,
                        currentConfirmedCount: provinceObj.econNum,
                        deadCount: provinceObj.deathNum,
                        curedCount: provinceObj.cureNum,
                        deadIncr: provinceObj.adddaily.deathadd,
                        curedIncr: provinceObj.adddaily.cureadd,
                        confirmedCount: provinceObj.value,
                        confirmedIncr: provinceObj.adddaily.conadd,      
                    }
                })
                const jwsr = provinceObj.jwsr ? provinceObj.jwsrNum : 0;
                this.setState({
                    jwsr,
                    jwsr_e: provinceObj.jwsr_econNum,
                })
                const currCities = provinceObj.city.map(item => ({
                    name: item.mapName,
                    value: item.econNum
                }));
                this.setState({
                    currData: currCities
                });
                const totalCities = provinceObj.city.map(item => ({
                    name: item.mapName,
                    value: item.conNum
                }));
                this.setState({
                    totalData: totalCities
                })
                this.setState({
                    list: [provinceObj]
                })
            }
        });
    };
    
    fetchChartsData = (province) => {
        const url = "http://127.0.0.1:8001/api/province_history/?name=\'"+province+"\'";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    history: data,
                    index: '1',
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

    currMap1 = (currData, jwsr) => <CitiesConfirm data={currData} isCurr jwsr={jwsr} />;

    sumMap1 = (totalData, jwsr) => <CitiesConfirm data={totalData} isCurr={false} jwsr={jwsr} />;

    renderMap1 = () => {
        // 疫情地图
        const { currData, totalData, jwsr, jwsr_e} = this.state;
        return (
            <Card style={{ height: '550px' }}>
                <Meta title="疫情地图" avatar={<PieChartOutlined />} />
                <p />
                <Tabs defaultActiveKey="1" onChange={this.callback()}>
                    <TabPane tab="现存" key="1">
                        {this.currMap1(currData, jwsr_e)}
                    </TabPane>
                    <TabPane tab="累计" key="2">
                        {this.sumMap1(totalData, jwsr)}
                    </TabPane>
                </Tabs>
            </Card>
        );
    };

    callback = () => { };

    renderMap2 = () => (
        <Card style={{ height: '550px' }}>
            <Meta title="总体曲线" avatar={<LineChartOutlined />} />
            <p />
            <Tabs activeKey={this.state.index} onChange={(key)=>{
                    console.log(key);
                    this.setState({index:key});
                }}>
                <TabPane tab="累计确诊" key="1">
                    <Line1 data={{
                        //xdata: ['03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
                        //ydata: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
                        xdata: this.state.history.date,
                        ydata: this.state.history.conNum,
                    }} />
                </TabPane>
                <TabPane tab="新增确诊" key="2">
                    <Line2 data={{
                        //xdata: ['03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
                        //ydata: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
                        xdata: this.state.history.date,
                        ydata: this.state.history.conadd,
                    }} />
                </TabPane>
                <TabPane tab="治愈 / 死亡" key="3">
                    <Line3 data={{
                        //xdata: ['03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
                        //death: [8, 3, 7, 6, 9, 7, 4, 6, 5, 3, 5],
                        //cure: [819, 730, 590, 504, 459, 456, 491, 401, 537, 383, 477]
                        xdata: this.state.history.date,
                        cure: this.state.history.cureNum,
                        death: this.state.history.deathNum,
                    }} />
                </TabPane>
            </Tabs>
        </Card>
    );

    renderTable = () => {
        return (
            <Card>
                <Meta title="数据列表" avatar={<TableOutlined />} />
                <p />
                <DataList data={this.state.list} isjwsr='含境外输入' pagination={false} country='china' />
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



