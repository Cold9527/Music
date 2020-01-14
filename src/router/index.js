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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/recommend'
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children:[
      {
        path:':id',
        component: TopList
      }
    ]
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [
      {
        path:':id',
        name:'Dsic',
        component:Dsic
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
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
    component:Singer,
    children:[
      {
        path: ':id',
        name:'SingerDetail',
        component:SingerDetail
      }
    ]   

  }     
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
