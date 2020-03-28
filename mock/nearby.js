const randomPosition = () => ({
  longitude: 120 + Math.random() * 0.01,
  latitude: 30 + Math.random() * 0.01,
});

const getData = (req, res) => {
  res.json({
    mapCenter: randomPosition(),    // mapCenter:搜索位置坐标
    address: '青岛',    // address:搜索位置地址
    markers: [  // markers:每个元素对应一个附近病例
      {
        position: randomPosition(),   // position:病例坐标
        title: "北京",    // title:病例说明（一般是具体地址），对应鼠标hover在marker上时显示的文字
      },
      {
        position: randomPosition(),
        title: "上海",
      },
      {
        position: randomPosition(),
        title: "广州",
      },
    ],
    // 以下对应文字气泡内容
    city: "青岛市",   // city:搜索位置所在城市
    totalCase: "1000",    // totalCase:所在城市总确诊量
    currentCase: "5",     // currentCase:所在城市现确诊量
    nearDis: "0.3",     // nearDis:最近病例的距离
    nearLoc: "青岛市第一海水浴场",    // nearLoc:最近病例的位置
    case1: "3",     //case1:一公里内病例数
    case3: "4",     //case3:三公里内病例数
    case5: "4",     //case5:五公里内病例数
  });
};

export default {
  'GET /data/nearby': getData,
};
