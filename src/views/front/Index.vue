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
          <a href="#" @click="goDetail('-LuQFEYmntflhE3g3af6')">
            <img
              src="@/assets/images/macbook_air__csdfieli984m_large.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>全新macbook air</h5>
              <p>絢麗多彩的 Retina 顯示器採用「原彩」顯示技術， 帶來更真實自然的觀看體驗。 • 功能多元的觸控列，提供你更多高效的工作方式</p>
            </div>
          </a>
        </div>
        <div class="carousel-item banner-rwd">
          <a href="#" @click="goDetail('-LuQ9Z8JhBgR4O1L2Gb5')">
            <img
              src="@/assets/images/hero_iphone11_pro__je9i781j99u2_large.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>新上市 iphone11 PRO</h5>
              <p>• 5.8 吋超 Retina XDR OLED 顯示器</p>
              <p>• 防潑抗水與防塵功能 (在最深達 4 公尺水中最長可達 30 分鐘，IP68)</p>
              <p>• 三相機系統，具備 1200 萬像素超廣角、廣角與望遠相機；夜間模式、人像模式與 4K 影片拍攝功能 (最高可達 60 fps)</p>
            </div>
          </a>
        </div>
        <div class="carousel-item banner-rwd">
          <a href="#" @click="goDetail('-LuQIo2AsSzBCxvJKok_')">
            <img
              src="@/assets/images/u19e_home_banner_desktop_bg_2000x683.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
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

        <swiper class="m-menu-Sidebar mt-5 pt-1 pb-2 menu-ul">
          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('Apple')">
              <i class="fab fa-apple pr-2"></i>APPLE
            </a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('ASUS')">
              <i class="fas fa-microchip pr-2"></i>ASUS
            </a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('HTC')">
              <i class="fas fa-glasses pr-2"></i>HTC
            </a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('小米')">
              <i class="fas fa-robot pr-2"></i>mi
            </a>
          </swiper-slide>

          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('三星')">
              <i class="fas fa-robot pr-2"></i>三星
            </a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('NOKIA')">
              <i class="fas fa-robot pr-2"></i>NOKIA
            </a>
          </swiper-slide>
          <swiper-slide class="mr-3 ml-2 pt-1" style="border: 1px solid #50CBCB;max-width:44%">
            <a href="#" class="menuSidebar pl-4" @click="badgeSearch('MOTO')">
              <i class="fas fa-robot pr-2"></i>MOTO
            </a>
          </swiper-slide>
        </swiper>

        <div class="col-sm-12 col-md-12 col-lg-10">
          <div class="dropdown my-3 text-right">
            <button
              class="btn btn-outline-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
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
                <div class="card border-0 shadow-sm" v-if="item.is_enabled != 0">
                  <a href="#" @click="goDetail(item.id)">
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
                    @click="addtoCart(item.id)"
                  >
                    <i
                      class="fas fa-spinner fa-pulse ttext-white"
                      v-if="item.id === status.loadingItem"
                    ></i>
                    <i class="fas fa-cart-plus text-white" v-else></i>
                    <span class="ml-4 text-white">加到購物車</span>
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
import FrontSidebar from "@/components/FrontSidebar.vue";
import Pagin from "@/components/Pagination.vue"; //分頁
import Swiper from "swiper";
import $ from "jquery";

export default {
  components: {
    Pagin, //分頁
    FrontSidebar
  },
  data() {
    return {
      products: [],
      pagination: {}, //分頁
      product: {}, //單筆資料
      status: {
        loadingItem: ""
      },
      coupon_code: "",
      coupon_msg: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      favorites: [],
      favoriteLength: 0,
      added: "",
      ProductAll: false,
      newData: ""
    };
  },
  methods: {
    getProducts(page = 1) {
      //  this.$store.dispatch('getProducts');
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      // vm.$store.dispatch('updateLoading', true);

      this.$http.get(url).then(response => {
        vm.products = response.data.products; //將回傳資料存在 products
        // console.log(response);
        // vm.$store.dispatch('updateLoading', false);
        // console.log(vm.$route.params.Str)
        if (vm.$route.params.Str == undefined) {
          vm.ProductAll = true;
        } else {
          vm.ProductAll = false;
        }

        vm.pagination = response.data.pagination; //把分頁資料存起來
        // console.log(vm.pagination)
      });
    },
    // getProduct(id){
    //   const vm = this;
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
    //   vm.status.loadingItem = id; //點選到的選項 loading動畫
    //   this.$http.get(url).then((response) => {
    //     vm.product = response.data.product;  //將回傳資料存在 product
    //     $('#productModal').modal('show'); //開啟 modal
    //     // console.log(response);

    //     vm.status.loadingItem = ''; //開啟後動畫清空
    //   });
    // },
    //加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCart(id, qty = 1) {
      // id 和 數量 預設=1
      //  this.$store.dispatch('addtoCart', { id, qty });
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id; //點選到的選項 loading動畫
      // vm.$store.dispatch('updateLoading', true);

      // 一樣商品合併(先抓購物車內容判斷 ID是否一樣)
      this.$http.get(url).then(response => {
        vm.cartItem = response.data.data.carts;

        if (vm.cartItem.length != 0) {
          // console.log('array',vm.cartItem.length);
          let added = 0;
          for (let i = 0; i < vm.cartItem.length; i++) {
            //  console.log('i',i);

            if (id == vm.cartItem[i].product_id) {
              added = 1; //新增
              //刪除購物車內容
              // console.log('一樣', i ,vm.cartItem[i].id)
              const removeurl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.cartItem[i].id}`;
              this.$http.delete(removeurl).then(() => {
                // console.log('刪除後',vm.cartItem[i]);
                // vm.getCart(); //重新取得購物車內容
                // this.$bus.$emit('refreshCart');
              });
              // 新增
              let itemQty = vm.cartItem[i].qty; //原購物車商品數量
              const cart = {
                product_id: id,
                qty: qty + itemQty
              };
              this.$http.post(url, { data: cart }).then(response => {
                vm.status.loadingItem = ""; //開啟後動畫清空
                // vm.getCart(); //取得購物車內容
                $("#productModal").modal("hide"); //關閉 modal
                // vm.$store.dispatch('updateLoading', false);
                this.$bus.$emit("refreshCart");
              });
            } else {
              // console.log('added',added)
              // forLoop全部跑完，無重複商品且要新增才新增，
              if (i == vm.cartItem.length - 1 && added == 0) {
                // console.log('無重複')
                const cart = {
                  product_id: id,
                  qty
                };
                this.$http.post(url, { data: cart }).then(response => {
                  // console.log(response);
                  vm.status.loadingItem = ""; //開啟後動畫清空
                  // vm.getCart(); //取得購物車內容
                  $("#productModal").modal("hide"); //關閉 modal
                  // vm.$store.dispatch('updateLoading', false);
                  this.$bus.$emit("refreshCart");
                });
              }
            }
          } //forLoop end
        } else {
          // 購物車無內容直接新增
          const cart = {
            product_id: id,
            qty
          };
          this.$http.post(url, { data: cart }).then(response => {
            // console.log(response);
            vm.status.loadingItem = ""; //開啟後動畫清空
            // vm.getCart(); //取得購物車內容
            $("#productModal").modal("hide"); //關閉 modal
            // vm.$store.dispatch('updateLoading', false);
            this.$bus.$emit("refreshCart");
          });
        }
      });
    },

    // 取得購物車內容
    getCart() {
      // this.$store.dispatch('getCart');
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // vm.$store.dispatch('updateLoading', true);
      // vm.isLoading = true;
      this.$http.get(url).then(response => {
        // vm.products =  response.data.products; //將回傳資料存在 products
        vm.cart = response.data.data;
        // console.log(vm.cart)
        // vm.$store.dispatch('updateLoading', false);
        // vm.isLoading = false;
        // vm.pagination = response.data.pagination; //把分頁資料存起來
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$store.state.isLoading = true;
      this.$http.delete(url).then(() => {
        // console.log('刪除')
        vm.getCart(); //重新取得購物車內容
        this.$bus.$emit("refreshCart");
        vm.$store.state.isLoading = false; //讀取效果關閉
      });
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`).catch(err => {});
      this.$bus.$emit("refreshDetail");
    },
    // 篩選
    getCategory() {
      const vm = this;
      let array = [];
      let value = "";
      //搜尋
      value = vm.$route.params.Str; //搜尋關鍵字
      //  console.log(value);
      if (value === undefined) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        this.$http.get(url).then(response => {
          vm.products = response.data.products; //將回傳資料存在 products
          vm.ProductAll = true; //換頁打開
          // vm.pagination = response.data.pagination; //把分頁資料存起來
          // console.log('全部',vm.products);
        });
      } else {
        array = vm.productsOriginal.filter(e => {
          // console.log('過濾', e);
          //關鍵字搜尋標題忽略大小寫
          // return ((e.title === value) || (e.title.indexOf(value) !== -1) || (e.title.toUpperCase().indexOf(value) !== -1) || (e.title.toLowerCase().indexOf(value) !== -1));
          return (
            e.brand === value ||
            e.brand.toUpperCase().indexOf(value) !== -1 ||
            e.brand.toLowerCase().indexOf(value) !== -1
          );
        });
        vm.products = Object.assign([], array);
        vm.ProductAll = false; //換頁關閉
      }
    },
    // 撈全部
    getProductAll() {
      const vm = this;
      vm.currentPath = vm.$route;
      // console.log(vm.currentPath);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      // vm.isLoading = true
      this.$http.get(api).then(response => {
        // console.log('getProducts', response.data)
        vm.productsOriginal = response.data.products;
        this.getCategory();
        // console.log(vm.pagination);
        // vm.isLoading = false
      });
    },
    // 加入我的最愛
    addFavorite(item) {
      const obj = {
        id: item.id,
        category: item.category,
        title: item.title,
        price: item.price,
        unit: item.unit,
        imageUrl: item.imageUrl,
        content: item.content,
        spec: item.spec
      };
      this.favorites.push(obj);
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      this.getFavoriteLength();
      this.$bus.$emit("favorite", this.favorites);
      this.$bus.$emit("like");
      // console.log('加入')
    },
    // 移除我的最愛
    removeFavorite(item) {
      const i = this.favorites.findIndex(el => {
        const result = el.id === item.id;
        return result;
      });
      this.favorites.splice(i, 1);
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      this.getFavoriteLength();
      this.$bus.$emit("favorite", this.favorites);
      this.$bus.$emit("dislike");
      // console.log('移除')
    },
    // 有商品於我的最愛時，icon更換
    getFilteredFavorite(item) {
      // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      return this.favorites.some(el => {
        // console.log(el);
        const result = item.id === el.id;
        return result;
      });
    },
    // 取得我的最愛產品數量
    getFavoriteLength() {
      // if (!JSON.parse(localStorage.getItem('favorite'))) {
      //   console.log('近來')
      //   return;
      // }
      this.favoriteLength = JSON.parse(localStorage.getItem("favorite")).length;
      this.$bus.$emit("favorite", this.favoriteLength);
    },
    getswiper() {
      this.$nextTick(() => {
        var swiper = new Swiper(".swiper-container", {
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
        });
      });
    },
    badgeSearch(str) {
      this.$router.push(`/${str}`).catch(err => {});
      this.$bus.$emit("change");
    },
    //排列價格低到高
    arrayLtoH(item) {
      const vm = this;
      let updateProduct = "";
      updateProduct = "products";
      if (this.$route.params.Str === undefined) {
        // 全部商品
        //  vm.getCategory();
        // return new Promise((resolve, reject)=>{
        //   vm.getCategory();
        //   console.log('跑完')
        //   console.log('全部3',vm.products);
        // })
        return new Promise((resolve, reject) => {
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
          this.$http.get(url).then(response => {
            vm.products = response.data.products; //將回傳資料存在 products
            vm.ProductAll = false; //換頁打開
            // vm.pagination = response.data.pagination; //把分頁資料存起來

            // console.log('全部',vm.products);
            if (item === "lowPrice") {
              // console.log('lowPrice')
              return this[updateProduct].sort(function(a, b) {
                return a.price - b.price;
                // return a[vm.price] < b[vm.price] ? 1 : -1;
              });
            } else if (item === "upPrice") {
              // console.log('upPrice')
              return this[updateProduct].sort(function(a, b) {
                return b.price - a.price;
                //  return a[vm.price] > b[vm.price] ? 1 : -1;
              });
            }
          });
        });
      } else {
        // 篩選商品
        if (item === "lowPrice") {
          // console.log('lowPrice')
          return this[updateProduct].sort(function(a, b) {
            return a.price - b.price;
            // return a[vm.price] < b[vm.price] ? 1 : -1;
          });
        } else if (item === "upPrice") {
          // console.log('upPrice')
          return this[updateProduct].sort(function(a, b) {
            return b.price - a.price;
            //  return a[vm.price] > b[vm.price] ? 1 : -1;
          });
        }
      }
    }
  },

  computed: {
    // isLoading(){
    //   // 讀取 /store/index.js 裡面的屬性
    //   return this.$store.state.isLoading;
    // }
    //  categories() {
    //   return this.$store.state.categories;
    // },
    // products() {
    //   return this.$store.state.products;
    // },
  },
  mounted() {
    // 從frontsidebar傳來
    this.$bus.$on("change", () => {
      // console.log('監聽')
      this.getProductAll();
    });
    this.$bus.$on("removefavoritet", () => {
      // console.log('清除icon');
      this.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
      this.getFavoriteLength();
    });
    this.$bus.$on("refresh", () => {
      // console.log('監聽')
      this.getProducts();
    });
  },
  created() {
    //先抓 localStorage 判斷商品的我的最愛ICON
    this.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    this.getFavoriteLength();
    this.getswiper();
    this.getProducts();
    this.getCart();
    if (this.$route.params.Str == undefined) {
      this.getProducts();
    } else {
      this.getProductAll();
    }
    this.$bus.$emit("change");
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/all";

.item-hover div > a:hover {
  // background: rgba(0, 0, 0, 0.02);
  box-shadow: 3px 3px 10px rgba(227, 219, 208, 0.5);
}
.cart-move {
  width: 100%;
  transition: all 0.5s;

  &:hover i {
    transform: translate(22px, 0);
    transition: transform 0.5s linear;
    color: $primary;
    // transition: all 1s ease;
  }
  &:hover span {
    color: $secondary;
  }
}
.sticky-top {
  position: sticky;
  top: 70px;
  z-index: 999;
  // bottom: 50vh;
}
.d-md-block {
  background: rgba(0, 0, 0, 0.2);
}
.banner-rwd img {
  max-height: 500px;
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
  .banner-rwd img {
    height: 500px;
  }
}
@include pc-top() {
  .m-menu-Sidebar {
    display: none;
  }
  .banner-rwd img {
    height: 400px;
  }
}
@include pc() {
  .menu-ul {
    list-style-type: none;
    .menuSidebar {
      text-decoration: none;
      color: $dark;
      // transition: all .7s;
      font-weight: bold;
      width: 80px;
    }

    a:hover {
      color: $primary;
      position: relative;
    }
  }
  .banner-rwd img {
    height: 400px;
  }
}
@include pad() {
  .banner-rwd img {
    height: 260px;
  }
  .menu-ul {
    list-style-type: none;
    .menuSidebar {
      text-decoration: none;
      color: $dark;
      // transition: all .7s;
      font-weight: bold;
      width: 80px;
    }

    a:hover {
      color: $primary;
      position: relative;
    }
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