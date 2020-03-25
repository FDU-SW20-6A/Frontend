import React, { PureComponent } from 'react';
import { Empty, Row, Col, Input } from 'antd';
import { Map, Markers } from 'react-amap';
import { connect } from 'dva';

// AMap Key: 9a47cd965bc24f0feaa26804bda37ab2

const { Search } = Input;
const namespace = 'nearby';

const MapPlugins = [
  'Scale',
  {
    name: 'ToolBar',
    options: {
      visible: true, // 不设置该属性默认就是 true
      onCreated(ins) {
        console.log(ins);
      },
    },
  },
];

@connect(
  state => {
    return {
      mapCenter: state[namespace].mapCenter,
      markers: state[namespace].markers,
    };
  },
  dispatch => {
    return {
      changeCenter: function() {
        dispatch({
          type: namespace + '/changeCenter',
        });
      },
      init: function() {
        dispatch({
          type: namespace + '/initData',
        });
      },
    };
  },
)
export default class Nearby extends PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div>
        <Row gutter={[16, 24]}>
          <Col span={8} offset={8}>
            <Search
              placeholder="input search location"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>
        <Row>
          <div style={{ width: '100%', height: 700 }}>
            <Map
              amapkey={'9a47cd965bc24f0feaa26804bda37ab2'}
              center={this.props.mapCenter}
              plugins={MapPlugins}
              zoom={15}
            >
              <Markers markers={this.props.markers} />
            </Map>
          </div>
          <button
            onClick={() => {
              this.props.changeCenter();
            }}
          >
            Move Map To A Random Center
          </button>
        </Row>
      </div>
    );
  }
}
