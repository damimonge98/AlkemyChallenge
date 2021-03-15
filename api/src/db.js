const dotenv = require("dotenv")
dotenv.config();

const { Sequelize } = require ("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

//Creamos la base de datos
const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/alkemydb`, {
  logging: false,
  native: false,
});

console.log ("Corriendo base de datos")

module.exports = { db }