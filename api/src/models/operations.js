const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define ("operation", {
     type: {
         type: DataTypes.ENUM,
         values: ["revenue", "expenditure"],
         allowNull:false
     },
     createdAt: {
         type: DataTypes.DATE,
         allowNull:false
     },
     updatedAt: {
         type: DataTypes.DATE,
         allowNull:false
     },
     description: {
         type: DataTypes.STRING
     },
     amount: {
         type: DataTypes.DECIMAL,
         allowNull: false
     }
 })
}