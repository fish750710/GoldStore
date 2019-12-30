<template>
    <div>
      <div class="row pt-1 m-sidebar-none" >
        <div class=" col-md-2 d-none d-md-block " >
          <ul class="h6 menu-ul">
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('APPLE')">
              <span :class="[ activeitem =='APPLE' ? 'text-primary':'' ]">APPLE</span></a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('ASUS')">
              <span :class="[ activeitem =='ASUS' ? 'text-primary':'' ]">ASUS</span></a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('HTC')">
              <span :class="[ activeitem =='HTC' ? 'text-primary':'' ]">HTC</span></a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('小米')">
              <span :class="[ activeitem =='小米' ? 'text-primary':'' ]">小米</span></a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      activeitem: ''
    }
  },
  methods: {
    badgeSearch (str) {
      this.activeitem = str
      // this.$store.dispatch('getCategory', str);
      this.$router.push(`/${str}`).catch(err => {})
      this.$bus.$emit('change')
      // 更新畫面方法
      // location.reload()
      // this.$router.go(0)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/all";
.textcolor{
  color: $primary;
}
.menu-ul{
  list-style-type:none;
  .menuSidebar{
    text-decoration: none;
    color: $dark;
    font-weight: bold;
    font-size:20px;
    width: 80px;
  }
  a:hover{
    color: $primary;
    position: relative;
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
