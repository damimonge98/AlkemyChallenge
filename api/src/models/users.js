const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
 sequelize.define ("user", {
     email: {
         type: DataTypes.TEXT,
         unique: {
             args: true
         },
         validate: {
             isEmail: true
         },
        allowNull: false

     },

     username: {
         type: DataTypes.DATE,
         unique: {
             args: true
            },
        allowNull: false
     },

     lastName: {
         type: DataTypes.STRING,
         allowNull: false
     },

     firstName: {
         type: DataTypes.STRING,
         allowNull: false
     },

     password: {
         type: DataTypes.STRING,
         allowNull: false
     }
 })
}