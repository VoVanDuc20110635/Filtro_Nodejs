const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance
const User = require('../model/User');

const Invoice = sequelize.define('Invoice', {
  invoiceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'mahoadon',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'makh',
  },
  purchasedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ngaymua',
  },
  total: {
    type: DataTypes.INTEGER,
    field: 'tong',
  },
}, {
  tableName: 'hoadon', // Specify the table name
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

module.exports = Invoice;
