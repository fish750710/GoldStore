<template>
  <div>
    <ul class="d-flex justify-content-center align-items-center mt-5 pt-5" style="list-style-type:none">
      <li class="mb-0 p-2 mr-1 rounded" style="border:1px black solid;">1 購物資訊</li>
      <li><i class="fas fa-angle-double-right mr-1"></i></li>
      <li class="mb-0 p-2 text-white font-weight-bold shop-title-rwd bg-dark rounded" style="border:1px white solid;">
        <p class="mb-0" >2 訂單資訊</p>
      </li>
      <li><i class="fas fa-angle-double-right animated infinite slideOutRight mr-3 pr-3"></i></li>
      <li class="mb-0 p-2 mr-1 rounded" style="border:1px black solid;">3 完成訂購</li>
      <li><i class="fas fa-angle-double-right mr-1 text-info"></i></li>
      <li class="mb-0 p-2 mr-1 rounded" style="border:1px black solid;">4 付款完成</li>
    </ul>
    <!-- 購物資訊 -->
    <div class="container">
      <div class="row justify-content-center my-5">
        <div class="accordion col-md-12" id="accordionExample">
          <div class="card" style="border: 1px solid #ddd;">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button
                  class="btn btn-link text-decoration-none font-weight-bold text-dark"
                  type="button"
                  data-toggle="collapse"
                  data-target="#shoplist"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  購物資訊
                  <i class="fa fa-angle-down fa-lg menu_icon-open"></i>
                  <i class="fa fa-angle-up fa-lg menu_icon-close"></i>
                </button>
              </h2>
            </div>
            <!-- v-if="cart.carts.length > 0" 如果出現不正常 undefined 必須先判斷 -->
            <div
              id="shoplist"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
              v-if="cart.carts.length > 0"
            >
              <div class="card card-body p-0">
                <table class="table table-rwd">
                  <thead>
                    <th></th>
                    <th>商品</th>
                    <th class="text-right" width="70">數量</th>
                    <th class="text-right" width="140">價格</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class data-th="商品圖片">
                        <img :src="item.product.imageUrl" class="p-1 border" />
                      </td>
                      <td class="align-middle" data-th="商品">
                        {{ item.product.title }}
                        <div class="text-warning" v-if="item.coupon">
                          <i class="fas fa-ticket-alt"></i>
                          已套用優惠券
                        </div>
                      </td>
                      <td class="align-middle text-right" data-th="數量">{{ item.qty }}</td>
                      <td
                        class="align-middle text-right"
                        data-th="單價"
                      >{{ item.final_total | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4" data-th="總計" class="text-right text-danger font-weight-bold">
                        總計
                        <span class="font-weight-bold h5">{{ cart.total | currency }}</span>
                      </td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                      <td colspan="4" data-th="折扣價" class="text-right text-success">
                        折扣價
                        <span class="h5">{{ cart.final_total | currency}}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 訂單 -->
    <div class="my-5 d-flex justify-content-center">
      <validation-observer v-slot="{ invalid }">
        <form class="col-md-6" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">*Email</label>
            <validation-provider rules="required|email" v-slot="{errors, classes}">
              <input id="useremail" type="email" name="email" v-model="form.user.email" class="form-control mb-2" :class="classes" placeholder="請輸入 Email">
              <span class="text-danger">{{errors[0]}}</span>
            </validation-provider>
            <!-- <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-validate="'required|email'"
              :class="{'is-invalid': errors.has('email')}"
              v-model="form.user.email"
              placeholder="請輸入 Email"
            />
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span> -->
          </div>
          <div class="form-group">
            <label for="username">*收件人姓名</label>
            <ValidationProvider rules="required" v-slot="{errors, classes}">
              <input id="username" type="text" name="name" v-model="form.user.name" class="form-control" :class="classes" placeholder="輸入姓名">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              :class="{'is-invalid': errors.has('name')}"
              v-model="form.user.name"
              v-validate="'required'"
              placeholder="輸入姓名"
            />
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span> -->
          </div>
          <div class="form-group">
            <label for="usertel">*收件人電話</label>
            <ValidationProvider rules="required" v-slot="{errors, classes}">
              <input id="usertel" type="tel" name="tel" v-model="form.user.tel" class="form-control" :class="classes" placeholder="請輸入電話">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <input
              type="tel"
              class="form-control"
              name="tel"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              :class="{'is-invalid': errors.has('tel')}"
              v-validate="'required'"
            />
            <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span> -->
          </div>
          <div class="form-group">
            <label for="useraddress">*收件人地址</label>
             <ValidationProvider rules="required" v-slot="{errors, classes}">
              <input id="useraddress" type="address" name="address" v-model="form.user.address" class="form-control" :class="classes" placeholder="請輸入地址">
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <!-- <input
              type="address"
              class="form-control"
              name="address"
              :class="{'is-invalid': errors.has('address')}"
              id="useraddress"
              v-model="form.user.address"
              v-validate="'required'"
              placeholder="請輸入地址"
            />
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span> -->
          </div>
          <div class="form-group">
            <label for="usermsg">留言</label>
            <textarea
              name
              id="usermsg"
              class="form-control"
              cols="30"
              rows="3"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary" @click.prevent="goCheckOut">
              <i class="fas fa-backspace pl-3">
                <span class="pl-2 h6 font-weight-bold">上一步</span>
              </i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#checkorder"
              :disabled="invalid"
            >
              <i class="fas fa-arrow-alt-circle-right">
                <span class="pl-2 h6 font-weight-bold">送出訂單</span>
              </i>
            </button>
          </div>
          <!-- 確認視窗 -->
          <!-- Modal -->
          <div
            class="modal fade"
            id="checkorder"
            tabindex="-1"
            role="dialog"
            aria-labelledby="orderTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="orderTitle">確認訂單</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body h5 text-danger font-weight-bold">請再次確認商品訂單無誤，謝謝</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                  <button
                    type="button"
                    class="btn btn-danger font-weight-bold"
                    @click="createOrder"
                  >送出訂單</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      coupon_msg: ''
    }
  },
  methods: {
    ...mapActions(['getCart']), // 取得購物車內容
    // 新增訂單
    createOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(url, { data: order }).then(response => {
        // console.log('訂單已建立', response);
        $('#checkorder').modal('hide')
        vm.$bus.$emit('messsage:push', response.data.message, 'success')
        if (response.data.success) {
          // console.log('準備跳轉也面');
          vm.$router.push(`/checkout3/${response.data.orderId}`) // $router 轉換頁面
        }
        this.$bus.$emit('refreshCart')
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goCheckOut () {
      this.$router.push(`/checkout`).catch(err => (err))
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  created () {
    this.getCart()
  },
  // 跳離頁面前先檢查
  beforeRouteLeave (to, from, next) {
    // console.log('to', to, 'from', from, 'next', next);
    if (this.cart.carts === 0) {
      next()
    } else if (to.name === 'CheckOut3') {
      next()
    } else {
      const answer = confirm(`訂單尚未建立，\n您確定要離開！`)
      if (answer) {
        next()
      } else {
        // 取消
        next(false)
      }
    }
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
@media (max-width: 736px) {
}
// icon變化
[aria-expanded="false"] .menu_icon-open {
  display: inline;
}

[aria-expanded="false"] .menu_icon-close {
  display: none;
}

[aria-expanded="true"] .menu_icon-open {
  display: none;
}

[aria-expanded="true"] .menu_icon-close {
  display: inline;
}
</style>
