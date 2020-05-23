import DataList from '@/components/DataList';
import {mount} from 'enzyme';

describe('DataList', ()=>{
    test('test render datalist with jwsr', ()=>{
        var list=[{
            name: '广东',
            ename: 'guangdong',
            conNum: 3412,
            econNum: 342,
            deathNum: 312,
            cureNum: 1212,
            value: 3412,
            jwsrNum: 23,
            city: [
                {
                    name: '广州',
                    ename: 'guangzhou',
                    deathNum: 237,
                    conNum: 3478,
                    econNum: 232,
                    cureNum: 2323,
                    value: 1212,
                    jwsr: '',
                },
                {
                    name:'境外输入',
                    deathNum: 1,
                    conNum: 23,
                    econNum: 21,
                    cureNum: 22,
                    value: 343
                }
            ]
        }];
        
        const test= mount(<DataList isjwsr='含境外输入' pagination={false} data={list} country='china'/>);
        expect(test.props().pagination).toBeFalsy();
        expect(test.props().isjwsr).toBe('含境外输入');
        expect(test.props().country).toBe('china');
        expect(test.find('.ant-table-header-column')).toHaveLength(7);
        const columns = test.find('Table').at(0).props().columns;
        columns.forEach((value,index)=>{
            test.find('Table').at(0).props().dataSource.forEach((v,i)=>{
                if(value.dataIndex!==undefined && value.dataIndex!==''){
                    expect(v[value.dataIndex]).toBeDefined();
                }
            })
        })
        

    })

    test('test render province data list', ()=>{
        var list=[{
            name: '广州',
            ename: 'guangzhou',
            conNum: 3412,
            econNum: 342,
            deathNum: 312,
            cureNum: 1212,
            value: 3412,
            jwsr: 23,
        },
        {
            name:'深圳',
            ename: 'shenzhen',
            conNum: 2323,
            econNum: 2222,
            deathNum: 232,
            cureNum: 1211,
            value: 2323,
            jwsr: 21,
        }];

        const test=mount(<DataList data={list} pagination={false} country='china' isjwsr=''/>);

        expect(test.find('Table').at(0).props().pagination).toBeFalsy();
        expect(test.find('Table').at(0).props().columns).toHaveLength(6);
        const columns = test.find('Table').at(0).props().columns;
        columns.forEach((value,index)=>{
            test.find('Table').at(0).props().dataSource.forEach((v,i)=>{
                if(value.dataIndex!==undefined && value.dataIndex!==''){
                    expect(v[value.dataIndex]).toBeDefined();
                }
            })
        })
    })
    test('test render country data list', ()=>{
        var list=[{
            name: '伦巴第',
            ename: 'Italy',
            conNum: 3412,
            econNum: 342,
            deathNum: 312,
            cureNum: 1212,
            value: 3412,
        },
        {
            name: '艾米利亚-罗马涅',
            ename: 'sdfjsk',
            conNum: 2323,
            econNum: 1234,
            deathNum: 144,
            cureNum: 1231,
        }];
        const test=mount(<DataList isjwsr='' data={list} pagination={false} country='world'/>);
        expect(test.find('Table').at(0).props().pagination).toBeFalsy();
        expect(test.find('Table').at(0).props().columns).toHaveLength(4);
        const columns = test.find('Table').at(0).props().columns;
        columns.forEach((value,index)=>{
            test.find('Table').at(0).props().dataSource.forEach((v,i)=>{
                if(value.dataIndex!==undefined && value.dataIndex!==''){
                    expect(v[value.dataIndex]).toBeDefined();
                }
            })
        })
    })

    test('test data list sorting', ()=>{
        var list=[{
            name: '伦巴第',
            ename: 'Italy',
            conNum: 3412,
            deathNum: 312,
            cureNum: 1212,
            value: 3412,
        },
        {
            name: '艾米利亚-罗马涅',
            ename: 'sdfjsk',
            conNum: 2323,
            deathNum: 144,
            cureNum: 1231,
        },{
            name: '士大夫',
            ename: 'abcd',
            conNum: 2341,
            econNum: 515,
            deathNum: 567,
            cureNum: 1234,
        },
        {
            name: '为u人',
            ename: 'dhjhj',
            conNum: 4567,
            deathNum: 746,
            cureNum: 2354,
        }];
        const defalut = ['为u人', '伦巴第', '士大夫', '艾米利亚-罗马涅'];
        const upsort = ['艾米利亚-罗马涅', '士大夫', '伦巴第', '为u人'];
        const notsort = ['伦巴第', '艾米利亚-罗马涅', '士大夫', '为u人'];
        const test= mount(<DataList data={list} country='world' isjwsr='' pagination={false}/>);
        test.find('.ant-table-tbody tr').forEach((v, i)=>{
            expect(v.find('td').at(0).text()).toBe(defalut[i]);
        })
        test.find('.ant-table-column-sorter div').simulate('click');
        test.find('.ant-table-tbody tr').forEach((v, i)=>{
            expect(v.find('td').at(0).text()).toBe(notsort[i]);
        })
        test.find('.ant-table-column-sorter div').simulate('click');
        test.find('.ant-table-tbody tr').forEach((v, i)=>{
            expect(v.find('td').at(0).text()).toBe(upsort[i]);
        })
    })

    test('test data list 2 level sort with jwsr', ()=>{
        var list=[{
            name: '广东',
            ename: 'guangdong',
            conNum: 3412,
            econNum: 342,
            deathNum: 312,
            cureNum: 1212,
            value: 3412,
            jwsrNum: 23,
            city: [
                {
                    name: '广州',
                    ename: 'guangzhou',
                    deathNum: 237,
                    conNum: 3478,
                    econNum: 232,
                    cureNum: 2323,
                    value: 1212,
                    jwsr: '',
                },
                {
                    name:'境外输入',
                    deathNum: 1,
                    conNum: 23,
                    econNum: 21,
                    cureNum: 22,
                    value: 343
                }
            ]
        },
        {
            name: '湖北',
            ename: 'Hubei',
            conNum: 56534,
            econNum: 2346,
            deathNum: 12223,
            cureNum: 123,
            jwsrNum: 235,
            city:[
                {
                    name: '黄冈',
                    ename: 'huanggang',
                    conNum: 23232,
                    econNum: 2345,
                    deathNum: 545,
                    cureNum: 1235,
                },
                {
                    name:'境外输入',
                    conNum: 232,
                    econNum: 121,
                    deathNum: 12,
                    cureNum: 123,
                }
            ]
        }];
        const test=mount(<DataList data={list} pagination={false} isjwsr='有境外输入' country='china'/>);
        const default0=['湖北', '广东'];
        const upsort0=['广东', '湖北'];
        test.find('.ant-table-tbody tr').forEach((v,i) =>{
            expect(v.find('td').at(0).text()).toBe(default0[i]);
            v.find('td').at(0).find('div').simulate('click');
        })
        const l1 = test.find('.ant-table-tbody .ant-table-row-level-1');
        expect(l1.at(0).find('td').at(0).text()).toBe('黄冈');
        expect(l1.at(2).find('td').at(0).text()).toBe('境外输入');
        expect(l1.at(4).find('td').at(0).text()).toBe('广州');
        expect(l1.at(6).find('td').at(0).text()).toBe('境外输入');

        const sortcure = ['广东', '湖北'];
        test.find('.ant-table-column-sorter div').at(3).simulate('click');

        test.find('.ant-table-tbody .ant-table-row-level-0').forEach((v,i) =>{
            if(i%2==0){
                expect(v.find('td').at(0).text()).toBe(sortcure[i/2]);
                v.find('td').at(0).find('div').simulate('click');
            }
        })
        const l2=test.find('.ant-table-tbody .ant-table-row-level-1');
        expect(l2.at(0).find('td').at(0).text()).toBe('广州');
        expect(l2.at(2).find('td').at(0).text()).toBe('境外输入');
        expect(l2.at(4).find('td').at(0).text()).toBe('黄冈');
        expect(l2.at(6).find('td').at(0).text()).toBe('境外输入');
    })
})