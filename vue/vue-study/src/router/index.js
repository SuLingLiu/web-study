import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
// import Home from '../components/form/index.vue'

Vue.use(VueRouter)//引入Router插件

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/form',
    name: 'form',
    // route level code-splitting
    // this generates a separate chunk (form.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //路由层级代码分割，生成分片(form.[hash].js)
    //当路由访问时才会懒加载，优化用
    ///* webpackChunkName: "form" */这个是给webpack看的，它会生成form的js，如果不给，会生成其它的名字
    component: () => import(/* webpackChunkName: "form" */ '../components/form/index.vue')
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import(/* webpackChunkName: "tree" */ '../components/tree/index.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import(/* webpackChunkName: "tree" */ '../components/notice/index.vue')
  },
]

//如果用history，则服务器要做页面设置，不然刷新会404
const router = new VueRouter({
  mode: 'hash',//模式：hash | history | abstranct
  base: process.env.BASE_URL,//如http://localhost:8080/cart   cart不会计入路由的匹配范围
  routes
})

export default router
