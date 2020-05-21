import React from 'react';
import {Table, Input, Button} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class WorldList extends React.Component{
    state = {
      searchText: '',
      searchedColumn: '',
      country: 'world',
    };

    getData = () => {
      let dataSource = this.props.data;
      dataSource.map((element,index) => {
        element.key = element.name;
        //element.country = this.state.country;
        element.children = element.country;
        if(element.children){
          element.children.map((city,i) => {
 //           city.value=city.conNum;
            city.key=city.name;
          })
        }
      });
      return dataSource
    };
    getDescendantValues =  (record, dataIndex) => {
      const values = [];
      (function recurse(record) {
          values.push(record[dataIndex].toString().toLowerCase());
          if(record.children)
            record.children.forEach(recurse);
      })(record);
      return values;
    };
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

      onFilter: (value, record) =>{
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())||
          this.getDescendantValues(record, dataIndex).some(descValue => descValue.includes(value.toLowerCase()));},
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
  
    render() {
      const columns = [{
        title: '地区',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
        width: 200,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '病死率',
        key: 'deathRate',
        align: 'center',
        width: 100,
        render: (record) => <span> {Number(record.deathNum / record.conNum * 100).toFixed(2)}%</span>,
        sorter: (a,b) => a.deathNum/a.conNum - b.deathNum/b.conNum,
        defaultSortOrder: 'descend',
      },
      {
        title: '现存确诊',
        key: 'econNum',
        dataIndex: 'econNum',
        align: 'center',
        width: 100,
        render: (text ) => <span style={{color:'red'}}>{text}</span>,
        sorter: (a,b) => a.econNum - b.econNum,
      },
      {
        title: '累计确诊',
        key: 'conNum',
        dataIndex: 'conNum',
        align: 'center',
        width: 100,
        render: (text ) => <span style={{color:'darkred'}}>{text}</span>,
        sorter: (a,b) => a.value - b.value
      },
      {
        title: '死亡',
        key: 'deathNum',
        dataIndex: 'deathNum',
        align: 'center',
        width: 100,
        render: (text ) => <span style={{color:'grey'}}>{text}</span>,
        sorter: (a,b) => a.deathNum - b.deathNum,
        
      },
      {
        title: '治愈',
        key: 'cureNum',
        dataIndex: 'cureNum',
        align: 'center',
        width: 100,
        render: (text ) => <span style={{color:'limegreen'}}>{text}</span>
      },
      /*
      {
        title: '',
        key: 'action',
        dataIndex: '',
        width:100,
        render: (record ) => {if(record.children) return <a href={`/${record.country}/details/${record.name}`}>详情</a>},
      }
      */
    ];
    return <Table columns={columns} dataSource={this.getData()} pagination={this.props.pagination} size='small' defaultExpandedRowKeys='欧洲'/>;
    }
}
export default WorldList;