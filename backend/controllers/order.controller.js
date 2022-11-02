const db = require("../models");
const Order = db.basket;

exports.createOrder = (req, res) => {
  if (!req.body.totalPrice) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const order = new Order({
    basketItems: req.body.basketItems,
    totalPrice: req.body.totalPrice,
    productPrice: req.body.productPrice,
    shipmentMethod: req.body.shipmentMethod,
    paymentMethod: req.body.paymentMethod,
  });

  order
    .save(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

exports.findAll = (req, res) => {
  Order.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ORders.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ORder with id=${id}. Maybe ORder was not found!`,
        });
      } else {
        res.send({
          message: "ORder was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ORder with id=" + id,
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

  Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id=${id}. Maybe Order was not found!`,
        });
      } else res.send({ message: "item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating item with id=" + id + err,
      });
    });
};
