const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const OrderDetail = sequelize.define('OrderDetail', {
  orderDetailId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'madathang',
  },
  productDetailId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'maspchitiet',
  },
  quantity: {
    type: DataTypes.INTEGER,
    field: 'soluong',
  },
  pricePerProduct: {
    type: DataTypes.INTEGER,
    field: 'giatien',
  },
  total: {
    type: DataTypes.INTEGER,
    field: 'tong',
  },
  productId: {
    type: DataTypes.INTEGER,
    field: 'masp',
  }
}, {
  tableName: 'dathang_chitiet', // Specify the table name
  timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
});
// Account.hasOne(User, { foreignKey: 'accountId' });
// Account.associate = models =>{
//   Account.belongsTo(models.User, {
//     foreignKey: {id}
//   })
// }

sequelize.sync()
  .then(() => {
    
  })
  .catch((error) => {
    console.error('Error syncing Account model with database:', error);
  });

module.exports = OrderDetail;
