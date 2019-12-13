<template>
    <div>
        <div class="body-rwd banner-rwd">
            <div class="img-3 w-100"> </div>
            <div class="container ">
                <div class="evaluation">
                    <div class="img-2 my-5">
                        <div class="title">                    
                            <h3>隨心所欲，怎麼擺都好看。</h3>
                            <p>設計大師，時尚潮流。</p>
                            <button class="btn btn-primary btn-radius animated infinite jello" style="animation-duration: 2s" @click.prevent="goIndex"  >購買</button>
                        </div>
                    </div>
                </div>
                
                <div class="shop mt-5">
                    <div class="text-center pt-4 shop-content ">
                        <h3>款式最多的watch</h3>
                        <button class="btn btn-primary btn-radius mt-2" @click.prevent="goIndex">立馬拜金去</button>
                    </div>
                </div>



                <div class="img-1 my-5">
                    <div class="title">
                        <h3>1,000 萬首歌，免額外付費試聽 1 個月。</h3>
                        <p>高音質音樂，一聽就上癮。</p>
                        <button class="btn btn-secondary btn-radius" @click.prevent="goIndex"><i class="fas fa-headphones-alt mr-2"></i>現在試聽</button>
                    </div>
                </div>
                
                <!-- swiper -->
                <swiper :options="swiperOption" class="img-rwd">
                    <div class="swiper-slide swiper-list">
                        <img class="img-swiper" src="@/assets/images/monitor-u3419w-pdp-responsive-03.jpg" alt="">
                        <div class="swiper-title">
                            <h5>超大視角，看電影、工作，一次OK</h5>
                            <button class="btn btn-primary btn-radius" @click.prevent="goIndex">了解更多</button>
                        </div>
                    </div>
                    <div class="swiper-slide swiper-list">
                        <img class="img-swiper" src="@/assets/images/pdp-polaris-alienware-34-monitor-aw3418dw-module-05.jpg" alt="">
                        <div class="swiper-title">
                            <h5>玩GAME必敗品，無延遲，色彩飽和</h5>
                            <button class="btn btn-primary btn-radius" @click.prevent="goIndex">了解更多</button>
                        </div>
                    </div>
                    <div class="swiper-slide swiper-list">
                        <img class="img-swiper" src="@/assets/images/apple_watch_series_3_tile__ckw8ykb6jhw2_large.jpg" alt="">
                        <div class="swiper-title">
                            <h5>來電顯示，自動偵測</h5>
                            <button class="btn btn-primary btn-radius" @click.prevent="goIndex">了解更多</button>
                        </div>
                    </div>
                    
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>

                <div class="shop2 mt-5">
                    <div class="text-center pt-4 shop-content">
                        <h3>最專業的3C網站</h3>
                        <button class="btn btn-info btn-radius mt-2" @click.prevent="goIndex">立馬拜金去</button>
                    </div>
                </div>
            
                
                <div class="evaluation">
                    <div class="img-4 my-5">
                        <div class="title">
                            <h3>薄如紙，輕如羽毛，旗艦規格。</h3>
                            <p>激發你的創意，無限手套在手，想怎畫就怎畫。</p>
                            <button class="btn btn-outline-primary btn-radius animated infinite bounceIn" style="animation-duration: 2s" @click.prevent="goIndex">購買</button>
                        </div>
                    </div>
                </div> 
                

                
                
                
            </div>
        </div>
        
        
            
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{

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
    methods:{
        goIndex(){
        // 購物去按鈕
            this.$router.push('/').catch(err => {});
            this.$bus.$emit('refresh');
        },
    },
    created() {
        $(function(){
            $(window).scroll(function(){ //偵測畫面滾動
            let windowHeight = $(window).height(); //目前視窗高度
            let scrollPos = $(window).scrollTop(); //目前滾動到位置
            // console.log('高',windowHeight,'滾動位置',scrollPos)
            //css位移漸出
            if($(window).width()>=768){
                $('.evaluation').each(function(){
                var thisPos = $(this).offset().top;
                // console.log(thisPos);
                if(( (windowHeight/1.3) + scrollPos ) >= thisPos ) { //視窗高度+目前滾動位置 >= evaluation的位置
                    $(this).addClass('evaluation-fadeIn');
                }
            });
            }else{
                $('.evaluation').removeClass('evaluation');
                // $(this).removeClass("intro");
            }
        });
        })
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.img-rwd{
    img{
        max-width: 100%;
    }
}

.img-1{
    background-image: url(../../assets/images/music__g13pd5xxmzmi_large.png) ;
    background-repeat: no-repeat;
    background-color: white;
    background-position: center; //圖片維持置中 
    background-size: 100%;
    height: 420px;
    // max-width: 100%;
    .title {
        position: relative;
        top: 100px;
        left: -200px;
        margin: 0 auto;
        width: 460px;
        height: 152px;
        // background: rgba(0, 0, 0, 0.4);
        text-align: center;
        color: #fff;

        h3 {
            font-size: 36px;
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
    opacity:0;
    transition:all 1.5s;
    transform:translateX(100px);
}
.evaluation-fadeIn{
    //位移漸出
    opacity:1;
    transform: translateX(0);
   
}
.img-2{
    background-image: url(../../assets/images/accessories_for_mac_tile__1y124l6fa1ei_large.jpg) ;
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: left; //圖片維持置中 
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
            font-size: 36px;
            padding-top: 30px;
            font-weight: bold;
        }
        p {
            padding-top: 30px;
            line-height: 1.5;
        }
    }
}
.img-3{
    background-image: url(../../assets/images/u12-plus-customised_web-banner.jpg) ;
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: top; //圖片維持置中 
    background-size: 100%;
    height: 720px;
    max-height: 720px;
    margin-top: 58px;
}
.img-4{
    background-image: url(../../assets/images/ipad_pro_hero__phf9t8u0esii_large.jpg) ;
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: left; //圖片維持置中 
    background-size: 100%;
    height: 520px;
    overflow: hidden;
    // max-width: 100%;
    .title {
        position: relative;
        top: 100px;
        left: 350px;
        margin: 0 auto;
        width: 260px;
        height: 152px;
        // background: rgba(0, 0, 0, 0.4);
        text-align: center;
        color: $primary;

        h3 {
            font-size: 36px;
            padding-top: 30px;
            font-weight: bold;
        }
        p {
            padding-top: 30px;
            line-height: 1.5;
        }
    }
}


.shop{
    background-image: url(../../assets/images/hero__e85lhpfa8n2i_large.jpg) ;
    background-size: cover;
    overflow: hidden;
    z-index: -1;
    height: 250px;
    // 固定背景
    background-repeat : no-repeat;
    background-attachment : fixed;
    background-position : center;
}

.shop2{
    background-image: url(../../assets/images/galaxy-note10_highlights_acc_b.jpg) ;
    background-size: cover;
    overflow: hidden;
    z-index: -1;
    height: 250px;
    // 固定背景
    background-repeat : no-repeat;
    background-attachment : fixed;
    background-position : center;
    
}
.shop-content{
    position: relative;
    top: 50px;
    // left: 350px;
    margin: 0 auto;
    width: 400px;
    height: 152px;
    background: rgba(255, 255, 255, 0.3);
    text-align: center;
    h3{
        font-weight: bold;
    }
}

.swiper-list{
    position: relative;
    .swiper-title{
        width: 180px;
        position: absolute;
        top:150px;
        right:0px;
    }
}


.btn-radius{
    border-radius: 15px 15px 
}

@include desktop-top() {
//  .body-rwd{
//      margin-top: 58px;
//  }
  
}
@include pc-top() {
.img-1{
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

        h3 {
            font-size: 36px;
            padding-top: 30px;
        }
        p {
            padding-top: 30px;
            line-height: 1.5;
        }
    }
 }
  
}
@include pc() {
.img-4{
    background-image: url(../../assets/images/ipad_pro_hero__phf9t8u0esii_large.jpg) ;
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: left; //圖片維持置中 
    background-size: 100%;
    height: 520px;
    // max-width: 100%;
    .title {
        position: relative;
        top: 100px;
        left: 200px;
        margin: 0 auto;
        width: 260px;
        height: 152px;
        // background: rgba(0, 0, 0, 0.4);
        text-align: center;
        color: $primary;

        h3 {
            font-size: 36px;
            padding-top: 30px;
            font-weight: bold;
        }
        p {
            padding-top: 30px;
            line-height: 1.5;
        }
    }
}
}
@include pad() {
 .img-1{
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
 .img-3{
    
    max-height: 360px;
    margin-top: 58px;
 }
  .shop{
    background-size: 800px;
 }
 .shop2{
    background-size: 800px;
 }
  

}
@include m568() {
.img-1{
    height: 300px;
    min-height: 300px;
    .title {
        position: relative;
        top: 40px;
        left: 10px;
        margin: 0 auto;
        width: 460px;
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
 .img-4{
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
 .img-2{
     overflow: hidden;
 }
 .shop{
    background-size: 600px;
 }
 .shop2{
    background-size: 600px;
 }
}
@include m480() {
 .img-1{
    height: 300px;
    min-height: 300px;
    .title {
        position: relative;
        top: 50px;
        left: 10px;
        margin: 0 auto;
        width: 460px;
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
 .img-4{
    .title {
        position: relative;
        top: 100px;
        left: 50px;
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
  .img-3{
    
    max-height: 200px;
    margin-top: 58px;
 }
}
@include iphone5() {
 .img-4{
    .title {
        position: relative;
        top: 100px;
        left: 20px;
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