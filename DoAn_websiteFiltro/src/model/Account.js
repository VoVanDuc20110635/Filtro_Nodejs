const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance
const User = require('../model/User');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'matk',
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'taikhoan',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'matkhau',
  },
  createdDate: {
    type: DataTypes.DATE,
    field: 'ngaytao',
  },
  roleNumber: {
    type: DataTypes.INTEGER,
    field: 'mavaitro',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'tinhtrang',
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    field: 'password_reset_token',
  },
}, {
  tableName: 'taikhoan', // Specify the table name
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

module.exports = Account;
