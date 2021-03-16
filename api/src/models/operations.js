const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define ("operation", {
     type: {
         type: DataTypes.ENUM,
         values: ["ingreso", "egreso"],
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