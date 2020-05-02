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
import { SettingDrawer } from '@ant-design/pro-layout'

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
    history: {},  //国内历史数据
    index: '',
  };

  componentDidMount = () => {
    this.fetchOverall();
    this.fetchSinaData();
    this.fetchChartsData();
  };

  fetchOverall = () => {
    //const url = `${ROOT}overall`;
    const url = 'http://127.0.0.1:8001/api/overall_China/';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          //data: data.results[0],
          data: data,
        });
      });
  };

  fetchSinaData = () => {
    const self = this;
    //jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json', (err, data) => {
    const url = 'http://127.0.0.1:8001/api/sina_api/';
    fetch(url)
      .then(res => res.json())
      .then(data => {  
      const curr = data.data.list.map(item => ({
        name: item.name,
        value: item.econNum,
      }));
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
                  {data.addecon_new > 0
                    ? `+${data.addecon_new}`
                    : data.addecon_new}
                </h4>
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.econNum}
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
                  {data.addsus > 0 ? `+${data.addsus}` : data.addsus}
                </h4>
                <h3 style={{ color: 'orange', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.sustotal}
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
                  {data.addhecon_new > 0 ? `+${data.addhecon_new}` : data.addhecon_new}
                </h4>
                <h3 style={{ color: 'dodgerblue', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.heconNum}
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
                  {data.addcon > 0 ? `+${data.addcon}` : data.addcon}
                </h4>
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.gntotal}
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
                  {data.addcure > 0 ? `+${data.addcure}` : data.addcure}
                </h4>
                <h3 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.curetotal}
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
                  {data.adddeath > 0 ? `+${data.adddeath}` : data.adddeath}
                </h4>
                <h3 style={{ color: 'grey', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.deathtotal}
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
        console.log(this.state.history.date),
        console.log(this.state.history.econNum),
      <Card>
        <Meta title="总体曲线" avatar={<LineChartOutlined/>}/>
        <p/>
        <Tabs activeKey={this.state.index} onChange={(key)=>{
            this.setState({index:key});
        }}>
          <TabPane tab="现存确诊" key="1">
            <Line1 data={{
              //xdata: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
              //ydata: [34,39,41,46,39,78,47,67,55,54]
              xdata: this.state.history.date,
              ydata: this.state.history.econNum,
            } }/>
          </TabPane>
          <TabPane tab="新增确诊" key="2">
            <Line2 id="increase" data={{
              xdata: this.state.history.date,
              ydata: this.state.history.conadd,
            }}/>
          </TabPane>
          <TabPane tab="治愈/死亡" key="3">
            <Line3 data={{
              //xdata:['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
              //death:[8,3,7,6,9,7,4,6,5,3,5],
              //cure:[819,730,590,504,459,456,491,401,537,383,477]
              xdata: this.state.history.date,
              death: this.state.history.deathNum,
              cure: this.state.history.cureNum
            }}/>
          </TabPane>
        </Tabs>
      </Card>
    );

  renderTable = () => {
    let c;
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
        <SettingDrawer />
      </div>
    );
  }
}
