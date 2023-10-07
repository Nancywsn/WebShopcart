import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由信息的数组
const routes = [
  //首页
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    redirect: '/welcome', //重定向
    children: [
      //welcome子页面
      {
        path: '/welcome',
        component: () => import('../views/welcome.vue')
      },
      //用户购物车
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/cart.vue')
      },
      //商品列表
      {
        path: '/goods',
        component: () => import('../views/goods.vue')
      }
    ]
  },
  //登录页面
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

//创建一个路由器对象
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导入nprogress
import NProgress from 'nprogress'
//导入nprogress的样式
import 'nprogress/nprogress.css'

//定义路由导航前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

//定义路由导航后置守卫
router.afterEach((to, from) => {
  NProgress.done();

})

export default router
