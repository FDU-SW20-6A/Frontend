const randomPosition = () => ({
  longitude: 120 + Math.random() * 0.01,
  latitude: 36 + Math.random() * 0.01,
});

const getData = (req, res) => {
  res.json({
    mapCenter: randomPosition(),
    markers: [
      { position: randomPosition() },
      { position: randomPosition() },
      { position: randomPosition() },
    ],
  });
};

export default {
  'GET /data/nearby': getData,
};
