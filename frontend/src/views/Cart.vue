<template>
  <div class="cart" v-if="!hasProduct">
    <h1 ref="title">Your cart is empty.
      <router-link to="/" style="text-decoration: none">Shop now!</router-link>
    </h1>
  </div>
  <div class="cart" v-else>
    <h1><b>Shopping Cart</b></h1>
    <v-container fluid>
      <v-row>
        <v-col lg="8">
          <v-card class="mx-auto">
            <v-card-title>Cart Items</v-card-title>
            <div class="parent" v-for="product in getCartItems" :key="product.id">
              <div class="div1">{{ product.title }}</div>
              <div class="div2">{{ product.price }}</div>
              <div class="div3"><input type="number" v-model="product.quantity" @change="setQuantity(product)"
                                       @click="setQuantity(product, product.id)"></div>
              <div class="div4"> {{ getTotalPrice(product.id) }}</div>
              <div class="div5">
                <v-btn color="red"
                       class="white--text" fab x-small dark @click="removeProd(product.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
            <h1><b>Total: {{ getPrice.toFixed(2) }} €</b></h1>
          </v-card>
        </v-col>
        <v-col lg="4">
          <v-card class="mx-auto personal_info">
            <v-card-title>Personal info</v-card-title>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="name"
                  label="Name"
                  :rules="nameRules"
                  required
                  tabindex="0"
              ></v-text-field>
              <v-text-field
                  v-model="lastname"
                  label="Lastname"
                  :rules="lastnameRules"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="address"
                  label="Address"
                  :rules="addressRules"
                  required
              ></v-text-field>

              <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="I agree to the processing of personal data"
                  required
              ></v-checkbox>

              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="sendOrder"
              >
                Order 44
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import router from "@/router";

export default {
  name: "Cart",
  data() {
    return {
      valid: false,
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      checkbox: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      lastnameRules: [
        v => !!v || 'Lastname is required',
      ],
      addressRules: [
        v => !!v || 'Adress is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  computed: {
    ...mapGetters([
      'getCartItems',
      'getPrice'
    ]),
    hasProduct() {
      return this.getCartItems.length > 0 ? true : false
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'removeProduct',
      'cartReset',
      'changeQuantity'
    ]),
    validate() {
      return this.$refs.form.validate() ? true : false
    },

    removeProd(id) {
      const index = this.getCartItems.map(object => object.id).indexOf(id);
      this.removeProduct(index);
    },

    getTotalPrice(id) {
      const index = this.getCartItems.map(object => object.id).indexOf(id);
      return (parseFloat(this.getCartItems[index].price) * this.getCartItems[index].quantity).toFixed(2) + "€"
    },

    setQuantity(product, id) {
      this.$store.dispatch('changeQuantity', {
        product: this.product,
        quantity: parseInt(product.quantity)
      })
      this.totalPrice(id)
    },

    sendOrder() {
      this.validate()
      if (this.validate()) {
        router.push({name: 'thank_you'})
        this.cartReset()
      }
    }
  },
}
</script>

<style scoped>
.cart {
  padding-top: 10px;
  padding-left: 3px;
}

h1 {
  padding-left: 16px;
}

.parent {
  display: grid;
  grid-template-columns: 400px repeat(3, 200px) 250px;
  grid-template-rows: 50px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding-left: 16px;
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
}

.div2 {
  grid-area: 1 / 2 / 2 / 3;
}

.div3 {
  grid-area: 1 / 3 / 2 / 4;
}

.div4 {
  grid-area: 1 / 4 / 2 / 5;
}

.div5 {
  grid-area: 1 / 5 / 2 / 6;
}

.personal_info {
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
}
</style>