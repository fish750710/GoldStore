<template>
    <div>
        <!-- 這頁整合在index -->
        <div class="row mt-4" >
            <div class="col-xl-2"><FrontSidebar/></div>
            <div class="row col-lg-10">
            <div class="col-xl-3 col-md-4 col-sm-6 mb-4 " v-for="item in products" :key="item.id" >
            <div class="card border-0 shadow-sm" v-if="item.is_enabled != 0" >
                <a href="#"  @click.prevent="goDetail(item.id)">
                <div style="height: 200px; background-size: 60%; background-repeat: no-repeat; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                    <!-- <div class="item-like">						
                        <a href="#" class="like"><i class="fa fa-heart"></i></a>
                        <a href="#" class="like-checked" ><i class="fa fa-heart-o"></i></a>		
                    </div> -->
                </div>
                </a>
                <div class="card-body pt-2 pb-2" style="min-height:130px">            
                <h5 class="h6 card-title mb-1" style="min-height:58px">
                    <a href="#" class="text-dark" @click.prevent="goDetail(item.id)">{{ item.title }}</a>
                </h5>
                <div class="d-flex justify-content-between" style="height:25px"> 
                    <p class="card-text text-info">{{ item.content }}</p>
                    <div>
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <span class="badge badge-success float-right ml-2">{{ item.spec }}</span>
                    </div>              
                </div>
                
                <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="h7" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                    <div class="h5 text-danger" v-if="item.price">特價 {{ item.price }} 元</div>
                </div>
                </div>
                
                <button type="button" class="btn btn-info btn-sm col-12 "
                            @click="addtoCart(item.id)">
                    <i class="fas fa-spinner fa-pulse" v-if="item.id === status.loadingItem"> </i>
                    <i class="fas fa-cart-plus" v-else></i>
                            加到購物車
                </button>
                            
                
            </div>
            </div>
            
            </div>
            <div class=" col-xl-2">
            
            </div>
            <div class=" col-xl-10">
            <!-- 分頁 -->
            <!-- <Pagin @postPage="getCategory" :getpagin="pagination"></Pagin> -->
            </div>
            
            
        
        
        </div>
    </div>
</template>

<script>
import FrontSidebar from '@/components/FrontSidebar.vue';

// import Pagin from '@/components/Pagination.vue' //分頁
import $ from 'jquery';

export default {
    components: {
    //   Pagin, //分頁
      FrontSidebar,
    },
    data(){
        return{
            productsOriginal:[],
            products:[],
            // pagination:{}, //分頁
            status:{
                loadingItem:'',
            },
        }
    },
    methods:{
        getCategory () {
            const vm = this
            let array = [];
            let value = '';
             //搜尋
            value = vm.currentPath.params.Str //搜尋關鍵字
                // console.log(value);
            array = vm.productsOriginal.filter((e) => {
                // console.log('過濾', e);
                //關鍵字搜尋標題忽略大小寫
                // return ((e.title === value) || (e.title.indexOf(value) !== -1) || (e.title.toUpperCase().indexOf(value) !== -1) || (e.title.toLowerCase().indexOf(value) !== -1));
            return ((e.brand === value)|| (e.brand.toUpperCase().indexOf(value) !== -1) || (e.brand.toLowerCase().indexOf(value) !== -1)) 
            })
            // vm.productsGetCategory = Object.assign([], array)
            vm.products = Object.assign([], array);
            
        },
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
                $('#productModal').modal('hide'); //關閉 modal
                vm.$store.dispatch('updateLoading', false);
            });
        },
        goDetail(id){
            this.$router.push(`/detail/${id}`).catch(err => {});
        }, 
        

    },
    created() {
        this.getProductAll()
        // this.getCategory()
               
        
    },
    mounted () {
        this.$bus.$on('change', ()=> {
        console.log('監聽')
        this.getProductAll()
        })
    },
}
</script>