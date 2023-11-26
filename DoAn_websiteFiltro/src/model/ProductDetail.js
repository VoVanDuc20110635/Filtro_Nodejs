const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const ProductDetail = sequelize.define('ProductDetail', {
  productDetailId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'masp',
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cannang',
  },
  stock: {
    type: DataTypes.INTEGER,
    field: 'tonkho',
  },
  price: {
    type: DataTypes.INTEGER,
    field: 'gia',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'trangthai',
  }
}, {
  tableName: 'sanpham_chitiet', // Specify the table name
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

module.exports = ProductDetail;
