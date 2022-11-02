<template>
  <v-app-bar app color="primary" dark>
    <router-link class="routerlink" to="/">
      <h1 ref="title">TAC-Shop</h1>
    </router-link>
    <v-spacer></v-spacer>
    <router-link style="text-decoration: none; color: inherit;" to="/cart">
    <v-btn
        color="green"
        class="ma-2 white--text"
    >
      Cart
      <v-icon
          right
          dark
      >
        mdi-cart
      </v-icon>
    </v-btn>
    </router-link>
  </v-app-bar>
</template>
<script>


export default {
  name: 'Navigation',
  data: () => ({}),
}
</script>
<style scoped>
h1, h2 {
  color: white;
}
</style>
