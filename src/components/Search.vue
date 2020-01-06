<template>
  <div>
    <div class="input-group input-group-sm">
      <input
        type="search"
        class="form-control input-width d-inline"
        placeholder="搜尋.."
        aria-label="搜尋"
        v-model="searchValue"
        @keyup.enter="searchProduct"
      />
      <div class="input-group-append d-inline">
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          style="width: 36px;"
          @click="searchProduct"
        >
          <i class="fas fa-search fa-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    searchProduct () {
      const str = this.searchValue
      this.$router.push(`/search/${this.searchValue}`).catch(err => (err))
      this.$bus.$emit('search')
      if (str.trim() === '') {
        this.$bus.$emit('messsage:push', `請輸入商品名稱`, 'danger')
      }
      this.searchValue = ''
    }
  }
}
</script>
