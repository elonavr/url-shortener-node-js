const { Sequelize, DataTypes } = require("sequelize");

const connectionUrl = process.env.DATABASE_URL;
const sequelize = new Sequelize(
  connectionUrl || "postgres://elona:@localhost:5432/url_Shortner_DB",
  {
    dialect: "postgres",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);
const URLModelFunction = require("./src/models/url.js");
const URL = URLModelFunction(sequelize, DataTypes);

module.exports = {
  sequelize: sequelize,
  URL: URL,
};
