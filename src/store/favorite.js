export default {
//   namespaced: true, // actions、mutations、getters全域轉區域變數
  state: {
    myfavorite: []
  },
  // 操作行為
  actions: {
    getfavorite (context) {
      let myfavorite = []
      if (localStorage.getItem('favorite')) {
        myfavorite = JSON.parse(localStorage.getItem('favorite'))
      }
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
    },
    removefavorite (context, item) {
      // console.log('刪除', item.id)
      context.commit('REMOVEFAVORITES', item)
      localStorage.setItem('favorite', JSON.stringify(context.state.myfavorite))
      context.dispatch('getfavorite')
    }
  },
  // 操作狀態(儲存資料或同步行為)
  mutations: {
    ADDFAVORITES (state, obj) {
      state.myfavorite.push(obj)
      state.myfavorite = localStorage.setItem('favorite', JSON.stringify(state.myfavorite))
    },
    REMOVEFAVORITES (state, favorite) {
      state.myfavorite.forEach((item, index) => {
        if (item.id === favorite.id) {
          state.myfavorite.splice(index, 1)
        }
      })
    },
    MYFAVORITES (state, obj) {
      state.myfavorite = obj
    }
  },
  // 如computed
  getters: {
    myfavorite: state => state.myfavorite
  }
}
