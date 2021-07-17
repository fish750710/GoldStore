// 彙整 VUEX
import Vue from 'vue'
import Vuex from 'vuex'

import productsModules from './products'
import cartsModules from './carts'
import favoriteModules from './favorite'

Vue.use(Vuex)

export default new Vuex.Store({
  // 嚴謹模式
  strict: true,
  state: {
    isLoading: false
  },
  // 操作行為
  actions: {
    // 讀取效果
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    // 排序
    arrayLtoH (context, item) {
      context.commit('ARRAYLTOH', item)
    }
  },
  // 操作狀態(儲存資料或同步行為)
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    ARRAYLTOH (state, item) {
      if (item === 'lowPrice') {
        return state.productsModules.products.sort(function (a, b) {
          return a.price - b.price
          // return a[vm.price] < b[vm.price] ? 1 : -1;
        })
      } else if (item === 'upPrice') {
        return state.productsModules.products.sort(function (a, b) {
          return b.price - a.price
          //  return a[vm.price] > b[vm.price] ? 1 : -1;
        })
      }
    }
  },
  // 如computed
  getters: {
    isLoading: state => state.isLoading
  },
  // 模組化
  modules: {
    productsModules,
    cartsModules,
    favoriteModules
  }
})
