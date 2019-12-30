<template>
  <div>
    <!-- 輪播 -->
    <div
      id="carouselExampleIndicators"
      class="carousel slide my-5 m-banner-rwd"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active banner-rwd">
          <a href="#" @click="goDetail('-LuQFEYmntflhE3g3af6')" class="d-block">
            <div class="benner-img1">
              <div class="title carousel-caption d-none d-md-block">
                <h5>全新macbook air</h5>
                <p>絢麗多彩的 Retina 顯示器採用「原彩」顯示技術， 帶來更真實自然的觀看體驗。 • 功能多元的觸控列，提供你更多高效的工作方式</p>
              </div>
            </div>
          </a>
        </div>
        <div class="carousel-item">
          <a href="#" @click="goDetail('-LuQ9Z8JhBgR4O1L2Gb5')" class="d-block">
            <div class="benner-img2">
              <div class="title carousel-caption d-none d-md-block">
                <h5>新上市 iphone11 PRO</h5>
                <p>• 5.8 吋超 Retina XDR OLED 顯示器</p>
                <p>• 防潑抗水與防塵功能 (在最深達 4 公尺水中最長可達 30 分鐘，IP68)</p>
                <p>• 三相機系統，具備 1200 萬像素超廣角、廣角與望遠相機；夜間模式、人像模式與 4K 影片拍攝功能 (最高可達 60 fps)</p>
              </div>
            </div>
          </a>
        </div>
        <div class="carousel-item banner-rwd">
          <a href="#" @click="goDetail('-LuQIo2AsSzBCxvJKok_')" class="d-block">
            <div class="benner-img3"></div>
            <div class="title carousel-caption d-none d-md-block">
              <h5>HTC u19e</h5>
              <p>6吋 18:9 全屏大螢幕</p>
              <p>雙主鏡頭相機1600+500萬畫素</p>
              <p>1300萬華素前鏡頭</p>
            </div>
          </a>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-0 col-md-0 col-lg-2">
          <FrontSidebar class="sticky-top"></FrontSidebar>
        </div>
        <swiper class="m-menu-Sidebar mt-5 pb-2 menu-ul">
          <swiper-slide class="mr-3 ml-2" style="border: 1px solid #50CBCB;max-width:44%">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='APPLE' ? 'text-primary':'' ]"
              @click="badgeSearch('APPLE')"
            >APPLE</a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2" style="border: 1px solid #50CBCB;max-width:44%">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='ASUS' ? 'text-primary':'' ]"
              @click="badgeSearch('ASUS')"
            >ASUS</a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2" style="border: 1px solid #50CBCB;max-width:44%">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='HTC' ? 'text-primary':'' ]"
              @click="badgeSearch('HTC')"
            >HTC</a>
          </swiper-slide>
          <swiper-slide
            class="mr-3 ml-2 d-flex justify-content-center"
            style="border: 1px solid #50CBCB;max-width:44%"
          >
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='小米' ? 'text-primary':'' ]"
              @click="badgeSearch('小米')"
            >小米</a>
          </swiper-slide>

          <swiper-slide
            class="mr-3 ml-2 d-flex justify-content-center"
            style="border: 1px solid #50CBCB;max-width:44%"
          >
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='三星' ? 'text-primary':'' ]"
              @click="badgeSearch('三星')"
            >
              <i class="fas fa-robot pr-2 pt-1"></i>三星
            </a>
          </swiper-slide>
          <swiper-slide
            class="mr-3 ml-2 d-flex justify-content-center"
            style="border: 1px solid #50CBCB;max-width:44%"
          >
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='NOKIA' ? 'text-primary':'' ]"
              @click="badgeSearch('NOKIA')"
            >
              <i class="fas fa-robot pr-2 pt-1"></i>NOKIA
            </a>
          </swiper-slide>
          <swiper-slide
            class="mr-3 ml-2 d-flex justify-content-center"
            style="border: 1px solid #50CBCB;max-width:44%"
          >
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem =='MOTO' ? 'text-primary':'' ]"
              @click="badgeSearch('MOTO')"
            >
              <i class="fas fa-robot pr-2 pt-1"></i>MOTO
            </a>
          </swiper-slide>
        </swiper>
        <div class="col-sm-12 col-md-12 col-lg-10">
          <div class="dropdown my-3 text-right">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="font-size:14px"
            >排列順序</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" @click.prevent="arrayLtoH('lowPrice')">價格:低到高</a>
              <a class="dropdown-item" href="#" @click.prevent="arrayLtoH('upPrice')">價格:高到低</a>
              <a class="dropdown-item disabled" href="#">銷量:低到高</a>
              <a class="dropdown-item disabled" href="#">銷量:高到低</a>
            </div>
          </div>
          <div class="tab-content">
            <div class="row">
              <div
                class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4 item-hover"
                v-for="item in products"
                :key="item.id"
              >
                <div class="card border-0" v-if="item.is_enabled != 0">
                  <a href="#" @click.prevent="goDetail(item.id)">
                    <div
                      style="height: 200px; background-size: 60%; background-repeat: no-repeat; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}"
                    ></div>
                  </a>
                  <a href="#">
                    <i
                      class="fas fa-heart text-danger position-absolute"
                      v-if="getFilteredFavorite(item)"
                      @click.prevent="removeFavorite(item)"
                      style="top:20px;right:20px; font-size:20px"
                    ></i>
                    <i
                      class="far fa-heart text-danger position-absolute"
                      v-else
                      @click.prevent="addFavorite(item)"
                      style="top:20px;right:20px; font-size:20px"
                    ></i>
                  </a>
                  <div class="card-body pt-2 pb-2" style="min-height:130px">
                    <h5 class="h6 card-title mb-1" style="min-height:58px">
                      <a
                        href="#"
                        class="text-dark font-weight-bold text-decoration-none"
                        @click.prevent="goDetail(item.id)"
                      >{{ item.title }}</a>
                    </h5>
                    <div class="d-flex justify-content-between" style="height:35px">
                      <p class="card-text text-info font-weight-bold">{{ item.content }}</p>
                      <div>
                        <span
                          class="badge badge-secondary float-right ml-2 mb-1"
                        >{{ item.category }}</span>
                        <span class="badge badge-success float-right ml-2">{{ item.spec }}</span>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                      <del class="h7" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                      <div
                        class="h5 text-danger font-weight-bold"
                        v-if="item.price"
                      >特價 {{ item.price }} 元</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm col-12 cart-move"
                    @click="addtoCartMerge(item.id)"
                    style="border-top-left-radius:0px ; border-top-right-radius:0px "
                  >
                    <i
                      class="fas fa-spinner fa-pulse text-black"
                      v-if="item.id === loadingItem"
                    ></i>
                    <i class="fas fa-cart-plus text-black" v-else></i>
                    <span class="ml-4 text-black">加到購物車</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- 分頁 -->
            <Pagin
              @postPage="getProducts"
              :getpagin="pagination"
              v-if="ProductAll"
              class="d-flex justify-content-center"
            ></Pagin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FrontSidebar from '@/components/FrontSidebar.vue'
import Pagin from '@/components/Pagination.vue' // 分頁
import Swiper from 'swiper'
import $ from 'jquery'

export default {
  components: {
    Pagin, // 分頁
    FrontSidebar
  },
  data () {
    return {
      products: [],
      pagination: {}, // 分頁
      product: {}, // 單筆資料
      // status: {
      //   loadingItem: ""
      // },
      coupon_code: '',
      coupon_msg: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      favorites: [],
      favoriteLength: 0,
      added: '',
      ProductAll: false,
      newData: '',
      activeitem: ''
    }
  },
  methods: {
    getProducts (page = 1) {
      //  this.$store.dispatch('getProducts', page);
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      // vm.$store.dispatch('updateLoading', true);
      this.$http.get(url).then(response => {
        vm.products = response.data.products
        // vm.$store.dispatch('updateLoading', false);
        if (vm.$route.params.Str == undefined) {
          vm.ProductAll = true
        } else {
          vm.ProductAll = false
        }
        vm.pagination = response.data.pagination
      })
    },
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('addtoCartMerge', { id, qty })
      $('#productModal').modal('hide')
    },
    goDetail (id) {
      this.$router.push(`/detail/${id}`).catch(err => {})
      this.$bus.$emit('refreshDetail')
    },
    // 篩選
    getCategory () {
      // this.$store.dispatch('getCategory', str);
      // this.$store.dispatch('getProductAll', value);
      const vm = this
      let array = []
      let value = ''
      value = vm.$route.params.Str // 搜尋關鍵字
      // 撈全部後過濾
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.$http.get(url).then(response => {
        if (value === undefined) {
          vm.products = response.data.products
          vm.ProductAll = true // 換頁打開
        } else {
          array = response.data.products.filter(e => {
            // 關鍵字搜尋標題忽略大小寫
            return (
              e.brand === value ||
              e.brand.toUpperCase().indexOf(value) !== -1 ||
              e.brand.toLowerCase().indexOf(value) !== -1
            )
          })
          vm.products = Object.assign([], array)
          vm.ProductAll = false // 換頁關閉
        }
      })
    },
    // 撈全部
    getProductAll () {
      this.getCategory()
    },
    // 加入我的最愛
    addFavorite (item) {
      // this.$store.dispatch('addFavorite', item);
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
      this.favorites.push(obj)
      localStorage.setItem('favorite', JSON.stringify(this.favorites))
      this.getFavoriteLength()
      this.$bus.$emit('favorite', this.favorites)
      // this.$bus.$emit("like");
    },
    // 移除我的最愛
    removeFavorite (item) {
      // console.log(item)
      // this.$store.dispatch('removefavoritet', item);
      const i = this.favorites.findIndex(el => {
        const result = el.id === item.id
        return result
      })
      this.favorites.splice(i, 1)
      localStorage.setItem('favorite', JSON.stringify(this.favorites))
      this.getFavoriteLength()
      this.$bus.$emit('favorite', this.favorites)
      // this.$bus.$emit("dislike");
    },
    // 有商品於我的最愛時，icon更換
    getFilteredFavorite (item) {
      // console.log(this.favorites)

      // this.$store.dispatch('getFilteredFavorite', item);
      // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      return this.favorites.some(el => {
        const result = item.id === el.id
        return result
      })
    },
    // 取得我的最愛產品數量
    getFavoriteLength () {
      this.favoriteLength = JSON.parse(localStorage.getItem('favorite')).length
      this.$bus.$emit('favorite', this.favoriteLength)
    },
    // getfavorite() {
    //   this.$store.dispatch('getfavorite');
    // },
    getswiper () {
      this.$nextTick(() => {
        var swiper = new Swiper('.swiper-container', {
          // Default parameters
          slidesPerView: 4,
          spaceBetween: 40,
          // Responsive breakpoints
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
          }
        })
      })
    },
    badgeSearch (str) {
      this.activeitem = str
      // this.$store.dispatch('getCategory', str);
      this.$router.push(`/${str}`).catch(err => {})
      this.$bus.$emit('change')
    },
    // 排列價格低到高
    arrayLtoH (item) {
      const vm = this
      let updateProduct = ''
      updateProduct = 'products'
      if (this.$route.params.Str === undefined) {
        return new Promise((resolve, reject) => {
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
          this.$http.get(url).then(response => {
            vm.products = response.data.products
            vm.ProductAll = false // 換頁關閉
            if (item === 'lowPrice') {
              return this[updateProduct].sort(function (a, b) {
                return a.price - b.price
                // return a[vm.price] < b[vm.price] ? 1 : -1;
              })
            } else if (item === 'upPrice') {
              return this[updateProduct].sort(function (a, b) {
                return b.price - a.price
                //  return a[vm.price] > b[vm.price] ? 1 : -1;
              })
            }
          })
        })
      } else {
        // 篩選商品
        if (item === 'lowPrice') {
          return this[updateProduct].sort(function (a, b) {
            return a.price - b.price
            // return a[vm.price] < b[vm.price] ? 1 : -1;
          })
        } else if (item === 'upPrice') {
          return this[updateProduct].sort(function (a, b) {
            return b.price - a.price
            //  return a[vm.price] > b[vm.price] ? 1 : -1;
          })
        }
      }
    }
  },

  computed: {
    loadingItem () {
      return this.$store.state.loadingItem
    }
    // favoriteId (){
    //   // let id = this.favorites;
    //   // console.log(id)
    //   // let favoriteId = this.$store.state.myfavorite.some(el => {
    //   //   const result = id === el.id;
    //   //   return result;
    //   // });
    //   // return favoriteId;
    //   return this.favorites;
    // },
    // vuex getters
    // ...mapGetters(['products']),
    // products(){
    //   return this.$store.state.products;
    // },
  },
  mounted () {
    // 從frontsidebar傳來
    this.$bus.$on('change', () => {
      this.getProductAll()
    })
    this.$bus.$on('removefavoritet', () => {
      this.favorites = JSON.parse(localStorage.getItem('favorite')) || []
      this.getFavoriteLength()
    })
    this.$bus.$on('refresh', () => {
      this.getProducts()
    })
  },
  created () {
    // 先抓 localStorage 判斷商品的我的最愛ICON
    this.favorites = JSON.parse(localStorage.getItem('favorite')) || []
    this.getFavoriteLength()
    // this.getfavorite();
    this.getswiper()
    this.getProducts()
    // this.getCart();
    if (this.$route.params.Str == undefined) {
      this.getProducts()
    } else {
      this.getProductAll()
    }
    this.$bus.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.item-hover > div:hover {
  box-shadow: 5px 5px 10px rgba(227, 219, 208, 0.5);
}
.cart-move {
  width: 100%;
  transition: all 0.3s;
  &:hover i {
    transform: translate(22px, 0);
    transition: transform 0.3s linear;
  }
}
.sticky-top {
  position: sticky;
  top: 70px;
  z-index: 999;
}
.d-md-block {
  background: rgba(0, 0, 0, 0.2);
}
.banner-rwd img {
  max-height: 500px;
}

.benner-img1 {
  background-image: url(../../assets/images/macbook_air__csdfieli984m_large.jpg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: center;
  background-size: cover;
  height: 500px;
  right: 0px;
  overflow: hidden;
  position: relative;
  .title {
    position: absolute;
    bottom: 80px;
  }
}
.benner-img2 {
  background-image: url(../../assets/images/hero_iphone11_pro__je9i781j99u2_large.jpg);
  background-repeat: no-repeat;
  background-color: #000;
  background-position: bottom;
  background-size: 100%;
  height: 500px;
  right: 0px;
  overflow: hidden;
  position: relative;
  .title {
    position: absolute;
    bottom: 50px;
  }
}
.benner-img3 {
  background-image: url(../../assets/images/u19e_home_banner_desktop_bg_2000x683.jpg);
  background-repeat: no-repeat;
  background-color: #000;
  background-position: left;
  background-size: cover;
  height: 500px;
  right: 0px;
  overflow: hidden;
  position: relative;
  .title {
    position: absolute;
    bottom: 80px;
  }
}

@keyframes ad_width {
  from {
    width: 0;
  }
  to {
    width: 60px;
  }
}

@include desktop-top() {
  .m-menu-Sidebar {
    display: none;
  }
}
@include pc-top() {
  .m-menu-Sidebar {
    display: none;
  }
}
@include pc() {
  .menu-ul {
    list-style-type: none;
    .menuSidebar {
      text-decoration: none;
      color: $dark;
      font-weight: bold;
    }

    a:hover {
      color: $primary;
      position: relative;
    }
  }
}
@include pad() {
  .menu-ul {
    list-style-type: none;
    .menuSidebar {
      text-decoration: none;
      color: $dark;
      font-weight: bold;
      width: 80px;
    }
    a:hover {
      color: $primary;
      position: relative;
    }
  }
  .benner-img1 {
    height: 350px;
  }
  .benner-img2 {
    height: 350px;
  }
  .benner-img3 {
    height: 350px;
  }
}
@include m568() {
  .m-banner-rwd {
    display: none;
  }
}
@include m480() {
}
@include iphone5() {
}
</style>
