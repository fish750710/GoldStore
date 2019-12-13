<template>
    <div>
      <div class="row pt-1 m-sidebar-none" >
        
        <div class=" col-md-2 d-none d-md-block " >
          <ul class="h6 menu-ul">
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('APPLE')">
              <i class="fab fa-apple pr-2"></i>APPLE</a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('ASUS')">
              <i class="fas fa-microchip pr-2"></i>ASUS</a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('HTC')">
              <i class="fas fa-glasses pr-2"></i>HTC</a></li>
            <li class="my-2 pb-2"><a href="#" class="menuSidebar pb-1 d-flex justify-content-start" @click.prevent="badgeSearch('小米')">
              <i class="fas fa-robot pr-2"></i>mi</a></li>
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
    // transition: all .7s;
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

// .menu-ul a:after {
  
//     content: ' ';
//     position: absolute;
//     z-index: 2;
//     bottom: -2px;
//     left: 28px;
//     display: block;
//     // width: 65px;
//     // height: 1px;
//     transform: translate(-50%);
// }

// .menu-ul a:hover:after {
//     height: 2px;
//     animation: ad_width .3s linear forwards;
//     background: $info;
// }

.sticky-top{
  position:sticky;
  top:0;
  z-index: 999;
  // bottom: 50vh;
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