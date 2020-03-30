import React from 'react';
import {Table} from 'antd';


var columns = [{
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
    render: (text ) => <span style={{color:'red'}}>{text}</span>
  },
  {
    title: '累计确诊',
    key: 'confirmedCount',
    dataIndex: 'confirmedCount',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'darkred'}}>{text}</span>
  },
  {
    title: '死亡',
    key: 'deadCount',
    dataIndex: 'deadCount',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'grey'}}>{text}</span>
  },
  {
    title: '治愈',
    key: 'curedCount',
    dataIndex: 'curedCount',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'limegreen'}}>{text}</span>
  }];
var actioncolumn=[
{
  title: '',
  key: 'action',
  dataIndex: '',
  width:100,
  render: (record ) => {if(record.children) return <a href={`/${record.country}/details/${record.key}`}>详情</a>},
}];

const DataList = ({data, additionalcolumns, country}) => {
    let dataSource=[];
    let c = columns.concat(additionalcolumns? additionalcolumns.concat(actioncolumn): actioncolumn);
    data.map((element,index) => {
      var d={};
      d.key=element.ename;
      d.region=element.name;
      d.confirmedCount=element.value;
      d.currentConfirmedCount =element.econNum;
      d.deadCount =element.deathNum;
      d.curedCount =element.cureNum;
      d.country = country;
      if(additionalcolumns){
        additionalcolumns.forEach((ele, ind) => {
            d[ele.key]=element[ele.key];
        })
      };
      d.children =[];
      element.city.map((city,i) => {
        var c={};
        c.key =city.ename;
        c.region =city.name;
        c.confirmedCount =city.conNum;
        c.currentConfirmedCount =city.econNum;
        c.deadCount =city.deathNum;
        c.curedCount =city.cureNum;
        d.children[i]=c;
      })
      dataSource[index]=d;
    });
    return <Table columns={c} dataSource={dataSource} size='small' expandRowByClick='true'/>
  };
export default DataList;
