import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ElectronApi from '@/views/ElectronApi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ElectronApi',
    component: ElectronApi
  },
  {
    path: '/ElectronApi',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
