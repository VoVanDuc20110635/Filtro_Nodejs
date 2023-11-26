// Import Sequelize and define your Sequelize instance (sequelize) if not already done
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

// Define the Category model
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'madanhmuc',
  },
  categoryName: {
    type: DataTypes.STRING,
    field: 'tendanhmuc',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'tinhtrang',
  },
}, {
  tableName: 'danhmuc', // Specify the table name
  timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
});

sequelize.sync()
    .then(() => {
        
    })
    .catch((error) => {
        console.error('Error syncing Account model with database:', error);
    });


// Export the Category model
module.exports = Category;
