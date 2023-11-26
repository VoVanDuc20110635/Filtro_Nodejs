const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance
const Account = require('../model/Account'); // Import the User model

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'makh',
    },
    name: {
        type: DataTypes.STRING,
        field: 'hoten',
    },
    dob: {
        type: DataTypes.DATE,
        field: 'ngaysinh',
    },
    sex: {
        type: DataTypes.STRING,
        field: 'gioitinh',
    },
    address: {
        type: DataTypes.STRING,
        field: 'diachi',
    },
    zip: {
        type: DataTypes.INTEGER,
        field: 'zip',
    },
    city: {
        type: DataTypes.STRING,
        field: 'thanhpho',
    },
    email: {
        type: DataTypes.STRING,
        field: 'email',
    },
    phoneNumber: {
        type: DataTypes.STRING,
        field: 'sdt',
    },
    status: {
        type: DataTypes.INTEGER,
        field: 'tinhtrang',
    },
    accountId: {
        type: DataTypes.INTEGER,
        field: 'matk',
    },
}, {
    tableName: 'khachhang', // Specify the table name
  timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
});

// User.belongsTo(Account, {foreignKey: 'accountId'});
sequelize.sync()
  .then(() => {
    
  })
  .catch((error) => {
    console.error('Error syncing Account model with database:', error);
  });

module.exports = User;
