import React from 'react';
import {Table} from 'antd';


var columnswithjwsr = [{
    title: '地区',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
    width: 200,
    
  },
  {
    title: '现存确诊',
    key: 'econNum',
    dataIndex: 'econNum',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'red'}}>{text}</span>
  },
  {
    title: '累计确诊',
    key: 'value',
    dataIndex: 'value',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'darkred'}}>{text}</span>
  },
  {
    title: '死亡',
    key: 'deathNum',
    dataIndex: 'deathNum',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'grey'}}>{text}</span>
  },
  {
    title: '治愈',
    key: 'cureNum',
    dataIndex: 'cureNum',
    align: 'center',
    width: 100,
    render: (text ) => <span style={{color:'limegreen'}}>{text}</span>
  },
  {
    title: '境外输入',
    key: 'jwsrNum',
    dataIndex: 'jwsrNum',
    align: 'center',
    width: 100,
  },
  {
    title: '',
    key: 'action',
    dataIndex: '',
    width:100,
    render: (record ) => {if(record.children) return <a href={`/${record.country}/details/${record.name}`}>详情</a>},
  }
];

var columns = [{
  title: '地区',
  key: 'name',
  dataIndex: 'name',
  align: 'center',
  width: 200,
  
},
{
  title: '现存确诊',
  key: 'econNum',
  dataIndex: 'econNum',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'red'}}>{text}</span>
},
{
  title: '累计确诊',
  key: 'value',
  dataIndex: 'value',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'darkred'}}>{text}</span>
},
{
  title: '死亡',
  key: 'deathNum',
  dataIndex: 'deathNum',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'grey'}}>{text}</span>
},
{
  title: '治愈',
  key: 'cureNum',
  dataIndex: 'cureNum',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'limegreen'}}>{text}</span>
},
{
  title: '',
  key: 'action',
  dataIndex: '',
  width:100,
  render: (record ) => {if(record.children) return <a href={`/${record.country}/details/${record.name}`}>详情</a>},
}
];


var columnscountry = [{
  title: '地区',
  key: 'name',
  dataIndex: 'name',
  align: 'center',
  width: 200,
  
},
{
  title: '现存确诊',
  key: 'conNum',
  dataIndex: 'conNum',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'red'}}>{text}</span>
},
{
  title: '死亡',
  key: 'deathNum',
  dataIndex: 'deathNum',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'grey'}}>{text}</span>
},
{
  title: '治愈',
  key: 'cureNum',
  dataIndex: 'cureNum',
  align: 'center',
  width: 100,
  render: (text ) => <span style={{color:'limegreen'}}>{text}</span>
}
];
const DataList = ({data, country, isjwsr, pagination}) => {
    let dataSource=[];
    dataSource=data;
    dataSource.map((element,index) => {
      /*
      var d={};
      d.key=element.ename;
      d.region=element.name;
      d.confirmedCount=element.value;
      d.currentConfirmedCount =element.econNum;
      d.deadCount =element.deathNum;
      d.curedCount =element.cureNum;
      */
      element.key = element.name+element.ename;
      element.country = country;
      element.children = element.city;
      if(element.children){
        element.children.map((city,i) => {
          /*
          var c={};
          c.key =city.ename;
          c.region =city.name;
          c.confirmedCount =city.conNum;
          c.currentConfirmedCount =city.econNum;
          c.deadCount =city.deathNum;
          c.curedCount =city.cureNum;
          d.children[i]=c;
          */
          city.value=city.conNum;
          city.key=city.name+city.ename;

        })
      }
    });
    return <Table columns={isjwsr!==''?columnswithjwsr:(country=='china'||country=='world'?columns:columnscountry)} pagination={pagination} dataSource={dataSource} size='small' expandRowByClick='true'/>
  };
export default DataList;
