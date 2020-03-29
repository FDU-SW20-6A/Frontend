import React from 'react';
import styles from './index.less';
import {Table} from 'antd';


const columns = [{
    title: '地区',
    key: 'region',
    dataIndex: 'region',
    align: 'center',
    width: 200,
    
  },
  {
    title: '现存确诊',
    key: 'currentConfirmedCount',
    dataIndex: 'currentConfirmedCount',
    align: 'center',
    width: 100,
    render: (text, record) => <span style={{color:'red'}}>{text}</span>
  },
  {
    title: '累计确诊',
    key: 'confirmedCount',
    dataIndex: 'confirmedCount',
    align: 'center',
    width: 100,
    render: (text, record) => <span style={{color:'darkred'}}>{text}</span>
  },
  {
    title: '死亡',
    key: 'deadCount',
    dataIndex: 'deadCount',
    align: 'center',
    width: 100,
    render: (text, record) => <span style={{color:'grey'}}>{text}</span>
  },
  {
    title: '治愈',
    key: 'curedCount',
    dataIndex: 'curedCount',
    align: 'center',
    width: 100,
    render: (text, record) => <span style={{color:'limegreen'}}>{text}</span>
  },
  {
    title: '',
    key: 'action',
    dataIndex: '',
    width:100,
    render: (text, record) => {if(record.children) return <a href={record.region}>详情</a>},
  }];

const DataList = ({style, data}) => {
    let dataSource=[];
    data.map((element,index) => {
      var d={};
      d['key']=element['locationId'];
      d['region']=element['provinceName'];
      d['confirmedCount']=element['confirmedCount'];
      d['currentConfirmedCount']=element['currentConfirmedCount'];
      d['deadCount']=element['deadCount'];
      d['curedCount']=element['curedCount'];
      d['children']=[];
      element['cities'].map((city,i) => {
        var c={};
        c['key']=city['locationId'];
        c['region']=city['cityName'];
        c['confirmedCount']=city['confirmedCount'];
        c['currentConfirmedCount']=city['currentConfirmedCount'];
        c['deadCount']=city['deadCount'];
        c['curedCount']=city['curedCount'];
        d['children'][i]=c;
      })
      dataSource[index]=d;
    });
    return <Table columns={columns} dataSource={dataSource} size='middle' expandRowByClick='true'/>
  };
export default DataList;
