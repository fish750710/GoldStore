<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar" >
      <div class="sidebar-sticky">
        

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">

            <router-link class="nav-link" to="/admin/Products">
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
            
          </li>  

          <li class="nav-item">

            <router-link class="nav-link" to="/admin/Orders">
              
              <div class="ml-1">
                <i class="far fa-file-alt pr-1"></i>
                訂單列表
              </div>
              
            </router-link>
            
          </li>   
          <li class="nav-item">

            <router-link class="nav-link" to="/admin/Coupons">
              <i class="fas fa-ticket-alt"></i>
              優惠卷
            </router-link>
            
          </li>     
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            
             
              <router-link  class="nav-link" to="Index.vue">
               <i class="fas fa-shopping-cart"></i>
                回商城
              </router-link>
            
          </li>          
        </ul>


      </div>
    </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
    
    }
  },
}
</script>


<style scoped>


</style>