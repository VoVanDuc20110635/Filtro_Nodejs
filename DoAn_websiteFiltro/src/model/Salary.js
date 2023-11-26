const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Salary = sequelize.define('Salary', {
  salaryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'maluong',
  },
  salaryName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'vaitro',
  },
  term: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'hinhthuc',
  },
  wage: {
    type: DataTypes.INTEGER,
    field: 'luongtheogio',
  }
}, {
  tableName: 'luong', // Specify the table name
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

module.exports = Salary;
