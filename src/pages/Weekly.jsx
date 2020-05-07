import React, { PureComponent } from 'react';
import { Col, Descriptions, Empty, Row, Collapse, Card, Tabs, Pagination, Modal, Button, Affix } from 'antd';
import { Transfer, Tree } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, SelectOutlined } from '@ant-design/icons';

import WeeklyConNum from "@/components/Charts/weekly/conNum"
import WeeklyConadd from "@/components/Charts/weekly/conadd";
import WeeklyCureNum from "@/components/Charts/weekly/cureNum";
import WeeklyDeathNum from "@/components/Charts/weekly/deathNum";

const { Panel } = Collapse;
const { Item } = Descriptions;
const { TabPane } = Tabs;
const { TreeNode } = Tree;

const titleStyle = {
    display: 'inline',
    backgroundColor: '#fadb14',
    color: 'white',
    fontSize: '18px',
    width: '100%',
    borderRadius: '10px',
    fontWeight: 'bold',
    paddingLeft: '7px',
    paddingRight: '7px',
    paddingTop: '2px',
    paddingBottom: '2px',
    marginLeft: '45%'
}

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
            {generateTree(children, checkedKeys)}
        </TreeNode>
    ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    const transferDataSource = [];
    function flatten(list = []) {
        list.forEach(item => {
            transferDataSource.push(item);
            flatten(item.children);
        });
    }
    flatten(dataSource);

    return (
        <Transfer
            {...restProps}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            className="tree-transfer"
            render={item => item.title}
            showSelectAll={false}
        >
            {({ direction, onItemSelect, selectedKeys }) => {
                if (direction === 'left') {
                    const checkedKeys = [...selectedKeys, ...targetKeys];
                    return (
                        <Tree
                            blockNode
                            checkable
                            checkStrictly
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            onCheck={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                            }}
                            onSelect={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                            }}
                        >
                            {generateTree(dataSource, targetKeys)}
                        </Tree>
                    );
                }
            }}
        </Transfer>
    );
};

class Subscribe extends React.Component {
    state = {
        targetKeys: [],
    };

    onChange = targetKeys => {
        console.log('Target Keys:', targetKeys);
        this.setState({ targetKeys });
    };

    render() {
        const { targetKeys } = this.state;
        return (
            <div>
                <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange} />
            </div>
        );
    }
}

class SubscribeButton extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Affix offsetBottom={120}>
                    <Button type="primary"
                        style={{ float: 'right', marginRight: '2.5%', width: '60px', height: '60px', borderRadius: '50%', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)' }}
                        onClick={this.showModal}>
                        <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '50%' }}>订阅</p>
                    </Button>
                </Affix>
                <Modal
                    title="我的订阅"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Subscribe />
                </Modal>
            </div>
        );
    }
}


export default class Weekly extends PureComponent {
    state = {
        city: "",
        // Reference for API data format
        treeData: {
            '广东': {
                title: '广东',
                "conNum": 593,//累计确诊
                "econNum": 35,//现存确诊
                "cureNum": 547,//累计治愈
                "deathNum": 9,//累计死亡
                "conNumadd": 2,//新增确诊
                "econNumAdd": -3,//新增现存确诊
                "cureNumAdd": 1,//新增治愈
                "deathNumAdd": 0,//新增死亡

                "conNumRank": 2,//累计确诊
                "econNumRank": 3,//现存确诊
                "cureNumRank": 1,//累计治愈
                "deathNumRank": 3,//累计死亡
                "conNumRankAdd": 0,//累计确诊
                "econNumRankAdd": -1,//现存确诊
                "cureNumRankAdd": 1,//累计治愈
                "deathNumRankAdd": -2,//累计死亡

                Conadd: {
                    thisweek: [5, 3, 4, 12, 7, 5, 11],
                    lastweek: [457, 688, 769, 1771, 1459, 1762, 1984],
                    lastdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                    thisdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                },

                ConNum: {
                    thisweek: [5, 3, 4, 12, 7, 5, 11],
                    lastweek: [457, 688, 769, 1771, 1459, 1762, 1984],
                    lastdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                    thisdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                },

                CureNum: {
                    thisweek: [5, 3, 4, 12, 7, 5, 11],
                    lastweek: [457, 688, 769, 1771, 1459, 1762, 1984],
                    lastdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                    thisdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                },

                DeathNum: {
                    thisweek: [5, 3, 4, 12, 7, 5, 11],
                    lastweek: [457, 688, 769, 1771, 1459, 1762, 1984],
                    lastdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                    thisdate: ["03.29", "03.30", "03.31", "04.01", "04.02", "04.03", "04.04"],
                },

                news: [
                    {
                        infoSource: "",
                        title: "",
                        sourceURL: "",
                        summary: "",
                        pubDate: "",
                    },
                    {
                        infoSource: "",
                        title: "",
                        sourceURL: "",
                        summary: "",
                        pubDate: "",
                    },
                ],

                children: [{ key: '广州', title: '广州' }, { key: '深圳', title: '深圳' }, { key: '珠海', title: '珠海' }],
            },
        },
        history: {},
        index: '',
        pages: [],
        historyPages: [],
        pagination: 1,
    };

    componentDidMount = () => {
        const url = 'http://127.0.0.1:8001/api/news/';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const pages = [];
                const { results } = data;
                for (let i = 0; i < results.length; i += 3) {
                    const page = [];
                    for (let j = i; j < Math.min(i + 3, results.length); j += 1) {
                        page.push(results[j]);
                    }
                    pages.push(page);
                }
                this.setState({
                    pages
                })
            });

    };

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
                }}>周报汇总</p>
                <p style={{
                    color: 'white',
                    marginLeft: '12%',
                    marginTop: '-15px',
                }}>
                    个性化周报
                </p>
            </Card>
        )
    };

    renderInfo = (city) => {
        if (this.state.data === {}) {
            return <Empty />;
        }
        let Items = [];
        const labels = ["现存确诊", "累计确诊", "累计治愈", "累计死亡",
            "现存确诊排名", "累计确诊排名", "治愈率排名", "死亡率排名"];
        const colors = ["red", "red", "limegreen", "grey", "red", "red", "limegreen", "grey"];
        const data1 = ["econNumAdd", "conNumadd", "cureNumAdd", "deathNumAdd",
            "econNumRankAdd", "conNumRankAdd", "cureNumRankAdd", "deathNumRankAdd"];
        const data2 = ["econNum", "conNum", "cureNum", "deathNum",
            "econNumRank", "conNumRank", "cureNumRank", "deathNumRank"];
        let f = (x) => (x > 0 ? `+${x}` : x);
        for (let i = 0; i < 8; i++) {
            let Item = (
                <Item label={labels[i]} >
                    <h3
                        style={{
                            color: colors[i],
                            fontWeight: 'bold',
                            paddingRight: '10px',
                            marginBottom: '0',
                        }}
                    >
                        {f(this.state.treeData[city][data1[i]])}
                    </h3>
                    <h2 style={{ color: colors[i], fontWeight: 'bold', paddingRight: '10px' }}>
                        {this.state.treeData[city][data2[i]]}
                    </h2>
                </Item>
            )
            Items.push(Item);
        }
        return (
            <Card bordered={false}>
                <p style={titleStyle}>地方统计数据</p>
                <p />
                <Descriptions column={4} colon={false} layout="vertical" style={{ textAlign: 'center' }}>
                    {Items}
                </Descriptions>
            </Card>
        );
    };

    renderMap = (city) => {
        let TabPanes = [];
        let chartType = ["Conadd", "ConNum", "CureNum", "DeathNum"];
        let Chart = [WeeklyConadd, WeeklyConNum, WeeklyCureNum, WeeklyDeathNum];
        let title = ["新增确诊", "累计确诊", "累计治愈", "累计死亡"];
        for (let i = 0; i < 4; i++) {
            const Tag = Chart[i];
            let Tab = (
                <TabPane tab={title[i]} key={i + 1}>
                    <Tag id={city + chartType[i]} data={ //fake data
                        this.state.treeData[city][chartType[i]]
                    } />
                </TabPane>
            )
            TabPanes.push(Tab);
        }
        return (
            <Card bordered={false}>
                <p style={titleStyle}>地方疫情曲线</p>
                <p />
                <Tabs activeKey={this.state.index} onChange={(key) => {
                    this.setState({ index: key });
                }}>
                    {TabPanes}
                </Tabs>
            </Card>
        )
    }

    renderSingleNews = news => {
        const date = new Date(parseInt(news.pubDate, 10) + 8 * 3600 * 1000)
        const dateDisplay = date.toJSON().substr(0, 19).replace('T', ' ')
        const { title, summary } = news
        const source = news.infoSource
        const srcUrl = news.sourceUrl
        return (
            <div>
                <Card bordered={false} hoverable onClick={() => window.open(srcUrl)}>
                    <p style={{ fontSize: '20px', color: 'black', fontWeight: 'bold', display: 'inline' }}>{`${title} `}</p>
                    <SelectOutlined style={{ fontSize: '150%' }} />
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
                            paddingRight: '5px'
                        }}>
                        {source}
                    </div>
                </Card>
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

    renderCollapse = () => {
        let Panels = [];
        for (let city in this.state.treeData) {
            let data = this.state.treeData[city];
            let panel = (
                <Panel header={city} key={city}>
                    {this.renderInfo(city)}
                    <p />
                    {this.renderMap(city)}
                    <p />
                    <Card bordered={false}>
                        <p style={titleStyle}>地方新闻汇总</p>
                        <p />
                        {this.renderAllNews(city)}
                    </Card>
                    <p />
                    <Pagination
                        style={{ float: 'right', marginRight: '2%' }}
                        showQuickJumper
                        defaultCurrent={1}
                        total={100}
                    />
                    <p />
                </Panel>
            );
            Panels.push(panel);
        }
        return (
            <Collapse>
                {Panels}
            </Collapse>
        )
    };

    render() {
        return (
            <div>
                {this.renderHeader()}
                <p />
                <Col span={20} offset={2}>
                    {this.renderCollapse()}
                </Col>
                <SubscribeButton />
            </div>
        );
    }

}