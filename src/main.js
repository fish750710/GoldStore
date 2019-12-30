import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios' // 主要AJAX套件
import VueAxios from 'vue-axios' // 將它轉為VUE套件
import 'bootstrap' // 需安裝jquery套件
import Loading from 'vue-loading-overlay' // 讀取效果套件
import 'vue-loading-overlay/dist/vue-loading.css' // 讀取效果套件
import VeeValidate from 'vee-validate' // 驗證表單套件
import zhTWValidate from 'vee-validate/dist/locale/zh_TW' // 驗證表單中文語系
import Swiper from 'vue-awesome-swiper' // 燈箱輪播
import 'swiper/dist/css/swiper.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './bus'
import currencyFilter from '@/filters/currency' // 千分號和 $
import dateFilter from '@/filters/date' // 日期

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(Swiper)
Vue.component('Loading', Loading) // 安裝在全域
Vue.filter('currency', currencyFilter) // 全域 ('自訂義',import名稱)
Vue.filter('date', dateFilter)

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_TW', zhTWValidate) // 載入中文語系

Vue.config.productionTip = false
axios.defaults.withCredentials = true // 記住cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 驗證是否需要登入(導航守衛)
router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  // ...
  if (to.meta.requiresAuth) {
    // 需登入
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    // const vm = this;
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {
        // 檢查用戶是否仍持續登入狀態
        next()
      } else {
        // 未登入狀態將導頁登入頁面
        next({
          path: '/'
        })
      }
    })
  } else {
    // 不需登入
    next()
  }
})
