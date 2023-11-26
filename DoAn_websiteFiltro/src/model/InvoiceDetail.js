const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const InvoiceDetail = sequelize.define('InvoiceDetail', {
    invoiceDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'mahoadon',
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'masp',
    },
    quantity: {
        type: DataTypes.INTEGER,
        field: 'soluong',
    },
    pricePerProduct: {
        type: DataTypes.INTEGER,
        field: 'giatien',
    },
    total: {
        type: DataTypes.INTEGER,
        field: 'tong',
    }
}, {
    tableName: 'hoadon_chitiet', // Specify the table name
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

module.exports = InvoiceDetail;
