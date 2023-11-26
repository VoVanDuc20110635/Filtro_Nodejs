const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('filtrobaomatweb', 'root', 'duc2112002', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  // this command allows console don't show metadata about mysql query to developer.
});

module.exports = sequelize;
