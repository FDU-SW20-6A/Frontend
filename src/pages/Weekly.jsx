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
};

const mytreeData=[
    {key:'110000',title:'北京市'},
    {key:'120000',title:'天津市'},
    {
        key:'130000',title:'河北省',
        children:[{key:'130100',title:'石家庄市'},{key:'130200',title:'唐山市'},{key:'130300',title:'秦皇岛市'},{key:'130400',title:'邯郸市'},{key:'130500',title:'邢台市'},{key:'130600',title:'保定市'},{key:'130700',title:'张家口市'},{key:'130800',title:'承德市'},{key:'130900',title:'沧州市'},{key:'131000',title:'廊坊市'},{key:'131100',title:'衡水市'},],
    },
    {
        key:'140000',title:'山西省',
        children:[{key:'140100',title:'太原市'},{key:'140200',title:'大同市'},{key:'140300',title:'阳泉市'},{key:'140400',title:'长治市'},{key:'140500',title:'晋城市'},{key:'140600',title:'朔州市'},{key:'140700',title:'晋中市'},{key:'140800',title:'运城市'},{key:'140900',title:'忻州市'},{key:'141000',title:'临汾市'},{key:'141100',title:'吕梁市'},],
    },
    {
        key:'150000',title:'内蒙古自治区',
        children:[{key:'150100',title:'呼和浩特市'},{key:'150200',title:'包头市'},{key:'150300',title:'乌海市'},{key:'150400',title:'赤峰市'},{key:'150500',title:'通辽市'},{key:'150600',title:'鄂尔多斯市'},{key:'150700',title:'呼伦贝尔市'},{key:'150800',title:'巴彦淖尔市'},{key:'150900',title:'乌兰察布市'},{key:'152200',title:'兴安盟'},{key:'152500',title:'锡林郭勒盟'},{key:'152900',title:'阿拉善盟'},],
    },
    {
        key:'210000',title:'辽宁省',
        children:[{key:'210100',title:'沈阳市'},{key:'210200',title:'大连市'},{key:'210300',title:'鞍山市'},{key:'210400',title:'抚顺市'},{key:'210500',title:'本溪市'},{key:'210600',title:'丹东市'},{key:'210700',title:'锦州市'},{key:'210800',title:'营口市'},{key:'210900',title:'阜新市'},{key:'211000',title:'辽阳市'},{key:'211100',title:'盘锦市'},{key:'211200',title:'铁岭市'},{key:'211300',title:'朝阳市'},{key:'211400',title:'葫芦岛市'},],
    },
    {
        key:'220000',title:'吉林省',
        children:[{key:'220100',title:'长春市'},{key:'220200',title:'吉林市'},{key:'220300',title:'四平市'},{key:'220400',title:'辽源市'},{key:'220500',title:'通化市'},{key:'220600',title:'白山市'},{key:'220700',title:'松原市'},{key:'220800',title:'白城市'},{key:'222400',title:'延边朝鲜族自治州'},],
    },
    {
        key:'230000',title:'黑龙江省',
        children:[{key:'230100',title:'哈尔滨市'},{key:'230200',title:'齐齐哈尔市'},{key:'230300',title:'鸡西市'},{key:'230400',title:'鹤岗市'},{key:'230500',title:'双鸭山市'},{key:'230600',title:'大庆市'},{key:'230700',title:'伊春市'},{key:'230800',title:'佳木斯市'},{key:'230900',title:'七台河市'},{key:'231000',title:'牡丹江市'},{key:'231100',title:'黑河市'},{key:'231200',title:'绥化市'},{key:'232700',title:'大兴安岭地区'},],
    },
    {key:'310000',title:'上海市'},
    {
        key:'320000',title:'江苏省',
        children:[{key:'320100',title:'南京市'},{key:'320200',title:'无锡市'},{key:'320300',title:'徐州市'},{key:'320400',title:'常州市'},{key:'320500',title:'苏州市'},{key:'320600',title:'南通市'},{key:'320700',title:'连云港市'},{key:'320800',title:'淮安市'},{key:'320900',title:'盐城市'},{key:'321000',title:'扬州市'},{key:'321100',title:'镇江市'},{key:'321200',title:'泰州市'},{key:'321300',title:'宿迁市'},],
    },
    {
        key:'330000',title:'浙江省',
        children:[{key:'330100',title:'杭州市'},{key:'330200',title:'宁波市'},{key:'330300',title:'温州市'},{key:'330400',title:'嘉兴市'},{key:'330500',title:'湖州市'},{key:'330600',title:'绍兴市'},{key:'330700',title:'金华市'},{key:'330800',title:'衢州市'},{key:'330900',title:'舟山市'},{key:'331000',title:'台州市'},{key:'331100',title:'丽水市'},],
    },
    {
        key:'340000',title:'安徽省',
        children:[{key:'340100',title:'合肥市'},{key:'340200',title:'芜湖市'},{key:'340300',title:'蚌埠市'},{key:'340400',title:'淮南市'},{key:'340500',title:'马鞍山市'},{key:'340600',title:'淮北市'},{key:'340700',title:'铜陵市'},{key:'340800',title:'安庆市'},{key:'341000',title:'黄山市'},{key:'341100',title:'滁州市'},{key:'341200',title:'阜阳市'},{key:'341300',title:'宿州市'},{key:'341500',title:'六安市'},{key:'341600',title:'亳州市'},{key:'341700',title:'池州市'},{key:'341800',title:'宣城市'},],
    },
    {
        key:'350000',title:'福建省',
        children:[{key:'350100',title:'福州市'},{key:'350200',title:'厦门市'},{key:'350300',title:'莆田市'},{key:'350400',title:'三明市'},{key:'350500',title:'泉州市'},{key:'350600',title:'漳州市'},{key:'350700',title:'南平市'},{key:'350800',title:'龙岩市'},{key:'350900',title:'宁德市'},],
    },
    {
        key:'360000',title:'江西省',
        children:[{key:'360100',title:'南昌市'},{key:'360200',title:'景德镇市'},{key:'360300',title:'萍乡市'},{key:'360400',title:'九江市'},{key:'360500',title:'新余市'},{key:'360600',title:'鹰潭市'},{key:'360700',title:'赣州市'},{key:'360800',title:'吉安市'},{key:'360900',title:'宜春市'},{key:'361000',title:'抚州市'},{key:'361100',title:'上饶市'},],
    },
    {
        key:'370000',title:'山东省',
        children:[{key:'370100',title:'济南市'},{key:'370200',title:'青岛市'},{key:'370300',title:'淄博市'},{key:'370400',title:'枣庄市'},{key:'370500',title:'东营市'},{key:'370600',title:'烟台市'},{key:'370700',title:'潍坊市'},{key:'370800',title:'济宁市'},{key:'370900',title:'泰安市'},{key:'371000',title:'威海市'},{key:'371100',title:'日照市'},{key:'371200',title:'莱芜市'},{key:'371300',title:'临沂市'},{key:'371400',title:'德州市'},{key:'371500',title:'聊城市'},{key:'371600',title:'滨州市'},{key:'371700',title:'菏泽市'},],
    },
    {
        key:'410000',title:'河南省',
        children:[{key:'410100',title:'郑州市'},{key:'410200',title:'开封市'},{key:'410300',title:'洛阳市'},{key:'410400',title:'平顶山市'},{key:'410500',title:'安阳市'},{key:'410600',title:'鹤壁市'},{key:'410700',title:'新乡市'},{key:'410800',title:'焦作市'},{key:'410900',title:'濮阳市'},{key:'411000',title:'许昌市'},{key:'411100',title:'漯河市'},{key:'411200',title:'三门峡市'},{key:'411300',title:'南阳市'},{key:'411400',title:'商丘市'},{key:'411500',title:'信阳市'},{key:'411600',title:'周口市'},{key:'411700',title:'驻马店市'},],
    },
    {
        key:'420000',title:'湖北省',
        children:[{key:'420100',title:'武汉市'},{key:'420200',title:'黄石市'},{key:'420300',title:'十堰市'},{key:'420500',title:'宜昌市'},{key:'420600',title:'襄阳市'},{key:'420700',title:'鄂州市'},{key:'420800',title:'荆门市'},{key:'420900',title:'孝感市'},{key:'421000',title:'荆州市'},{key:'421100',title:'黄冈市'},{key:'421200',title:'咸宁市'},{key:'421300',title:'随州市'},{key:'422800',title:'恩施土家族苗族自治州'},],
    },
    {
        key:'430000',title:'湖南省',
        children:[{key:'430100',title:'长沙市'},{key:'430200',title:'株洲市'},{key:'430300',title:'湘潭市'},{key:'430400',title:'衡阳市'},{key:'430500',title:'邵阳市'},{key:'430600',title:'岳阳市'},{key:'430700',title:'常德市'},{key:'430800',title:'张家界市'},{key:'430900',title:'益阳市'},{key:'431000',title:'郴州市'},{key:'431100',title:'永州市'},{key:'431200',title:'怀化市'},{key:'431300',title:'娄底市'},{key:'433100',title:'湘西土家族苗族自治州'},],
    },
    {
        key:'440000',title:'广东省',
        children:[{key:'440100',title:'广州市'},{key:'440200',title:'韶关市'},{key:'440300',title:'深圳市'},{key:'440400',title:'珠海市'},{key:'440500',title:'汕头市'},{key:'440600',title:'佛山市'},{key:'440700',title:'江门市'},{key:'440800',title:'湛江市'},{key:'440900',title:'茂名市'},{key:'441200',title:'肇庆市'},{key:'441300',title:'惠州市'},{key:'441400',title:'梅州市'},{key:'441500',title:'汕尾市'},{key:'441600',title:'河源市'},{key:'441700',title:'阳江市'},{key:'441800',title:'清远市'},{key:'445100',title:'潮州市'},{key:'445200',title:'揭阳市'},{key:'445300',title:'云浮市'},],
    },
    {
        key:'450000',title:'广西壮族自治区',
        children:[{key:'450100',title:'南宁市'},{key:'450200',title:'柳州市'},{key:'450300',title:'桂林市'},{key:'450400',title:'梧州市'},{key:'450500',title:'北海市'},{key:'450600',title:'防城港市'},{key:'450700',title:'钦州市'},{key:'450800',title:'贵港市'},{key:'450900',title:'玉林市'},{key:'451000',title:'百色市'},{key:'451100',title:'贺州市'},{key:'451200',title:'河池市'},{key:'451300',title:'来宾市'},{key:'451400',title:'崇左市'},],
    },
    {
        key:'460000',title:'海南省',
        children:[{key:'460100',title:'海口市'},{key:'460200',title:'三亚市'},{key:'460300',title:'三沙市'},],
    },
    {key:'500000',title:'重庆市'},
    {
        key:'510000',title:'四川省',
        children:[{key:'510100',title:'成都市'},{key:'510300',title:'自贡市'},{key:'510400',title:'攀枝花市'},{key:'510500',title:'泸州市'},{key:'510600',title:'德阳市'},{key:'510700',title:'绵阳市'},{key:'510800',title:'广元市'},{key:'510900',title:'遂宁市'},{key:'511000',title:'内江市'},{key:'511100',title:'乐山市'},{key:'511300',title:'南充市'},{key:'511400',title:'眉山市'},{key:'511500',title:'宜宾市'},{key:'511600',title:'广安市'},{key:'511700',title:'达州市'},{key:'511800',title:'雅安市'},{key:'511900',title:'巴中市'},{key:'512000',title:'资阳市'},{key:'513200',title:'阿坝藏族羌族自治州'},{key:'513300',title:'甘孜藏族自治州'},{key:'513400',title:'凉山彝族自治州'},],
    },
    {
        key:'520000',title:'贵州省',
        children:[{key:'520100',title:'贵阳市'},{key:'520200',title:'六盘水市'},{key:'520300',title:'遵义市'},{key:'520400',title:'安顺市'},{key:'520500',title:'毕节市'},{key:'520600',title:'铜仁市'},{key:'522300',title:'黔西南布依族苗族自治州'},{key:'522600',title:'黔东南苗族侗族自治州'},{key:'522700',title:'黔南布依族苗族自治州'},],
    },
    {
        key:'530000',title:'云南省',
        children:[{key:'530100',title:'昆明市'},{key:'530300',title:'曲靖市'},{key:'530400',title:'玉溪市'},{key:'530500',title:'保山市'},{key:'530600',title:'昭通市'},{key:'530700',title:'丽江市'},{key:'530800',title:'普洱市'},{key:'530900',title:'临沧市'},{key:'532300',title:'楚雄彝族自治州'},{key:'532500',title:'红河哈尼族彝族自治州'},{key:'532600',title:'文山壮族苗族自治州'},{key:'532800',title:'西双版纳傣族自治州'},{key:'532900',title:'大理白族自治州'},{key:'533100',title:'德宏傣族景颇族自治州'},{key:'533300',title:'怒江傈僳族自治州'},{key:'533400',title:'迪庆藏族自治州'},],
    },
    {
        key:'540000',title:'西藏自治区',
        children:[{key:'540100',title:'拉萨市'},{key:'540200',title:'日喀则市'},{key:'540300',title:'昌都市'},{key:'540400',title:'林芝市'},{key:'540500',title:'山南市'},{key:'542400',title:'那曲地区'},{key:'542500',title:'阿里地区'},],
    },
    {
        key:'610000',title:'陕西省',
        children:[{key:'610100',title:'西安市'},{key:'610200',title:'铜川市'},{key:'610300',title:'宝鸡市'},{key:'610400',title:'咸阳市'},{key:'610500',title:'渭南市'},{key:'610600',title:'延安市'},{key:'610700',title:'汉中市'},{key:'610800',title:'榆林市'},{key:'610900',title:'安康市'},{key:'611000',title:'商洛市'},],
    },
    {
        key:'620000',title:'甘肃省',
        children:[{key:'620100',title:'兰州市'},{key:'620300',title:'金昌市'},{key:'620400',title:'白银市'},{key:'620500',title:'天水市'},{key:'620600',title:'武威市'},{key:'620700',title:'张掖市'},{key:'620800',title:'平凉市'},{key:'620900',title:'酒泉市'},{key:'621000',title:'庆阳市'},{key:'621100',title:'定西市'},{key:'621200',title:'陇南市'},{key:'622900',title:'临夏回族自治州'},{key:'623000',title:'甘南藏族自治州'},],
    },
    {
        key:'630000',title:'青海省',
        children:[{key:'630100',title:'西宁市'},{key:'630200',title:'海东市'},{key:'632200',title:'海北藏族自治州'},{key:'632300',title:'黄南藏族自治州'},{key:'632500',title:'海南藏族自治州'},{key:'632600',title:'果洛藏族自治州'},{key:'632700',title:'玉树藏族自治州'},{key:'632800',title:'海西蒙古族藏族自治州'},],
    },
    {
        key:'640000',title:'宁夏回族自治区',
        children:[{key:'640100',title:'银川市'},{key:'640200',title:'石嘴山市'},{key:'640300',title:'吴忠市'},{key:'640400',title:'固原市'},{key:'640500',title:'中卫市'},],
    },
    {
        key:'650000',title:'新疆维吾尔自治区',
        children:[{key:'650100',title:'乌鲁木齐市'},{key:'650200',title:'克拉玛依市'},{key:'650400',title:'吐鲁番市'},{key:'650500',title:'哈密市'},{key:'652300',title:'昌吉回族自治州'},{key:'652700',title:'博尔塔拉蒙古自治州'},{key:'652800',title:'巴音郭楞蒙古自治州'},{key:'652900',title:'阿克苏地区'},{key:'653000',title:'克孜勒苏柯尔克孜自治州'},{key:'653100',title:'喀什地区'},{key:'653200',title:'和田地区'},{key:'654000',title:'伊犁哈萨克自治州'},{key:'654200',title:'塔城地区'},{key:'654300',title:'阿勒泰地区'},],
    },
    {key:'810000',title:'香港特别行政区'},
    {key:'820000',title:'澳门特别行政区'},
];

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({children, ...props}) => (
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
      {({direction, onItemSelect, selectedKeys}) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              // defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: {eventKey},
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: {eventKey},
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

  componentDidMount = () => {
    const url = 'http://localhost:8001/user/subscribe/get/';
    fetch(url, {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then(res => res.json())
      .then(data => {
        const targetKeys = [];
        for (let i = 0; i < data.content.length; i++) {
          targetKeys.push(data.content[i].adcode);
        }
        this.setState({targetKeys});
      });
  };

  onChange = targetKeys => {
    fetch("http://localhost:8001/user/subscribe/post/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({'content': targetKeys}),
    })
      .then(res => res.json())
      .then(data => {
        console.log("message:", data);
      });
    this.setState({targetKeys});
  };

  render() {
    const {targetKeys} = this.state;
    return (
      <div>
        <TreeTransfer dataSource={mytreeData} targetKeys={targetKeys} onChange={this.onChange}/>
      </div>
    );
  }
}

class SubscribeButton extends React.Component {
  state = {visible: false};

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
                  style={{
                    float: 'right',
                    marginRight: '2.5%',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
                  }}
                  onClick={this.showModal}>
            <p style={{textAlign: 'center', fontWeight: 'bold', marginTop: '50%'}}>订阅</p>
          </Button>
        </Affix>
        <Modal
          title="我的订阅"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Subscribe/>
        </Modal>
      </div>
    );
  }
}

export default class Weekly extends PureComponent {

  state = {
    city: "",
    // Reference for API data format
    treeData: {},
    history: {},
    index: '',
    pages: [],
    localnews: [],
    historyPages: [],
    pagination: 1,
  };

  componentDidMount = () => {
    this.timer = setInterval(function () {
      this.fetchTreeData();
      // this.fetchNews();
    }.bind(this), 1000);
  };

  fetchTreeData = () => {
    const url = 'http://localhost:8001/user/weekly/get/';
    fetch(url, {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log("fetch data from api:", data);
        this.setState({
          treeData: data.treeData,
          city: data.city,
        });
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

  renderInfo = (pagedetails) => {
    if (pagedetails.data === {}) {
      return <Empty/>;
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
        <Item label={labels[i]}>
          <h3
            style={{
              color: colors[i],
              fontWeight: 'bold',
              paddingRight: '10px',
              marginBottom: '0',
            }}
          >
            {(pagedetails[data1[i]])}
          </h3>
          <h2 style={{color: colors[i], fontWeight: 'bold', paddingRight: '10px'}}>
            {/*{this.state.treeData[city][this.state.pagination][data2[i]]}*/}
            {pagedetails[data2[i]]}
          </h2>
        </Item>
      );
      Items.push(Item);
    }
    return (
      <Card bordered={false}>
        <p style={titleStyle}>地方统计数据</p>
        <p/>
        <Descriptions column={4} colon={false} layout="vertical" style={{textAlign: 'center'}}>
          {Items}
        </Descriptions>
      </Card>
    );
  };

  renderMap = (pageDetails) => {
    let TabPanes = [];
    let chartType = ["Conadd", "ConNum", "CureNum", "DeathNum"];
    let Chart = [WeeklyConadd, WeeklyConNum, WeeklyCureNum, WeeklyDeathNum];
    let title = ["新增确诊", "累计确诊", "累计治愈", "累计死亡"];
    for (let i = 0; i < 4; i++) {
      const Tag = Chart[i];
      let Tab = (
        <TabPane tab={title[i]} key={pageDetails.city + pageDetails.date + i + 1}>
          <Tag id={pageDetails.city + pageDetails.date + chartType[i]} data={ //fake data
            pageDetails[chartType[i]]
          }/>
        </TabPane>
      )
      TabPanes.push(Tab);
    }
    return (
      <Card bordered={false}>
        <p style={titleStyle}>地方疫情曲线</p>
        <p/>
        <Tabs activeKey={this.state.index} onChange={(key) => {
          this.setState({index: key});
        }}>
          {TabPanes}
        </Tabs>
      </Card>
    )
  };

  renderSingleNews = news => {
    const date = new Date(parseInt(news.pubDate, 10) + 8 * 3600 * 1000)
    const dateDisplay = date.toJSON().substr(0, 19).replace('T', ' ')
    const {title, summary} = news
    const source = news.infoSource
    const srcUrl = news.sourceUrl
    return (
      <div>
        <Card bordered={false} hoverable onClick={() => window.open(srcUrl)}>
          <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold', display: 'inline'}}>{`${title} `}</p>
          <SelectOutlined style={{fontSize: '150%'}}/>
          <p>{summary}</p>
          <div style={{marginRight: '10px', display: 'inline'}}>{dateDisplay}</div>
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
        <p/>
      </div>
    )
  };

  renderAllNews = city => {
    const page = this.state.pagination;
    const totalpages = this.state.treeData[city].length;
    const news = this.state.treeData[city][totalpages - page].news;
    const allNews = news ? news.map((value) => {
      return (this.renderSingleNews(value))
    }) : [];
    return allNews
  };

  renderCollapse = () => {
    let Panels = [];
    for (let city in this.state.treeData) {
      this.state.historyPages = [];
      for (let i = this.state.treeData[city].length - 1; i >= 0; i--) {
        this.state.historyPages.push(this.state.treeData[city][i]);
      }
      let panel = this.renderSinglePage();
      Panels.push(panel);
    }

    return (
      <Collapse>
        {Panels}
      </Collapse>
    )
  };

  handleChange = page => {
    this.setState({
      pagination: page
    })
  };

  renderPagination = (totalPageNum) => {
    return (
      <Pagination
        showQuickJumper
        hideOnSinglePage
        defaultCurrent={1}
        total={totalPageNum * 10}
        onChange={page => this.handleChange(page)}
        style={{float: 'right', paddingRight: '12.5%'}}/>
    )
  };

  renderSinglePage = () => {
    const page = this.state.pagination;
    const pagedetails = this.state.historyPages[page - 1];
    let allnews = this.renderAllNews(pagedetails.city);
    if (allnews.length === 0) {
      allnews = <Empty/>
    }
    return (
      <Panel header={pagedetails.city} key={pagedetails.city}>
        {this.renderInfo(pagedetails)}
        <p/>
        {this.renderMap(pagedetails)}
        <p/>
        <Card bordered={false}>
          <p style={titleStyle}>地方新闻汇总</p>
          <p/>
          {allnews}
        </Card>
        <p/>
        {this.renderPagination(this.state.historyPages.length)}
        <p/>
      </Panel>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        <p/>
        <Col span={20} offset={2}>
          {this.renderCollapse()}
        </Col>
        <SubscribeButton/>
      </div>
    );
  }

}
