import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from "@/views/NotFound";
import Cart from "@/views/Cart";
import Products from "@/views/Products";
import ProductView from "@/views/ProductView";
import ThankYou from "@/views/ThankYou";

Vue.use(VueRouter)

const routes = [
 {
  path: '/',
  name: 'home',
  component: HomeView
 },
 {
  path: '*',
  Name: 'NotFound',
  component: NotFound
 },
 {
  path: '/cart',
  name: 'cart',
  component: Cart,
  props: true
 },
 {
  path: '/products/:category',
  name: 'products',
  component: Products,
  props: true
 },
 {
  path: '/product/:category/:id',
  name: 'productView',
  component: ProductView,
  props: true
 },
 {
  path: '/thank_you',
  name: 'thank_you',
  component: ThankYou,
  props: true
 },
]

const router = new VueRouter({
 mode: 'history',
 base: process.env.BASE_URL,
 routes
})

export default router
