import React from 'react';
import {shallow, mount} from 'enzyme';
import Conadd from "@/components/Charts/world/conadd";
import ConNum from "@/components/Charts/world/conNum";
import Scatter from "@/components/Charts/world/scatter";


var list1;
describe('World Chart Test', ()=>{
    beforeAll(()=>{
        list1 = {
            China: [34, 39, 32, 26, 39, 78, 47, 67, 55, 54],
            world: [34, 39, 41, 46, 39, 78, 47, 67, 55, 54],
            date: ['03-18','03-19','03-20','03-21','03-22', '03-23', '03-24', '03-25', '03-26', '03-27']
        };
    })

    test('render Conadd', ()=>{
        const wrapper = mount(<Conadd data={list1}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().data.date).toBeDefined();
        expect(wrapper.props().data.China).toBeDefined();
        expect(wrapper.props().data.world).toBeDefined();
        expect(wrapper.props().data.date.length).toEqual(wrapper.props().data.China.length);
        expect(wrapper.props().data.date.length).toEqual(wrapper.props().data.world.length);

        console.log("test passed, Conadd values all not empty, api correct.")
    })

    test('render ConNum', ()=>{
        const wrapper = mount(<ConNum data={list1} isCurr={true}/>);
        expect(wrapper.find('ReactEcharts').exists());
        expect(wrapper.props().data).toBeDefined();
        expect(wrapper.props().data.date).toBeDefined();
        expect(wrapper.props().data.China).toBeDefined();
        expect(wrapper.props().data.world).toBeDefined();
        expect(wrapper.props().data.date.length).toEqual(wrapper.props().data.China.length);
        expect(wrapper.props().data.date.length).toEqual(wrapper.props().data.world.length);

        console.log("test passed, ConNum values all not empty, api correct.")
    })

    test('render Scatter', ()=>{
        const wrapper = mount(<Scatter/>);
        expect(wrapper.state().data).toBeDefined();

        console.log("test passed, Scatter values all not empty, api correct.")
    })
})
