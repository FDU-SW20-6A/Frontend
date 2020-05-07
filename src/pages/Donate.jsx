import React, { PureComponent } from 'react';
import { Card, Col, Row, Empty } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import papa from 'papaparse';

class GridCell extends PureComponent {
    renderSingleDonate = donate => {
        console.log(donate)
        const title = donate.From
        const srcUrl = donate.Resource
        const person = donate.Proposer ? donate.Proposer : "不明"
        const volunteer = donate['Input volunteer'] ? donate['Input volunteer'] : "不明"
        return (
            <Col span={8}>
                <Card
                    bordered={false}
                    hoverable
                    onClick={() => srcUrl && window.open(srcUrl)}
                    style={{ width: '95%', height: '230px' }}
                >
                    <p style={{ fontSize: '20px', color: 'black', fontWeight: 'bold', display: 'inline', marginRight: '5px' }}>{title}</p>
                    <SelectOutlined style={{ fontSize: '150%' }}/>
                    <p/>
                    <div 
                        style={{ 'color': '#0050b3', display: 'inline', fontWeight: 'bold' }}>
                        发起人
                    </div>
                    <p style={{ display: 'inline', marginLeft: '10px' }}>{person}</p>
                    <p/>
                    <div 
                        style={{ 'color': '#0050b3', display: 'inline', fontWeight: 'bold' }}>
                        信息录入志愿者
                    </div>
                    <p style={{ display: 'inline', marginLeft: '10px' }}>{volunteer}</p>
                </Card>
                <p style={{ height: '10px' }} />
            </Col>
        )
    }

    render() {
        return (
            this.renderSingleDonate(this.props.data)
        )
    }
}

export default class Donate extends PureComponent {
    state = {
        donate: [],
    }

    componentDidMount() {
        this.fetchCsv()
    }

    fetchCsv = () => {
        const parFile = require('../components/OtherData/wuhan2020.csv')
        papa.parse(parFile, {
            download: true,
            header: true,
            complete: results => {
                this.setState({
                    donate: results.data
                })
            }
        })
    }

    renderHeader = () => {
        return (
            <Card style={{
                width: '120%',
                height: '220px',
                backgroundColor: '#002766',
                left: '-25px',
                top: '-30px',
                marginBottom: '-25px'
            }}>
                <p style={{
                    fontSize: '40px',
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: '12%',
                    marginTop: '2%'
                }}>捐赠信息汇总</p>
                <p style={{
                    color: 'white',
                    marginLeft: '12%',
                    marginTop: '-15px',
                }}>这里有可信的捐款渠道，让我们携手共渡难关</p>
            </Card>
        )
    }

    renderAllDonate = () => {
        const {donate} = this.state
        const cols = (donate && donate.map(value => {
            return <GridCell data={value} />
        }));
        return (
            <Row>
                {cols}
            </Row>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <p />
                {this.renderAllDonate()}
            </div>
        )
    }
}