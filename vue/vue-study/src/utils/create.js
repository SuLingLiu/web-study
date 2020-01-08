import Vue from 'vue'
export default function create(Component, props) {
  // 先创建实例
  const vm = new Vue({
    render(h) {
      // h就是createElement, 它返回VNode(虚拟dom)
      return h(Component, {props})
    }
  }).$mount();//.$mount()执行

  // 手动挂载
  document.body.appendChild(vm.$el)

  // 销毁方法
  const comp = vm.$children[0]//vm.$root
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy();
  }

  return comp
}