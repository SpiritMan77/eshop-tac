const db = require("../models");
const Product = db.product;
const merge = require("lodash.merge");

exports.addProduct = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const product = new Product({
    id: req.body.id,
    image: req.body.image,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });

  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAllPagination = (req, res) => {
  const { page, size } = req.query;
  const getPagination = (page, size) => {
    const limit = size ? +size : 8;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };
  const { limit, offset } = getPagination(page, size);
  Product.paginate({ category: req.params.category }, { offset, limit })
    .then((data) => {
      let finalData = [];
      data.docs.map((element) => {
        let image = Buffer.from(element.image.data).toString();
        let responseData = merge(element.toJSON(), {
          image: { data: { data: image } },
        });
        finalData.push(responseData);
      });
      data.docs = finalData;
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};

exports.findAll = (req, res) => {
  Product.find({ category: req.params.category })
    .then((data) => {
      let finalData = [];
      data.map((element) => {
        let data = element.toJSON();
        let image = Buffer.from(element.image.data).toString();
        let responseData = merge(data, {
          image: { data: { data: image } },
        });
        finalData.push(responseData);
      });
      res.status(200).send(finalData);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};

exports.findOneProduct = async (req, res) => {
  const id = req.params.id;
  Product.findOne({ id: id, category: req.params.category })
    .then((data) => {
      let handledData = data.toJSON();
      let image = Buffer.from(data.image.data).toString();
      let responseData = merge(handledData, {
        image: { data: { data: image } },
      });

      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(responseData);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findOneAndRemove(
    { id: req.body.id, category: req.body.category },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
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
  Product.deleteMany({})
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

  const id = req.body.id;
  Product.findOneAndUpdate(
    { id: req.body.id, category: req.body.category },
    req.body,
    { useFindAndModify: false }
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
