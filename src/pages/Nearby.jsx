import React, { PureComponent } from 'react';
import { Row, Col, Input, Affix, Popover, Button } from 'antd';
import { Map, Marker, Markers } from 'react-amap';
import { connect } from 'dva';

// AMap Key: 9a47cd965bc24f0feaa26804bda37ab2

const { Search } = Input;
const namespace = 'nearby';
const styleC = {
  background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  border: 'transparent',
  width: '45px',
  height: '60px',
  color: '#000',
  textAlign: 'center',
  lineHeight: '40px',
};

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
  state => ({
    mapCenter: state[namespace].mapCenter,
    markers: state[namespace].markers,
    address: state[namespace].address,
    city: state[namespace].city,
    totalCase: state[namespace].totalCase,
    currentCase: state[namespace].currentCase,
    nearDis: state[namespace].nearDis,
    nearLoc: state[namespace].nearLoc,
    case1: state[namespace].case1,
    case3: state[namespace].case3,
    case5: state[namespace].case5,
  }),
  dispatch => ({
    changeCenter() {
      dispatch({
        type: `${namespace}/changeCenter`,
      });
    },
    init() {
      dispatch({
        type: `${namespace}/initData`,
      });
    },
    search(value, adcode) {
      dispatch({
        type: `${namespace}/search`,
        address: value,
        adcode: adcode,
      });
    },
  }),
)
export default class Nearby extends PureComponent {
  constructor() {
    super();
    this.getContent = () => (
      <div>
        <p>
          你所在的<font color="#F00"> {this.props.city} </font>
          总计确诊<font color="#F00"> {this.props.totalCase} </font>例， 当前确诊
          <font color="#F00"> {this.props.currentCase} </font>例。
        </p>
        <p>
          离你最近的涉疫情社区位于<font color="#F00"> {this.props.nearDis} </font>
          公里外的<font color="#F00"> {this.props.nearLoc} </font>。
        </p>
        <p>
          方圆一公里内现有<font color="#F00"> {this.props.case1} </font>例确诊病例， 三公里内现有
          <font color="#F00"> {this.props.case3} </font>例确诊， 五公里内现有
          <font color="#F00"> {this.props.case5} </font>例确诊。
        </p>
      </div>
    );
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div>
        <Affix offsetTop={120}>
          <Col span={8} offset={15}>
            <Search
              id="tipinput"
              placeholder="输入地址"
              onSearch={value => {
                const { search } = this.props;
                this.state.geocoder.getLocation(value, function(status, result) {
                  if (status === 'complete' && result.geocodes.length) {
                    const lnglat = result.geocodes[0].location;
                    const adcode = result.geocodes[0].adcode; 
                    console.log(adcode);
                    console.log(lnglat.lng, lnglat.lat);
                    search(lnglat, adcode);
                  } else {
                    alert('根据地址查询位置失败');
                  }
                });
              }}
              enterButton
            />
          </Col>
        </Affix>
        <Row>
          <div style={{ width: '100%', height: 700 }}>
            <Map
              amapkey="9a47cd965bc24f0feaa26804bda37ab2"
              center={this.props.mapCenter}
              plugins={MapPlugins}
              zoom={15}
              events={{
                created: map => {
                  // eslint-disable-next-line react/no-unused-state
                  this.setState({ mapInstance: map });
                  window.AMap.plugin('AMap.Geocoder', () => {
                    const geocoder = new window.AMap.Geocoder();
                    this.setState({ geocoder });
                  });
                  window.AMap.plugin('AMap.Autocomplete', () => {
                    const auto = new window.AMap.Autocomplete({
                      input: 'tipinput',
                    });
                    // eslint-disable-next-line react/no-unused-state
                    this.setState({ auto });
                  });
                },
              }}
            >
              <Marker position={this.props.mapCenter}>
                <Popover content={this.getContent()} title="周边疫情" trigger="hover">
                  <Button style={styleC}>
                    <div />
                  </Button>
                </Popover>
              </Marker>
              <Markers markers={this.props.markers} />
            </Map>
          </div>
        </Row>
      </div>
    );
  }
}
