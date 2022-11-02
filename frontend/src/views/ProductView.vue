<template>
  <div class="parent">
    <div class="div1">
      <v-img
          :src="'data:image/jpeg;base64,' + product.image.data.data"
          :alt="product.imageName"
          max-height="630"
          max-width="500"
      ></v-img>
    </div>
    <div class="div2">
      <h3>{{product.title}}</h3>
      <p><b>Price: </b><span>{{ product.price }}</span></p>
      <p><b>Description: </b><span>{{ product.description }}</span></p>
      <span><b>Quantity: </b></span>
      <input type="number" v-model="quantity">
      <p>
        <v-btn
            class="cart"
            depressed
            color="green"
            @click="addToCart()"
        >Add to Cart
        </v-btn>
      </p>
    </div>
  </div>
</template>

<script>
import {getCurrentProduct} from "@/services/ApiService";
import {mapActions} from 'vuex';

export default {
  name: "ProductView",
  components: {},
  props: ['category', 'id'],
  data() {
    return {
      product: {},
      quantity: 1,
    }
  },
  methods: {
    ...mapActions([
      'addProduct',
      'changeQuantity'
    ]),
    addToCart() {
      this.$store.dispatch  ('addProduct', {
        product: this.product,
        quantity: parseInt(this.quantity)
      })
    },
  },
  mounted() {
    getCurrentProduct(this.category, this.id).then(res => this.product = res);
  },
}
</script>

<style scoped>

.parent {
  display: grid;
  grid-template-columns: 530px 1000px;
  grid-template-rows: 600px 200px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  margin: 0 40px 0 40px;
}

.div1 {
  grid-area: 1 / 1 / 3 / 2;
}

.div2 {
  grid-area: 1 / 2 / 3 / 3;
  height: 630px;
}

input {
  border: 1px solid black;
  width: 50px;
}

.cart {
  color: white;
  margin-top: 10px;
}
</style>