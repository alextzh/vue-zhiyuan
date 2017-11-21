var express = require('express')
// 压缩所需模块
var compression = require('compression')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

// 压缩所有响应
app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening at http://localhost:' + port + '\n')
})
