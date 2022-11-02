const db = require("../models");
const Basket = db.basket;
const Product = db.product;
const merge = require("lodash.merge");

exports.addItem = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const basket = new Basket({
    id: req.body.id,
    quantity: req.body.quantity,
    category: req.body.category,
  });

  let item = await Basket.findOne({
    id: req.body.id,
    category: req.body.category,
  });
  if (item) {
    Basket.findOneAndUpdate(
      { id: req.body.id, category: req.body.category },
      { quantity: item.quantity + 1 },
      {
        useFindAndModify: false,
      }
    ).then((data) => {
      res.status(200).send(data);
    });
  } else
    basket.save(basket).then((data) => {
      res.status(200).send(data);
    });
};

exports.findAllItems = async (req, res) => {
  const items = await Basket.find();
  Promise.all(
    items.map(async (element) => {
      return Product.findOne({
        id: element.id,
        category: element.category,
      }).then((data) => {
        let image = Buffer.from(data.image.data).toString();
        let responseData = merge(
          data.toJSON(),
          {
            image: { data: { data: image } },
          },
          { quantity: element.quantity }
        );
        return responseData;
      });
    })
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send({ message: "No basket items fund" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Basket.findOneAndRemove(
    { id, category: req.params.category },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product from basket  was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted from basket successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};
exports.deleteAll = (req, res) => {
  Basket.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Product were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  Basket.findOneAndUpdate(
    { id: req.params.id, category: req.body.category },
    req.body,
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id=${id}. Maybe item was not found!`,
        });
      } else res.send({ message: "item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating item with id=" + id + err,
      });
    });
};
