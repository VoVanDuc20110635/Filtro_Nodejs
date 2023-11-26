const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Staff = sequelize.define('Staff', {
  staffId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'manv',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'hoten',
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ngaysinh',
  },
  sex: {
    type: DataTypes.STRING,
    field: 'gioitinh',
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'sdt',
  },
  salaryId: {
    type: DataTypes.INTEGER,
    field: 'maluong',
  },
  accountId: {
    type: DataTypes.INTEGER,
    field: 'matk',
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'tinhtrang',
  },
}, {
  tableName: 'nhanvien', // Specify the table name
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

module.exports = Staff;
