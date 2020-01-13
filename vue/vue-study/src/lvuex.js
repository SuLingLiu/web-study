let Vue;

class Store{
  constructor(options) {
    this.state = new Vue({
      data: options.state//发生变化，界面会更新
    })

    this.mutations = options.mutations;
    this.actions = options.actions;

    options.getters && this.handleGetters(options.getters)

  }

  //声明为箭头函数
  commit = (type,arg) => {
    this.mutations[type](this.state,arg)
  }

  dispatch(type, arg) {
    this.actions[type]({
      commit: this.commit,
      state: this.state,
      // dispatch: this.dispatch
    },arg)
  }

  handleGetters(getters) {
    this.getters = {};
    //遍历getters所有key
    Object.keys(getters).forEach(key => {
      //为this.getters定义若干属性，这些属性是只读的,写的这么复杂就是因为它是只读的
      //$store.getters.score
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }


}

function install (_Vue) {
  Vue = _Vue;//这里为什么缓存一个，是因为如果引入vue，打包的时候会打到这个js里就很大，
  // Vue.prototype.$store = this.$options.store; 也可以放到这，放到下面是为了复杂操作
  //react 为啥去掉mixin，因为react有更好的，高阶组件
  Vue.mixin({
    //混入是在每个组件实例化执行beforeCreate的时候都会执行下面的代码
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store;

      }
    }
  })
}

export default {
  Store, 
  install
}