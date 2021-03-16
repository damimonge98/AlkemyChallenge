const express = require ("express");
const router = express.Router();
const Sequelize = require ("sequelize");
const { operation, categories } = require ("../db");

router.get ("/", (req,res) => {
    categories.findAll()
    .then (allCategories => {
        res.json (allCategories)
    })
})

router.post ("/", (req, res) => {
  const { name } = req.body;
    categories.create ({
        name
    })
    .then (category => {
        res.json (category)
    })
})

module.exports = router;