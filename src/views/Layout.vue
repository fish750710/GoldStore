<template>
  <div>
    <FrontNavbar />
    <router-view></router-view>
    <Top />
    <FrontFooter />
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import Top from '@/components/Top.vue'
import FrontFooter from '@/components/FrontFooter.vue'

export default {
  components: {
    FrontNavbar,
    Top,
    FrontFooter
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = `${myCookie}`
  }
}
</script>

<style lang="scss" scoped>
</style>
