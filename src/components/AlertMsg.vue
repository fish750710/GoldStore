<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status" style="z-index:9999"
      v-for="(item, i) in messages" :key="i">
      <i class="fas fa-heart" v-if="item.message=='加入收藏'"></i>
      <i class="fas fa-heart-broken" v-else-if="item.message=='取消收藏'"></i>
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 1500);
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning  BS4樣式
    // $on 監聽意思
    vm.$bus.$on('messsage:push', (message, status = 'warning') => {
      vm.updateMessage(message, status); //渲染到畫面上
    });
    vm.$bus.$on('like',() => {
      vm.removeMessage();
      vm.updateMessage('加入收藏', 'primary'); //渲染到畫面上
      // console.log('收藏')
    });
    vm.$bus.$on('dislike',() => {
      vm.removeMessage();
      vm.updateMessage('取消收藏', 'info'); //渲染到畫面上
      // console.log(this.messages)
      // console.log('取消收藏')
    });
    // vm.$bus.$emit('messsage:push');
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  top: 40%;
  left: 30%;
  z-index: 1100;
  font-size: 22px;
  
}
.alert-dismissible{
  font-weight: bold;
}
</style>