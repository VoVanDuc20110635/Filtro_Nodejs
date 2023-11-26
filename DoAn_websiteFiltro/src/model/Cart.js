const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'magiohang',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'makh',
    },
    createdDate: {
        type: DataTypes.DATE,
        field: 'thoigiantao',
    },
    updatedDate: {
        type: DataTypes.DATE,
        field: 'thoigiancapnhat',
    },
    total: {
        type: DataTypes.INTEGER,
        field: 'tong',
    },
    status: {
        type: DataTypes.INTEGER,
        field: 'trangthai',
    },
}, {
    tableName: 'giohang', // Specify the table name
    timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
});

sequelize.sync()
  .then(() => {
  })
  .catch((error) => {
    console.error('Error syncing Account model with database:', error);
  });


module.exports = Cart;
