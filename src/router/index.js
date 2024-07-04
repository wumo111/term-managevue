import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ /*'../views/AboutView.vue')
    component:Login 
  }
] */

/*const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})*/

//hash
export default new VueRouter({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //   path: '/Login',
    //   name: 'Login',
    //   component: Login
    // },
    // {
    //   path: '/hospital',
    //   name: 'hospital',
    //   component:()=>import('@/components/Hospital.vue')
    // },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    // {
    //   path: '/setmeal',
    //   name: 'setmeal',
    //   component:()=>import('@/components/SetMeal.vue')
    // },
    {
      path: '/clisrch',
      name: 'clisrch',
      component:()=>import('@/components/CliSrch.vue') 
    },
    {
      path: '/',
      redirect: '/clisrch',
    },
    // {
    //   path: '/selectDate',
    //   name: 'selectDate',
    //   component:()=>import('@/components/SelectDate.vue')
    // },
    {
      path: '/clidata',
      name: 'clidata',
      component:()=>import('@/components/CliData.vue') 
    },
  ]
});

