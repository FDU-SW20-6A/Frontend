import React, { PureComponent } from 'react';
import { Card, Pagination, Col, Row } from 'antd';

const ROOT = 'https://lab.isaaclin.cn//nCoV/api/rumors'
export default class Rumor extends PureComponent {
    state = {
        pages1: [],
        pages2: [],
        pagination: 1
    }

    componentDidMount() {
        //const url1 = `${ROOT}?num=1000&rumorType=0`
        const url1 = 'http://127.0.0.1:8001/api/rumor0/';
        fetch(url1)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                    const pages = [];
                    const { results } = data;
                    for (let i = 0; i < results.length; i += 10) {
                        const page = [];
                        for (let j = i; j < i + 10 && j < results.length; j += 1) {
                            page.push(results[j]);
                        }
                        pages.push(page);
                    }
                    this.setState({
                        pages1: pages
                    })
                }
            });

        //const url2 = `${ROOT}?num=1000&rumorType=2` // 这次请求不能抓到信息
        const url2 = 'http://127.0.0.1:8001/api/rumor2/';
        fetch(url2)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                    const pages = [];
                    const { results } = data;
                    for (let i = 0; i < results.length; i += 10) {
                        const page = [];
                        for (let j = i; j < i + 10 && j < results.length; j += 1) {
                            page.push(results[j]);
                        }
                        pages.push(page);
                    }
                    this.setState({
                        pages2: pages
                    })
                }
            });
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
                }}>谣言粉碎者</p>
                <p style={{
                    color: 'white',
                    marginLeft: '12%',
                    marginTop: '-15px',
                }}>实时更新辟谣信息，去伪存真，逐个击破</p>
            </Card>
        )
    }

    renderSingleRumor = rumor => {
        const { title } = rumor
        const summary = rumor.mainSummary
        const src = summary.split('：')[0]
        const words = summary.split('：')[1]
        const content = rumor.body
        const srcUrl = rumor.sourceUrl
        return (
            <div>
                <Card
                    bordered={false}
                    hoverable
                    onClick={() => srcUrl && window.open(srcUrl)}
                    style={{ width: '100%' }}
                >
                    <p style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>{title}</p>
                    <p style={{ color: '#0050b3', fontWeight: 'bold', display: 'inline' }}>{`${src}：`}</p>
                    <p style={{ display: 'inline' }}>{`“${words}。”`}</p>
                    <p />
                    <p>{content}</p>
                </Card>
                <p />
                <p />
            </div>
        )
    }

    renderAllRumors = key => {
        const page = this.state.pagination;
        const rumors = key === 1 ? this.state.pages1[page - 1] : this.state.pages2[page - 1];
        const header = key === 1 ? "已辟谣信息" : "未证实信息";
        const allRumors = rumors ? rumors.map((value) => {
            return (this.renderSingleRumor(value))
        }) : []
        return (
            <div>
                <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginLeft: '35%',
                    backgroundColor: '#0050b3',
                    color: 'white',
                    width: '100%',
                    display: 'inline',
                    borderRadius: '10px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                }}>
                    {header}
                </p>
                <p/>
                {allRumors}
            </div>
        )
    }

    renderTabs = () => {
        return (
            <Row gutter={[16, 16]}>
                <Col span={8} offset={4}>
                    {this.renderAllRumors(1)}
                </Col>
                <Col span={8} >
                    {this.renderAllRumors(2)}
                </Col>
            </Row>
        )
    }

    handleChange = page => {
        this.setState({
            pagination: page
        })
    }

    renderPagination = () => {
        return (
            <Pagination
                showQuickJumper
                hideOnSinglePage
                defaultCurrent={1}
                total={1000}
                onChange={page => this.handleChange(page)}
                style={{ float: 'right', paddingRight: '12.5%' }} />
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <p />
                {this.renderTabs()}
                <p />
                {this.renderPagination()}
            </div>
        )
    }
}