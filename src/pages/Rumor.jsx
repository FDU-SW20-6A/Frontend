/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { Card, Pagination } from 'antd';

export default class Rumor extends PureComponent {
    state = {
        pages: [],
        pagination: 1
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:8001/api/rumor/';
        fetch(url)
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
        const { title, type } = rumor
        const typeText = type === 0 ? '谣言' : type === 1 ? '可信' : '未证实'
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
                    style={{ width: '75%', marginLeft: '12.5%' }}
                >
                    <div 
                        style={{ 
                            backgroundColor: type === 0 ? '#f5222d' : (type === 1 ? '#52c41a' : '#fadb14'), 
                            color: 'white', 
                            fontSize: '20px',
                            width: '100%', 
                            fontWeight: 'bold', 
                            display: 'inline',
                            paddingLeft: '5px',
                            paddingRight: '5px'}}>
                        {typeText}
                    </div>
                    <p style={{ fontSize: '20px', color: 'black', fontWeight: 'bold', display: 'inline', marginLeft: '10px' }}>{title}</p>
                    <p/>
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

    renderAllRumors = () => {
        const page = this.state.pagination
        const rumors = this.state.pages[page - 1]
        const allRumors = rumors ? rumors.map((value) => {
            return (this.renderSingleRumor(value))
        }) : []
        return (
            <div>
                {allRumors}
            </div>
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
                total={182}
                onChange={page => this.handleChange(page)}
                style={{ float: 'right', paddingRight: '12.5%' }} />
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <p />
                {this.renderAllRumors()}
                <p />
                {this.renderPagination()}
            </div>
        )
    }
}