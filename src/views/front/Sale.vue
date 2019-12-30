<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-md-12 mt-5 text-center h3 pb-3 sale-rwd">
          <img src="@/assets/images/banner_1000x350_1111.jpg" alt />
          <div class="mt-2">慶祝雙11優惠</div>
          <br />
          <div class="mt-3">
            輸入優惠碼
            <span class="badge badge-danger animated infinite bounce">1111</span>
            即刻享有限時
            <span class="badge badge-primary">88</span>
            折優惠
            <button
              class="btn btn-primary font-weight-bold ml-3 mt-2 animated infinite flipInY"
              @click="goIndex"
              style="animation-duration: 3s;animation-iteration-count:3"
            >
              <i class="fas fa-running">
                <span class="ml-2">拜金去</span>
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goIndex () {
      // 購物去按鈕
      this.$router.push('/').catch(err => (err))
      this.$bus.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  min-height: 600px;
}
.sale-rwd {
  img {
    max-width: 100%;
  }
}
</style>
