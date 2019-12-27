import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
  {
    //網址如輸入錯誤將導入登入頁面
    path: '*',
    redirect: '/'
  },
   
  {
    //前台router
    path: '/',    
    component: () => import('@/views/Layout.vue'),
    children:[
      {
        path: '/', //路徑要小寫
        name: 'Index',
        component: () => import('@/views/front/Index.vue'),         
      },
      {
        path: 'userorders', //路徑要小寫
        name: 'UserOrders',
        component: () => import('@/views/front/UserOrders.vue'),
        meta: { requiresAuth: true }, //router 路由訊息 需要被驗證的頁面
      },
      {
        path: 'checkout', //路徑要小寫
        name: 'CheckOut',
        component: () => import('@/views/front/CheckOut.vue'),
      },
      {
        path: 'checkout2', //路徑要小寫
        name: 'CheckOut2',
        component: () => import('@/views/front/CheckOut2.vue'),
      },
      {
        path: 'checkout3/:orderId', //路徑要小寫
        name: 'CheckOut3',
        component: () => import('@/views/front/CheckOut3.vue'),
      },
      {
        path: 'sale', //路徑要小寫
        name: 'Sale',
        component: () => import('@/views/front/Sale.vue'),
      },
      {
        path: 'description', //路徑要小寫
        name: 'Description',
        component: () => import('@/views/front/Description.vue'),
      },
      {
        path: 'search/:searchStr',
        name: 'Search',
        component: () => import('@/views/front/ProductSearch.vue')
      },
      {
        path: 'detail/:productId',
        name: 'Detail',
        component: () => import('@/views/front/ProductDetail.vue')
      },
      {
        //類別
        path: '/:Str',
        name: 'category',
        component: () => import('@/views/front/Index.vue')
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  
  {
    //後台router
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    
    children: [
      //巢狀router-view
      {
        path: 'products', //路徑要小寫
        name: 'Products',
        component: () => import('@/views/back/Products.vue'),        
        meta: { requiresAuth: true }, //router 路由訊息 需要被驗證的頁面
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/back/Coupons.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/back/Orders.vue'),
        meta: { requiresAuth: true },
      },
      //前台模擬訂單
      // {
      //   path: '/', 
      //   name: 'Dashboard',
      //   component: () => import('@/views/Dashboard.vue'),
      //   children: [
      //     //巢狀router-view
      //     {
      //       path: 'customer_order', //路徑要小寫
      //       name: 'CustomerOrder',
      //       component: () => import('@/views/back/CustomerOrder.vue'),            
      //       //不須驗證
            
      //     },
      //     {
      //       path: 'customer_checkout/:orderId', //路徑要小寫，帶上 orderId
      //       name: 'CustomerCheckout',
      //       component: () => import('@/views/back/CustomerCheckout.vue'),             
      //       //不須驗證
      //     },
      //   ]
      // },

    ]
  },
]

const router = new VueRouter({
  routes,
  // mode: 'history',
})

export default router
