# vue-router和vuex
## vue-router用法和技巧
### 安装：vue add router
	会问你选择是history模式还是hash模式，n表示hash,装好后会在文件里生成一个router文件夹

> 疑问点：
>  1. 为什么Vue.use(Router)
>  2. <router-view/> 、<router-link to="/">Home</router-link>哪里来
>  3. 它们的功能是怎么实现的
### 路由守卫
路由导航过程中有若干生命周期钩子，可以在这里实现逻辑控制（比喻说这个页面不是所有人都能看，必须登录后才能看）
* 全局守卫，router.js
``` js 
// 路由配置
{
	path: "/form",
	name: "form",
	meta: {auth: true},// 需要认证
	component: () => import(/* webpackChunkName: "form" */ '../components/form/index.vue')
	
}

// 守卫
router.beforeEach((to, from, next) => {
	// 要访问/form且未登录需要去登录
	if(to.meta.auth && !window.isLogin) {
		if(window.confirm('请登录')) {
			window.isLogin = true;
			next(); //登录成功
		}else {
			next('/');//放弃登录，回首页
		}
	}else {
		next();//不需登录，继续
	}
})
```
* 路由独享守卫

``` js
// 路由配置
{
	path: "/form",
	name: "form",
	meta: {auth: true},// 需要认证
	component: () => import(/* webpackChunkName: "form" */ '../components/form/index.vue'),
	beforeEnter(to, from, next) {
      if(!window.isLogin) {
        // ……
      }else {
        next();
      }
    }
	
}
```
* 组件内的守卫
``` js
export default {
	beforeRouteEnter(to, from, next) {
		//这时候this是不能用的，可以在next的回调函数里用
	},
	beforeRouteUpdate(to, from, next) {},
	beforeRouteLeave(to, from, next) {},
}
```
### vue-router拓展
#### 动态路由
利用$router.addRoutes()可以实现动态路由添加，常用于用户权限控制。（比喻，有的需要配置权限才能访问的路由）
```js
// router.js
//返回的数据可能是这样的
//[{
	//path: "/",
	//name: "home",
	//component: 'Home'//后端给的这个是字符串，肯定是需要前端处理的
//}]

//异步加载路由
// const router = new VueRouter()
// router.addRoutes(routes)

//异步从后端获取路由
api.getRoutes().then(routes => {
	const routeConfig = routes.map(route => mapComponent(route));
	router.addRoutes(routeConfig)
})

//映射关系
const compMap = {
	'Home': () => import("./view/home.vue")
}

//递归替换
function mapComponent(route) {
	route.component = compMap[route.component];
	if(route.children) {
		route.children = route.children.map(child => mapComponent(child))
	}
	
	return route
}
```
#### 面包屑
利用$route.matched可得到路由匹配数组，按顺序解析可得路由层次关系。比喻显示一级 > 二级 这样的
```js 
//面包屑组件
watch: {
	$route() {
		console.log(this.$route.matched);
		this.crumbData = this.$route.mached.map(m => m.name)
	}
}
```
## vue-roter源码实现
* 实现插件
* url变化的监听
* 路由配置解析:{'/': Home}
* 实现全局组件：router-link router-view
> 例子：lrouter.js

## Vuex数据管理
### 安装：vue add vuex
### 核心概念
* state转态、数据
* mutations更改转态函数
* actions异步操作
* store包含以上概念的容器
> 例子：components/vuex/index.vue和store
## 理解vuex实现原理
* vuex也是一个插件
* 实现三个东西：state/mutations/actions/getters
* 创建Store
* 数据响应式
> 例子：lvuex.js  lstore.js