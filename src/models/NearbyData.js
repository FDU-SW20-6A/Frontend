import request from '../utils/request';

export default {
  namespace: 'nearby',
  state: {},
  reducers: {
    changeCenter: function(state, result) {
      if (result.data) {
        return result.data;
      }
      return {};
    },
  },
  effects: {
    *initData(params, sagaEffects) {
      const { call, put } = sagaEffects;
      //const url = '/data/nearby'; //用于mock的url
      const url = 'http://localhost:8001/nearby/init/'; //用于和后端交互的url，后端端口暂定为8001
      let data = yield call(request, url);
      yield put({
        type: 'changeCenter',
        data: data,
      });
    },
    *search(params, sagaEffects) {
      const { call, put } = sagaEffects;
      let lnglat = params.address;
      let adcode = params.adcode;
      //const url = "/data/nearby?lng=" + String(lnglat.lng) + "&lat=" + String(lnglat.lat) + "&adcode=" + adcode;
      const url = "http://localhost:8001/nearby/?lon=" + String(lnglat.lng) + "&lat=" + String(lnglat.lat) + "&citycode=" + adcode; //用于和后端交互的url，后端端口暂定为8001
      console.log(url);
      let data = yield call(request, url);
      yield put({
        type: 'changeCenter',
        data: data,
      });
    },
  },
};
