const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
const express = require('express')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)

module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('common',resolve('src/common'))
            .set('components',resolve('src/components'))
            .set('api',resolve('src/api'))
            .set('base',resolve('src/base'))
    },
    devServer: { 
    before(app) {
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

      

    }    
}

}