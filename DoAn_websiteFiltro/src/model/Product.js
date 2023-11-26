const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'masp',
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'tensanpham',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'soluong',
  },
  sold: {
    type: DataTypes.INTEGER,
    field: 'daban',
  },
  price: {
    type: DataTypes.INTEGER,
    field: 'giatien',
  },
  flavorId: {
    type: DataTypes.INTEGER,
    field: 'mahuongvi',
  },
  description: {
    type: DataTypes.STRING,
    field: 'mota',
  },
  image: {
    type: DataTypes.STRING,
    field: 'anh',
  },
  createdDate: {
    type: DataTypes.DATE,
    field: 'ngaytao',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'tinhtrang',
  },
  discount: {
    type: DataTypes.INTEGER,
    field: 'giamgia',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'madanhmuc',
  },
}, {
  tableName: 'sanpham', // Specify the table name
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

module.exports = Product;
