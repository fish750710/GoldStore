<template>
  <div>
    <footer class="page-footer font-small blue pt-4">
      <div class="footer bg-dark">
        <div class="row pt-4 footer-bottom m-0">
          <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right pr-5">
            <ul class="footer-list p-0">
              <li class="py-1">
                <a href="#">付款方式</a>
              </li>
              <li class="py-1">
                <a href="#">運送方式</a>
              </li>
              <li class="py-1">
                <a href="#">退貨退款</a>
              </li>
              <li class="py-1">
                <a href="#">聯絡客服</a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left pl-5">
            <ul class="footer-list p-0">
              <li class="py-1">
                <a href="#">關於拜金</a>
              </li>
              <li class="py-1">
                <a href="#">加入我們</a>
              </li>
              <li class="py-1">
                <a href="#">拜金條款</a>
              </li>
              <li class="py-1">
                <a href="#">隱私權政策</a>
              </li>
            </ul>
          </div>
          <div
            class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex mt-2 footer-icon-mp justify-content-center"
          >
            <ul class="footer-icon">
              <li class="github">
                <a href="#" title="github">
                  <i class="fab fa-github-square"></i>
                </a>
              </li>
              <li class="twitter">
                <a href="#" title="twitter">
                  <i class="fab fa-twitter-square"></i>
                </a>
              </li>
              <li class="google">
                <a href="#" title="google">
                  <i class="fab fa-google-plus-square"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-center h6 mb-0 p-3 text-white" style="line-height:30px">
          <span class>© Copyright 2019</span>
          <br />
          <span class>圖片與素材取自網路，僅供練習作品使用，非商業與營利用途</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.footer {
  max-width: 100%;
}
.footer-list {
  list-style: none;
  a {
    text-decoration: none;
    color: #fff;
  }
}
.footer-icon {
  font-size: 36px;
  padding: 0px;
  list-style: none;
  li {
    float: right;
    padding: 0px 10px;
  }
  .github i {
    color: #fff;
  }
  .twitter i {
    color: #41abe1;
  }
  .google i {
    color: #db4437;
  }
}

@include m568() {
  .footer-icon {
    display: none;
  }
}
</style>
