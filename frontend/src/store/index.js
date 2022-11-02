import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
  cartItems: [],
  price: 0
 },
 getters: {
  getCartItems(state) {
   return state.cartItems;
  },

  getPrice(state) {
   return state.price
  }
 },
 mutations: {
  ADD_PRODUCT(state, product) {
   let exist = state.cartItems.find(e => e.category == product.product.category && e.id == product.product.id)
   if (exist) {
    exist.quantity += product.quantity
   } else {
    product.product.quantity = product.quantity
    state.cartItems.push(product.product);
   }
   this.commit("TOTAL_PRICE")
  },

  CHANGE_QUANTITY(state, product) {
   let exist = state.cartItems.find(e => e.category == product.category && e.id == product.product.id)
   if (exist) {
    exist.quantity = product.quantity
   }
   this.commit("TOTAL_PRICE")
  },

  REMOVE_PRODUCT(state, index) {
   state.cartItems.splice(index, 1);
   this.commit("TOTAL_PRICE")
  },

  TOTAL_PRICE(state) {
   state.price = 0;
   state.cartItems.map(e => state.price += parseFloat(e.price) * e.quantity)
  },

  CART_RESET(state){
   state.cartItems = []
   this.commit("TOTAL_PRICE")
  }
 },
 actions: {
  addProduct: (context, product) => {
   context.commit("ADD_PRODUCT", product);
  },

  changeQuantity(context, product) {
   context.commit("CHANGE_QUANTITY", product);
  },

  removeProduct: (context, index) => {
   context.commit('REMOVE_PRODUCT', index);
  },

  cartReset: (context) => {
   context.commit('CART_RESET')
  }
 },
 modules: {}
})
