import React, { PureComponent } from 'react';
import { Card, Pagination } from 'antd';
import { SelectOutlined } from '@ant-design/icons';

const ROOT = 'https://lab.isaaclin.cn//nCoV/api/news'
export default class Official extends PureComponent {
    state = {
        pages: [],
        pagination: 1
    }

    componentDidMount() {
        const url = `${ROOT}?num=1000`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const pages = [];
                const {results} = data;
                for (let i = 0; i < results.length; i += 10) {
                    const page = [];
                    for (let j = i; j < i + 10; j += 1) {
                        page.push(results[j]);
                    }
                    pages.push(page);
                }
                this.setState({
                    pages
                })
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
                    }}>官方新闻汇总</p>
                <p style={{
                    color: 'white',
                    marginLeft: '12%',
                    marginTop: '-15px',
                }}>聚合来自人民日报、央视新闻等官方媒体的最新疫情报道</p>
            </Card>
        )
    }

    renderSingleNews = news => {
        const date = new Date(parseInt(news.pubDate, 10) + 8 * 3600 * 1000)
        const dateDisplay = date.toJSON().substr(0, 19).replace('T', ' ')
        const { title } = news
        const { summary } = news
        const source = news.infoSource
        const srcUrl = news.sourceUrl
        return (
            <div>
                <Card
                    bordered={false}
                    hoverable
                    onClick={() => window.open(srcUrl)}
                    style={{ width: '75%', marginLeft: '12.5%' }}
                >
                    <p style={{ fontSize: '20px', color: 'black', fontWeight: 'bold', display: 'inline' }}>{`${title} `}</p>
                    <SelectOutlined style={{ fontSize: '150%' }}/>
                    <p >{summary}</p>
                    <div style={{ marginRight: '10px', display: 'inline' }}>{dateDisplay}</div>
                    <div 
                        style={{ 
                            backgroundColor: '#0050b3', 
                            color: 'white', 
                            fontSize: 'small', 
                            width: '100%', 
                            fontWeight: 'bold', 
                            display: 'inline',
                            borderRadius: '5px',
                            paddingLeft: '5px',
                            paddingRight: '5px'}}>
                        {source}
                    </div>
                </Card>
                <p />
                <p />
            </div>
        )

    }

    renderAllNews = () => {
        const page = this.state.pagination;
        const news = this.state.pages[page - 1];
        const allNews = news ? news.map((value) => {
            return (this.renderSingleNews(value))
        }) : []
        return allNews
    }

    handleChange = page => {
        this.setState({
            pagination: page
        })
    }

    renderPagination = () => {
        const { news } = this.state;
        return (
            <Pagination 
            showQuickJumper 
            hideOnSinglePage
            defaultCurrent={1} 
            total={1000} 
            onChange={page => this.handleChange(page)} 
            style={{ float: 'right', paddingRight: '12.5%' }}/>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <p/>
                {this.renderAllNews()}
                <p/>
                {this.renderPagination()}
            </div>
        )
    }
}