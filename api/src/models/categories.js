const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define ("categories", {
     name: {
         type: DataTypes.ENUM,
         values: ["entretenimiento", "vacaciones", "restaurantes", "salud", "compras", "transporte", "nocategory"],
         allowNule: false
     }
 })
}