const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema(
  {
    id: String,
    category: String,
    imageName: String,
    title: String,
    description: String,
    price: String,
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

module.exports = (mongoose) => {
  const Product = mongoose.model("product", schema);

  return Product;
};
