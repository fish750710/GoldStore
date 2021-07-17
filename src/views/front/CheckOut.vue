<template>
  <div>
    <ul class="d-flex justify-content-center align-items-center mt-5 pt-5 pl-1 pr-1" style="list-style-type:none;">
      <li class="mb-0 p-2 text-white font-weight-bold shop-title-rwd bg-dark rounded" style="border:1px white solid;">
        <p class="mb-0">1 購物資訊</p>
      </li>
      <li><i class="fas fa-angle-double-right animated infinite slideOutRight mr-3 pr-3"></i></li>
      <li class="mb-0 p-2 mr-1 rounded" style="border:1px black solid; ">2 訂單資訊</li>
      <li><i class="fas fa-angle-double-right mr-1 text-info"></i></li>
      <li class="mb-0 p-2 mr-1 rounded" style="border:1px black solid; ">3 完成訂購</li>
      <li><i class="fas fa-angle-double-right mr-1 text-info"></i></li>
      <li class="mb-0 p-2 mr-1 rounded" style="border:1px black solid; ">4 付款完成</li>
    </ul>
    <!-- 購物車內容 -->
    <div class="container">
      <div class="row justify-content-center" v-if="cart.carts.length > 0">
        <div class="col-md-12 my-5">
          <h3 class="text-dark font-weight-bold">購物清單</h3>
          <div class="table-responsive-sm">
            <table class="table table-rwd">
              <thead>
                <th></th>
                <th>商品</th>
                <th class="text-center" width="150">數量/價格</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="p-1" data-th="商品圖片">
                    <a href="#" @click="goDetail(item.product.id)">
                      <img :src="item.product.imageUrl" class="p-1 border" />
                    </a>
                  </td>
                  <td class="align-middle" data-th="商品">
                    <a
                      href="#"
                      class="text-decoration-none text-dark"
                      @click="goDetail(item.product.id)"
                    >{{ item.product.title }}</a>
                    <div class="text-warning" v-if="item.coupon">
                      <i class="fas fa-ticket-alt"></i>
                      已套用優惠券
                    </div>
                  </td>
                  <td
                    class="align-middle table-num-rwd-input d-flex justify-content-between pt-1 pb-1 align-items-center"
                    data-th="數量"
                  >
                    <div class="d-flex">
                      <button class="btn pt-0" @click.prevent="minusQty( item )" >
                        <i class="fas fa-minus"></i>
                      </button>
                      <input
                        type="tel"
                        name="qty"
                        class="form-control text-center qty"
                        @blur="inputQty(item)"
                        :value="item.qty"
                        style="width:60px; height:30px"
                      />
                      <button class="btn pt-0" @click.prevent="addQty( item )">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td
                    class="align-middle text-right d-flex justify-content-between align-items-center"
                    data-th="單價"
                  >
                    {{ item.product.price | currency }} x {{ item.qty }}
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCartItem(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="text-right">
                <tr>
                  <td colspan="3" data-th="總計" class="text-right text-danger font-weight-bold">
                    總計
                    <span class="font-weight-bold h5">{{ cart.total | currency }}</span>
                  </td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" data-th="折扣價" class="text-right text-success">
                    折扣價
                    <span class="h5">{{ cart.final_total | currency}}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="d-flex justify-content-start">
            <div class="input-group mb-3" style="width:300px">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="addCouponCode">套用優惠碼</button>
              </div>
            </div>
            <div class="ml-3 text-warning h5">{{ coupon_msg }}</div>
          </div>
          <div class="d-flex justify-content-between btn-rwd">
            <button type="button" class="btn btn-secondary">
              <router-link class="nav-link pt-0 pb-0" to="/">
                <i class="fas fa-backspace pl-3 text-dark">
                  <span class="pl-2 h6 font-weight-bold ">繼續購物</span>
                </i>
              </router-link>
            </button>
            <button type="button" class="btn btn-danger">
              <router-link class="nav-link pt-0 pb-0 text-white" to="/checkout2">
                <i class="fas fa-arrow-alt-circle-right">
                  <span class="pl-2 h6 font-weight-bold">確認訂單</span>
                </i>
              </router-link>
            </button>
          </div>
        </div>
      </div>
      <div class="text-center h4 align-self-center" v-else style="height:200px">
        空無一物
        <div>
          <button
            type="button"
            class="btn btn-outline-danger mt-3"
            data-dismiss="modal"
            aria-label="Close"
            @click="goIndex"
          >購物去</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
export default {
  components: {},
  data () {
    return {
      coupon_code: '',
      coupon_msg: ''
    }
  },
  methods: {
    ...mapActions(['getCart']), // 取得購物車內容
    // 加入購物車
    addtoCart (id, qty) {
      this.$store.dispatch('addtoCart', { id, qty })
    },
    // 刪除購物車內容
    removeCartItem (id) {
      this.$store.dispatch('removeCart', id)
    },
    // 增加優惠卷
    addCouponCode () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      this.$http.post(url, { data: coupon }).then(response => {
        vm.coupon_msg = response.data.message
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    // 增加數量
    addQty (item) {
      this.$store.dispatch('addQty', item)
    },
    // 減少數量
    minusQty (item) {
      this.$store.dispatch('minusQty', item)
    },
    // 改變數量
    inputQty (item) {
      let qty = parseInt($('input.qty').val())
      this.$store.dispatch('inputQty', { item, qty })
    },
    goDetail (id) {
      this.$router.push(`/detail/${id}`).catch(err => (err))
      this.$bus.$emit('refreshDetail')
    },
    goIndex () {
      this.$router.push('/').catch(err => (err))
    }
  },
  mounted () {
    this.$bus.$on('refreshCheckOut', () => {
      this.getCart()
    })
  },
  computed: {
    ...mapGetters(['cart'])
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

@include desktop-top() {
  .shop-title-rwd p {
    font-size: 24px;
  }
  .table-rwd td {
    img {
      width: 100px;
    }
  }
}
@include pc-top() {
  .table-rwd td {
    img {
      width: 100px;
    }
  }
}
@include pc() {
  .table-price-rwd {
    width: 80px;
  }
  .table-num-rwd {
    width: 50px;
  }
  .shop-title-rwd p {
    font-size: 24px;
  }
  .table-rwd td {
    img {
      width: 100px;
    }
  }
}
@include pad() {
  .table-rwd {
    min-width: 100%;
  }
  /*針對tr去做隱藏*/
  tr.tr-only-hide {
    display: none !important;
  }
  /*讓tr變成區塊主要讓他有個區塊*/
  thead {
    display: none;
  }
  .qty-rwd {
    display: inline-block;
  }
  .table-rwd tr {
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
    img {
      width: 100px;
    }
  }
  .table-rwd td:before {
    /*最重要的就是這串*/
    content: attr(data-th) " : ";
    /*最重要的就是這串*/
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
    color: #d20b2a;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,
  .table-rwd.table-bordered th,
  .table-rwd.table-bordered {
    border: 0;
  }
  .table-num-rwd-input {
    button {
      padding: 5px;
    }
    input {
      padding: 0px;
      font-size: 14px;
    }
  }
  .shop-title-rwd p {
    font-size: 18px;
  }
}
@include iphone5() {
  .btn-rwd {
    button {
      padding: 10px 0px;
    }
  }
}
</style>
