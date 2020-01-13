<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 前台 User 查訂單 -->
    <!-- 訂單資訊 -->
    <table class="table table-hover my-5 table-rwd">
      <thead class>
        <th width="100">訂單日期/訂單編號</th>
        <th width="80">總金額</th>
        <th width>聯絡資訊</th>
        <th>產品資訊</th>
        <th width="60">數量</th>
        <th width="90">付款狀態</th>
        <th width="160">備註</th>
        <th></th>
      </thead>
      <tbody>
        <tr class v-for="(item) in orders" :key="item.id">
          <!-- 使用 filter date和 currency -->
          <td data-th="訂單日期">
            {{ item.create_at | date}}
            {{ item.id }}
          </td>
          <!-- <td  data-th="訂單編號">{{ item.id }}</td> -->
          <td data-th="總金額" class>{{ item.total | currency}}</td>
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
                ({{ order_P.product.description }})
                --{{ order_P.product.content }}
              </li>
            </ul>
          </td>
          <td data-th="數量">
            <ul class="pl-0 qty-rwd" v-for="(order_P, i) in item.products" :key="i">
              {{ order_P.qty }}
              {{ order_P.product.unit }}
            </ul>
          </td>
          <td data-th="付款狀態" class="text-success" v-if="item.is_paid">已付款</td>
          <td data-th="付款狀態" class="text-danger" v-else>未付款</td>
          <td data-th="備註">{{ item.message }}</td>
          <td data-th="編輯" class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              v-if="item.is_paid"
              @click.prevent="goPay(item.id)"
            >退貨</button>
            <button class="btn btn-outline-warning btn-sm" v-else @click.prevent="goPay(item.id)">付款</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagin @postPage="getOrders" :getpagin="pagination"></Pagin>
  </div>
</template>

<script>
import Pagin from '@/components/Pagination.vue'

export default {
  components: {
    Pagin
  },
  data () {
    return {
      orders: [],
      isLoading: false,
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        // console.log(response.data);
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    goPay (id) {
      // 轉付款頁面
      this.$router.push(`/checkout3/${id}`).catch(err => (err))
    }
  },
  created () {
    this.getOrders()
  },
  mounted () {
    // 從frontNavbar傳來
    this.$bus.$on('refreshTable', () => {
      this.getOrders()
    })
  }
}
</script>

<style lang="scss" scoped>
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
