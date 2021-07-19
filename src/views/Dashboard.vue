<template>
    <div>
        <Navbar/>
        <div class="d-flex justify-content-center align-items-center"><alert/> </div>
        <div class="container-fluid">
            <div class="row">
                <main role="main" class="col-md ml-sm-auto col-lg px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Alert from '../components/AlertMsg.vue'

export default {
  components: {
    Navbar,
    Alert
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = `${myCookie}`
  }
}
</script>

<style lang="scss" scoped>

</style>
