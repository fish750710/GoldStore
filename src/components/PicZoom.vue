<template>
  <div class="pic-zoom">
    <div
      class="preview-box"
      @mousemove="move($event)"
      @mouseleave="out"
      ref="previewBox"
      @mouseenter="enter"
    >
      <img :src="previewImg" style="width:350px">
      <div class="mask" ref="hoverBox" v-show="maskShow"></div>
    </div>
    <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox">
      <img :src="zoomImg" ref="bigImg">
    </div>
  </div>
</template>

<script>
function offset (el) {
  let top = el.offsetTop
  let left = el.offsetLeft
  if (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  };
  return {
    left: left,
    top: top
  }
}
export default {
  name: 'picZoom',
  props: {
    previewImg: {
      type: String,
      default: ''
    },
    zoomImg: {
      type: String,
      url: ''
    }
  },
  data () {
    return {
      zoomVisiable: false,
      maskShow: false
    }
  },
  methods: {
    enter () {
      this.maskShow = true
    },
    out () {
      this.zoomVisiable = false
      this.maskShow = false
    },
    move (ev) {
      this.init()
      // 游標距離螢幕距離
      let moveX = ev.clientX
      let moveY = ev.clientY
      // 大盒子距離頂部的距離
      let offsetLeft = offset(this.oPreviewBox).left
      let offsetTop = offset(this.oPreviewBox).top
      let left = moveX - offsetLeft - this.houverWidth / 2
      let top
      if (this.scroll > 0) {
        top = moveY - offsetTop + this.scroll - this.houverHeight / 2
      } else {
        top = moveY - offsetTop - this.houverHeight / 2
      }
      let maxWidth = this.pWidth - this.houverWidth
      let maxHeight = this.pWidth - this.houverHeight
      left = left < 0 ? 0 : left > maxWidth ? maxWidth : left
      top = top < 0 ? 0 : top > maxHeight ? maxHeight : top
      let percentX = left / (maxWidth)
      let percentY = top / (maxHeight)
      this.oHoverBox.style.left = left + 'px'
      this.oHoverBox.style.top = top + 'px'
      this.oBigImg.style.left = percentX * (this.bWidth - this.imgWidth) + 'px'
      this.oBigImg.style.top = percentY * (this.bHeight - this.imgHeight) + 'px'
      this.$emit('move', ev)
      this.zoomVisiable = true
    },
    init () {
      this.oHoverBox = this.$refs.hoverBox
      this.oPreviewBox = this.$refs.previewBox
      this.oBigImg = this.$refs.bigImg
      this.imgBox = this.$refs.zoomBox
      this.houverWidth = this.oHoverBox.offsetWidth
      this.houverHeight = this.oHoverBox.offsetHeight
      this.pWidth = this.oPreviewBox.offsetWidth
      this.pHeight = this.oPreviewBox.offsetHeight
      this.imgWidth = this.oBigImg.offsetWidth
      this.imgHeight = this.oBigImg.offsetHeight
      this.bWidth = this.imgBox.offsetWidth
      this.bHeight = this.imgBox.offsetHeight
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

@include desktop-top() {
  .pic-zoom {
    .preview-box {
        //搜尋範圍
        left:200px;
      width: 350px;
      height: 350px;
      position: relative;
      cursor: crosshair;
      .mask{
        display: block;
        //遮罩範圍
        top: 75px;
        left: 75px;
        width: 150px;
        height: 150px;
        position: absolute;
        background-color: #FFF;
        opacity: .6;
        border: 1px solid #CCC;
        cursor: crosshair;
        z-index: 101;
      }
    }
    .zoom-box {
      display: block;
        //大圖
      top: 0px;
      left: 565px;
      width: 500px;
      height: 500px;
      border: 1px solid #999;
      position: absolute;
      overflow: hidden;
      z-index: 100;
      background: #FFF;
      img {
        // width: 500px;
        // height: 500px;
        position: absolute;
        border: 0px;
        display: block;
        left: -100.286px;
        top: -125.357px;
      }
    }
  }

}
@include pc-top() {
.pic-zoom {
    .preview-box {
        //搜尋範圍
        left:200px;
      width: 350px;
      height: 350px;
      position: relative;
      cursor: crosshair;
      .mask{
        display: block;
        //遮罩範圍
        top: 75px;
        left: 75px;
        width: 150px;
        height: 150px;
        position: absolute;
        background-color: #FFF;
        opacity: .6;
        border: 1px solid #CCC;
        cursor: crosshair;
        z-index: 101;
      }
    }
    .zoom-box {
      display: block;
        //大圖
      top: 0px;
      left: 565px;
      width: 500px;
      height: 500px;
      border: 1px solid #999;
      position: absolute;
      overflow: hidden;
      z-index: 100;
      background: #FFF;
      img {
        // width: 500px;
        // height: 500px;
        position: absolute;
        border: 0px;
        display: block;
        left: -100.286px;
        top: -125.357px;
      }
    }
  }

}
@include pc() {
.pic-zoom {
    .preview-box {
        //搜尋範圍
        left:0px;
      width: 350px;
      height: 350px;
      position: relative;
      cursor: crosshair;
      .mask{
        display: block;
        //遮罩範圍
        top: 75px;
        left: 75px;
        width: 150px;
        height: 150px;
        position: absolute;
        background-color: #FFF;
        opacity: .6;
        border: 1px solid #CCC;
        cursor: crosshair;
        z-index: 101;
      }
    }
    .zoom-box {
      display: block;
        //大圖
      top: 0px;
      left: 365px;
      width: 400px;
      height: 400px;
      border: 1px solid #999;
      position: absolute;
      overflow: hidden;
      z-index: 100;
      background: #FFF;
      img {
        position: absolute;
        border: 0px;
        display: block;
        left: -100.286px;
        top: -125.357px;
      }
    }
  }

}
@include pad() {
  .pic-zoom {
    .preview-box {
        //搜尋範圍
        left:0px;
      width: 250px;
      height: 250px;
      position: relative;
      cursor: pointer;
      .mask{
        display: none;
      }
    }
    .zoom-box {
      display: none;
    }
  }

}
</style>
