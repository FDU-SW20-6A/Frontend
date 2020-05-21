import React from 'react';
import {shallow, mount} from 'enzyme';
import WorldList from '@/components/WorldList';


var list=null;
describe('WorldList', ()=>{
    beforeAll(()=>{
        list=[
            {
                name:'欧洲',
                conNum: 2307817,
                econNum: 1722832,
                deathNum:870834,
                cureNum: 374873,
                country:[
                    {
                        name:'英国',
                        conNum: 278372,
                        econNum:7845,
                        deathNum:38434,
                        cureNum: 4854,
                    }
                ]
            },
            {
                name:'亚洲',
                conNum: 3478374,
                econNum: 343743,
                deathNum: 784578,
                cureNum: 847545,
                country:[
                    {
                        name: '中国',
                        conNum: 347837,
                        econNum: 34787,
                        deathNum: 5776,
                        cureNum: 45848
                    }
                ]
            }
        ];
    })
    test('render world list with pagination api', ()=>{
        
        const wrapper = mount(<WorldList data={list} pagination={true}/>);
        expect(wrapper.find('Table').at(0).props().pagination).toBeTruthy();
        expect(wrapper.find('.ant-table-header-column')).toHaveLength(6);

        expect(wrapper.find('.ant-table-column-title').at(0).text()).toBe('地区');
        expect(wrapper.find('.ant-table-column-title').at(1).text()).toBe('病死率');
        expect(wrapper.find('.ant-table-column-title').at(2).text()).toBe('现存确诊');
        expect(wrapper.find('.ant-table-column-title').at(3).text()).toBe('累计确诊');
        expect(wrapper.find('.ant-table-column-title').at(4).text()).toBe('死亡');
        expect(wrapper.find('.ant-table-column-title').at(5).text()).toBe('治愈');
        wrapper.find('.ant-table-tbody tr td').forEach((value, index)=>{
            if(value.find('span').length==2||(value.find('span').length==1 && value.find('span').text()=='')){
                expect(value.text()==undefined|| value.text()=='').toBeFalsy();
            }
        });
        console.log("test passed, table values all not empty, api correct.")
    })

    test('search world list region', ()=>{
        const wrapper = mount(<WorldList data={list} pagination={true}/>);
        let input1=wrapper.find('.ant-table-filter-dropdown div .ant-input');
        let button =wrapper.find('.ant-table-filter-dropdown div button').at(0);
        expect(input1.exists());
        expect(button.exists());
        input1.simulate('change', {target:{value:'12345'}});
        input1.value='12345';
        
        expect(button.text()).toBe('Search');
        button.simulate('click');
        console.log(wrapper.state());
        
        expect(wrapper.find('.ant-table-placeholder .ant-empty p').text()).toBe('No Data');
    })
})