import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rules',
    name: 'Rules',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "rules" */ '../views/Rules.vue')
  },
  {
    path: '/nft-list',
    name: 'NFTList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "NFTList" */ '../views/NFTList.vue')
  },
  {
    path: '/battle-ground',
    name: 'BattleGround',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "BattleGround" */ '../views/BattleGround.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
