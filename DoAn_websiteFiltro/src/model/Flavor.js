// Import Sequelize and define your Sequelize instance (sequelize) if not already done
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

// Define the Category model
const Flavor = sequelize.define('Flavor', {
  flavorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'mahuongvi',
  },
  flavorName: {
    type: DataTypes.STRING,
    field: 'tenhuongvi',
  },
  flavorDescription: {
    type: DataTypes.STRING,
    field: 'mota',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'tinhtrang',
  },
}, {
  tableName: 'huongvi', // Specify the table name
  timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
});


// Export the Category model
module.exports = Flavor;
