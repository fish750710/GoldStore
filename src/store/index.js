// 彙整 VUEX
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  // 嚴謹模式
  strict: true,
  router,
  state: {
    isLoading: false,
    products: [],
    categories: [],
    cart: {
      carts: []
    },
    loadingItem: '',
    addqtynum: 0,
    minusnum: 0,
    qty: 0,
    // productsOriginal: [],
    // favorites: [] ,
    // myfavorite: {
    //   length: 0
    // },
    myfavorite: [],
    favoriteId: '',
    filterlove: [],
    pagination: {},
    activeitem: ''
    // filterarray: []
    // apple: [],
    // cartItem: [],
  },
  // 操作行為
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
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
        if (context.rootState.myfavorite.length !== 0) {
          context.state.products.forEach((productItem, index) => {
            context.rootState.myfavorite.forEach((favItem) => {
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
    },
    // getCategory (context, products) {
    //   // let array = []
    //   // let searchValue = router.currentRoute.params.searchStr
    //   // let searchkey = router.currentRoute.params.Str
    //   // console.log('searchkey', searchkey, 'searchValue', searchValue)
    //   // console.log(products)
    //   // // console.log('搜尋', searchValue)
    //   // // console.log('品牌類別', searchkey)
    //   // array = products.filter(e => {
    //   //   if (searchValue !== undefined) {
    //   //     // 搜尋
    //   //     return (
    //   //       e.title === searchValue ||
    //   //       e.title.indexOf(searchValue) !== -1 ||
    //   //       e.title.toUpperCase().indexOf(searchValue) !== -1 ||
    //   //       e.title.toLowerCase().indexOf(searchValue) !== -1
    //   //     )
    //   //   } else {
    //   //     return (
    //   //       e.title === searchkey ||
    //   //       e.title.indexOf(searchkey) !== -1 ||
    //   //       e.title.toUpperCase().indexOf(searchkey) !== -1 ||
    //   //       e.title.toLowerCase().indexOf(searchkey) !== -1
    //   //     )
    //   //   }
    //   // })
    //   // // context.commit('PAGINATION', '')
    //   // let filterdata = Object.assign([], array)
    //   // context.commit('FILTER', filterdata)
    //   // let array = []
    //   // if (value !== '') {
    //   //   console.log(value, page)
    //   //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
    //   //   axios.get(api).then(response => {
    //   //     array = response.data.products.filter(e => {
    //   //       return (
    //   //         e.title === value ||
    //   //         e.title.indexOf(value) !== -1 ||
    //   //         e.title.toUpperCase().indexOf(value) !== -1 ||
    //   //         e.title.toLowerCase().indexOf(value) !== -1
    //   //       )
    //   //     })
    //   //     let filterdata = Object.assign([], array)
    //   //     context.commit('FILTER', filterdata)
    //   //   })
    //   // } else {
    //   //   // return (
    //   //   //   // // 關鍵字搜尋標題忽略大小寫
    //   //   //   // e.brand === value ||
    //   //   //   // e.brand.toUpperCase().indexOf(value) !== -1 ||
    //   //   //   // e.brand.toLowerCase().indexOf(value) !== -1
    //   //   // )
    //   // }
    // },
    getCart (context) {
      context.commit('LOADING', true)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      // vm.$store.dispatch('updateLoading', true);
      axios.get(url).then(response => {
        context.commit('CART', response.data.data)
        context.commit('LOADING', false)
        // console.log('取得購物車', response.data.data);
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADINGITEM', id)
      axios.delete(url).then((response) => {
        context.dispatch('getCart')
        context.commit('LOADINGITEM', '')
        // console.log('刪除購物車項目', response);
      })
    },
    addtoCart (context, { id, qty }) {
      // console.log(context, id, qty)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADINGITEM', id)
      const cart = {
        product_id: id,
        qty
      }
      console.log(cart)
      axios.post(url, { data: cart }).then(response => {
        context.dispatch('getCart')
        context.commit('LOADINGITEM', '')
        console.log('加入購物車:', response)
      })
    },
    addQty (context, item) {
      context.commit('ADDQTY', item)
      let id = item.product.id
      let qty = item.qty
      context.dispatch('addtoCart', { id, qty })
      context.dispatch('removeCart', item.id)
    },
    minusQty (context, item) {
      let id = item.product.id
      let qty = item.qty - 1
      context.commit('MINUSQTY', item)
      if (item.qty <= 0) {
        context.dispatch('removeCart', item.id)
      } else {
        context.dispatch('addtoCart', { id, qty })
        context.dispatch('removeCart', item.id)
      }
    },
    inputQty (context, { id, qty }) {
      console.log('action', id, qty)
      context.dispatch('addtoCart', { id, qty })
      context.dispatch('removeCart', id)
      // if (item.qty <= 0) {
      //     context.dispatch('removeCart', item.id);
      // } else {
      //     context.dispatch('addtoCart', { id, qty });
      //     context.dispatch('removeCart', item.id);
      // }
    },
    addtoCartMerge (context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADINGITEM', id)
      // 一樣商品合併(先抓購物車內容判斷 ID是否一樣)
      axios.get(url).then(response => {
        let cartItem = response.data.data.carts
        // console.log('item', cartItem);
        if (cartItem.length !== 0) {
          let added = 0
          for (let i = 0; i < cartItem.length; i++) {
            if (id === cartItem[i].product_id) {
              // console.log('重複商品要合併', cartItem[i]);
              added = 1 // 新增
              // 刪除購物車內容
              const removeurl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartItem[i].id}`
              axios.delete(removeurl).then(() => {
              })
              // 新增
              let itemQty = cartItem[i].qty // 原購物車商品數量
              const cart = {
                product_id: id,
                qty: qty + itemQty
              }
              axios.post(url, { data: cart }).then(response => {
                context.commit('LOADINGITEM', '')
                context.dispatch('getCart')
              })
            } else {
              // forLoop全部跑完，無重複商品且要新增才新增，
              if (i === cartItem.length - 1 && added === 0) {
                const cart = {
                  product_id: id,
                  qty
                }
                axios.post(url, { data: cart }).then(response => {
                  context.commit('LOADINGITEM', '')
                  context.dispatch('getCart')
                })
              }
            }
          } // forLoop end
        } else {
          // 購物車無內容直接新增
          const cart = {
            product_id: id,
            qty
          }
          axios.post(url, { data: cart }).then(response => {
            context.commit('LOADINGITEM', '')
            context.dispatch('getCart')
          })
        }
      })
    },
    arrayLtoH (context, item) {
      context.commit('ARRAYLTOH', item)
    },
    getfavorite (context) {
      let myfavorite = JSON.parse(localStorage.getItem('favorite') || [])
      // console.log('localStorage', myfavorite)
      context.dispatch('getProducts')
      context.commit('MYFAVORITES', myfavorite)
    },
    addFavorite (context, item) {
      const obj = {
        id: item.id,
        category: item.category,
        title: item.title,
        price: item.price,
        unit: item.unit,
        imageUrl: item.imageUrl,
        content: item.content,
        spec: item.spec
      }
      // console.log('新增', item.id)
      context.commit('ADDFAVORITES', obj)
      context.dispatch('getfavorite')
      // favorites.push(obj);
      // localStorage.setItem("favorite", JSON.stringify(favorites));
      // this.getFavoriteLength();
      // this.$bus.$emit("favorite", this.favorites);
      // this.$bus.$emit("like");
    },
    removefavorite (context, item) {
      // let myfavorite = JSON.parse(localStorage.getItem('favorite') || [])
      // // 檢查索引
      // const i = myfavorite.findIndex(el => {
      //   const result = el.id === item.id
      //   return result
      // })
      // console.log(i)
      // context.commit('REMOVEFAVORITES', i, item.id)
      // // console.log(i)
      // // myfavorite.splice(i, 1);
      // // localStorage.setItem("favorite", JSON.stringify(myfavorite));
      // context.dispatch('getfavorite')
      // console.log('delall', delall)
      // if (delall) {
      //   console.log('remove')
      //   localStorage.removeItem('favorite')
      // } else {
      //   context.commit('REMOVEFAVORITES', item)
      //   localStorage.setItem('favorite', JSON.stringify(context.state.myfavorite))
      // }
      // console.log('刪除', item.id)
      context.commit('REMOVEFAVORITES', item)
      localStorage.setItem('favorite', JSON.stringify(context.state.myfavorite))
      context.dispatch('getfavorite')
      // context.dispatch('getProducts')
    },
    getFilteredFavorite (context, myfavorite) {
      // console.log(item);
      // let myfavorite = JSON.parse(localStorage.getItem('favorite') || [])
      // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      // const loveed = myfavorite.some(el => {
      //   const result = myfavorite.id === el.id
      //   return result
      // })
      // context.commit('FILTERLOVE', loveed)
      // console.log(result);
    }

  },
  // 操作狀態(儲存資料或同步行為)
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    ACTIVEITEM (state, payload) {
      state.activeitem = payload
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    },
    CART (state, payload) {
      state.cart = payload
    },
    LOADINGITEM (state, payload) {
      state.loadingItem = payload
    },
    FILTER (state, payload) {
      state.products = payload
    },
    ADDQTY (state, payload) {
      state.addqtynum = payload.qty += 1
    },
    MINUSQTY (state, payload) {
      state.minusnum = payload.qty -= 1
    },
    ADDFAVORITES (state, obj) {
      state.myfavorite.push(obj)
      state.myfavorite = localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
      // console.log(state.myfavorite)
      // if (state.myfavorite.length === 0) {
      //   state.myfavorite.push(obj)
      //   state.myfavorite = localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
      // } else {
      //   state.myfavorite.forEach((item) => {
      //     if (item.id !== obj.id) {
      //       state.myfavorite.push(obj)
      //       state.myfavorite = localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
      //     }
      //   })
      // }
    },
    REMOVEFAVORITES (state, favorite) {
      // console.log('state', state.myfavorite, 'favorite', favorite.id)
      state.myfavorite.forEach((item, index) => {
        // console.log('item.id', item.id, 'favorite.id', favorite.id, 'index', index)
        if (item.id === favorite.id) {
          state.myfavorite.splice(index, 1)
        }
      })
    },
    MYFAVORITES (state, obj) {
      // console.log('MYFAVORITES', obj)
      state.myfavorite = obj
    },
    ARRAYLTOH (state, item) {
      if (item === 'lowPrice') {
        return state.products.sort(function (a, b) {
          return a.price - b.price
          // return a[vm.price] < b[vm.price] ? 1 : -1;
        })
      } else if (item === 'upPrice') {
        return state.products.sort(function (a, b) {
          return b.price - a.price
          //  return a[vm.price] > b[vm.price] ? 1 : -1;
        })
      }
      // state.products
    },
    FILTERLOVE (state, item) {
      state.filterlove = item
    },
    UPDATEPRODUCTS (state, { index, isFavorite }) {
      Vue.set(state.products[index], 'is_favorite', isFavorite)
    }
    // PRODUCTSORIGINAL(state, payLoad, value){
    //     console.log( payLoad , value )
    //     let array = [];
    //     array = payLoad.filter(e => {
    //         //關鍵字搜尋標題忽略大小寫
    //         return (
    //             e.brand === value ||
    //             e.brand.toUpperCase().indexOf(value) !== -1 ||
    //             e.brand.toLowerCase().indexOf(value) !== -1
    //         );
    //     });
    //     state.products = Object.assign([], array);
    //     state.productsOriginal = payLoad;
    // }
  },
  // 如computed
  getters: {
    isLoading: state => state.isLoading,
    products: state => state.products,
    myfavorite: state => state.myfavorite,
    pagination: state => state.pagination,
    loadingItem: state => state.loadingItem,
    cart: state => state.cart,
    activeitem: state => state.activeitem
    // products (state) {
    //   return state.products
    // }
  }
})
