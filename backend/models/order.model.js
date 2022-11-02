module.exports = (mongoose) => {
  const Basket = mongoose.model(
    "order",
    mongoose.Schema(
      {
        basketItems: Array,
        totalPrice: String,
        productPrice: String,
        shipmentMethod: String,
        paymentMethod: String,
      },
      { timestamps: true }
    )
  );

  return Basket;
};
