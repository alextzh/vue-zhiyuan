const express = require('express')
const compression = require('compression')
const config = require('./config/index')
const axios = require('axios')

const port = process.env.PORT || config.build.port

const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const qs = require('qs')
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const apiRoutes = express.Router()

apiRoutes.post('/login', upload.array(), function (req, res) {
  const url = 'https://www.yanysdd.com/api/v1/login'
  axios.post(url, qs.stringify(req.body), {
    headers: {
      referer: 'https://www.yanysdd.com/',
      host: 'yanysdd.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.post('/productList', upload.array(), function (req, res) {
  const url = 'https://www.yanysdd.com/api/v1/product/list'
  axios.post(url, qs.stringify(req.body), {
    headers: {
      referer: 'https://www.yanysdd.com/',
      host: 'yanysdd.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.post('/mySubscribes', upload.array(), function (req, res) {
  const url = 'https://www.yanysdd.com/api/v1/subscribe/mySubscribes'
  axios.post(url, qs.stringify(req.body), {
    headers: {
      referer: 'https://www.yanysdd.com/',
      host: 'yanysdd.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.post('/myRedeems', upload.array(), function (req, res) {
  const url = 'https://www.yanysdd.com/api/v1/redeem/myRedeems'
  axios.post(url, qs.stringify(req.body), {
    headers: {
      referer: 'https://www.yanysdd.com/',
      host: 'yanysdd.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.post('/addRedeem', upload.array(), function (req, res) {
  const url = 'https://www.yanysdd.com/api/v1/redeem/addRedeem'
  axios.post(url, qs.stringify(req.body), {
    headers: {
      referer: 'https://www.yanysdd.com/',
      host: 'yanysdd.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.post('/updatePwd', upload.array(), function (req, res) {
  const url = 'https://www.yanysdd.com/api/v1/login/updatePwd'
  axios.post(url, qs.stringify(req.body), {
    headers: {
      referer: 'https://www.yanysdd.com/',
      host: 'yanysdd.com'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
