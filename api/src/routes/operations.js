const express = require ("express");
const router = express.Router();
const Sequelize = require ("sequelize");
const { operation, categories, operation_category } = require ("../db");

//Get all operations
router.get ("/", (req, res) => {
    operation.findAll()
    .then (operations => res.json (operations))
})

//Post an operation
router.post ("/", (req, res) => {
const { amount, type, description } = req.body;
    categories.findOne({where: {name : "nocategory"}})
    .then (category => 
        operation.create({
            amount,
            type,
            description,
            categoryId: category.id
        })
    .then(newOperation =>
        operation_category.create ({
        operationId: newOperation.id,
        categoryId: newOperation.categoryId
    })
    
    .then (response => {res.json(response)})
    ))
})

//Update an operation
router.put("/:id", (req,res) => {
    const { amount, description} = req.body
    const { id } = req.params;
    
    operation.update({
    amount,
    description},
    {where: {id}})
    .then (updatedOperation => res.json (updatedOperation))
})


//Delete an operation
router.delete ("/:id", (req,res) => {
    const { id } = req.params;
    operation.findByPk (id)
    .then (operation => 
        operation.destroy())
    .then (destroyedOperation => res.json ("Operation deleted succesfully"))
})


// Add (or update) an category in a operation 
router.post ("/:id/:idCategory", (req, res) => {
    const { id, idCategory } = req.params;
    operation.findByPk(id)
    .then (operation => {
        if (!operation) {res.json ("idOperation is not a valid id")}
        
        operation.update(
            {categoryId: idCategory},
            {where: {id}}
        )

        .then(
            operation_category.update(
                {categoryId: idCategory},
                {where: {operationId: id}})
            )

        .then (newOperation => {res.json (newOperation)})
        })
})


module.exports = router;