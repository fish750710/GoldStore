<template>
  <div>
    <alert />
    <loading :active.sync="isLoading"></loading>
    <!-- 選單以外區域 -->
    <div id="close-menu" class></div>
    <nav class="header navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <div class="col-1 col-sm-1 col-md-1 col-lg-2 col-xl-2 ml-2 p-0">
        <a href="#" class @click="goIndex">
          <img src="@/assets/images/Logo-3w150.png" alt class="d-logo" />
          <img src="@/assets/images/Logo-64.png" alt class="m-logo" style="width:45px" />
        </a>
      </div>
      <div
        class="row col-8 col-sm-9 col-md-9 col-lg-10 col-xl-10 mb-2 mt-2 ml-0 mr-0 pl-0 pr-2 justify-content-end text-center "
      >
        <ul class="d-menu nav">
          <li class="nav-item mt-2 menu-ul col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 p-0 m-0">
            <a href="#" class="m-3 menuSidebar" @click="goDescription">產品介紹</a>
          </li>
          <li class="nav-item mt-2 menu-ul col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 p-0 m-0">
            <a href="#" class="m-3 menuSidebar" @click="goSale">優惠活動</a>
          </li>
          <li class="nav-item mt-2 menu-ul col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 p-0 m-0">
            <a href="#" class="m-3 menuSidebar" @click="goIndex">購物商城</a>
          </li>
        </ul>
        <ul class="nav">
          <li class="nav-item d-search mr-3 ml-3">
            <Search class="pt-1"></Search>
          </li>
          <li class="nav-item m-search mt-1 icon-rwd-margin">
            <div class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-search text-white p-2"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2" style="width:220px">
                <input
                  type="search"
                  class="form-control input-width d-inline"
                  placeholder="搜尋.."
                  aria-label="搜尋"
                  v-model="searchValue"
                  @keyup.enter="searchProduct"
                />
              </div>
            </div>
          </li>
          <li class="nav-item icon-rwd-margin">
            <!-- 未登入 -->
            <div v-if="!successStatus">
              <a href="#" class="nav-link text-light menu-top" @click="openLogin">
                <i class="far fa-user-circle userlogo"></i>
              </a>
            </div>
            <div v-else>
              <!-- 已登入 -->
              <a
                id="dropdownUserMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="#"
                class="nav-link text-light menu-top"
              >
                <i class="fas fa-user-circle userlogo"></i>
              </a>
              <div class="dropdown">
                <div class="dropdown-menu" aria-labelledby="dropdownUserMenu" v-if="successStatus">
                  <button class="dropdown-item dropdown-text" type="button" @click="goUserOrders">
                    <i class="far fa-address-book mr-1 user-list-icon-order"></i>
                    <span>查訂單</span>
                  </button>
                  <button class="dropdown-item dropdown-text" type="button" @click="goProducts">
                    <i class="fas fa-clipboard-list mr-1 user-list-icon-management"></i>
                    <span>管理商品</span>
                  </button>
                  <button class="dropdown-item dropdown-text" type="button" @click="signout">
                    <i class="fas fa-sign-out-alt mr-1"></i>
                    <span>登出</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item icon-rwd-margin">
            <a
              href="#"
              class="nav-link text-light menu-top"
              data-toggle="modal"
              data-target="#favoritetModal"
            >
              <i class="fas fa-heart"></i>
              <span
                class="badge badge-pill badge-danger"
                style
                v-if="myfavorite.length != 0"
              >{{ myfavorite.length }}</span>
            </a>
          </li>
          <li class="nav-item icon-rwd-margin">
            <a
              href="#"
              class="nav-link text-light menu-top"
              data-toggle="modal"
              data-target="#cartModal"
            >
              <i class="fas fa-cart-arrow-down"></i>
              <span
                class="badge badge-pill badge-danger"
                style
                v-if="cart.carts.length != 0"
              >{{ cart.carts.length }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class=" menuButton">
        <a href="#">
          <span></span>
        </a>
      </div>
      <ul class="menu nav justify-content-center text-center">
        <li class="nav-item mt-2 menu-ul col-12 col-sm-12 col-md-12 p-0 m-0">
          <a href="#" class="m-3 menuSidebar" @click="goDescription">產品介紹</a>
        </li>
        <li class="nav-item mt-2 menu-ul col-12 col-sm-12 col-md-12 p-0 m-0">
          <a href="#" class="m-3 menuSidebar" @click="goSale">優惠活動</a>
        </li>
        <li class="nav-item mt-2 menu-ul col-12 col-sm-12 col-md-12 p-0 m-0">
          <a href="#" class="m-3 menuSidebar" @click="goIndex">購物商城</a>
        </li>
      </ul>
    </nav>
    <!-- cartModal -->
    <div
      class="modal"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog-scrollable position-absolute"
        role="document"
        style="right:0; z-index:999;"
      >
        <div class="modal-content vh-100 mh-100 rounded-0" style="border-left: 1px solid black">
          <div
            class="modal-header bg-dark"
            style="border-top-left-radius:0px ; border-top-right-radius:0px"
          >
            <h5 class="modal-title pl-3 text-white font-weight-bold" id="exampleModalLabel">我的購物車</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body py-0">
            <table class="table table-borderless table-sm" v-if="cart.carts.length > 0">
              <thead>
                <th width="100"></th>
                <th class="text-center">商品</th>
                <th width="110">價格 / 數量</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="">
                    <a href="#" @click="goDetail(item.product.id)">
                      <img :src="item.product.imageUrl" class="w-100 p-1 border" />
                    </a>
                  </td>
                  <td class="align-middle pl-0">
                    <div>
                      <thead>
                        <th class="border-0 pl-0 pt-0">
                          <a
                            href="#"
                            class="text-decoration-none text-black"
                            @click="goDetail(item.product.id)"
                          >{{ item.product.title }}</a>
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            class="border-0 p-0"
                            width="235"
                          >{{ item.product.content}} / {{ item.product.spec }}</td>
                        </tr>
                      </tbody>
                    </div>
                  </td>
                  <td class="">
                    <button class="btn pt-0 pb-0 pl-1 pr-1" @click="minusQty(item)" :disabled="item.id ===loadingItem">
                      <i class="fas fa-minus" v-if="item.id != loadingItem"></i>
                      <i class="fas fa-spinner fa-pulse" v-else></i>
                    </button>
                    {{ item.qty }}
                    <button
                      class="btn pt-0 pb-0 pr-1 pl-1"
                      @click="addQty( item )"
                      :disabled="item.id ===loadingItem"
                    >
                      <i class="fas fa-plus" v-if="item.id != loadingItem"></i>
                      <i class="fas fa-spinner fa-pulse" v-else></i>
                    </button>
                    <div class="mt-0">{{ item.product.price | currency }} x {{ item.qty }}</div>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm mt-0"
                      @click="removeCartItem(item.id)"
                      :disabled="item.id ===loadingItem"
                    >
                      <i class="fas fa-spinner fa-pulse" v-if="item.id === loadingItem"></i>
                      <i class="far fa-trash-alt" v-else></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center h4 align-self-center preset-info" v-else>
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
          <div
            class="d-flex justify-content-around align-items-center p-2"
            style="border-top: 1px solid black"
            v-if="cart.carts.length > 0"
          >
            <div class="h5 mb-0">
              <span class="mr-3 text-danger font-weight-bold">
                <i class="fas fa-coins"></i>
                總金額 {{ cart.total | currency }}
              </span>
            </div>
            <div>
              <button class="btn btn-primary" @click="goCheckOuter">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- favoritetModal -->
    <div
      class="modal"
      id="favoritetModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog-scrollable position-absolute"
        role="document"
        style="right:0; z-index:999;"
      >
        <div class="modal-content vh-100 mh-100 rounded-0" style="border-left: 1px solid black">
          <div
            class="modal-header bg-dark"
            style="border-top-left-radius:0px ; border-top-right-radius:0px"
          >
            <h5 class="modal-title pl-3 font-weight-bold text-white" id="exampleModalLabel">我的收藏</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body py-0">
            <table class="table table-borderless table-sm" v-if="myfavorite.length > 0">
              <thead>
                <th width="100"></th>
                <th class="text-center">商品</th>
                <th width>收藏</th>
              </thead>
              <tbody>
                <tr v-for="item in myfavorite" :key="item.id">
                  <td width="100">
                    <a href="#" @click="goDetail(item.id)">
                      <img :src="item.imageUrl" class="w-100 p-1 border" />
                    </a>
                  </td>
                  <td class="align-middle pl-0">
                    <thead>
                      <th class="border-0 pl-0 pt-0">
                        <a
                          href="#"
                          class="text-decoration-none text-black"
                          @click="goDetail(item.id)"
                        >{{ item.title }}</a>
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border-0 p-0" width="235">{{ item.content}} / {{ item.spec }}</td>
                      </tr>
                    </tbody>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm mt-2"
                      @click="removefavoritet(item)"
                    >
                      <i class="fas fa-heart"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center h4 align-self-center preset-info" v-else>
              空無一物
              <div>
                <button
                  type="button"
                  class="btn btn-outline-danger mt-3"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="goIndex"
                >尋寶去</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Login Modal -->
    <div
      class="modal fade"
      id="loginModel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

                <div class="form-group">
                  <validation-observer v-slot="{ invalid }">
                    <form class="form-signin" @submit.prevent="signin">
                      <div class="d-flex justify-content-between">
                        <h1 class="h5 mb-3 font-weight-normal" v-if="!ischange">會員登入</h1>
                        <h2 class="h5 mb-3 font-weight-normal" v-else>註冊</h2>
                        <button
                          type="button"
                          class="btn text-warning mr-3"
                          @click="changeSign(true)"
                          v-if="!ischange"
                        >註冊</button>
                        <button
                          type="button"
                          class="btn text-warning mr-3"
                          @click="changeSign(false)"
                          v-else
                        >登入</button>
                      </div>
                      <!-- <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        class="form-control mb-2"
                        v-model="user.username"
                        placeholder="電子郵件"
                        v-validate="'required|email'"
                        :class="{'is-invalid': errors.has('email')}"
                        autofocus
                      /> -->
                      <validation-provider rules="required|email" v-slot="{errors, classes}">
                        <input id="email" type="email" name="email" v-model="user.username" class="form-control mb-2" :class="classes" placeholder="電子郵件">
                        <span class="text-danger">{{errors[0]}}</span>
                      </validation-provider>

                      <!-- <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span> -->
                      <!-- <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        class="form-control mb-2"
                        v-model="user.password"
                        placeholder="密碼"
                        v-validate="'required'"
                        :class="{'is-invalid': errors.has('password')}"
                      /> -->
                      <validation-provider rules="required" v-slot="{errors, classes}">
                        <input id="inputPassword" type="password" name="password" v-model="user.password" class="form-control mb-2" :class="classes" placeholder="密碼">
                        <span class="text-danger">{{errors[0]}}</span>
                      </validation-provider>
                      <!-- <span class="text-danger" v-if="errors.has('password')">密碼必須輸入</span> -->
                      <!-- <input
                        type="password"
                        id="checkPassword"
                        name="doublecheck"
                        class="form-control mb-2"
                        v-if="ischange"
                        v-model="user.dbpassword"
                        placeholder="再次確認密碼"
                        v-validate="'required'"
                        :class="{'is-invalid': errors.has('doublecheck')}"
                      /> -->
                       <validation-provider rules="required" v-slot="{errors, classes}">
                        <input id="checkPassword" v-if="ischange" type="password" name="check" v-model="user.dbpassword" class="form-control mb-2" :class="classes" placeholder="再次確認密碼">
                        <span class="text-danger">{{errors[0]}}</span>
                      </validation-provider>
                      <!-- <span class="text-danger" v-if="errors.has('doublecheck')">密碼必須輸入</span> -->
                      <div class="checkbox mb-3 d-flex justify-content-between">
                        <label>
                          <input type="checkbox" value="remember-me" /> 記住我
                        </label>

                        <a href="#" class="text-decoration-none">忘記密碼</a>
                      </div>
                      <div v-if="!message.success" class="text-danger mb-3">{{ message.message }}</div>
                      <button
                        class="btn btn-lg btn-primary btn-block font-weight-bold"
                        type="submit"
                        @keyup.enter="signin()"
                        v-if="!ischange" :disabled="invalid"
                      >登入</button>
                    </form>
                  <button
                    class="btn btn-lg btn-primary btn-block font-weight-bold"
                    @click.prevent="signup(user.password,user.dbpassword)" :disabled="invalid"
                    v-if="ischange"
                  >我要註冊</button>
                  </validation-observer>
                  <div v-if="ischange" class="text-danger mt-3">{{ message }}</div>
                  <hr />
                  <div class="d-flex justify-content-between mt-3">
                    <button class="btn d-flex fb-btn mr-2">
                      <img src="@/assets/images/20px-fb-logo.png" alt />
                      <div class="fb-font">使用 Facebook 繼續</div>
                    </button>
                    <button class="btn d-flex line-btn">
                      <img src="@/assets/images/20px-LINE_logo.png" alt />
                      <div class="line-font">使用 LINE 繼續</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/AlertMsg.vue'
import $ from 'jquery'
import Search from '@/components/Search'

export default {
  components: {
    // Pagin, // 分頁
    Alert,
    Search
  },
  data () {
    return {
      ischange: false,
      successStatus: false,
      coupon_code: '',
      coupon_msg: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      user: {
        username: '',
        password: '',
        dbpassword: ''
      },
      message: '',
      searchValue: ''
    }
  },
  methods: {
    ...mapActions(['getCart']), // 取得購物車內容
    // 加入購物車
    addtoCart (id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty })
    },
    // 刪除購物車內容
    removeCartItem (id) {
      this.$store.dispatch('removeCart', id)
    },
    // 增加數量
    addQty (item) {
      this.$store.dispatch('addQty', item)
    },
    // 減少數量
    minusQty (item) {
      this.$store.dispatch('minusQty', item)
    },
    // open 登入model
    openLogin () {
      this.message = ''
      this.user.password = ''
      $('#loginModel').modal('show') // 顯示
    },
    // 登入
    signin () {
      // 對應config/dev.env.js檔案的環境變數
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      this.$http.post(api, vm.user).then(response => {
        vm.message = response.data
        if (response.data.success) {
          const expired = vm.message.expired
          const token = vm.message.token
          document.cookie = `token=${token};expired=${new Date(expired)}`
          vm.successStatus = true
          // 登入成功跳轉首頁
          $('#loginModel').modal('hide') // 關閉
          vm.issuccess()
        } else {
          vm.successStatus = false
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
      //   }
      // })
    },
    // 切換登入或註冊畫面
    changeSign (change) {
      if (change) {
        // 註冊
        this.ischange = true
        this.message = ''
      } else {
        this.ischange = false
        this.message = ''
      }
    },
    // 註冊
    signup (psw, dbpsw) {
      // this.$validator.validateAll().then(result => {
      if (psw === dbpsw) {
        // if (result) {
        this.message = '尚未開放註冊'
        // }
      } else {
        this.message = '請確認密碼輸入是否一樣'
      }
      // })
    },
    // 檢查登入狀態
    issuccess () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/user/check`
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          // 檢查用戶是否仍持續登入狀態
          vm.successStatus = true
        } else {
          vm.successStatus = false
        }
      })
    },
    // 登出
    signout () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.successStatus = false
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          vm.goIndex()
        } else {
          vm.successStatus = true
        }
      })
    },
    searchProduct () {
      this.$router.push(`/search/${this.searchValue}`).catch(err => (err))
      this.$bus.$emit('search')
      if (this.searchValue.trim() === '') {
        this.$bus.$emit('messsage:push', `請輸入商品名稱`, 'danger')
      }
      this.searchValue = ''
    },
    getfavorite () {
      this.$store.dispatch('getfavorite')
    },
    removefavoritet (item) {
      this.$store.dispatch('removefavorite', item)
    },
    // 導頁到管理商品
    goProducts () {
      this.$router.push('/admin/Products').catch(err => (err))
    },
    goUserOrders () {
      this.$router.push('/userorders').catch(err => (err))
      this.$bus.$emit('refreshTable')
    },
    goCheckOuter () {
      $('#cartModal').modal('hide')
      this.$router.push('/checkout').catch(err => (err))
    },
    goIndex () {
      // 購物去按鈕
      this.$router.push('/').catch(err => (err))
      this.$bus.$emit('refresh')
    },
    goDetail (id) {
      $('#favoritetModal').modal('hide')
      $('#cartModal').modal('hide')
      this.$router.push(`/detail/${id}`).catch(err => (err))
      this.$bus.$emit('refreshDetail')
    },
    goDescription () {
      this.$router.push(`/Description`).catch(err => (err))
    },
    goSale () {
      this.$router.push(`/Sale`).catch(err => (err))
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'cart', 'loadingItem', 'myfavorite'])
  },
  created () {
    this.getCart()
    if (this.$store.state.cookie) {
      this.issuccess()
    }
    this.getfavorite()
    $(function () {
      $('.menuButton > a').click(function (e) {
        e.preventDefault()
        $('.menuButton > a').toggleClass('change')
        $('body').toggleClass('show-menu')
        $('#close-menu').toggleClass('close-menu')
      })
      // 選單以外區域點選後關閉選單
      $('#close-menu').click(function (e) {
        e.preventDefault()
        $('body').removeClass('show-menu')
        $('#close-menu').removeClass('close-menu')
        $('.menuButton > a').removeClass('change')
      })
    })
  },
  mounted () {
    // 從frontNavbar傳來
    this.$bus.$on('refreshCart', () => {
      this.getCart()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.icon-rwd-margin{
  margin-right: 10px;
}

.fb-btn {
  background: #3b5998;
}
.line-btn {
  background: #00c300;
}
.fb-font {
  color: #fff;
  font-size: 13px;
  padding: 0 5px;
}
.line-font {
  color: #fff;
  font-size: 13px;
  padding: 0 17px;
}
.user-list-icon-order {
  padding-right: 3px;
}
.user-list-icon-management {
  margin-left: 1px;
  padding-right: 3px;
}
.menu-top {
  position: relative;
  margin: 10px 16px 5px 16px;
  padding: 0;
  font-size: 18px;
  span {
    position: absolute;
    top: -7px;
    right: -15px;
    font-size: 12px;
    z-index: 1;
  }
}
.menu-top i:hover {
  color: $primary;
}

.dropdown-text {
  &:hover {
    color: $primary;
  }
  &:active {
    color: $dark;
  }
}
.menu-ul {
  .menuSidebar {
    text-decoration: none;
    color: #fff;
    transition: all 0.7s;
    font-weight: bold;
    // width: 50px;
  }

  a:hover {
    color: $primary;
    position: relative;
  }
}

.menu-ul a:after {
  content: " ";
  position: absolute;
  z-index: 2;
  bottom: -8px;
  left: 28px;
  display: block;
  // width: 65px;
  // height: 1px;
  transform: translate(-50%);
}

.menu-ul a:hover:after {
  height: 2px;
  animation: ad_width 0.3s linear forwards;
  background: $primary;
}

.userlogo {
  font-size: 22px;
}
.preset-info{
  margin-top: 20rem;
}
@keyframes ad_width {
  from {
    width: 0;
  }
  to {
    width: 55px;
  }
}

.dropdown-toggle::after {
  border: none;
}

@media (max-width: 320px) {
  .fb-font {
    font-size: 12px;
    padding: 0;
  }
  .line-font {
    font-size: 12px;
    padding: 0;
  }
}

@include desktop-top() {
  .m-logo {
    display: none !important;
  }
  .d-logo {
    display: block !important;
  }
  .m-search {
    display: none !important;
  }
  .d-search {
    display: block !important;
  }
  .menu {
    display: none !important;
  }
}
@include pc-top() {
  .m-logo {
    display: none !important;
  }
  .d-logo {
    display: block !important;
  }
  .m-search {
    display: none !important;
  }
  .d-search {
    display: block !important;
  }
  .menu {
    display: none !important;
  }
}
@include pc() {
  .m-logo {
    display: none !important;
  }
  .d-logo {
    display: block !important;
  }
  .m-search {
    display: block !important;
    padding: 0px;
    i {
      font-size: 18px;
    }
  }
  .d-search {
    display: none !important;
  }
  .menu {
    display: none !important;
  }
}

@include pad() {
  .m-logo {
    margin-top: 5px;
    display: block !important;
  }
  .d-logo {
    display: none !important;
  }
  .m-search {
    display: block !important;
  }
  .d-search {
    display: none !important;
  }
  .d-menu {
    display: none !important;
  }
  .menu {
    display: block !important;
  }

  .header {
    //漢堡選單
    .menuButton {
      display: block;
    }

    .menu {
      display: block;
      max-height: 0;
      min-width: 100%;
      overflow: hidden;
      position: absolute;
      top: 58px;
      right: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.75);

      li {
        float: none;
        border-bottom: dashed #bbc4c7 1px;
        &:hover {
          background: #999;
          transition: all 0.7s;
        }
        a {
          padding: 10px;
          text-align: center;
          letter-spacing: 12px;
          font-size: 22px;
        }
        span {
          display: block;
          transition: all 0.5s;
        }
        a:hover {
          color: $primary;
          // position: relative;
        }
        a:after {
          display: none;
        }
        a:hover:after {
          display: none;
        }
      }
    }
  }

  // 顯示下拉選單
  .show-menu .menu {
    max-height: 500px;
  }
  // 選單以外區域
  .close-menu {
    position: fixed;
    background: rgba(0, 0, 0, 0);
    width: 100%;
    min-height: 1024px;
    z-index: 99;
    display: block;
  }
}
.menuButton {
  display: none;
  float: right;

  a {
    width: 50px;
    height: 50px;
    padding: 22.5px 5px;
    display: block;

    //漢堡線條
    span {
      //中間線條
      width: 35px;
      height: 5px;
      background-color: #fff;
      display: block;
      -webkit-transition: all 0.6s ease;
      -moz-transition: all 0.6s ease;
      -ms-transition: all 0.6s ease;
      -o-transition: all 0.6s ease;
      transition: all 0.6s ease;

      &:before,
      &:after {
        //上下線條
        content: "";
        position: absolute;
        width: 35px;
        height: 5px;
        background-color: #fff;
        display: block;
        -webkit-transition: all 0.6s ease;
        -moz-transition: all 0.6s ease;
        -ms-transition: all 0.6s ease;
        -o-transition: all 0.6s ease;
        transition: all 0.6s ease;
      }

      &:before {
        margin-top: 10px;
      }

      &:after {
        margin-top: -10px;
      }
    }
  }

  //旋轉動畫
  .change span {
    background-color: rgba(0, 0, 0, 0);

    &:before {
      margin-top: 0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    &:after {
      margin-top: 0;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
@include iphone5() {
  .icon-rwd-margin{
    margin-right: 0px;
  }
}
</style>
