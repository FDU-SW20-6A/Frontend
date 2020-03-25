import request from '../utils/request';

const randomPosition = () => ({
  longitude: 120 + Math.random() * 0.01,
  latitude: 36 + Math.random() * 0.01,
});

export default {
  namespace: 'nearby',
  state: {},
  reducers: {
    changeCenter: function(state, result) {
      if (result.data) {
        return result.data;
      }

      return {
        markers: [
          { position: randomPosition() },
          { position: randomPosition() },
          { position: randomPosition() },
        ],
        mapCenter: randomPosition(),
      };
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
  },
};
