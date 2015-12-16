exports.get = function(req, res) {
  res.json({
    code: 0,
    data: [
      [1, 'Q1'],
      [2, 'Q2'],
      [3, 'S2'],
      [4, 'S5']
    ]
  })
}
