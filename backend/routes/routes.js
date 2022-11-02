module.exports = (app) => {
  const product = require("../controllers/product.controller.js");
  // const basket = require("../controllers/basket.controller");
  // const order = require("../controllers/order.controller.js");

  var router = require("express").Router();

  router.post("/product/:category", product.addProduct);
  router.get("/product/:category", product.findAllPagination);
  router.delete("/product/:category/:id", product.delete);
  router.delete("/product/:category", product.deleteAll);
  router.get("/product/:category/:id", product.findOneProduct);
  router.put("/product/:category/:id", product.update);

  // router.post("/basket", basket.addItem);
  // router.put("/basket/:id", basket.update);
  // router.get("/basket", basket.findAllItems);
  // router.delete("/basket/:category/:id", basket.delete);
  // router.delete("/basket", basket.deleteAll);

  // router.post("/order", order.createOrder);
  // router.get("/order", order.findAll);

  app.use("/api", router);
};
