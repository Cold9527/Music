import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';
import axios from 'axios'

export function getRecommend(){
    const url = '/api/getTopBanner'

    const data = Object.assign({}, commonParams, {
        '-': 'recom021591988049523003',
        g_tk: 5381,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: {"comm":{"ct":24,"cv":0},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}
      })

      return axios.get(url, {
        params: data
      }).then((res) => {        
        return Promise.resolve(res.data.focus.data.content)
      })
}

export function getDiscList(){
    const url = '/api/getDiscList'

    const data = Object.assign({}, commonParams, {
        platform: 'yqq.json', // 加引号
        hostUin: 0,
        sin: 0,
        ein: 19,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json',
        inCharset: "utf8",
        g_tk: 2116745061,
        picmid: 1,
        loginUin: 1120996904
      })

      return axios.get(url, {
        params: data
      }).then((res) => {        
        return Promise.resolve(res.data)
      })
}


export function getSongList(disstid){
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid,
    g_tk: 149904252,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}