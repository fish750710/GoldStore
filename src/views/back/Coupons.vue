<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-3">
      <button class="btn btn-primary text-black" @click="openCouponModel(true)">建立新的優惠卷</button>
    </div>
    <table class="table mt-3 table-rwd">
      <thead>
        <th width>優惠名稱</th>
        <th width>折扣百分比</th>
        <th width>到期日</th>
        <th width>是否啟用</th>
        <th>優惠碼</th>
        <th width>編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td data-th="優惠名稱">{{ item.title }}</td>
          <td data-th="折扣百分比">{{ item.percent }} %</td>
          <td data-th="到期日">{{ item.due_date }}</td>

          <td data-th="是否啟用">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td data-th="優惠碼">{{ item.code }}</td>
          <td data-th="編輯" class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm text-black"
              @click="openCouponModel(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModel(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagin @postPage="getCoupons" :getpagin="pagination"></Pagin>

    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="name">優惠名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="優惠名稱"
                    v-model="tempCoupons.title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-3">
                    <label for="code">折扣碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="code"
                      placeholder="折扣碼"
                      v-model="tempCoupons.code"
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label for="percent">折扣百分比</label>
                    <input
                      type="number"
                      class="form-control"
                      id="percent"
                      placeholder="折扣百分比"
                      v-model="tempCoupons.percent"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label for="due_date">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      placeholder="到期日"
                      v-model="tempCoupons.due_date"
                    />
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupons.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupons">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 -->
    <div
      class="modal fade"
      id="delCouponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupons.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCouponModel">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagin from '@/components/Pagination.vue'

export default {
  components: {
    Pagin
  },
  data () {
    return {
      coupons: [],
      tempCoupons: {},
      isLoading: false,
      pagination: {} // 分頁
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },

    openCouponModel (isNew, item) {
      if (isNew) {
        // 如果是新增產品
        this.tempCoupons = {}
        this.isNew = true
      } else {
        // 不是新增產品
        this.tempCoupons = Object.assign({}, item) // 避免物件傳參考特性影響，先將item資料傳送到空物件再給tempProduct用
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    updateCoupons () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon` // https://vue-course-api.hexschool.io/api/hans/products
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        // 不是新的時候，=修改
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupons.id}`
        httpMethod = 'put'
      }
      vm.isLoading = true
      // 將 tempCoupons 的欄位資料放到data物件裡送出
      this.$http[httpMethod](api, { data: vm.tempCoupons }).then(response => {
        // console.log(response.data);
        if (response.data.success) {
          $('#couponModal').modal('hide') // 關閉
          this.$bus.$emit('messsage:push', response.data.message, 'success')
          vm.getCoupons() // 重新取得畫面資料
        } else {
          // 新增失敗
          $('#couponModal').modal('hide')
          this.$bus.$emit('messsage:push', response.data.message, 'danger')
          vm.getCoupons()
        }
        vm.isLoading = false
      })
    },
    delCouponModel () {
      // 刪除
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupons.id}`
      vm.isLoading = true
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          // 刪除成功
          $('#delCouponsModal').modal('hide')
          vm.getCoupons()
          this.$bus.$emit('messsage:push', response.data.message, 'success')
        } else {
          // 找不到產品
          this.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
        vm.isLoading = false
      })
    },
    delModel (item) {
      const vm = this
      vm.tempCoupons = item // 抓取item資料
      $('#delCouponsModal').modal('show') // 顯示
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

@media (max-width: 736px) {
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
}
</style>
