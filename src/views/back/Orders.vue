<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <!-- 訂單資訊 -->
        <table class="table mt-0 table-rwd">           
            <thead>
                <th width="100">訂單日期/訂單編號</th>                
                <th width="80" >總金額</th>
                <th width="">聯絡資訊</th>
                <th>產品資訊</th>
                <th width="60">數量</th>
                <th width="90">付款狀態</th>
                <th width="160">備註</th>
                <th width="60">編輯</th>                
            </thead>
            <tbody>
                <tr class="" v-for="(item) in orders" :key="item.id">
                    <!-- 使用 filter date和 currency -->
                    <td  data-th="訂單日期">
                        {{ item.create_at | date}}
                        {{ item.id }}
                    </td>  
                    <!-- <td  data-th="訂單編號">{{ item.id }}</td> -->
                    <td data-th="總金額" class=" ">{{ item.total | currency}}</td> 
                    <td data-th="聯絡資訊">
                        <ul>
                            <li>{{ item.user.name }}</li>
                            <li>{{ item.user.tel }}</li>
                            <li>{{ item.user.address }}</li>
                            <li>{{ item.user.email }}</li>                            
                        </ul>
                    </td>
                    <td data-th="產品資訊">                       
                        <ul>
                            <li v-for="(order_P, i) in item.products" :key="i">
                                {{ order_P.product.title }}
                                ({{ order_P.product.spec }})
                                --{{ order_P.product.content }}

                            </li>
                        </ul>
                    </td>
                    <td  data-th="數量">                                    
                        <ul class="pl-0 qty-rwd" v-for="(order_P, i) in item.products" :key="i">
                                {{ order_P.qty }}
                                {{ order_P.product.unit }}                          
                        </ul>
                        
                    </td>
                    <!-- <td >
                        <span class="text-success" v-if="item.is_paid">已付款</span>
                        <span class="text-danger" v-else>未付款</span>
                    </td> -->
                    <td data-th="付款狀態" class="text-success" v-if="item.is_paid">已付款</td>
                    <td data-th="付款狀態" class="text-danger" v-else>未付款</td>
                   
                    
                    <td data-th="備註">{{ item.message }}</td>
                    
                    <td data-th="編輯" class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openOrder(item)">編輯</button>
                        <!-- <button class="btn btn-outline-danger btn-sm" >刪除</button> -->
                    </td>
                
                </tr>
            </tbody>
        </table>

        <!-- 分頁 -->
        <Pagin @postPage="getOrders" :getpagin="pagination"></Pagin>

        <!-- Modal -->
        <div class="modal fade" id="editorder" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>編輯訂單</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">                   
                        <div class="col-sm-12">                        
                            <div class="form-row">                            
                                <div class="form-group col-md-3">
                                    <label for="name">姓名</label>
                                    <input type="text" class="form-control" id="name"
                                        placeholder="姓名" v-model="tempOrder.user.name">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="tel">電話</label>
                                    <input type="text" class="form-control" id="tel"
                                    placeholder="電話" v-model="tempOrder.user.tel">
                                </div>
                                <div class="form-group col-md-6">
                                <label for="email">Eamil</label>
                                    <input type="text" class="form-control" id="email"
                                    placeholder="email" v-model="tempOrder.user.email">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">地址</label>
                                    <input type="text" class="form-control" id="address"
                                    placeholder="地址" v-model="tempOrder.user.address"
                                >
                            </div>
                            <hr>
                            <div class="form-row" >
                                <div class="form-group col-md-4">
                                <label for="id">訂單編號</label>
                                    <div>{{ tempOrder.id }}</div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="num">數量</label>
                                        <input type="number" class="form-control" id="num"
                                        placeholder="數量" v-model="tempOrder.num" min="1" max="10">
                                        <!-- 後端改數量有問題?? -->
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="price">總價</label>
                                    <div>{{ tempOrder.total | currency}}</div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="price">付款狀態</label>
                                    <div>
                                        <td class="text-success" v-if="tempOrder.is_paid">已付款</td>
                                        <td class="text-danger" v-else>未付款</td>
                                    </div>                                
                                </div>
                            </div>
                            <hr>

                            <div class="form-group">
                            <label for="message">備註</label>
                            <textarea type="text" class="form-control" id="message"
                                placeholder="備註" v-model="tempOrder.message"></textarea>
                            </div>                       
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
                </div>
                </div>
            </div>
        </div>

        
        
    </div>
</template>

<script>
import $ from 'jquery'; //vue 不認識 必須載入jquery
import Pagin from '@/components/Pagination.vue';

export default {
    components: {
         Pagin,
     },
    data(){
        return{
            orders:[],
            isLoading:false,
            pagination:{}, //分頁
            tempOrder:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },               
                
            },            
        };
    },
    methods:{        
        getOrders(page = 1 ){   
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}` 
            const vm = this;
            vm.isLoading = true; //讀取效果
            this.$http.get(api).then((response) =>{
                // console.log(response.data);
                vm.isLoading = false;
                vm.orders = response.data.orders; //儲存到變數裡面
                vm.pagination = response.data.pagination; //把分頁資料存起來
            })
        },
        openOrder(item){
            // console.log(item.user.name)
            this.tempOrder = Object.assign({},item); //避免物件傳參考特性影響，先將item資料傳送到空物件再給tempOrder用
            
            $('#editorder').modal('show'); //顯示
            // console.log(this.tempOrder);
        },
        
        updateOrder(){
            
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
            
            // console.log(vm.tempOrder.id);
            
            //將 tempProduct 的欄位資料放到data物件裡送出
            this.$http.put(api,{ data: vm.tempOrder }).then((response) =>{
                // console.log(response.data);
                if(response.data.success){
                    $('#editorder').modal('hide'); //關閉
                    this.$bus.$emit('messsage:push', response.data.message, 'success');
                    vm.getOrders(); //重新取得畫面資料
                }else{
                    $('#editorder').modal('hide'); //關閉
                    this.$bus.$emit('messsage:push', response.data.message, 'danger');
                    vm.getOrders(); //重新取得畫面資料
                    // console.log('新增失敗');
                };
            })
        }, 

        
        

    },
    created() {
        this.getOrders();
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

@media (max-width: 736px) {
  .table-rwd{min-width: 100%;}
  /*針對tr去做隱藏*/
  tr.tr-only-hide {display: none !important;}
  /*讓tr變成區塊主要讓他有個區塊*/
  thead{
      display: none;
  }
  .qty-rwd{
        display: inline-block;
  }
  .table-rwd tr{
    display: block;
    border: 1px solid #ddd;
    margin-top: 5px;
  }
  .table-rwd td {
    text-align: left;
    font-size: 15px;
    overflow: hidden;
    width: 100%;
    display: block;
	}
	.table-rwd td:before {
    /*最重要的就是這串*/
    content: attr(data-th) " : ";
    /*最重要的就是這串*/
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
	  margin-right: 10px;
    color: #D20B2A;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,.table-rwd.table-bordered th,.table-rwd.table-bordered{border:0;}
  
}
</style>