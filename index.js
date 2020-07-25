const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");
const bodyParser = require("body-parser");
const config = require("./config");

// get mongo db url and db name from env
const dbUrl = config.dbUrl;
const dbName = config.dbName;
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use("/api/", userRoutes);
  app.use("/api/posts", postRoutes);
  app.listen(8080, () => {
    console.log("Server listening at 8080");
  });
});
