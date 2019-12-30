// 彙整 VUEX
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // 嚴謹模式
  strict: true,
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
    changeqty: 0,
    qty: 0,
    productsOriginal: [],
    // favorites: [] ,
    myfavorite: {
      length: 0
    },
    favoriteId: ''
    // apple: [],
    // cartItem: [],
  },
  // 操作行為
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getProducts (context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('LOADING', false)

        // // 在 products 加入 is_favorite
        // context.products.forEach((productItem, index) => {
        //     console.log('foreach', productItem, index)
        //     context.rootState.favoriteModules.favorites.forEach((favItem) => {
        //         if (productItem.id === favItem.id) {
        //             context.commit('UPDATEPRODUCTS', { index, isFavorite: true });
        //         }
        //     });
        // });

        // if (vm.$route.params.Str == undefined) {
        //     vm.ProductAll = true;
        // } else {
        //     vm.ProductAll = false;
        // }
        // console.log('取得產品列表:', response);
        context.commit('PAGINATION', response.data.pagination)
      })
    },
    getCategory (context, value) {
      // console.log(value)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(api).then(response => {
        // console.log('getProducts', response.data)
        if (value === 'APPLE') {
          context.commit('APPLE', response.data.products)
        }
      })
    },
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
      // console.log(context, id, qty);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADINGITEM', id)
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then(response => {
        context.dispatch('getCart')
        context.commit('LOADINGITEM', '')
        // console.log('加入購物車:', response);
      })
    },
    addQty (context, item) {
      context.commit('ADDQTY', item)
      context.dispatch('removeCart', item.id)
      let id = item.product.id
      let qty = item.qty
      context.dispatch('addtoCart', { id, qty })
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
    inputQty (context, item) {
      let id = item.product.id
      let qty = item.qty
      console.log('action', id, qty)
      context.commit('CHANGEQTY', qty)
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
        if (cartItem.length != 0) {
          let added = 0
          for (let i = 0; i < cartItem.length; i++) {
            if (id == cartItem[i].product_id) {
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
              if (i == cartItem.length - 1 && added == 0) {
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
      // console.log(obj);

      context.dispatch('getfavorite')
      context.commit('ADDFAVORITES', obj)
      // favorites.push(obj);
      // localStorage.setItem("favorite", JSON.stringify(favorites));

      // this.getFavoriteLength();
      // this.$bus.$emit("favorite", this.favorites);
      // this.$bus.$emit("like");
    },
    getfavorite (context) {
      let myfavorite = JSON.parse(localStorage.getItem('favorite') || [])
      // console.log(myfavorite);
      context.commit('MYFAVORITES', myfavorite)
    },
    removefavoritet (context, item) {
      let myfavorite = JSON.parse(localStorage.getItem('favorite') || [])
      // 檢查索引
      const i = myfavorite.findIndex(el => {
        const result = el.id === item.id
        return result
      })
      context.commit('REMOVEFAVORITES', i, item.id)
      // console.log(i)
      // myfavorite.splice(i, 1);
      // localStorage.setItem("favorite", JSON.stringify(myfavorite));
      context.dispatch('getfavorite')
      // this.$bus.$emit("removefavoritet", this.myfavorite);
    },
    getFilteredFavorite (context, item) {
      // console.log(item);
      let myfavorite = JSON.parse(localStorage.getItem('favorite') || [])
      // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      let result = myfavorite.some(el => {
        const result = item.id === el.id
        return result
      })
      // console.log(result);
    }

  },
  // 操作狀態(儲存資料或同步行為)
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    },
    // CATEGORIES(state, payload){
    //     const categories = new Set();
    //     payload.forEach((item) => {
    //         categories.add(item.category);
    //     });
    //     state.categories = Array.from(categories);
    // },
    CART (state, payload) {
      state.cart = payload
    },
    LOADINGITEM (state, payload) {
      state.loadingItem = payload
    },
    APPLE (state, payload) {
      state.apple = payload.filter(
        item => item.category === 'APPLE'
      )
    },
    ADDQTY (state, payload) {
      state.addqtynum = payload.qty += 1
    },
    MINUSQTY (state, payload) {
      state.minusnum = payload.qty -= 1
    },
    CHANGEQTY (state, paylond) {
      // console.log('mutations', paylond);
      state.changeqty = paylond
    },
    ADDFAVORITES (state, obj) {
      state.myfavorite.push(obj)
      localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
    },
    REMOVEFAVORITES (state, i, id) {
      state.myfavorite.splice(i, 1)
      state.myfavorite = localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
      state.favoriteId = id
    },
    MYFAVORITES (state, obj) {
      state.myfavorite = obj
    }
    // CARTITEM(state, payload){
    //     state.cartItem = payload;
    // },
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
    products (state) {
      return state.products
    }
    // favorites(state){
    //     return state.favorites;
    // },
  }
})
