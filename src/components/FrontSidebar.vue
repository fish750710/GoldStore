<template>
    <div>
      <div class="row pt-1 m-sidebar-none" >
        
        <div class=" col-md-2 d-none d-md-block " >
          <ul class="h6 menu-ul">
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('APPLE')">
              <i class="fab fa-apple pr-3 ico-1"></i><span class="">APPLE</span></a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('ASUS')">
              <i class="fas fa-microchip pr-3 ico-2"></i><span class="">ASUS</span></a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('HTC')">
              <i class="fas fa-glasses pr-3 ico-3"></i><span class="">HTC</span></a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('小米')">
              <i class="fas fa-robot pr-3"></i><span class="">mi</span></a></li>
          </ul>
        </div>
     
      </div>  

    </div>
</template>

<script>

export default {
  data () {
    return {
    
    }
  },
  methods:{
    badgeSearch (str) {
        // let str = e.target.firstChild.nodeValue
        // console.log(e.target.firstChild);
        
        this.$router.push(`/${str}`).catch(err=>{});
        this.$bus.$emit('change');   
        // 更新畫面方法
        // location.reload()  
        // this.$router.go(0)
    },   
  }, 
  
}
</script>


<style lang="scss" scoped>
@import "@/assets/all";

.menu-ul{
  list-style-type:none;
  .menuSidebar{
    text-decoration: none;
    color: $dark;    
    font-weight: bold;
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
  // bottom: 50vh;
}
.ico-1{
  margin-left: 3px;
  margin-right: 2px;
}
.ico-2{
  margin-left: 1px;
  margin-right: 1px;
}
.ico-3{
  margin-right: 1px;
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