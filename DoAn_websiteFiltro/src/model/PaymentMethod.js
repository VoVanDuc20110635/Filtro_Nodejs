const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance
const User = require('../model/User');

const PaymentMethod = sequelize.define('PaymentMethod', {
  paymentMethodId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ten',
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'mota',
  }
}, {
  tableName: 'phuongthuc_thanhtoan', // Specify the table name
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

module.exports = PaymentMethod;
