<template>
    <div>
        <nav>
            <ul class="pagination">
                <li class="page-item"  :class="{'disabled': !getpagin.has_pre}">
                    <a class="page-link" href="#" @click="getPage(getpagin.current_page - 1)" >Previous</a>
                </li>
                <li class="page-item"  :class="{'active': getpagin.current_page === page}"
                    v-for="(page) in getpagin.total_pages" :key="page" >
                    <a class="page-link" href="#"  @click="getPage(page)"> {{page}} </a>
                </li>                
                <li class="page-item" :class="{'disabled': !getpagin.has_next}">
                    <a class="page-link" href="#" @click="getPage(getpagin.current_page + 1)" >Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name:'Pagin',
    //從 Products傳來的資料 :getpagin='getProducts'，將全部資料傳進 getpagin
    props:['getpagin'],
    data(){
        return {};
    },
    methods:{
        getPage( page = 1 ){ //page 如未帶入數值，初始值=1
            //防呆,避免傳入O或當前頁數大於總頁數
            // if(page === 0 || page > this.getpagin.total_pages)
            // { return }
           
            //觸發 postPage 從 Products.vue @postPage="getProducts"
            this.$emit('postPage',page);
        }
    }
}
</script>