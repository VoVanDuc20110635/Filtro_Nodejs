const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Contact = sequelize.define('Contact', {
  contactId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ten',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'email',
  },
  topic: {
    type: DataTypes.STRING,
    field: 'chude',
  },
  message: {
    type: DataTypes.STRING,
    field: 'tinnhan',
  },
  response: {
    type: DataTypes.STRING,
    field: 'phanhoi',
  }
}, {
  tableName: 'lienhe', // Specify the table name
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

module.exports = Contact;
