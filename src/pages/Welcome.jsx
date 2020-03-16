import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Descriptions, Empty, Row, Col } from 'antd';

const { Item } = Descriptions;
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
    const curTime = curDate.toLocaleString();
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card hoverable>
            <Descriptions title="最新消息" column="3">
              <Item label="当前确诊">{data.currentConfirmedCount}</Item>
              <Item label="累计确诊">{data.confirmedCount}</Item>
              <Item label="疑似">{data.suspectedCount}</Item>
              <Item label="治愈">{data.curedCount}</Item>
              <Item label="死亡">{data.deadCount}</Item>
              <Item label="危重">{data.seriousCount}</Item>
            </Descriptions>
            <p style={{ fontStyle: 'italic', paddingTop: 15 }}>
              <b>截止时间：</b>
              {curTime}
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="病毒" hoverable style={{ height: 150, borderRadius: '25px' }}>
            {data.note1}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="传染源" hoverable style={{ height: 150, borderRadius: '25px' }}>
            {data.note2}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="传播途径" hoverable style={{ height: 150, borderRadius: '25px' }}>
            {data.note3}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="易感人群" hoverable style={{ height: 150, borderRadius: '25px' }}>
            {data.remark1}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="潜伏期" hoverable style={{ height: 150, borderRadius: '25px' }}>
            {data.remark2}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="宿主" hoverable style={{ height: 150, borderRadius: '25px' }}>
            {data.remark3}
          </Card>
        </Col>
      </Row>
    );
  };

  render() {
    return <PageHeaderWrapper>{this.renderInfo()}</PageHeaderWrapper>;
  }
}
