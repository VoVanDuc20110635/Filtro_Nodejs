const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'madathang',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'makh',
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ngaydathang',
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'ngaydathang',
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
  },
  address: {
    type: DataTypes.STRING,
    field: 'diachi',
  },
  total: {
    type: DataTypes.INTEGER,
    field: 'tong',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'tinhtrang',
  },
  paymentMethod: {
    type: DataTypes.INTEGER,
    field: 'phuongthucthanhtoan',
  },
  zip: {
    type: DataTypes.INTEGER,
    field: 'zip',
  },
  city: {
    type: DataTypes.STRING,
    field: 'thanhpho',
  },
}, {
  tableName: 'dathang', // Specify the table name
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

module.exports = Order;
