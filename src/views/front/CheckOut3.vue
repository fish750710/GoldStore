<template>
  <div>
    <ul class="d-flex justify-content-center align-items-center mt-5 pt-5" style="list-style-type:none">
      <li class=" mb-0 p-2 mr-1 rounded" style="border:1px black solid;">1 購物資訊</li>
      <li><i class="fas fa-angle-double-right mr-1 "></i></li>
      <li class=" mb-0 p-2 mr-1 rounded" style="border:1px black solid;">2 訂單資訊</li>
      <li><i class="fas fa-angle-double-right mr-1 "></i></li>
      <li class=" mb-0 p-2 mr-1 rounded" :class="[order.is_paid ? '' : 'shop-title-rwd text-white font-weight-bold bg-dark border-white' ]" style="border:1px black solid;"><p class="mb-0">3 付款方式</p></li>
      <li><i class="fas fa-angle-double-right animated infinite slideOutRight mr-3 pr-3 " v-if="!order.is_paid">
        </i><i class="fas fa-angle-double-right mr-1" v-else ></i>
      </li>
      <li class=" mb-0 p-2 rounded " :class="[order.is_paid ? 'shop-title-rwd text-white font-weight-bold bg-dark border-white' : '' ]" style="border:1px black solid;"><p class="mb-0">4 付款完成</p></li>
    </ul>
    <div class="container">
    <div class=" row justify-content-center my-5">
      <form class="col-md-12" @submit.prevent="payOrder">
        <table class="table">
          <thead class="bg-primary">
            <th>商品</th>
            <th width="80">數量</th>
            <th class="text-right" width="110">價格</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right h6" >總計</td>
              <td class="text-right text-danger h6">{{ order.total | currency}}</td>
            </tr>
          </tfoot>
        </table>
        <table class="table">
          <tbody>
            <tr>
              <th width="95">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td class="font-weight-bold">
                <span class="text-primary mr-3 ">{{ paymethod }}</span>
                <span v-if="!order.is_paid"  class="text-danger">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
            <tr>
              <th>付款方式</th>
              <td colspan="2">
                  <div class="form-check form-check-inline " :class="[ paymethod==='貨到付款' ?'text-primary' : '']" >
                    <input class="form-check-input"  type="radio" name="inlineRadioOptions" id="cash" value="貨到付款" v-model="paymethod" :disabled="order.is_paid" required>
                    <label class="form-check-label" for="cash" data-toggle="tooltip" data-placement="bottom" title="目前貨到付款只提供平日配送。">
                      貨到付款<i class="fas fa-shipping-fast ml-2 mr-3"></i></label>
                  </div>
                  <div class="form-check form-check-inline"  :class="[ paymethod==='線上刷卡' ?'text-primary' : '']" >
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="creditcard" value="線上刷卡" v-model="paymethod" :disabled="order.is_paid" required>
                    <label class="form-check-label" for="creditcard" data-toggle="tooltip" data-placement="bottom" title="歡迎使用信用卡刷卡，優惠期間免刷卡手續費。">
                      線上刷卡<i class="far fa-credit-card ml-2 mr-3"></i></label>
                  </div>
                  <div class="form-check form-check-inline"  :class="[ paymethod==='超商取貨' ?'text-primary' : '']" >
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="storepickup" value="超商取貨" disabled v-model="paymethod" required>
                    <label class="form-check-label" for="storepickup">
                      超商取貨 (尚未開放) <i class="fas fa-store ml-2 mr-3"></i></label>
                  </div>
                  <div class="d-flex justify-content-end mt-5 btn-rwd">
                    <div class="text-right" >
                      <button class="btn btn-secondary font-weight-bold " @click.prevent="goIndex">再去逛逛</button>
                    </div>
                    <div class="text-right" v-if="order.is_paid === false">
                      <button class="btn btn-danger font-weight-bold ml-3" >確認付款去</button>
                    </div>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
     <!-- 付款完成 Modal -->
    <div class="modal fade" id="isPaid" tabindex="-1" role="dialog" aria-labelledby="isPaid" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title text-black" id="isPaid">感謝您的訂購</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body h5">
            <p>貨品將3天內送達，敬請留意快遞，謝謝!</p>
            <i class="fas fa-shipping-fast animated infinite bounceOutRight text-danger ml-3" style="animation-duration: 12s" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      orderId: '', // 取得orderId
      order: {
        user: {}
      },
      paymethod: ''
    }
  },
  methods: {
  // 取得單一筆訂單資料
    getOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then((response) => {
        vm.order = response.data.order
        vm.$store.dispatch('updateLoading', false)
      })
    },
    // 結帳付款
    payOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            $('#isPaid').modal('show')
          }, 1000)
          setTimeout(() => {
            $('#isPaid').modal('hide')
          }, 5000)
          vm.getOrder() // 重新取得訂單資料(更新畫面)
        };
        vm.$bus.$emit('refreshCart')
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goIndex () {
      this.$router.push('/').catch(err => (err))
    }
  },
  created () {
    this.orderId = this.$route.params.orderId // 取得網址上的ID
    this.getOrder()
  },
  // 跳離頁面前先檢查 (導航守衛)
  beforeRouteLeave (to, from, next) {
    // console.log('to', to, 'from', from, 'next', next)
    if (this.order.is_paid === true) {
      next()
    } else {
      const answer = confirm(`您尚未付款完成，\n您確定要離開！`)
      if (answer) {
        next()
      } else {
      // 取消
        next(false)
      };
    };
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

@include desktop-top() {
  .shop-title-rwd p{
    font-size: 24px;
  }
  .table-rwd td {
    img{
      width: 100px;
    }
  }
}
@include pc-top() {
  .table-rwd td {
    img{
      width: 100px;
    }
  }
}
@include pc() {
  .table-price-rwd{
    width: 80px;
  }
  .table-num-rwd{
    width: 50px;
  }
  .shop-title-rwd p{
    font-size: 24px;
  }
  .table-rwd td {
    img{
      width: 100px;
    }
  }
}
@include pad() {
  .table-rwd{
    min-width: 100%;
  }
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
    img{
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
    color: #D20B2A;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,.table-rwd.table-bordered th,.table-rwd.table-bordered{border:0;}
  .table-num-rwd-input{
    button{
      padding:5px;
    }
    input{
      padding:0px;
      font-size: 14px;
    }
  }
  .shop-title-rwd p{
    font-size: 18px;
  }
}
@include iphone5() {
  .btn-rwd{
    button{
      padding:10px 0px;
    }
  }
}
</style>
