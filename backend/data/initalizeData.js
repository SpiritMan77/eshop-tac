const kidsProducts = require("./data/kids");
const womenProducts = require("./data/women");
const menProducts = require("./data/men");
const fs = require("fs");

const kidsProductsC = kidsProducts.map((data) => {
  let image = fs
    .readFileSync(
      require("path").resolve(__dirname, "./images/kids/" + data.imageName)
    )
    .toString("base64");
  return Object.assign(
    data,
    { category: "kids" },
    {
      image: {
        data: image,
        contentType: "image/jpeg",
      },
    }
  );
});

const womenProductsC = womenProducts.map((data) =>
  Object.assign(
    data,
    { category: "women" },
    {
      image: {
        data: fs
          .readFileSync(
            require("path").resolve(
              __dirname,
              "./images/women/" + data.imageName
            )
          )
          .toString("base64"),
        contentType: "image/jpeg",
      },
    }
  )
);
const menProductsC = menProducts.map((data) =>
  Object.assign(
    data,
    { category: "men" },
    {
      image: {
        data: fs
          .readFileSync(
            require("path").resolve(__dirname, "./images/men/" + data.imageName)
          )
          .toString("base64"),
        contentType: "image/jpeg",
      },
    }
  )
);

// @ts-ignore
const products = menProductsC.concat(womenProductsC, kidsProductsC);

module.exports = products;
