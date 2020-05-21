import React from 'react';
import {Table, Input, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class DataList extends React.Component{
  getData = () => {
    let dataSource = this.props.data;
    dataSource.map((element,index) => {
      element.key = element.name+element.ename+index;
      element.value = element.value===undefined? element.conNum: element.value;
      element.country = this.props.country;
      element.children = element.city;
      if(element.children){
        element.children.map((city,i) => {
          city.value=city.value?city.value:city.conNum;
          city.key=city.name+city.ename+i+index;
        })
      }
    });
    return dataSource
  };
  render(){
    var columnswithjwsr = [{
      title: '地区',
      dataIndex: 'name',
      align: 'center',
      width: 200,
      
    },
    {
      title: '现存确诊',
      dataIndex: 'econNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'red'}}>{text}</span>,
      sorter: (a,b) => a.econNum - b.econNum,
      defaultSortOrder: 'descend',
    },
    {
      title: '累计确诊',
      dataIndex: 'value',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'darkred'}}>{text}</span>,
      sorter: (a,b) => a.value - b.value,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '死亡',
      dataIndex: 'deathNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'grey'}}>{text}</span>,
      sorter: (a,b) => a.deathNum - b.deathNum,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '治愈',
      dataIndex: 'cureNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'limegreen'}}>{text}</span>,
      sorter: (a,b) => a.cureNum - b.cureNum,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '境外输入',
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

    var columnswithoutjwsr = [{
      title: '地区',
      dataIndex: 'name',
      align: 'center',
      width: 200,
      
    },
    {
      title: '现存确诊',
      dataIndex: 'econNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'red'}}>{text}</span>,
      sorter: (a,b) => a.econNum - b.econNum,
      defaultSortOrder: 'descend',
    },
    {
      title: '累计确诊',
      dataIndex: 'value',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'darkred'}}>{text}</span>,
      sorter: (a,b) => a.value - b.value,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '死亡',
      dataIndex: 'deathNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'grey'}}>{text}</span>,
      sorter: (a,b) => a.deathNum - b.deathNum,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '治愈',
      dataIndex: 'cureNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'limegreen'}}>{text}</span>,
      sorter: (a,b) => a.cureNum - b.cureNum,
      sortDirections: ['descend', 'ascend'],
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
      dataIndex: 'conNum',
      align: 'center',
      width: 100,
      render: (text ) => <span style={{color:'red'}}>{text}</span>,
      sorter: (a,b)=> a.conNum-b.conNum,
      defaultSortOrder: 'descend',
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

    return <Table columns={this.props.isjwsr===''?(this.props.country==='china'?columnswithoutjwsr:columnscountry):columnswithjwsr} pagination={this.props.pagination} dataSource={this.getData()} size='small' expandRowByClick='true'/>
  }
}
export default DataList;
