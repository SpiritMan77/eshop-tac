<template>
  <div class="products">
    <h1>{{ category }} Products</h1>
    <v-container class="bv-example-row">
      <v-row class="justify-content-md-center">
        <v-col col lg="3" v-for="product in products.docs" :key="product.id">
          <router-link style="text-decoration: none; color: inherit;"
                       :to="{name: 'productView', params:{category: category, id: product.id}}">
            <v-card
                class="mx-auto"
                max-width="344"
            >
              <v-img
                  :src="'data:image/jpeg;base64,' + product.image.data.data"
                  :alt="product.imageName"
              ></v-img>

              <v-card-title>
                {{ product.title }}
              </v-card-title>
              <v-card-text>
                {{ product.price }}
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <Pagination :totalPages="products.totalPages" @page-change="loadProducts"/>
    </div>
  </div>
</template>

<script>
import {getProducts} from '@/services/ApiService';
import Pagination from "@/components/Pagination";

export default {
  name: "Products",
  components: {Pagination},

  props: ['category'],
  data() {
    return {
      products: {},
      id: 0
    }
  },
  methods: {
    loadProducts(page, size) {
      return getProducts(this.category, page, size).then(res => this.products = res);
    }
  },
  mounted() {
    this.loadProducts(0, 8)

  },
}
</script>

<style scoped>
.products {
  padding-left: 18px;
}

h1 {
  text-align: center;
}

</style>