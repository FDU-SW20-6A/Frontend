import React from 'react';
import {shallow, mount} from 'enzyme';
import Line_1 from '@/components/Charts/chart_1';
import Line_2 from '@/components/Charts/chart_2';
import Line_3 from '@/components/Charts/chart_3';
import PieSeries from '@/components/Charts/PieSeries';
import ProvincesConfirm from '@/components/Charts/ProvincesConfirm';

var list1, list2, list3, pielist;
describe('Chart Test', ()=>{
    beforeAll(()=>{
        list1 = {
            xdata: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27'],
            ydata: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
        };
        list2 = {
            xdata: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27'],
            ydata: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54]
        };
        list3 = {
            xdata: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28'],
            death: [8, 3, 7, 6, 9, 7, 4, 6, 5, 3, 5],
            cure: [819, 730, 590, 504, 459, 456, 491, 401, 537, 383, 477]
        };
        pielist = {
            date: ['04.01'],
            cureNum: [100],
            deathNum: [100],
            econNum: [1],
            conadd: [0],
        };
    })

    test('render line_1', ()=>{
        const wrapper = mount(<Line_1 data={list1}/>);
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().data.xdata).toBeDefined();
        expect(wrapper.props().data.ydata).toBeDefined();
        expect(wrapper.props().data.xdata.length).toEqual(wrapper.props().data.ydata.length);

        console.log("test passed, chart values all not empty, api correct.")
    })

    test('render line_2', ()=>{
        const wrapper = mount(<Line_2 data={list2}/>);
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().data.xdata).toBeDefined();
        expect(wrapper.props().data.ydata).toBeDefined();
        expect(wrapper.props().data.xdata.length).toEqual(wrapper.props().data.ydata.length);

        console.log("test passed, chart values all not empty, api correct.")
    })

    test('render line_3', ()=>{
        const wrapper = mount(<Line_3 data={list3}/>);
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().data.xdata).toBeDefined();
        expect(wrapper.props().data.death).toBeDefined();
        expect(wrapper.props().data.cure).toBeDefined();
        expect(wrapper.props().data.xdata.length).toEqual(wrapper.props().data.death.length);
        expect(wrapper.props().data.xdata.length).toEqual(wrapper.props().data.cure.length);

        console.log("test passed, chart values all not empty, api correct.")
    })

    test('render PieSeries', ()=>{
        const wrapper = mount(<PieSeries month='2020-04' data={pielist}/>);
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().data.date).toBeDefined();
        expect(wrapper.props().data.deathNum).toBeDefined();
        expect(wrapper.props().data.econNum).toBeDefined();
        expect(wrapper.props().data.date.length).toEqual(wrapper.props().data.deathNum.length);
        expect(wrapper.props().data.date.length).toEqual(wrapper.props().data.econNum.length);

        console.log("test passed, chart values all not empty, api correct.")
    })
})

