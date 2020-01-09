//路由源码实现
import Home from "./view/home.vue";
import form from "./components/form/index.vue";
import Vue from 'vue'

class VueRouter {
  constructor(options) {
    
    this.$options = options;
    this.routeMap = {};

    // 路由响应式，vue的router跟React的router的路由的区别是，vue的是强绑定
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    this.bindEvents();//监听url变化
    this.createRouteMap(this.$options);//解析路由配置
    this.initComponent();//实现两个组件
  }
  bindEvents() {
    //bind(this):如果不用里面的this指向就是window，就不是实例
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }
  initComponent() {
    //以下是全局组件，当this.app.current发生变化都会发生变化，因为数据是双向数据绑定
    //实现router-link, router-view
    //<router-link to="">fff</router-link>
    Vue.component('router-link', {
      props: { to: String},
      render(h) {
        //h(tag,data,children)
        return h('a', {attrs: {href: '#' + this.to}}, [this.$slots.default])
      }
    })

    Vue.component('router-view', {
      //这里用箭头函数是为了不改变this
      render:(h) => {
        const comp = this.routeMap[this.app.current];
        return h(comp)
      }
    })
  }

}
VueRouter.install = function(Vue) {
  // 混入
  Vue.mixin({
    //这个会跟vue创建时的beforeCreate一块混入执行
    beforeCreate() {
      
      //this是vue的实例
      if(this.$options.router) {
        
        //仅在根组件执行一次
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    },

  })
}

//Vue.use 实际调的是VueRouter.install
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/form',
      component: form
    },
  ]
})
