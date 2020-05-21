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
            jwsr: 23,
            city: [
                {
                    name: '广州',
                    ename: 'guangzhou',
                    deathNum: 237,
                    conNum: 3478,
                    econNum: 232,
                    cureNum: 2323,
                    value: 1212
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
        test.find('.ant-table-tbody .ant-table-row-level-0 td').forEach((value, index)=>{
            if(value.find('span').length==2||(value.find('span').length==1 && value.find('span').text()=='')){
                expect(value.text()==undefined|| value.text()=='').toBeFalsy();
            }
        });
        test.find('.ant-table-tbody .ant-table-row-level-1 td').forEach((value, index)=>{
            if(index%6==0 || index%5==0){
            if(value.find('span').length==2||(value.find('span').length==1 && value.find('span').text()=='')){
                expect(value.text()==undefined|| value.text()=='').toBeFalsy();
            }
            };
        });
        

    })
})