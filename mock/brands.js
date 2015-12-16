exports.get = function(req, res) {
  res.json({
    code: 0,
    data: [
      [1, '奥迪'],
      [2, '阿尔法'],
      [3, '奔驰'],
      [4, '大众'],
      [5, 'JEEP']
    ]
  });
}
