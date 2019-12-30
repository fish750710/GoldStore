<template>
  <div>
    <div class="body-rwd banner-rwd">
      <div class="banner-img-big w-100"></div>
      <div class="container">
        <div class="evaluation">
          <div class="content-img-first my-5">
            <div class="title">
              <h3>隨心所欲，怎麼擺都好看。</h3>
              <p>設計大師，時尚潮流。</p>
              <button
                class="btn btn-primary btn-radius animated infinite bounceIn text-black"
                style="animation-duration: 2s"
                @click="goIndex"
              >購買</button>
            </div>
          </div>
        </div>
        <div class="bg-fixed-img-first mt-5">
          <div class="text-center pt-4 bg-fixed-img-content">
            <h3>款式最多的watch</h3>
            <button class="btn btn-primary btn-radius mt-2" @click="goIndex">立馬拜金去</button>
          </div>
        </div>
        <div class="content-img-center my-5">
          <div class="title">
            <h3>1,000 萬首歌，免額外付費試聽 1 個月。</h3>
            <p>高音質音樂，一聽就上癮。</p>
            <button class="btn btn-primary btn-radius" @click="goIndex">
              現在試聽
            </button>
          </div>
        </div>
        <!-- swiper -->
        <swiper :options="swiperOption" class="img-rwd">
          <div class="swiper-slide swiper-list">
            <img class="img-swiper" src="@/assets/images/monitor-u3419w-pdp-responsive-03.jpg" alt />
            <div class="swiper-title">
              <h5>超大視角，看電影、工作，一次OK</h5>
              <button class="btn btn-primary btn-radius" @click="goIndex">了解更多</button>
            </div>
          </div>
          <div class="swiper-slide swiper-list">
            <img
              class="img-swiper"
              src="@/assets/images/pdp-polaris-alienware-34-monitor-aw3418dw-module-05.jpg"
              alt
            />
            <div class="swiper-title">
              <h5>玩GAME必敗品，無延遲，色彩飽和</h5>
              <button class="btn btn-primary btn-radius" @click="goIndex">了解更多</button>
            </div>
          </div>
          <div class="swiper-slide swiper-list">
            <img
              class="img-swiper"
              src="@/assets/images/apple_watch_series_3_tile__ckw8ykb6jhw2_large.jpg"
              alt
            />
            <div class="swiper-title">
              <h5>來電顯示，自動偵測</h5>
              <button class="btn btn-primary btn-radius" @click="goIndex">了解更多</button>
            </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div class="bg-fixed-img-end mt-5">
          <div class="text-center pt-4 bg-fixed-img-content">
            <h3>最專業的3C網站</h3>
            <button class="btn btn-primary btn-radius mt-2" @click="goIndex">立馬拜金去</button>
          </div>
        </div>
        <div class="evaluation">
          <div class="content-img-end my-5">
            <div class="title">
              <h3>薄如紙，輕如羽毛，旗艦規格。</h3>
              <p>激發你的創意，無限手套在手，想怎畫就怎畫。</p>
              <button
                class="btn btn-primary btn-radius animated infinite bounceIn text-black"
                style="animation-duration: 2s"
                @click="goIndex"
              >購買</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 2000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        }
      }
    }
  },
  methods: {
    goIndex () {
      // 購物去按鈕
      this.$router.push('/').catch(err => (err))
      this.$bus.$emit('refresh')
    }
  },
  created () {
    $(function () {
      $(window).scroll(function () {
        // 偵測畫面滾動
        let windowHeight = $(window).height() // 目前視窗高度
        let scrollPos = $(window).scrollTop() // 目前滾動到位置
        // css位移漸出
        if ($(window).width() >= 768) {
          $('.evaluation').each(function () {
            var thisPos = $(this).offset().top
            if (windowHeight / 1.3 + scrollPos >= thisPos) {
              // 視窗高度+目前滾動位置 >= evaluation的位置
              $(this).addClass('evaluation-fadeIn')
            }
          })
        } else {
          $('.evaluation').removeClass('evaluation')
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.img-rwd {
  img {
    max-width: 100%;
  }
}

.content-img-center {
  background-image: url(../../assets/images/music__g13pd5xxmzmi_large.png);
  background-repeat: no-repeat;
  background-color: white;
  background-position: center;
  background-size: 100%;
  height: 420px;
  .title {
    position: relative;
    top: 100px;
    left: -200px;
    margin: 0 auto;
    max-width: 460px;
    height: 152px;
    text-align: center;
    color: #fff;
    h3 {
      padding-top: 30px;
    }
    p {
      padding-top: 30px;
      line-height: 1.5;
    }
  }
}
.evaluation {
  //位移漸出
  opacity: 0;
  transition: all 1.5s;
  transform: translateX(100px);
}
.evaluation-fadeIn {
  //位移漸出
  opacity: 1;
  transform: translateX(0);
}
.content-img-first {
  background-image: url(../../assets/images/accessories_for_mac_tile__1y124l6fa1ei_large.jpg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: left;
  background-size: 100%;
  height: 420px;
  right: 0px;
  overflow: hidden;
  .title {
    margin: 0 auto;
    width: 260px;
    height: 152px;
    text-align: center;
    color: $primary;
    h3 {
      padding-top: 30px;
      font-weight: bold;
    }
    p {
      padding-top: 30px;
      line-height: 1.5;
    }
  }
}
.banner-img-big {
  background-image: url(../../assets/images/u12-plus-customised_web-banner.jpg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: top;
  background-size: 100%;
  height: 720px;
  max-height: 720px;
  margin-top: 58px;
}
.content-img-end {
  background-image: url(../../assets/images/ipad_pro_hero__phf9t8u0esii_large.jpg);
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: left;
  background-size: 100%;
  height: 520px;
  overflow: hidden;
  .title {
    position: relative;
    top: 100px;
    left: 350px;
    margin: 0 auto;
    width: 260px;
    height: 152px;
    text-align: center;
    color: $primary;
    h3 {
      padding-top: 30px;
      font-weight: bold;
    }
    p {
      padding-top: 30px;
      line-height: 1.5;
    }
  }
}

.bg-fixed-img-first {
  background-image: url(../../assets/images/hero__e85lhpfa8n2i_large.jpg);
  // background-size: cover;
  overflow: hidden;
  z-index: -1;
  height: 250px;
  // 固定背景
  background-repeat: no-repeat;
  background-attachment: fixed;
  // background-position: center;
}

.bg-fixed-img-end {
  background-image: url(../../assets/images/galaxy-note10_highlights_acc_b.jpg);
  // background-size: cover;
  overflow: hidden;
  z-index: -1;
  height: 250px;
  // 固定背景
  background-repeat: no-repeat;
  background-attachment: fixed;
  // background-position: center;
}
.bg-fixed-img-content {
  position: relative;
  top: 50px;
  margin: 0 auto;
  width: 400px;
  height: 152px;
  background: rgba(255, 255, 255, 0.3);
  text-align: center;
  h3 {
    font-weight: bold;
  }
}

.swiper-list {
  position: relative;
  .swiper-title {
    width: 180px;
    position: absolute;
    top: 150px;
    right: 0px;
  }
}

.btn-radius {
  border-radius: 15px 15px;
}

@include desktop-top() {
}
@include pc-top() {
  .content-img-center {
    min-height: 420px;
    .title {
      position: relative;
      top: 100px;
      left: -200px;
      margin: 0 auto;
      width: 460px;
      height: 152px;
      text-align: center;
      color: #fff;
    }
  }
}
@include pc() {
  .content-img-end {
    background-image: url(../../assets/images/ipad_pro_hero__phf9t8u0esii_large.jpg);
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: left;
    background-size: 100%;
    height: 520px;
    .title {
      position: relative;
      top: 100px;
      left: 200px;
      margin: 0 auto;
      width: 260px;
      height: 152px;
      text-align: center;
      color: $primary;
      h3 {
        padding-top: 30px;
        font-weight: bold;
      }
      p {
        padding-top: 30px;
        line-height: 1.5;
      }
    }
  }
  .content-img-center {
    .title {
      position: relative;
      top: 100px;
      left: -100px;
    }
  }
}
@include pad() {
  .content-img-center {
    height: 300px;
    min-height: 300px;
    .title {
      position: relative;
      top: 28px;
      left: -60px;
      margin: 0 auto;
      width: 460px;
      height: 152px;
      text-align: center;
      color: #fff;
      h3 {
        font-size: 20px;
        padding-top: 30px;
      }
      p {
        padding-top: 15px;
        line-height: 1.5;
      }
    }
  }
  .banner-img-big {
    max-height: 360px;
    margin-top: 58px;
  }
  .bg-fixed-img-first {
    background-size: 800px;
  }
  .bg-fixed-img-end {
    background-size: 800px;
  }
}
@include m568() {
  .content-img-center {
    height: 300px;
    min-height: 300px;
    width: 400px;
    .title {
      position: relative;
      top: 40px;
      left: 10px;
      margin: 0 auto;
      width: 400px;
      height: 152px;
      text-align: left;
      color: #fff;
      h3 {
        font-size: 20px;
        padding-top: 30px;
      }
      p {
        padding-top: 15px;
        line-height: 1.5;
      }
    }
  }
  .content-img-end {
    overflow: hidden;
    .title {
      position: relative;
      top: 100px;
      left: 100px;
      text-align: center;
      h3 {
        font-size: 20px;
        padding-top: 30px;
      }
      p {
        padding-top: 30px;
      }
    }
  }
  .content-img-first {
    overflow: hidden;
  }
  .bg-fixed-img-first {
    background-size: 600px 250px;
  }
  .bg-fixed-img-end {
    background-size: 600px 250px;
  }
}
@include m480() {
  .content-img-center {
    height: 300px;
    min-height: 300px;
    width: 350px;
    .title {
      position: relative;
      top: 50px;
      left: 10px;
      margin: 0 auto;
      width: 350px;
      height: 152px;
      text-align: left;
      color: #000;
      h3 {
        font-size: 18px;
        padding-top: 40px;
      }
      p {
        padding-top: 10px;
        line-height: 1.5;
      }
    }
  }
  .content-img-end {
    .title {
      position: relative;
      top: 100px;
      left: 0px;
      text-align: right;
      h3 {
        font-size: 18px;
        padding-top: 30px;
      }
      p {
        padding-top: 5px;
      }
    }
  }
  .banner-img-big {
    max-height: 200px;
    margin-top: 58px;
  }
}
@include iphone5() {
  .content-img-center {
    width: 300px;
    .title {
      position: relative;
      top: 60px;
      left: 10px;
      margin: 0 auto;
      width: 300px;
      height: 152px;
      text-align: left;
      color: #000;
      h3 {
        font-size: 16px;
        padding-top: 40px;
      }
      p {
        padding-top: 0px;
        line-height: 1.5;
      }
    }
  }
  .content-img-end {
    .title {
      position: relative;
      top: 100px;
      left: 0px;
      text-align: right;
      h3 {
        font-size: 18px;
        padding-top: 30px;
      }
      p {
        padding-top: 18px;
      }
    }
  }
}
</style>
