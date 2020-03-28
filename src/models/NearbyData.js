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
      const url = '/data/nearby';
      let data = yield call(request, url);
      yield put({
        type: 'changeCenter',
        data: data,
      });
    },
    *search(params, sagaEffects) {
      const { call, put } = sagaEffects;
      let lnglat = params.address;
      const url = "/data/nearby?lng=" + String(lnglat.lng) + "&lat=" + String(lnglat.lat);
      console.log(url);
      let data = yield call(request, url);
      yield put({
        type: 'changeCenter',
        data: data,
      });
    },
  },
};
