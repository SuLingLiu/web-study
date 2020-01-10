import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/home.vue'
import List from '../view/list.vue'
import Detail from '../view/detail.vue'

Vue.use(VueRouter)//引入Router插件

const routes = [
  {
    path: '/',
    name: '/',
    component: Home,
    children: [{//嵌套路由，http://localhost:8080/#/list，一定要加<router-view/>
      path: 'list',// /list 和 list的区别： /list表示的是根路径，而list需要在前面会加上父路径
      name: 'list',
      component: List
    },
    {//动态路由,http://localhost:8080/#/detail/1，模板中获取动态路由的参数$route.params.id
      path: 'detail/:id',
      name: 'Detail',
      component: Detail,
      props: true
    }]
  },
  {
    path: '/form',
    name: 'form',
    meta: {auth: true},// 需要认证
    // route level code-splitting
    // this generates a separate chunk (form.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //路由层级代码分割，生成分片(form.[hash].js)
    //当路由访问时才会懒加载，优化用
    ///* webpackChunkName: "form" */这个是给webpack看的，它会生成form的js，如果不给，会生成其它的名字
    component: () => import(/* webpackChunkName: "form" */ '../components/form/index.vue'),
    //路由独享守卫
    // beforeEnter(to, from, next) {
    //   if(!window.isLogin) {
    //     // ……
    //   }else {
    //     next();
    //   }
    // }
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
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import(/* webpackChunkName: "tree" */ '../components/vuex/index.vue')
  },
]

//如果用history，则服务器要做页面设置，不然刷新会404
const router = new VueRouter({
  mode: 'hash',//模式：hash | history | abstranct
  base: process.env.BASE_URL,//如http://localhost:8080/cart   cart不会计入路由的匹配范围
  routes
})

//异步加载路由
// const router = new VueRouter()
// router.addRoutes(routes)


//路由全局守卫
router.beforeEach((to, from, next) => {
  // 要访问/form且未登录需要去登录
	if(to.meta.auth && !window.isLogin) {
		if(window.confirm('请登录')) {
			window.isLogin = true;//可以存到vuex
			next(); //登录成功
		}else {
			next('/');//放弃登录，回首页
		}
	}else {
		next();//不需登录，继续
	}
})

//路由加载完后的处理
router.afterEach(route => {
  console.log(route)
  // document.getElementById('appLoading').style.display = 'none'; //隐藏loading
})

export default router
