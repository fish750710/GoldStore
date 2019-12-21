<template>
  <div>
    <div class="h4 my-5 pt-5 text-info d-flex justify-content-center">
      <span class>搜尋結果：</span>
      <span v-if="products.length == 0">很抱歉，找不到您想要的商品</span>
    </div>
    <div class="mt-4">
      <div class="row col-lg-12">
        <div
          class="col-xl-3 col-md-4 col-sm-6 mb-4 item-hover"
          v-for="item in products"
          :key="item.id"
        >
          <div class="card border-0 shadow-sm" v-if="item.is_enabled != 0">
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
              <div class="d-flex justify-content-between" style="height:25px">
                <p class="card-text text-info font-weight-bold">{{ item.content }}</p>
                <div>
                  <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                  <span class="badge badge-success float-right ml-2">{{ item.spec }}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h7" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5 text-danger font-weight-bold" v-if="item.price">特價 {{ item.price }} 元</div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm col-12 cart-move"
              @click="addtoCart(item.id)"
              style="border-top-left-radius:0px ; border-top-right-radius:0px "
            >
              <i class="fas fa-spinner fa-pulse text-black" v-if="item.id === status.loadingItem"></i>
              <i class="fas fa-cart-plus text-black" v-else></i>
              <span class="ml-4 text-black">加到購物車</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  components: {},
  data() {
    return {
      productsOriginal: [],
      products: [],
      product: {}, //單筆資料
      status: {
        loadingItem: ""
      },
      favorites: [],
      favoriteLength: 0
    };
  },
  methods: {
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
          let added = 0;
          for (let i = 0; i < vm.cartItem.length; i++) {
            if (id == vm.cartItem[i].product_id) {
              added = 1; //新增
              //刪除購物車內容
              const removeurl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.cartItem[i].id}`;
              this.$http.delete(removeurl).then(() => {});
              // 新增
              let itemQty = vm.cartItem[i].qty; //原購物車商品數量
              const cart = {
                product_id: id,
                qty: qty + itemQty
              };
              this.$http.post(url, { data: cart }).then(response => {
                vm.status.loadingItem = ""; //開啟後動畫清空
                $("#productModal").modal("hide");
                // vm.$store.dispatch('updateLoading', false);
                this.$bus.$emit("refreshCart");
              });
            } else {
              // forLoop全部跑完，無重複商品且要新增才新增，
              if (i == vm.cartItem.length - 1 && added == 0) {
                // console.log('無重複')
                const cart = {
                  product_id: id,
                  qty
                };
                this.$http.post(url, { data: cart }).then(response => {
                  vm.status.loadingItem = "";
                  $("#productModal").modal("hide");
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
            vm.status.loadingItem = "";
            $("#productModal").modal("hide");
            // vm.$store.dispatch('updateLoading', false);
            this.$bus.$emit("refreshCart");
          });
        }
        vm.$bus.$emit("messsage:push", "已加入購物車", "success");
      });
    },
    getCategory() {
      const vm = this;
      let array = [];
      let value = "";
      if (vm.currentPath.name !== "Search") {
        value = vm.currentPath.params.productCategory;
        array = vm.productsOriginal.filter(e => {
          return e.category === value && e.is_enabled === 1;
        });
      } else {
        //搜尋
        value = vm.currentPath.params.searchStr; //搜尋關鍵字
        array = vm.productsOriginal.filter(e => {
          //關鍵字搜尋標題忽略大小寫
          return (
            e.title === value ||
            e.title.indexOf(value) !== -1 ||
            e.title.toUpperCase().indexOf(value) !== -1 ||
            e.title.toLowerCase().indexOf(value) !== -1
          );
        });
      }
      vm.products = Object.assign([], array);
    },
    // 撈全部
    getProductAll() {
      const vm = this;
      vm.currentPath = vm.$route;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(api).then(response => {
        vm.productsOriginal = response.data.products;
        this.getCategory();
      });
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`).catch(err => {});
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
    },
    // 有商品於我的最愛時，icon更換
    getFilteredFavorite(item) {
      // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      return this.favorites.some(el => {
        const result = item.id === el.id;
        return result;
      });
    },
    // 取得我的最愛產品數量
    getFavoriteLength() {
      this.favoriteLength = JSON.parse(localStorage.getItem("favorite")).length;
      this.$bus.$emit("favorite", this.favoriteLength);
    }
  },

  computed: {},
  mounted() {
    // 從frontsidebar傳來
    this.$bus.$on("search", () => {
      // console.log('監聽')
      this.getProductAll();
    });
    // 從frontsidebar傳來
    this.$bus.$on("change", () => {
      // console.log('監聽')
      this.getProductAll();
    });
    this.$bus.$on("removefavoritet", () => {
      this.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
      this.getFavoriteLength();
    });
  },
  created() {
    //先抓 localStorage 判斷商品的我的最愛ICON
    this.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    this.getFavoriteLength();
    this.getProductAll();
  }
};
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
    color: $primary;
  }
  &:hover span {
    color: $secondary;
  }
}
</style>