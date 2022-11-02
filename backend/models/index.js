const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.basket = require("./basket.model.js")(mongoose);
db.product = require("./product.model")(mongoose);
module.exports = db;
