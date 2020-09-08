import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/toys',
    name: 'Toys',
    component: () => import(/* webpackChunkName: "toys" */ '../views/Toys.vue'),
    meta: {
      login: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let authRequire = to.matched.some(route => route.meta.login) //pregunta si tiene el meta login = true
  if(!user && authRequire) {
    next('/')
  } else {
    next()
  }
 
})


export default router
