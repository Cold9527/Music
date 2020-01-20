import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Rank from 'components/rank/rank.vue'
import Recommend from 'components/recommend/recommend.vue'
import Search from 'components/search/search.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'
import Dsic from 'components/dsic/dsic.vue'
import TopList from 'components/top-list/top-list.vue'
import UserCenter from 'components/user-center/user-center.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/recommend'
  },
  {
    path: '/rank',
    name: 'Rank',
    component:() => import(/* webpackChunkName: "about" */ 'components/rank/rank.vue'),
    children:[
      {
        path:':id',
        component:() => import(/* webpackChunkName: "about" */ 'components/top-list/top-list.vue'),
      }
    ]
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component:() => import(/* webpackChunkName: "about" */ 'components/recommend/recommend.vue'),
    children: [
      {
        path:':id',
        name:'Dsic',
        component:() => import(/* webpackChunkName: "about" */ 'components/dsic/dsic.vue'),
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component:() => import(/* webpackChunkName: "about" */ 'components/search/search.vue'),
    children:[
      {
        path: ':id',
        name:'SingerDetail',
        component:() => import(/* webpackChunkName: "about" */ 'components/singer-detail/singer-detail.vue')
      }
    ]     
  },
  {
    path: '/singer',
    name: 'Singer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:() => import(/* webpackChunkName: "about" */ 'components/singer/singer.vue'),
    children:[
      {
        path: ':id',
        name:'SingerDetail',
        component:() => import(/* webpackChunkName: "about" */ 'components/singer-detail/singer-detail.vue')
      }
    ]   

  },
  {
    path: '/user',
    name:'UserCenter',
    component:() => import(/* webpackChunkName: "about" */ 'components/user-center/user-center.vue'),
  }    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
