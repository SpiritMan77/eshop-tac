const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../config.json");
const app = express();
const db = require("./models");
const products = require("./data/initalizeData");

const PORT = process.env.PORT || config.backend;
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
require("./routes/routes")(app);

db.mongoose
  .connect(db.url, {
    useUnifiedTopology: true,
  })
  .then(async () => {
    db.product.bulkWrite(
      products.map((doc) => ({
        updateOne: {
          filter: { id: doc.id, category: doc.category },
          update: doc,
          upsert: true,
        },
      }))
    );
    console.log(
      "Connected to the database and initialized data stored into DB!"
    );
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
