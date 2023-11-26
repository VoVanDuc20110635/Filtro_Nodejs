const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const GuestCart = sequelize.define('GuestCart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  createdDate: {
    type: DataTypes.DATE,
    field: 'thoigiantao',
  },
  updatedDate: {
    type: DataTypes.DATE,
    field: 'thoigiancapnhat',
  },
}, {
    tableName: 'giohang_temp', // Specify the table name
    timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
  });


sequelize.sync()
  .then(() => {
    
  })
  .catch((error) => {
    console.error('Error syncing GuestCart model with database:', error);
  });

module.exports = GuestCart;
