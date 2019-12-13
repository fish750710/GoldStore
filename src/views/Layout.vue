<template>
    <div>
      <FrontNavbar/>
      <router-view></router-view>    
      <Top/>
      <FrontFooter/>
      <!-- <div class="container-fluid"> -->
            <!-- <div class="row">   -->
              
              
                <!-- <div class="col-md-2 ml-sm-auto col-lg-2 my-5">
                  <FrontSidebar/>
                </div> -->
                <!-- <main role="main" class="col-md-10 ml-sm-auto col-lg-12 mt-2">  
                             
                                  
                </main>
                  
            </div> -->
      <!-- </div> -->

      
        
    </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';
import Top from '@/components/Top.vue'
import FrontFooter from '@/components/FrontFooter.vue';
// import FrontSidebar from '@/components/FrontSidebar.vue';
// import Alert from '@/components/AlertMsg.vue';

// import Pagin from '@/components/Pagination.vue' //分頁
import $ from 'jquery';

export default {
    components: {
      // FrontSidebar,
      // Pagin, //分頁
      FrontNavbar,
      Top,
      FrontFooter,
      // Alert,
  },
  data() {
    return {
      products: [],
      pagination:{}, //分頁
      // isLoading: false,
      product:{}, //單筆資料
      ischange:false,      
      successStatus:false,
      status:{
        loadingItem:'',
      },
      cart:{
        carts:{
          length:[],
        }
      },
      coupon_code:'',
      coupon_msg:'',
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },
      user:{
          username:'',
          password:'',
      },
      message:'',



      
      // carts: [],
      // cartsLength: 0,
      // status: {
      //   isLoading: false,
      //   isCheckOut: false,
      // },
    };
    
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;      
      vm.$store.dispatch('updateLoading', true);//使用 VUEX actions:操作行為
      this.$http.get(url).then((response) => {
        vm.products =  response.data.products; //將回傳資料存在 products
        // console.log(response);
        
        vm.$store.dispatch('updateLoading', false);
        vm.pagination = response.data.pagination; //把分頁資料存起來
      
      });
    },
    getProduct(id){
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id; //點選到的選項 loading動畫
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;  //將回傳資料存在 product
        $('#productModal').modal('show'); //開啟 modal
        // console.log(response);
              
        vm.status.loadingItem = ''; //開啟後動畫清空
      });  
    },
    //加入購物車
    addtoCart(id ,qty = 1){ // id 和 數量 預設=1
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id; //點選到的選項 loading動畫
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post( url, { data: cart }).then((response) => {        
        // console.log(response);              
        vm.status.loadingItem = ''; //開啟後動畫清空
        vm.getCart(); //取得購物車內容
        $('#productModal').modal('hide'); //關閉 modal
      });
    },
    // 取得購物車內容
    getCart() {
      // this.$store.dispatch('getCart');
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$store.dispatch('updateLoading', true);
      // vm.isLoading = true;
      this.$http.get(url).then((response) => {
        // vm.products =  response.data.products; //將回傳資料存在 products
        vm.cart = response.data.data;
        // console.log(response);
        vm.$store.dispatch('updateLoading', false);
        // vm.isLoading = false;
        // vm.pagination = response.data.pagination; //把分頁資料存起來
      
      });
    },
    //刪除購物車內容
    removeCartItem(id){
      // this.$store.dispatch('removeCart', id);
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$store.dispatch('updateLoading', true);
      // vm.isLoading = true;
      this.$http.delete(url).then(() => {        
        vm.getCart(); //重新取得購物車內容
        vm.$store.dispatch('updateLoading', false); //讀取效果關閉   
        // vm.isLoading = false;    
      });
    },
    //增加優惠卷
    addCouponCode(){
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon={
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(url,{ data: coupon }).then((response) => {  
        // console.log(response);      
        vm.coupon_msg = response.data.message;
        vm.getCart(); //重新取得購物車內容        
        vm.$store.dispatch('updateLoading', false); //讀取效果關閉       
      });
    },
    // 新增訂單
    createOrder(){
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$store.dispatch('updateLoading', true);

       this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            // console.log('訂單已建立', response);
            // vm.getCart();
            if(response.data.success){
              // console.log('準備跳轉也面');
              vm.$router.push(`/customer_checkout/${response.data.orderId}`); // $router 轉換頁面
            }
            vm.$store.dispatch('updateLoading', false);
          });
        } else {
          console.log('欄位不完整');
        }
      });
      
    },
    //open 登入model 
    openLogin(){               
            this.message='';             
            this.user.password='';
            $('#loginModel').modal('show'); //顯示
            // console.log(this.tempOrder);
    },
    //登入
    signin(){      
            //對應config/dev.env.js檔案的環境變數
        const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
        const vm = this;
        this.$http.post(api,vm.user).then((response) =>{
            // console.log(response.data);
            vm.message =  response.data;
            
            if(response.data.success){
              vm.successStatus = true;
                //登入成功跳轉首頁
                $('#loginModel').modal('hide'); //關閉
                // vm.$router.push('/admin/Products');
                
            }else{
              vm.successStatus = false;
            }
        })
    },
    //切換登入或註冊畫面
    changeSign(change){      
      if(change){
        // 註冊        
        this.ischange = true;
        this.message = '';
      }else{
         this.ischange = false;
         this.message = '';
      }
    },
    //註冊
    signup(){
      this.message = '尚未開放註冊';
    },
    //檢查登入狀態
    issuccess(){        
        const vm = this;
        const url =`${process.env.VUE_APP_APIPATH}/api/user/check`;
        this.$http.post(url).then((response) => {
        
        if (response.data.success) {
          //檢查用戶是否仍持續登入狀態          
          // console.log(response.data.success);
          vm.successStatus = true;
        }else{
          //  console.log(response.data.success);
          vm.successStatus = false;
        }
      })
    },
    // 登出
    signout() {      
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(url).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.successStatus = false;
          this.$bus.$emit('messsage:push', response.data.message, 'success');
          // console.log('登出')                 
        }else{
           vm.successStatus = true;
        }
      });
    },
    // 導頁到管理商品
    goProducts(){
      this.$router.push('/admin/Products').catch(err => {});
    },
    goUserOrders(){
      this.$router.push('/userorders').catch(err => {});
    },
    goCheckOuter(){
      $('#cartModal').modal('hide');
      this.$router.push('/checkout').catch(err => {});
    },
    goIndex(){
      // 購物去按鈕
      this.$router.push('/').catch(err => {});
    },
            
  },
  computed:{
    isLoading(){
      // 讀取 /store/index.js 裡面的屬性
      return this.$store.state.isLoading;
    },
    //  cart() {
    //   return this.$store.state.cart;
    // },
  }, 
  created() {
    this.getProducts();
    this.getCart();
    this.issuccess(); 
     
  },
 
   
};
</script>

<style lang="scss" scoped>

.fb-btn{
  background: #3b5998;
}
.line-btn{
  background: #00c300;  
}
.fb-font{
  color: #fff;
  font-size:13px;
  padding:0 5px;
}
.line-font{
  color: #fff;
  font-size:13px;
  padding:0 17px;
}
.search_query_top{
    // display: inline;
    margin-top: 5px;
    padding: 0px 40px 0px 10px;
    line-height: 30px;
    background: #f5f5f5;
    // border: none;
    border-radius: 5px;
    // box-shadow: none;
    font-size: 13px;
    font-weight: 400;
}
.search{
  font-size:18px;
}

.ico-search{
  position: relative;
  right:50px;
  color:rgb(60, 182, 4);
}
.menu-top{
  margin:10px 20px 5px 20px;
  padding:0;
  font-size: 18px;
  
}
.menu-top i:hover{
   color:rgb(60, 182, 4);
}



    
@media (max-width:768px) { 
  // .container-fluid{
  //   max-width: 500px;
  // }
}



@media (max-width:320px) {
  .fb-font{
    font-size:12px;
    padding:0;
  }
  .line-font{
    font-size:12px;
    padding:0;
  }
  // .container-fluid{
  //   max-width: 300px;
  // }
}


</style>