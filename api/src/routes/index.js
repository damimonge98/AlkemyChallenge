const express = require ("express");
const app = express ();
const operationRoutes = require ("./operations.js")
const categoryRoutes = require ("./categories");

app.use ("/operations", operationRoutes);
app.use ("/categories", categoryRoutes);


module.exports = app;