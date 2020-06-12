import React from 'react';
import {shallow, mount} from 'enzyme';
import ProvincesConfirm from '@/components/Charts/ProvincesConfirm';
import CountriesConfirm from '@/components/Charts/CountriesConfirm';
import CitiesConfirm from '@/components/Charts/CitiesConfirm';
import KeyCountries from '@/components/Charts/KeyCountries';

var list1, list2, list3, list4, nameMapping;
describe('Map Test', ()=>{
    beforeAll(()=>{
        list1 = {
            name: ['北京','上海','广东','浙江','四川', '重庆', '陕西', '山东', '湖南', '黑龙江'],
            value: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
        };
        list2 = {
            name: ['中国','美国','俄罗斯','法国','德国', '日本', '韩国', '英国', '意大利', '西班牙'],
            value: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
        };
        list3 = {
            name: ['青岛','济南','日照','烟台','潍坊', '威海', '临沂', '泰安', '东营', '枣庄'],
            value: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
        };
        list4 = {
            name: ['加利福尼亚州', '马萨诸塞州', '华盛顿州', '纽约州'],
            value: [35152, 26415, 132, 532]
        };
        nameMapping = {
            'California': '加利福尼亚州',
            'Massachusetts': '马萨诸塞州',
            'New York': '华盛顿州',
            'Washington': '华盛顿州'
        };
    })

    test('render ProvincesConfirm currMap', ()=>{
        const wrapper = mount(<ProvincesConfirm data={list1} isCurr={true}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().isCurr).toBeTruthy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render ProvincesConfirm sumMap', ()=>{
        const wrapper = mount(<ProvincesConfirm data={list1} isCurr={false}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().isCurr).toBeFalsy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render CountriesConfirm curMap', ()=>{
        const wrapper = mount(<CountriesConfirm data={list2} isCurr={true}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().isCurr).toBeTruthy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render CountriesConfirm sumMap', ()=>{
        const wrapper = mount(<CountriesConfirm data={list2} isCurr={false}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().isCurr).toBeFalsy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render CitiesConfirm curMap', ()=>{
        const wrapper = mount(<CitiesConfirm data={list3} isCurr={true}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().isCurr).toBeTruthy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render CitiesConfirm sumMap', ()=>{
        const wrapper = mount(<CitiesConfirm data={list3} isCurr={false}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().isCurr).toBeFalsy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render KeyCountries curMap', ()=>{
        const wrapper = mount(<KeyCountries data={list4} isCurr={true} nameMapping={nameMapping}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().nameMapping).toBeDefined();
        expect(wrapper.props().isCurr).toBeTruthy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);
        const city = wrapper.props().data.name;
        const map = wrapper.props().nameMapping;
        Object.keys(map).forEach((key) => {
            expect(city.indexOf(map[key]) != -1).toBeTruthy();
        });

        console.log("test passed, map values all not empty, api correct.")
    })

    test('render KeyCountries sumMap', ()=>{
        const wrapper = mount(<KeyCountries data={list4} isCurr={false} nameMapping={nameMapping}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().nameMapping).toBeDefined();
        expect(wrapper.props().isCurr).toBeFalsy();
        expect(wrapper.props().data.name).toBeDefined();
        expect(wrapper.props().data.value).toBeDefined();
        expect(wrapper.props().data.name.length).toEqual(wrapper.props().data.value.length);
        const city = wrapper.props().data.name;
        const map = wrapper.props().nameMapping;
        Object.keys(map).forEach((key) => {
            expect(city.indexOf(map[key]) != -1).toBeTruthy();
        });

        console.log("test passed, map values all not empty, api correct.")
    })
})
