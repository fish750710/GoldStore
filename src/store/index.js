// 彙整 VUEX
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
    // 嚴謹模式
    strict: true,
    state: {
        isLoading: false,
        products: [],
        categories: [],
        cart: {
            carts: [],
        },
        loadingItem: "",
        addqtynum: 0,
        minusnum: 0,
        changeqty:0,
        qty: 0,
        productsOriginal: [],
        apple: [],
    },
    // 操作行為
    actions: {
        updateLoading(context, status) {
            context.commit('LOADING', status);
        },
        getProducts(context, page) {
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
            context.commit('LOADING', true);
            axios.get(url).then(response => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('LOADING', false);

                // if (vm.$route.params.Str == undefined) {
                //     vm.ProductAll = true;
                // } else {
                //     vm.ProductAll = false;
                // }
                // console.log('取得產品列表:', response);
                context.commit('PAGINATION', response.data.pagination);
            });
        },
        getCategory(context, value) {
            // console.log(value)
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            axios.get(api).then(response => {
                // console.log('getProducts', response.data)
                if (value === 'APPLE') {
                    context.commit('APPLE', response.data.products);
                }
            });
        },
        getCart(context) {
            context.commit('LOADING', true);
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            // vm.$store.dispatch('updateLoading', true);
            axios.get(url).then(response => {
                context.commit('CART', response.data.data);
                context.commit('LOADING', false);
                // console.log('取得購物車', response.data.data);
            });
        },
        removeCart(context, id) {
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            context.commit('LOADINGITEM', id);
            axios.delete(url).then((response) => {
                context.dispatch('getCart');
                context.commit('LOADINGITEM', "");
                // console.log('刪除購物車項目', response);
            });
        },
        addtoCart(context, { id, qty }) {
            // console.log(context, id, qty);
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            context.commit('LOADINGITEM', id);
            const cart = {
                product_id: id,
                qty
            };
            axios.post(url, { data: cart }).then(response => {
                context.dispatch('getCart');
                context.commit('LOADINGITEM', "");
                // console.log('加入購物車:', response);
            });
        },
        addQty(context, item){
            context.commit('ADDQTY', item );
            context.dispatch('removeCart', item.id );
            let id = item.product.id;
            let qty = item.qty;
            context.dispatch('addtoCart', { id, qty });
        },
        minusQty(context, item){
            let id = item.product.id;
            let qty = item.qty -1 ;
            context.commit('MINUSQTY', item);
            if(item.qty <= 0){
                context.dispatch('removeCart', item.id);
            }else{
                context.dispatch('addtoCart', { id, qty });
                context.dispatch('removeCart', item.id);
            }
        },
        inputQty(context, item){
            let id = item.product.id;
            let qty = item.qty;
            console.log('action',id, qty);
            context.commit('CHANGEQTY', qty);
            // if (item.qty <= 0) {
            //     context.dispatch('removeCart', item.id);
            // } else {
            //     context.dispatch('addtoCart', { id, qty });
            //     context.dispatch('removeCart', item.id);
            // }
        },

    },
    // 操作狀態(儲存資料或同步行為)
    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        },
        PRODUCTS(state, payload) {
            state.products = payload;
        },
        PAGINATION(state, payload) {
            state.pagination = payload;
        },
        // CATEGORIES(state, payload){
        //     const categories = new Set();
        //     payload.forEach((item) => {
        //         categories.add(item.category);
        //     });
        //     state.categories = Array.from(categories);
        // },
        CART(state, payload) {
            state.cart = payload;
        },
        LOADINGITEM(state, payload) {
            state.loadingItem = payload;
        },
        APPLE(state, payload) {
            state.apple = payload.filter(
                item => item.category === 'APPLE'
            );
        },
        ADDQTY(state, payload){
            state.addqtynum = payload.qty += 1 ;
        },
        MINUSQTY(state, payload){
            state.minusnum = payload.qty -= 1;
        },
        CHANGEQTY(state, paylond){
            // console.log('mutations', paylond);
            state.changeqty = paylond;
        }
        // PRODUCTSORIGINAL(state, payLoad, value){
        //     console.log( payLoad , value )
        //     let array = [];
        //     array = payLoad.filter(e => {
        //         //關鍵字搜尋標題忽略大小寫
        //         return (
        //             e.brand === value ||
        //             e.brand.toUpperCase().indexOf(value) !== -1 ||
        //             e.brand.toLowerCase().indexOf(value) !== -1
        //         );
        //     });
        //     state.products = Object.assign([], array);
        //     state.productsOriginal = payLoad;
        // }
    },
    // 如computed
    getters: {
        products(state) {
            return state.products;
        },
    },
});

