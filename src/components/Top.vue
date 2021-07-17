<template>
  <div>
    <button type="button" class="btn gotop" @click.prevent="backtop">
      <i class="fas fa-arrow-circle-up"></i>
    </button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {}
  },
  methods: {
    backtop () {
      $('html, body').animate({ scrollTop: 0 }, 300)
    }
  },
  created () {
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() >= $(window).height() / 2.5) {
          $('.gotop').addClass('scrolltop')
          $('.gotop').removeClass('topnone')
        } else {
          $('.gotop').removeClass('scrolltop')
          $('.gotop').addClass('topnone')
        }
        if (
          $(this).scrollTop() >=
          $('body').height() - $(window).height() - 150
        ) {
          // console.log('footer')
          $('.gotop').addClass('topbottom')
        } else {
          $('.gotop').removeClass('topbottom')
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.topnone {
  display: none;
}
.scrolltop {
  display: block;
}
.gotop {
  position: fixed;
  right: 30px;
  bottom: 20px;
  z-index: 900;
  font-size: 26px;
}
.topbottom {
  color: #fff;
}
</style>
