const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Role = sequelize.define('Role', {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'mavaitro',
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'tenvaitro',
  }
}, {
  tableName: 'vaitro', // Specify the table name
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

module.exports = Role;
