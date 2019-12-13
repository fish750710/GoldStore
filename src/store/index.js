// 彙整 VUEX
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isLoading: false,
        products:[],
        categories:[],
        cart: {
            carts: [],
        },
    },
    // 操作行為
    actions:{
        updateLoading(context, status){
            context.commit('LOADING', status);
        },
        // getProducts(context,page = 1) {
            
        //     const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
        //     context.commit('LOADING', true);

        //     this.$http.get(url).then((response) => {
        //         vm.products = response.data.products; //將回傳資料存在 products
        //         // console.log(response);
        //         context.commit('LOADING', false);
        //         vm.getUnique();//????? 取得sidebar資料??
        //         vm.pagination = response.data.pagination; //把分頁資料存起來

        //     });
        // },
        getProducts(context) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit('LOADING', true);
            axios.get(url).then((response) => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);
                console.log('取得產品列表:', response);
                context.commit('LOADING', false);
            });
        },
        getCart(context) {
            context.commit('LOADING', true);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            axios.get(url).then((response) => {
                if (response.data.data.carts) {
                    context.commit('CART', response.data.data);
                }
                context.commit('LOADING', false);
                console.log('取得購物車', response.data.data);
            });
        },
        removeCart(context, id) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING', true);
            axios.delete(url).then((response) => {
                context.commit('LOADING', false);
                context.dispatch('getCart');
                console.log('刪除購物車項目', response);
            });
        },
        addtoCart(context, { id, qty }) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            const item = {
                product_id: id,
                qty,
            };
            axios.post(url, { data: item }).then((response) => {
                context.commit('LOADING', false);
                context.dispatch('getCart');
                console.log('加入購物車:', response);
            });
        },

    },
    // 操作狀態
    mutations:{
        LOADING(state, status){
            state.isLoading = status;
        },
        PRODUCTS(state, payload){
            state.products = payload;
        },
        CATEGORIES(state, payload){
            const categories = new Set();
            payload.forEach((item) => {
                categories.add(item.category);
            });
            state.categories = Array.from(categories);
        },
        CART(state, payload) {
            state.cart = payload;
        },
    },
});

