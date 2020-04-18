import React, { PureComponent } from 'react';
import { Card, Pagination, Col, Row } from 'antd';

const ROOT = 'https://lab.isaaclin.cn//nCoV/api/rumors'

class GridCell extends PureComponent {
    renderSingleDonate = donate => {
        const { title } = donate
        const summary = donate.mainSummary
        const src = summary.split('：')[0]
        const words = summary.split('：')[1]
        const content = donate.body
        const srcUrl = donate.sourceUrl
        return (
            <Col span={8}>
                <Card
                    bordered={false}
                    hoverable
                    onClick={() => srcUrl && window.open(srcUrl)}
                    style={{ width: '95%', height: '300px' }}
                >
                    <p style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>{title}</p>
                    <p style={{ color: '#0050b3', fontWeight: 'bold', display: 'inline' }}>{`${src}：`}</p>
                    <p style={{ display: 'inline' }}>{`“${words}。”`}</p>
                    <p />
                    <p>{content}</p>
                </Card>
                <p style={{ height: '10px' }}/>
            </Col>
        )
    }

    render() {
        const { data } = this.props;
        return (
            this.renderSingleDonate(data)
        )
    }
}

export default class Donate extends PureComponent {
    state = {
        pages: [],
        pagination: 1
    }

    componentDidMount() {
        const url1 = `${ROOT}?num=1000&rumorType=0`
        fetch(url1)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                    const pages = [];
                    const { results } = data;
                    for (let i = 0; i < results.length; i += 9) {
                        const page = [];
                        for (let j = i; j < i + 9; j += 1) {
                            page.push(results[j]);
                        }
                        pages.push(page);
                    }
                    this.setState({
                        pages
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
        const page = this.state.pagination;
        const donates = this.state.pages[page - 1];
        const cols = (donates && donates.map(value => {
            return <GridCell data={value} />
        })
        );
        return (
            <Row>
                {cols}
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
                style={{ float: 'right', paddingRight: '2%' }} />
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <p />
                {this.renderAllDonate()}
                <p />
                {this.renderPagination()}
            </div>
        )
    }
}