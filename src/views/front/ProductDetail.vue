<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 col-sm-12 my-5 text-center">
          <!-- <img :src="product.imageUrl" alt width="500px" /> -->
          <pic-zoom :previewImg="product.imageUrl" :zoomImg="product.imageUrl"></pic-zoom>
        </div>

        <div class="col-md-4 col-sm-12 my-5">
          <h4>{{ product.title }}</h4>
          <h5 class="text-info">{{ product.spec }} {{ product.content }}</h5>
          <a href="#">
            <i class="fas fa-heart text-danger position-absolute" v-if="getFilteredFavorite(product)"
              @click.prevent="removeFavorite(product)" style="top:5px;right:15px; font-size:20px"></i>
            <i class="far fa-heart text-danger position-absolute" v-else
              @click.prevent="addFavorite(product)" style="top:5px;right:15px; font-size:20px"></i>
          </a>
          <a href="#" class="badge badge-warning ml-2" @click.prevent="badgeSearch">{{ product.brand }}</a>
          <a href="#" class="badge badge-info ml-2" @click.prevent="badgeSearch">{{ product.category }}</a>
          <a href="#" class="badge badge-secondary ml-2" @click.prevent="badgeSearch">{{ product.content }}</a>
          <a href="#" class="badge badge-success ml-2" @click.prevent="badgeSearch">{{ product.spec }}</a>
          
          <div class="h5 text-right" v-if="product.origin_price">
            <del>{{ product.origin_price * quantity | currency }} 元</del>
          </div>
          <div class="h2 text-danger text-right">{{ product.price * quantity | currency}} 元</div>
          <hr />
          <div class="text-left text-l">購買數量</div>
          <div class="h6 text-right" v-if="product.stock > 5">庫存：{{ product.stock }} 件</div>
          <div class="h6 text-right text-danger" v-if="product.stock < 5">只剩最後 {{ product.stock }} 件</div>
          <div class="h6 text-right text-danger" v-if="product.stock == 0">補貨中</div>

          <select name class="form-control mt-3" v-model="quantity" v-if="product.stock != 0">
            <!-- <option :value="num" disabled selected>--請選擇--</option> -->
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
              class="btn btn-primary btn-sm col-5 text-white"
              @click="addtoCart(product.id, quantity)"
            >
              <i class="fas fa-spinner fa-pulse" v-if="product.id === status.loadingItem"></i>
              <i class="fas fa-cart-plus" v-else></i>
              加到購物車
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm col-5"
              @click="goCheckOuter(product.id, quantity)"
            >
              <i class="fas fa-spinner fa-pulse" v-if="product.id === status.loadingItem"></i>
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




      <div class="h5 text-center swiper-like-rwd"><i class="fas fa-heart text-danger mr-2"></i>猜你喜歡</div>
      <div class="swiper-container swiper-like-rwd" v-if="filterdata.length > 0">
        <div class="swiper-wrapper py-5">
          <div class="swiper-slide " v-for="item in filterdata" :key="item.id" >
            <div class="card border-0 bg-transparent" v-if="item.is_enabled" >
              <!-- <a href="#" @click="sameProduct(item.id)"> -->
                <img class="card-img-top" alt="..." :src="item.imageUrl" style="max-width:200px" />
              <!-- </a> -->
              <div class="card-body px-0" >
                <div class="m-0">
                    <a href="#" class="h6 text-primary text-decoration-none" >{{ item.title }} </a>
                </div>
                <div class="d-flex justify-content-between mt-2">
                    <del class="h7 text-muted" v-if="item.origin_price > 0">原價 {{ item.origin_price | currency }} 元</del>
                  <div  v-if="!item.price">
                    <span class="h5 text-danger">{{ item.origin_price | currency }}元</span>
                  </div>
                  <div  v-if="item.price">
                    <span class="h5 text-danger">{{ item.price | currency }}元</span>
                  </div>
                </div>     
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <!-- 查看更多 model
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" >
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <img :src="product.imageUrl" class="img-fluid" alt="">
                <blockquote class="blockquote mt-3">
                <p class="mb-0">{{ product.content }}</p>
                <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                </blockquote>
                <div class="d-flex justify-content-between align-items-baseline">
                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                </div>
                <select name="" class="form-control mt-3" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">
                    選購 {{num}} {{product.unit}}
                </option>
                </select>
            </div>
            <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                小計 <strong>{{ product.num * product.price }}</strong> 元
                </div>
                <button type="button" class="btn btn-primary"
                @click="addtoCart(product.id, product.num)">
                <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                加到購物車
                </button>
            </div>
            </div>
        </div>
    </div>-->
  </div>
</template>


<script>
import PicZoom from "@/components/PicZoom.vue"; //放大鏡
import Swiper from 'swiper'
import $ from "jquery";

export default {
  components: {
    PicZoom,
  },
  data() {
    return {
      product: {
        stock: ""
        // imageUrl:'',
      },
      productId: "",
      productIdS: "",
      status: {
        loadingItem: ""
      },
      quantity: 1,
      favorites: [],
      favoriteLength: 0,
      smallImg: "", //小圖
      bigImg: "", //大圖
      products: [],
      
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;      
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id; //點選到的選項 loading動畫
      vm.$http.get(url).then(response => {
        vm.product = response.data.product; //將回傳資料存在 product
         //類別
        // $('#productModal').modal('show'); //開啟 modal
        // console.log(vm.products);

        vm.status.loadingItem = ""; //開啟後動畫清空
      });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;        
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products;
      });    
    },
    
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
        // console.log(item);
        const result = item.id === el.id;
        return result;
      });
      this.getProduct(item.id);
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
    badgeSearch(e) {
      let str = e.target.firstChild.nodeValue;
      // console.log(e.target.firstChild);
      this.$router.push(`/search/${str}`).catch(err => {});
    },
    goCheckOuter(id, quantity) {
      this.addtoCart(id, quantity);
      this.$router.push("/checkout").catch(err => {});
      this.$bus.$emit("refreshCheckOut");
    },
    getswiper() {
      this.$nextTick(() => {
        setTimeout(() => {
          new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 40,
            loop: true,
            speed: 2000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false
            }
          })
        }, 800)
      })
    },
    
  },
  
  computed: {
    // filterdata:{
    //   get(){
    //       const vm = this;
    //       vm.filteritem = vm.products.filter((item, i) => {
    //         // console.log(item);
    //         if (vm.product.title != item.title) {
    //           return item.category == vm.product.category
    //         }
    //       })
    //       return vm.filteritem
    //   },
    //   set(){

    //   },
    // },
    
    filterdata() {
      const vm = this;
      
      return vm.filteritem = vm.products.filter((item, i) => {
        // console.log(item);
        if (vm.product.title != item.title) {
          return item.category == vm.product.category
        }
        
      });
    },   
  },

  mounted() {
    // // 從frontsidebar傳來
    // this.$bus.$on('change', ()=> {
    // // console.log('監聽')
    //   this.getProductAll()
    // })
    this.$bus.$on("removefavoritet", () => {
      // console.log('清除icon');
      this.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
      this.getFavoriteLength();
    });
    
  },
  created() {
    const vm = this;
    vm.productId = vm.$route.params.productId;
    // console.log(vm.currentPath.params.productId);
    vm.getProduct(vm.productId);
    vm.getswiper();

    // 購物車和收藏更新畫面
    vm.$bus.$on("refreshDetail", () => {
      // console.log('refreshDetail',id);
      vm.productId = vm.$route.params.productId;
      vm.getProduct(vm.productId);
    });
    //先抓 localStorage 判斷商品的我的最愛ICON
    vm.favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    vm.getFavoriteLength();   
  }
  
};
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
  .swiper-like-rwd{
    display: none;
  }

}
@include m480() {

}
@include iphone5() {

}

</style>


