exports.post = function(req, res) {
  setTimeout(function() {
    res.json({
      code: 200,
      msg: '提交成功'
    });
  }, 3000)
}
