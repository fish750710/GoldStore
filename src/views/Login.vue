<template>
  <div>
    <router-link class="nav-link" to="/Index.vue">
      <i class="fas fa-ticket-alt"></i>
      繼續購物
    </router-link>
    <validation-observer v-slot="{ invalid }">
      <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal">管理員登入</h1>
        <!-- <input
          type="email"
          id="inputEmail"
          class="form-control"
          v-model="user.username"
          placeholder="Email address"
          required
          autofocus
        /> -->
        <validation-provider rules="required|email" v-slot="{errors, classes}">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input id="inputEmail" type="email" name="email" v-model="user.username" class="form-control mb-2" :class="classes" placeholder="Email address">
          <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>
        <!-- <input
          type="password"
          id="inputPassword"
          class="form-control"
          v-model="user.password"
          placeholder="Password"
          required
        /> -->
        <validation-provider rules="required" v-slot="{errors, classes}">
          <label for="inputPassword" class="sr-only">Password</label>
          <input id="inputPassword" type="password" name="password" v-model="user.password" class="form-control mb-2" :class="classes" placeholder="Password">
          <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <div v-if="!message.success" class="text-danger mb-3">{{ message.message }}</div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="invalid" @keyup.enter="signin()">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    signin () {
      // 對應config/dev.env.js檔案的環境變數
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      this.$http.post(api, vm.user).then(response => {
        // console.log('signin', response.data)
        vm.message = response.data
        if (response.data.success) {
          const expired = vm.message.expired
          const token = vm.message.token
          document.cookie = `token=${token};expired=${new Date(expired)}`
          // 登入成功跳轉首頁
          vm.$router.push('/admin/Products')
        }
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
