<template>
    <div>
      

        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                      
          <router-link class="col-2 col-sm-1 col-md-1 col-lg-2 mr-0 navber-list" to="/">
            <img src="@/assets/images/Logo-3w150.png" alt="" class="d-logo">
            <img src="@/assets/images/Logo-64.png" alt="" class="m-logo " style="width:45px">
          </router-link>
                             

            <ul class="nav mb-2 col-10 col-sm-11 col-md-11 col-lg-10 justify-content-end">
              <li class="nav-item col-3 col-sm-3 col-md-2 col-lg-2 p-0">
                <router-link class="nav-link text-white menu-bar text-right pl-0 pr-0" to="/">
                  <i class="fas fa-store"></i>  <span class="pl-2">回賣場</span> 
                </router-link>                
              </li> 
              <li class="nav-item col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 p-0">
                <router-link class="nav-link text-white menu-bar text-right pl-0 pr-0" to="/admin/Products">
                  <i class="fas fa-box-open pr-1"> </i>  <span class="pl-2">產品列表</span>
                </router-link>                
              </li>  

              <li class="nav-item col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 p-0">
                <router-link class="nav-link text-white menu-bar text-right pl-0 pr-0" to="/admin/Orders">                  
                  <div class="ml-1">
                    <i class="far fa-file-alt pr-2"></i><span class="pl-2">訂單列表</span>
                  </div>                  
                </router-link>
                
              </li>   
              <li class="nav-item col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 p-0">
                <router-link class="nav-link text-white menu-bar text-right pl-0 pr-0" to="/admin/Coupons">
                  <i class="fas fa-ticket-alt pr-2"></i><span class="pl-2">優惠卷</span>
                </router-link>                
              </li>   
              <li class="nav-item text-nowrap signout-rwd col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2 p-0 signout-ico">          
                <a class="nav-link text-light text-right" href="#"  @click.prevent="signout"><i class="fas fa-sign-out-alt mr-2"></i>登出</a>
              </li>  
            </ul>
          
        </nav>
        
    </div>
</template>

// 登出
<script>
export default {
  name: 'Navbar',

  data(){
    return{
      success:{}
    }
  },
  
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(url).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          // console.log('登出')
          vm.$router.push('/');
        
        }
      });
    },
    issuccess(){
      //檢查登入狀態
      const vm = this;
      const url =`${process.env.VUE_APP_APIPATH}/api/user/check`;
      this.$http.post(url).then((response) => {
      
      if (response.data.success) {
        //檢查用戶是否仍持續登入狀態
        
        // console.log(response.data.success);
        // vm.success = true;
      }else{
        //未登入狀態將 Navber 改成 login in
        
        //  console.log(response.data.success);
        //  vm.success = false;
      }
    })
    }
   
  },
   created() {
    this.issuccess();
  },
  
};
</script>

<style lang="scss" scoped>

@import "@/assets/all";

.menu-bar {
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  span:hover{
    color: $primary;
    
  }
}
@include desktop-top() {
  .m-logo{
    display:none !important; 
  }
  .d-logo{
    display:block !important; 
  }
  
}
@include pc-top() {
  .m-logo{
    display:none !important; 
  }
  .d-logo{
    display:block !important; 
  }
  
}
@include pc() {
  .m-logo{
    display:none !important; 
  }
  .d-logo{
    display:block !important; 
  }
  
}
@include pad() {
  .m-logo{
    margin-top: 5px;
    display:block !important; 
  }
  .d-logo{
    display:none !important; 
  }
  .signout-ico a{
    padding-bottom: 0px;
  }
  
}
@include m568() {

  .nav-item {
    
    a{
      margin: 0;
      padding: 5px 20px;
    }
    i{
      display:none;
    }
    
  }
}
@include m480() {
  .m-logo{
    display: inline-block;
    margin-top: 10px; 
  }
  .nav-item {
    
    a{
      margin: 0;
      padding: 5px 12px;
    }
  }
}
@include iphone5() {
  .nav-item {
    
    a{
      margin: 0;
      padding: 5px 7px;
    }
  }
}

</style>
