<template>
  <div>
    <div class="input-group input-group-sm">
     
          <input type="search" class="form-control input-width d-inline" placeholder="Search" aria-label="Search" v-model="searchValue" @keyup.enter="searchProduct">
        <div class="input-group-append d-inline">
          <button type="button" class="btn btn-sm btn-outline-primary" style="width: 36px;"  @click="searchProduct">
            <i class="fas fa-search fa-lg"></i>
          </button>        
        </div>

     
      
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data () {
    return {
      searchValue: '',
    }
  },
  methods: {
    searchProduct () {
      const str = this.searchValue
    //   console.log(str)
      this.$router.push(`/search/${this.searchValue}`).catch(err => {});
      this.$bus.$emit('search');
      if (str.trim() === '') {
          this.$bus.$emit('messsage:push',`請輸入商品名稱`, 'danger');       
      }     
      // console.log('searchValue', this.searchValue, this.searchStatus)
      this.searchValue = ''; 
    }
  }
}
</script>
