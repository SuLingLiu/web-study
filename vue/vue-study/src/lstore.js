import Vue from 'vue'
import Vuex from './lvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //修改state里的值，只能在mutations
  state: {
    count: 0
  },
  //不能在这做异步操作，异步操作在actions里操作
  mutations: {
    increment(state, n = 1) {
      state.count += n ;
    }
  },
  getters: {
    score(state) {
      
      return `共扔出：${state.count }`
    }
  },
  //在actions里做复杂的业务逻辑,这里可以调mutations也可以调dispatch
  actions: {
    incrementAsync({commit}) {
      setTimeout(() => {
        commit('increment',2)
      },1000)
    },

  },
  modules: {
  }
})
