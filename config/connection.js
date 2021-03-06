//************************************************************************************
//This file intitiates the Connection to MYSQL
//***************************************************************************************
// Dependencies
var Sequelize = require("sequelize");
//Creates mySQL connection using Sequelize, the empty string is where the password
var sequelize = new Sequelize("sequelize_library", "root", "", {
  host: "localhost",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
// Exports the connection for other files to use
module.exports = sequelize;
