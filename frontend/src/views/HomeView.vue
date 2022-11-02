<template>
  <div class="home">
    <h1 ref="title">TAC-Shop</h1>
    <h3 ref="subtitle">Everything you need for men, women and kids. </h3>
    <v-container class="bv-example-row" >
      <v-row class="justify-content-md-center" >
        <v-col col lg="4" v-for="category in categories" :key="category.id" >
          <router-link style="text-decoration: none; color: inherit;"
                       :to="{name: 'products', params: {category: category}  }">
            <v-card
                class="mx-auto"
                max-width="344"
            >
              <v-img
                  :src="require(`../assets/images/${category}.jpeg`)"
              ></v-img>

              <v-card-title>
                {{ category }}
              </v-card-title>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      categories: ['Men', 'Women', 'Kids'],
    }
  },
  methods: {},
}
</script>

<style scoped>
.home {
  width: 100%;
  padding-top: 10px;
  text-align: center;
}
</style>
