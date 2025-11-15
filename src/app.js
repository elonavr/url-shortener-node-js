const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const apiRoutes = require("./api/apiRoutes.js");
const redirectRoutes = require("./api/redirectRoutes.js");

app.use(express.json());

const { sequelize, URL } = require("../init_sequelize.js");

app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/", redirectRoutes);
app.use("/api", apiRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(
      "Database synchronized successfully in local development mode."
    );
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = app;
