const { DataTypes} = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Feedback = sequelize.define('Feedback', {
  feedbackId: {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'makh',
  },
  content: {
    type: DataTypes.STRING,
    field: 'noidung',
  },
  createdDate: {
    type: DataTypes.DATE,
    field: 'ngayph',
  },
  stars:{
    type: DataTypes.INTEGER,
    field: 'sosao',
  }
}, {
  tableName: 'phanhoi', // Specify the table name
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

module.exports = Feedback;
