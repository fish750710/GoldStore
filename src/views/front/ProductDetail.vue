<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 col-sm-12 my-5 text-center">
          <pic-zoom :previewImg="product.imageUrl" :zoomImg="product.imageUrl"></pic-zoom>
        </div>
        <div class="col-md-4 col-sm-12 my-5">
          <h4>{{ product.title }}</h4>
          <div class="d-flex justify-content-between">
            <h5 class="text-dark">{{ product.spec }} {{ product.content }}</h5>
            <a href="#" class>
              <i
                class="fas fa-heart text-danger"
                v-if="favoriteId"
                @click.prevent="removeFavorite(product)"
                style="font-size:20px"
              ></i>
              <i
                class="far fa-heart text-danger"
                v-else
                @click.prevent="addFavorite(product)"
                style="font-size:20px"
              ></i>
            </a>
          </div>
          <a href="#" class="badge badge-warning ml-2" @click="badgeSearch">{{ product.brand }}</a>
          <a href="#" class="badge badge-info ml-2" @click="badgeSearch">{{ product.category }}</a>
          <a href="#" class="badge badge-secondary ml-2" @click="badgeSearch">{{ product.content }}</a>
          <a href="#" class="badge badge-success ml-2" @click="badgeSearch">{{ product.spec }}</a>
          <div class="h5 text-right" v-if="product.origin_price ">
            <del>{{ product.origin_price * quantity | currency }} 元</del>
          </div>
          <div
            class="h2 text-danger text-right"
            v-if="product.price"
          >{{ product.price * quantity | currency}} 元</div>
          <hr />
          <div class="text-left text-l">購買數量</div>
          <div class="h6 text-right" v-if="product.stock > 5">庫存：{{ product.stock }} 件</div>
          <div class="h6 text-right text-danger" v-if="product.stock < 5">只剩最後 {{ product.stock }} 件</div>
          <div class="h6 text-right text-danger" v-if="product.stock === 0">補貨中</div>
          <select name class="form-control mt-3" v-model="quantity" v-if="product.stock != 0">
            <option
              :value="num"
              v-for="num in Number(product.stock)"
              :key="num"
            >選購 {{num}} {{product.unit}}</option>
          </select>
          <hr />
          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-primary btn-sm col-5 text-black"
              @click="addtoCartMerge(product.id, quantity)"
            >
              <i class="fas fa-spinner fa-pulse" v-if="product.id === loadingItem"></i>
              <i class="fas fa-cart-plus" v-else></i>
              加到購物車
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm col-5"
              @click="goCheckOuter(product.id, quantity)"
            >
              <i class="fas fa-spinner fa-pulse" v-if="product.id === loadingItem"></i>
              <i class="fas fa-shopping-bag" v-else></i>
              立即結帳
            </button>
          </div>
          <hr class="mt-5" />
          <div>
            <!-- 商品說明 -->
            <li>{{ product.description }}</li>
          </div>
        </div>
      </div>
      <!-- swiper -->
      <div class="h5 text-center swiper-like-rwd">
        <i class="fas fa-heart text-danger mr-2"></i>猜你喜歡
      </div>
      <div class="swiper-container swiper-like-rwd" v-if="filterdata.length > 0">
        <div class="swiper-wrapper py-5">
          <div class="swiper-slide" v-for="item in filterdata" :key="item.id">
            <div class="card border-0 bg-transparent" v-if="item.is_enabled">
              <a href="#" @click.prevent="goDetail(item.id)" class="text-center">
                <img class="card-img-top" alt="..." :src="item.imageUrl" style="max-width:200px" />
              </a>
              <div class="card-body px-0">
                <div class="m-0">
                  <a
                    href="#"
                    class="h6 text-black text-decoration-none"
                    @click.prevent="goDetail(item.id)"
                  >{{ item.title }}</a>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <del
                    class="h7 text-muted"
                    v-if="item.origin_price > 0"
                  >原價 {{ item.origin_price | currency }} 元</del>
                  <div v-if="!item.price">
                    <span class="h5 text-danger">{{ item.origin_price | currency }}元</span>
                  </div>
                  <div v-if="item.price">
                    <span class="h5 text-danger">{{ item.price | currency }}元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PicZoom from '@/components/PicZoom.vue' // 放大鏡
import Swiper from 'swiper'
import $ from 'jquery'

export default {
  components: {
    PicZoom
  },
  data () {
    return {
      product: {
        stock: ''
      },
      productId: '',
      productIdS: '',
      // status: {
      //   loadingItem: ""
      // },
      quantity: 1,
      // favorites: [],
      favoriteLength: 0,
      smallImg: '', // 小圖
      bigImg: '', // 大圖
      products: []
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      // vm.status.loadingItem = id;
      vm.$http.get(url).then(response => {
        vm.product = response.data.product
        // vm.status.loadingItem = "";
      })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then(response => {
        // 猜你喜歡
        vm.products = response.data.products
      })
    },
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('addtoCartMerge', { id, qty })
      $('#productModal').modal('hide')
    },

    // 加入我的最愛
    addFavorite (item) {
      this.$store.dispatch('addFavorite', item)
      // const obj = {
      //   id: item.id,
      //   category: item.category,
      //   title: item.title,
      //   price: item.price,
      //   unit: item.unit,
      //   imageUrl: item.imageUrl,
      //   content: item.content,
      //   spec: item.spec
      // };
      // this.favorites.push(obj);
      // localStorage.setItem("favorite", JSON.stringify(this.favorites));
      // this.getFavoriteLength();
      // this.$bus.$emit("favorite", this.favorites);
      // this.$bus.$emit("like");
    },
    // 移除我的最愛
    removeFavorite (item) {
      // console.log(item)
      this.$store.dispatch('removefavoritet', item)
      // const i = this.favorites.findIndex(el => {
      //   const result = el.id === item.id;
      //   return result;
      // });
      // this.favorites.splice(i, 1);
      // localStorage.setItem("favorite", JSON.stringify(this.favorites));
      // this.getFavoriteLength();
      // this.$bus.$emit("favorite", this.favorites);
      // this.getFilteredFavorite(item);
      // this.$bus.$emit("dislike");
    },
    // 有商品於我的最愛時，icon更換
    getFilteredFavorite (item) {
      this.$store.dispatch('getFilteredFavorite', item)
      // // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      // return this.favorites.some(el => {
      //   const result = item.id === el.id;
      //   return result;
      // });
      // this.getProduct(item.id);
    },
    getfavorite () {
      this.$store.dispatch('getfavorite')
      // this.myfavorite = JSON.parse(localStorage.getItem("favorite") || "");
    },
    // 取得我的最愛產品數量
    // getFavoriteLength() {
    //   this.favoriteLength = JSON.parse(localStorage.getItem("favorite")).length;
    //   this.$bus.$emit("favorite", this.favoriteLength);
    // },
    badgeSearch (e) {
      let str = e.target.firstChild.nodeValue
      this.$router.push(`/search/${str}`).catch(err => (err))
    },
    goCheckOuter (id, quantity) {
      this.addtoCartMerge(id, quantity)
      this.$router.push('/checkout').catch(err => (err))
      this.$bus.$emit('refreshCheckOut')
    },
    goDetail (id) {
      this.$router.push(`/detail/${id}`).catch(err => (err))
      this.$bus.$emit('refreshDetail')
    },
    getswiper () {
      this.$nextTick(() => {
        setTimeout(() => {
          // eslint-disable-next-line no-unused-vars
          var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 40,
            loop: true,
            speed: 2000,
            breakpoints: {
              // when window width is <= 320px
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              // when window width is <= 480px
              480: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              // when window width is <= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            },
            autoplay: {
              delay: 4000,
              disableOnInteraction: false
            }
          })
        }, 800)
      })
    }
  },

  computed: {
    filterdata () {
      const vm = this
      return (vm.filteritem = vm.products.filter((item, i) => {
        if (vm.product.title !== item.title) {
          return item.category === vm.product.category
        }
      }))
    },
    loadingItem () {
      return this.$store.state.loadingItem
    },
    favoriteId () {
      let id = this.$route.params.productId
      let favoriteId = this.$store.state.myfavorite.some(el => {
        const result = id === el.id
        return result
      })
      return favoriteId
    }
  },
  mounted () {
    // const vm = this;
    // vm.$bus.$on("removefavoritet", () => {
    //   vm.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    //   vm.getFavoriteLength();
    // });
  },
  created () {
    const vm = this
    vm.productId = vm.$route.params.productId
    vm.getProduct(vm.productId)
    vm.getswiper()
    // 購物車和收藏更新畫面
    vm.$bus.$on('refreshDetail', () => {
      // vm.productId = vm.$route.params.productId;
      vm.getProduct(vm.productId)
    })
    // 先抓 localStorage 判斷商品的我的最愛ICON
    // vm.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    // vm.getFavoriteLength();
    vm.getfavorite()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

@include desktop-top() {
}
@include pc() {
}
@include pad() {
}
@include m568() {
  .swiper-like-rwd {
    display: none;
  }
}
@include m480() {
}
@include iphone5() {
}
</style>
