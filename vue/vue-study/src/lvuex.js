let Vue;

class Store{}

function install (_Vue) {
  Vue = _Vue;
  // Vue.prototype.$store = this.$options.store; 也可以放到这，放到下面是为了复杂操作

  Vue.mixin({
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