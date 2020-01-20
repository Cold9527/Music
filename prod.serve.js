var express = require('express')
var config = require('./vue.config.js')

const axios = require('axios')
const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)

app.get('/api/getTopBanner', function (req, res) {
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api
    axios.get(url, {
      headers: {
        referer: 'https://u.y.qq.com/',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })
  app.get('/api/getDiscList', function (req, res) {
      var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' // 原api
      axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
      }).catch((e) => {
        console.log(e)
      })
  }),

  app.get('/api/getSongVkey', function (req, res) {
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api
    axios.get(url, {
      headers: {
        referer: 'https://u.y.qq.com',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })

  app.get('/api/lyric', function (req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg' // 原api
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      var ret =response.data
      if(typeof ret === 'string'){
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if(matches){
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    }).catch((e) => {
      console.log(e)
    })
  })
  app.get('/api/getSongList', function (req, res) {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg' // 原api
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })   

  app.get('/api/getSearchList', function (req, res) {
    var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp' // 原api
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })   

  app.use(express.static('./dist'))

  var port = process.env.PORT || config.devServer.port

 module.exports = app.listen(port, function (err){
     if(err){
         console.log(err)
     }

     console.log('Listening at http://localhost:'+port+'\n')
 })