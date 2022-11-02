const { defineConfig } = require('@vue/cli-service')
const config = require("../config.json");
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: config.frontend
  },
})
