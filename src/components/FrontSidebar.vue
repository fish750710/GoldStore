<template>
    <div>
      <div class="row pt-1 m-sidebar-none">
        <div class="d-none d-md-block ">
          <ul class="h6 menu-ul">
            <li class="my-2 "><a href="#" class="menuSidebar p-2 d-flex justify-content-start" :class="[ activeitem ==='APPLE' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('APPLE')" >
              <span >APPLE</span></a></li>
            <li class="my-2 "><a href="#" class="menuSidebar p-2 d-flex justify-content-start" :class="[ activeitem ==='ASUS' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('ASUS')" >
              <span >ASUS</span></a></li>
            <li class="my-2 "><a href="#" class="menuSidebar p-2 d-flex justify-content-start" :class="[ activeitem ==='HTC' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('HTC')" >
              <span >HTC</span></a></li>
            <li class="my-2 "><a href="#" class="menuSidebar p-2 d-flex justify-content-start" :class="[ activeitem ==='小米' ? ['text-white','bg-dark'] :'' ]" @click.prevent="badgeSearch('小米')" >
              <span >小米</span></a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    badgeSearch (str) {
      this.$router.push(`/${str}`).catch(err => (err))
      this.getCategory()
      // 更新畫面方法
      // location.reload()
      // this.$router.go(0)
    },
    getCategory (page) {
      this.$store.dispatch('getProducts', page)
    }
  },
  computed: {
    // vuex getters
    ...mapGetters(['activeitem'])
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";
.textcolor{
  color: $primary;
}
.menu-ul{
  padding: 5px 25px;
  list-style-type:none;
  .menuSidebar{
    text-decoration: none;
    color: $dark;
    font-weight: bold;
    font-size:20px;
    width: 90px;
  }
  a{
    border:1px $info solid;
    border-radius:5px;
    transition: all 0.3s;
    box-shadow: 5px 5px 5px rgba(227, 219, 208, 0.5);
    &:hover{
      color: $primary;
      position: relative;
      border:1px $primary solid;
      transition: all 0.3s;
      transform: translate(5px, 0);
    }
  }
}
@include pc() {
  .m-sidebar-none{
    display: none;
  }
}
@include pad() {
  .m-sidebar-none{
    display: none;
  }
}
.sticky-top{
  position:sticky;
  top:0;
  z-index: 999;
}
@keyframes ad_width {
  from {
    width: 0
  }
  to {
    width: 55px
  }
}
</style>
