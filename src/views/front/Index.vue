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
                <h1>全新macbook air</h1>
                <p>絢麗多彩的 Retina 顯示器採用「原彩」顯示技術， 帶來更真實自然的觀看體驗。 • 功能多元的觸控列，提供你更多高效的工作方式</p>
              </div>
            </div>
          </a>
        </div>
        <div class="carousel-item">
          <a href="#" @click="goDetail('-LuQ9Z8JhBgR4O1L2Gb5')" class="d-block">
            <div class="benner-img2">
              <div class="title carousel-caption d-none d-md-block">
                <h1>新上市 iphone11 PRO</h1>
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
              <h1>HTC u19e</h1>
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
          <swiper-slide class="mr-3 ml-2 sidebar-set">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='APPLE' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('APPLE')"
            >APPLE</a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 sidebar-set" >
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='ASUS' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('ASUS')"
            >ASUS</a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 sidebar-set" >
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='HTC' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('HTC')"
            >HTC</a>
          </swiper-slide>
          <swiper-slide
            class="mr-3 ml-2 d-flex sidebar-set">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='小米' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('小米')"
            >小米</a>
          </swiper-slide>
          <swiper-slide
            class="mr-3 ml-2 d-flex sidebar-set">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='三星' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('三星')"
            >三星</a>
          </swiper-slide>
          <swiper-slide
            class="mr-3 ml-2 d-flex sidebar-set">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='NOKIA' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('NOKIA')"
            >NOKIA</a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 d-flex sidebar-set">
            <a
              href="#"
              class="menuSidebar w-100 d-flex justify-content-center"
              :class="[ activeitem ==='MOTO' ? 'text-white bg-dark':'' ]"
              @click.prevent="badgeSearch('MOTO')"
            >MOTO</a>
          </swiper-slide>
        </swiper>
        <div class="col-sm-12 col-md-12 col-lg-10">
          <div class="dropdown my-3 text-right">
            <button
              class="btn btn-outline-dark dropdown-toggle"
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
                  <div >
                    <a href="#" v-if="item.is_favorite">
                      <i
                        class="fas fa-heart text-danger position-absolute"
                        @click.prevent="removeFavorite(item)"
                        style="top:20px;right:20px; font-size:20px"
                      ></i>
                    </a>
                    <a href="#" v-else>
                      <i
                        class="far fa-heart text-danger position-absolute"
                        @click.prevent="addFavorite(item)"
                        style="top:20px;right:20px; font-size:20px"
                      ></i>
                    </a>
                  </div>
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
                    class="btn btn-primary btn-sm col-12 cart-move p-2"
                    @click="addtoCartMerge(item.id)"
                    style="border-top-left-radius:0px ; border-top-right-radius:0px"
                    :disabled="item.id ===loadingItem"
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
            <Pagin @postPage="getProducts" :getpagin="pagination" class="d-flex justify-content-center"></Pagin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' //, mapActions
import FrontSidebar from '@/components/FrontSidebar.vue'
import Pagin from '@/components/Pagination.vue' // 分頁
import $ from 'jquery'

export default {
  components: {
    Pagin, // 分頁
    FrontSidebar
  },
  data () {
    return {
    }
  },
  methods: {
    getProducts (page = 1) {
      this.$store.dispatch('getProducts', page)
    },
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('addtoCartMerge', { id, qty })
      $('#productModal').modal('hide')
    },
    goDetail (id) {
      this.$router.push(`/detail/${id}`).catch(err => (err))
      this.$bus.$emit('refreshDetail')
    },
    // 篩選
    getCategory (page) {
      this.$store.dispatch('getProducts', page)
    },
    // 加入我的最愛
    addFavorite (item) {
      this.$store.dispatch('addFavorite', item)
    },
    // 移除我的最愛
    removeFavorite (item) {
      this.$store.dispatch('removefavorite', item)
    },
    badgeSearch (str) {
      this.$router.push(`/${str}`).catch(err => (err))
      this.getCategory()
    },
    // 排列價格低到高
    arrayLtoH (item) {
      this.$store.dispatch('arrayLtoH', item)
    }
  },
  computed: {
    // vuex getters
    ...mapGetters(['products', 'myfavorite', 'pagination', 'loadingItem', 'activeitem'])
  },
  mounted () {
    this.$bus.$on('refresh', () => {
      this.getProducts()
    })
  },
  created () {
    if (this.$route.params.Str === undefined) {
      this.getProducts()
    } else {
      this.getCategory()
    }
    this.$bus.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.item-hover > div {
  box-shadow: 5px 5px 10px rgba(227, 219, 208, 0.5);
}
.item-hover > div:hover {
  box-shadow: 10px 10px 10px rgba(227, 219, 208, 0.5);
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
.sidebar-set{
  border: 1px solid black;
  max-width:15%;
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
  .sidebar-set{
    max-width:25%;
  }
}
@include m480() {
  .sidebar-set{
    max-width:30%;
  }
}
@include iphone5() {
  .sidebar-set{
    max-width:35%;
  }
}
</style>
