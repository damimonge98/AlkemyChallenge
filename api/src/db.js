const dotenv = require("dotenv")
dotenv.config();

const { Sequelize } = require ("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

//importamos modelos
const Operation = require ("./models/operations.js");
const Category = require ("./models/categories.js");
const User = require ("./models/users.js");

//Conectamos la base de datos previamente creada en postgres
const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/alkemydb`, {
  logging: false,
  native: false,
});

Operation(db);
Category(db);
User(db);

//Relaciones

const {operation} = db.models;
const {categories} = db.models;
const {user} = db.models;

operation.belongsTo(categories, {through: "operation_category"});
categories.belongsToMany(operation, {through: "operation_category"});
user.hasMany(operation)

console.log ("DB connected!")

module.exports = { ...db.models, db }