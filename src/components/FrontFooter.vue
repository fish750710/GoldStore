<template>
    <div>
        <footer class="page-footer font-small blue pt-4 ">
        <div class="footer bg-dark text-secondary " >
            <div class="row pt-4 footer-bottom m-0 ">
                <div class="col-6 col-sm-3 col-md-4 col-lg-4 col-xl-4 text-center">
                    <ul class="footer-list">
                        <li class="py-1"><a href="#">付款方式</a></li>
                        <li class="py-1"><a href="#">運送方式</a></li>
                        <li class="py-1"><a href="#">退貨退款</a></li>
                        <li class="py-1"><a href="#">聯絡客服</a></li>
                    </ul>
                    
                </div>
                <div class="col-6 col-sm-3 col-md-4 col-lg-4 col-xl-4 text-center">
                    <ul class="footer-list">
                        <li class="py-1"><a href="#">關於拜金</a></li>
                        <li class="py-1"><a href="#">加入我們</a></li>
                        <li class="py-1"><a href="#">拜金條款</a></li>
                        <li class="py-1"><a href="#">隱私權政策</a></li>
                    </ul>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 d-flex mt-5 footer-icon-mp">
                    <ul class="footer-icon ">
                            
                            <li class="github"><a href="#" title="github">
                                <i class="fab fa-github-square"></i>
                            </a>
                            </li>
                            <li class="twitter"><a href="#" title="twitter">
                                <i class="fab fa-twitter-square"></i></a>
                            </li>
                            <li class="google"><a href="#" title="google">
                                <i class="fab fa-google-plus-square"></i>
                            </a>
                            </li>
                    </ul>
                </div>
                
                
            </div>
            <div class="text-center h5 mb-0 p-3">
                <span class="pr-2">© Copyright 2019</span>
                <br>
                <span>圖片與素材取自網路，僅供練習作品使用，非商業與營利用途</span> 
            </div>
            <!-- <div class="clearfix"></div> -->
        </div>
        </footer>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.footer{
    max-width:100%;
}
.footer-list{
    list-style: none;
    a{
        text-decoration: none;
    }
}
.footer-icon {
    font-size: 36px;
    padding-right: 15px;
    list-style: none;
    li {
        float: right;
        padding: 0px 10px;
    }

    .github i {
        color: #fff;
    }

    .twitter i {
        color: #41ABE1;
    }

    .google i {
        color: #DB4437;
    }
    
}

@include m568() {
    .footer-icon{
        display: none;
    }
}



    
</style>