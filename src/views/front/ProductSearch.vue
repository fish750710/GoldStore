<template>
  <div>
        
        <div class=" h4 my-5 pt-5 text-info d-flex justify-content-center" >
          <span class="">搜尋結果：</span>
           <span v-if="products.length == 0">很抱歉，找不到您想要的商品</span>
        </div>

       <div class=" mt-4" >
         <!-- <div class="col-lg-2">
           
         </div> -->
        
        <div class="row col-lg-12">
          <div class="col-xl-3 col-md-4 col-sm-6 mb-4 item-hover " v-for="item in products" :key="item.id" >
          <div class="card border-0 shadow-sm " v-if="item.is_enabled != 0" >
            <a href="#"  @click.prevent="goDetail(item.id)">
              <div style="height: 200px; background-size: 60%; background-repeat: no-repeat; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}"> </div>
            </a>
            <a href="#">
              <i class="fas fa-heart text-danger position-absolute " v-if="getFilteredFavorite(item)" @click.prevent="removeFavorite(item)" style="top:20px;right:20px; font-size:20px"></i>
              <i class="far fa-heart text-danger position-absolute" v-else @click.prevent="addFavorite(item)" style="top:20px;right:20px; font-size:20px"></i>
            </a>
            <div class="card-body pt-2 pb-2" style="min-height:130px">            
              <h5 class="h6 card-title mb-1" style="min-height:58px">
                <a href="#" class="text-dark font-weight-bold text-decoration-none" @click.prevent="goDetail(item.id)">{{ item.title }}</a>
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
            
              <button type="button" class="btn btn-primary btn-sm col-12 cart-move"
                          @click="addtoCart(item.id)">
                <i class="fas fa-spinner fa-pulse text-white" v-if="item.id === status.loadingItem"> </i>
                <i class="fas fa-cart-plus text-white" v-else></i>
                <span class="ml-4 text-white">加到購物車</span>
            </button>
                          
            
          </div>
        </div>
        
        </div>
        
    </div> 
    
  </div>
</template>

<script>
// import FrontNavbar from '@/components/FrontNavbar.vue';
// import Alert from '@/components/AlertMsg.vue';

// import Pagin from '@/components/Pagination.vue' //分頁
import $ from 'jquery';

export default {
    components: {
      // Pagin, //分頁
      // FrontNavbar,
      // Alert,
  },
  data() {
    return {
      // productsInfiniteScrollCount: 4,
      productsOriginal: [],
      // productsGetCategory: [],
      products: [],
      // pagination:{}, //分頁
      // isLoading: false,
      product:{}, //單筆資料
      status:{
        loadingItem:'',
      },
      favorites: [],
      favoriteLength: 0,
      // cart:{
      //   carts:{
      //     length:[],
      //   }
      // },
      // coupon_code:'',
      // coupon_msg:'',
      // form:{
      //   user:{
      //     name:'',
      //     email:'',
      //     tel:'',
      //     address:'',
      //   },
      //   message:'',
      // },
           
    };
  },
  methods: {
    // getProducts(page = 1) {
    //   //  this.$store.dispatch('getProducts');
    //   const vm = this;
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
    //   vm.$store.dispatch('updateLoading', true);      
      
    //   this.$http.get(url).then((response) => {
    //     vm.products =  response.data.products; //將回傳資料存在 products
    //     // console.log(response);
    //     vm.$store.dispatch('updateLoading', false);
        
    //     vm.pagination = response.data.pagination; //把分頁資料存起來
      
    //   });
    // },
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
    //加入購物車
    addtoCart(id ,qty = 1){ // id 和 數量 預設=1
      //  this.$store.dispatch('addtoCart', { id, qty });
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id; //點選到的選項 loading動畫
      vm.$store.dispatch('updateLoading', true);
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post( url, { data: cart }).then((response) => {        
        // console.log(response);              
        vm.status.loadingItem = ''; //開啟後動畫清空
        // vm.getCart(); //取得購物車內容
        // $('#productModal').modal('hide'); //關閉 modal
        vm.$store.dispatch('updateLoading', false);
        this.$bus.$emit('refreshCart');   
      });
    },
    getCategory () {
      const vm = this
      let array = [];
      let value = '';
      if (vm.currentPath.name !== 'Search') {        
        value = vm.currentPath.params.productCategory
        // console.log(value);
        array = vm.productsOriginal.filter((e) => {
          return (e.category === value) && (e.is_enabled === 1)
        })
      } else {
        //搜尋
        value = vm.currentPath.params.searchStr //搜尋關鍵字

        // console.log(value);
        array = vm.productsOriginal.filter((e) => {
          // console.log('過濾', e);
          //關鍵字搜尋標題忽略大小寫
          return ((e.title === value) || (e.title.indexOf(value) !== -1) || (e.title.toUpperCase().indexOf(value) !== -1) || (e.title.toLowerCase().indexOf(value) !== -1));
        })
      }
      vm.products = Object.assign([], array)      
    },
    // 撈全部
    getProductAll(){
      const vm = this
      vm.currentPath = vm.$route            
      // console.log(vm.currentPath);        
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;        
      // vm.isLoading = true
      this.$http.get(api).then((response) => {
      // console.log('getProducts', response.data)
      vm.productsOriginal = response.data.products   
      this.getCategory()    
      // console.log(vm.pagination);
      // vm.isLoading = false            
      })
    },  
    goDetail(id){
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
        imageUrl:item.imageUrl,
        content: item.content,
        spec:item.spec,
      };
      this.favorites.push(obj);
      localStorage.setItem('favorite', JSON.stringify(this.favorites));
      this.getFavoriteLength();
      this.$bus.$emit('favorite', this.favorites);
      this.$bus.$emit('like');
    },
    // 移除我的最愛
    removeFavorite(item) {
      const i = this.favorites.findIndex((el) => {
        const result = el.id === item.id;
        return result;
      });
      this.favorites.splice(i, 1);
      localStorage.setItem('favorite', JSON.stringify(this.favorites));
      this.getFavoriteLength();
      this.$bus.$emit('favorite', this.favorites);
      this.$bus.$emit('dislike');
    },
    // 有商品於我的最愛時，icon更換
    getFilteredFavorite(item) {
      // 將撈出來的favorites和畫面上item比對，ID一樣回傳 true
      return this.favorites.some((el) => {
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
      this.favoriteLength = JSON.parse(localStorage.getItem('favorite')).length;
      this.$bus.$emit('favorite', this.favoriteLength);
    },
    // 取得購物車內容
    // getCart() {
      
    //   const vm = this;
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    //   vm.$store.dispatch('updateLoading', true);
     
    //   this.$http.get(url).then((response) => {
    //     // vm.products =  response.data.products; //將回傳資料存在 products
    //     vm.cart = response.data.data;
    //     // console.log(vm.cart);
    //     vm.$store.dispatch('updateLoading', false);
        
    //     // vm.pagination = response.data.pagination; //把分頁資料存起來
      
    //   });
    // },
        
  },
  
  computed:{
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
  mounted () {
    // 從frontsidebar傳來
    this.$bus.$on('search', ()=> {
    // console.log('監聽')
      this.getProductAll()
    })
    // 從frontsidebar傳來
    this.$bus.$on('change', ()=> {
    // console.log('監聽')
      this.getProductAll()
    })
    this.$bus.$on('removefavoritet',()=>{
      // console.log('清除icon2');
      this.favorites = JSON.parse(localStorage.getItem('favorite')) || [];
      this.getFavoriteLength();
    })
  },
  created() {
     //先抓 localStorage 判斷商品的我的最愛ICON
    this.favorites = JSON.parse(localStorage.getItem('favorite')) || [];
    this.getFavoriteLength();
    this.getProductAll();
    // this.getCategory()
    // const vm = this
    // vm.currentPath = vm.$route
    // // console.log(vm.currentPath);
    // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
    // // vm.isLoading = true
    // this.$http.get(api).then((response) => {
    //   // console.log('getProducts', response.data)
    //   vm.productsOriginal = response.data.products
    //   // console.log(vm.productsOriginal);
    //   // vm.isLoading = false
    // }).then(() => {
    //   vm.getCategory()
    // }).then(() => {
      // if (vm.products.length > vm.productsInfiniteScrollCount) {
      //   window.addEventListener('scroll', vm.debounce(vm.scrollToLoading, 300))
      // } else {
      //   console.log('stop scroll', vm.products.length, vm.productsInfiniteScrollCount)
      // }
    // })
  },
};
</script>


<style lang="scss" scoped>

$primary:    #50CBCB;
$secondary:  #CED3D3;
$info:       #AAAAAA;
$dark:       #5E5E5E;

.item-hover div>a:hover{
  // background: rgba(0, 0, 0, 0.02);
  box-shadow: 3px 3px 10px rgba(227,219,208, .5);
}

.cart-move{
  width:100%; 
  transition: all 0.5s;
  
  &:hover i{
    transform: translate(22px, 0);
    transition: transform 0.5s linear;
    color:$primary;
    // transition: all 1s ease;
  }
  &:hover span{
    color:$secondary;
  }

}




// @media (max-width:320px) {

// }
</style>