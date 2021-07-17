import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
export default {
//   namespaced: true, // actions、mutations、getters全域轉區域變數
  router,
  state: {
    products: [],
    pagination: {},
    activeitem: ''
  },
  // 操作行為
  actions: {
    getProducts (context, page) {
      context.commit('ACTIVEITEM', '')
      let searchValue = router.currentRoute.params.searchStr
      let searchkey = router.currentRoute.params.Str
      let search = router.currentRoute.name
      let url
      if (search === 'Search' || searchkey !== undefined) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      } else {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      }
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        context.commit('PRODUCTS', response.data.products)
        // 在 products 加入 is_favorite
        if (context.rootState.favoriteModules.myfavorite.length !== 0) {
          context.state.products.forEach((productItem, index) => {
            context.rootState.favoriteModules.myfavorite.forEach((favItem) => {
              if (productItem.id === favItem.id) {
                // console.log(productItem.id, favItem.id, index)
                context.commit('UPDATEPRODUCTS', { index, isFavorite: true })
              }
            })
          })
        }
        context.commit('PAGINATION', response.data.pagination)
        context.commit('LOADING', false)
        if (search === 'Search' || searchkey !== undefined) {
          let array = []
          array = response.data.products.filter(e => {
            if (searchValue !== undefined) {
              // 搜尋
              return (
                e.title === searchValue ||
                e.title.indexOf(searchValue) !== -1 ||
                e.title.toUpperCase().indexOf(searchValue) !== -1 ||
                e.title.toLowerCase().indexOf(searchValue) !== -1
              )
            } else {
              context.commit('ACTIVEITEM', searchkey)
              // 品牌類別
              return (
                e.brand === searchkey ||
                e.brand.toUpperCase().indexOf(searchkey) !== -1 ||
                e.brand.toLowerCase().indexOf(searchkey) !== -1
              )
            }
          })
          let filterdata = Object.assign([], array)
          context.commit('FILTER', filterdata)
        }
      })
    }
  },
  // 操作狀態(儲存資料或同步行為)
  mutations: {
    ACTIVEITEM (state, payload) {
      state.activeitem = payload
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    },
    FILTER (state, payload) {
      state.products = payload
    },
    // 我的喜愛加入product item
    UPDATEPRODUCTS (state, { index, isFavorite }) {
      Vue.set(state.products[index], 'is_favorite', isFavorite)
    }
  },
  // 如computed
  getters: {
    products: state => state.products,
    pagination: state => state.pagination,
    activeitem: state => state.activeitem
  }
}
