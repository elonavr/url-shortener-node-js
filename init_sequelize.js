const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize(
    'url_Shortner_DB' ,
     'elona',
     '',
    {
    host : 'localhost',
    dialect: 'postgres',
    }
);
const URLModelFunction = require('./src/models/url.js');
const URL = URLModelFunction(sequelize, DataTypes);

module.exports = {
    sequelize: sequelize,
    URL: URL
};