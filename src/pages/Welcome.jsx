import React, { PureComponent } from 'react';
import { Card, Descriptions, Empty, Row, Col, Tabs } from 'antd';
import { LineChartOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons';
import DataList from '@/components/DataList';

const { Item } = Descriptions;
const { TabPane } = Tabs;
const { Meta } = Card;
export default class Welcome extends PureComponent {
  state = {
    data: {},
    list: [],
  };
  componentDidMount = () => {
    let url = 'https://lab.isaaclin.cn/nCoV/api/overall';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.results[0],
        });
      });
    var results=[{"locationId":420000,"continentName":"亚洲","continentEnglishName":"Asia","countryName":"中国","countryEnglishName":"China","provinceName":"湖北省","provinceEnglishName":"Hubei","provinceShortName":"湖北","currentConfirmedCount":2526,"confirmedCount":67801,"suspectedCount":0,"curedCount":62098,"deadCount":3177,"comment":"","cities":[{"cityName":"武汉","currentConfirmedCount":2517,"confirmedCount":50006,"suspectedCount":0,"curedCount":44951,"deadCount":2538,"locationId":420100,"cityEnglishName":"Wuhan"},{"cityName":"鄂州","currentConfirmedCount":3,"confirmedCount":1394,"suspectedCount":0,"curedCount":1332,"deadCount":59,"locationId":420700,"cityEnglishName":"Ezhou"},{"cityName":"孝感","currentConfirmedCount":1,"confirmedCount":3518,"suspectedCount":0,"curedCount":3389,"deadCount":128,"locationId":420900,"cityEnglishName":"Xiaogan"},{"cityName":"襄阳","currentConfirmedCount":1,"confirmedCount":1175,"suspectedCount":0,"curedCount":1135,"deadCount":39,"locationId":420600,"cityEnglishName":"Xiangyang"},{"cityName":"宜昌","currentConfirmedCount":1,"confirmedCount":931,"suspectedCount":0,"curedCount":894,"deadCount":36,"locationId":420500,"cityEnglishName":"Yichang"},{"cityName":"荆门","currentConfirmedCount":1,"confirmedCount":928,"suspectedCount":0,"curedCount":887,"deadCount":40,"locationId":420800,"cityEnglishName":"Jingmen"},{"cityName":"仙桃","currentConfirmedCount":1,"confirmedCount":575,"suspectedCount":0,"curedCount":552,"deadCount":22,"locationId":429004,"cityEnglishName":"Xiantao"},{"cityName":"潜江","currentConfirmedCount":1,"confirmedCount":198,"suspectedCount":0,"curedCount":188,"deadCount":9,"locationId":429005,"cityEnglishName":"Qianjiang"},{"cityName":"黄冈","currentConfirmedCount":0,"confirmedCount":2907,"suspectedCount":0,"curedCount":2782,"deadCount":125,"locationId":421100,"cityEnglishName":"Huanggang"},{"cityName":"荆州","currentConfirmedCount":0,"confirmedCount":1580,"suspectedCount":0,"curedCount":1528,"deadCount":52,"locationId":421000,"cityEnglishName":"Jingzhou"},{"cityName":"随州","currentConfirmedCount":0,"confirmedCount":1307,"suspectedCount":0,"curedCount":1262,"deadCount":45,"locationId":421300,"cityEnglishName":"Suizhou"},{"cityName":"黄石","currentConfirmedCount":0,"confirmedCount":1015,"suspectedCount":0,"curedCount":976,"deadCount":39,"locationId":420200,"cityEnglishName":"Huangshi"},{"cityName":"咸宁","currentConfirmedCount":0,"confirmedCount":836,"suspectedCount":0,"curedCount":821,"deadCount":15,"locationId":421200,"cityEnglishName":"Xianning"},{"cityName":"十堰","currentConfirmedCount":0,"confirmedCount":672,"suspectedCount":0,"curedCount":664,"deadCount":8,"locationId":420300,"cityEnglishName":"Shiyan"},{"cityName":"天门","currentConfirmedCount":0,"confirmedCount":496,"suspectedCount":0,"curedCount":481,"deadCount":15,"locationId":429006,"cityEnglishName":"Tianmen"},{"cityName":"恩施州","currentConfirmedCount":0,"confirmedCount":252,"suspectedCount":0,"curedCount":245,"deadCount":7,"locationId":422800,"cityEnglishName":"Enshi Tujia and Miao Autonomous Prefecture"},{"cityName":"神农架林区","currentConfirmedCount":0,"confirmedCount":11,"suspectedCount":0,"curedCount":11,"deadCount":0,"locationId":429021,"cityEnglishName":"Shennongjia"}],"updateTime":1585358809223}]
    
    this.setState({
      list: results
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
                <h4 style={{ color: 'red', fontWeight:'bold', paddingRight:'10px', marginBottom:'0'}}>
                  {data.currentConfirmedIncr>0?'+'+data.currentConfirmedIncr:data.currentConfirmedIncr}
                </h4>
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.currentConfirmedCount}
                </h3>
              </Item>
              <Item label="现存疑似">
                <h4 style={{ color: 'orange', fontWeight:'bold', paddingRight:'10px', marginBottom:'0'}}>
                  {data.suspectedIncr>0?'+'+data.suspectedIncr:data.suspectedIncr}
                </h4>
                <h3 style={{ color: 'orange', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.suspectedCount}
                </h3>
              </Item>
              <Item label="现存重症">
                <h4 style={{ color: 'dodgerblue', fontWeight:'bold', paddingRight:'10px', marginBottom:'0'}}>
                  {data.seriousIncr>0?'+'+data.seriousIncr:data.seriousIncr}
                </h4>
                <h3 style={{ color: 'dodgerblue', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.seriousCount}
                </h3>
              </Item>
              <Item label="累计确诊">
                <h4 style={{ color: 'red', fontWeight:'bold', paddingRight:'10px', marginBottom:'0'}}>
                  {data.confirmedIncr>0?'+'+data.confirmedIncr:data.confirmedIncr}
                </h4>
                <h3 style={{ color: 'red', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.confirmedCount}
                </h3>
              </Item>
              <Item label="累计治愈">
                <h4 style={{ color: 'limegreen', fontWeight:'bold', paddingRight:'10px', marginBottom:'0'}}>
                  {data.curedIncr>0?'+'+data.curedIncr:data.curedIncr}
                </h4>
                <h3 style={{ color: 'limegreen', fontWeight: 'bold', paddingRight: '10px' }}>
                  {data.curedCount}
                </h3>
              </Item>
              <Item label="累计死亡">
                <h4 style={{ color: 'grey', fontWeight:'bold', paddingRight:'10px', marginBottom:'0'}}>
                  {data.deadIncr>0?'+'+data.deadIncr:data.deadIncr}
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
    console.log(this.state.list);
    return (
      <Card>
        <Meta title="数据列表" avatar={<TableOutlined />} />
        <p />
        <DataList data={this.state.list}/>
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
