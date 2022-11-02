module.exports = (mongoose) => {
  const Basket = mongoose.model(
    "basket",
    mongoose.Schema(
      {
        id: String,
        imageName: String,
        title: String,
        description: String,
        price: String,
        quantity: Number,
        category: String,
      },
      { timestamps: true },
      { new: true }
    )
  );

  return Basket;
};
