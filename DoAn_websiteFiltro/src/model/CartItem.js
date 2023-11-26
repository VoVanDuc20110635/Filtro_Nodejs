const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    },
    cartId: {
        type: DataTypes.INTEGER,
        field: 'magiohang',
    },
    productDetailId: {
        type: DataTypes.INTEGER,
        field: 'maspchitiet',
    },
    productId: {
        type: DataTypes.INTEGER,
        field: 'masp',
    },
    quantity: {
        type: DataTypes.INTEGER,
        field: 'soluong',
    },
    price: {
        type: DataTypes.INTEGER,
        field: 'giatien',
    },
    total: {
        type: DataTypes.INTEGER,
        field: 'tong',
    },
    purchasedDate: {
        type: DataTypes.DATE,
        field: 'thoigianmua',
    },
    tempCartId: {
        type: DataTypes.INTEGER,
        field: 'magiohangtam',
    },
}, {
    tableName: 'giohang_chitiet', // Specify the table name
    timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
});

sequelize.sync()
    .then(() => {
        
    })
    .catch((error) => {
        console.error('Error syncing Account model with database:', error);
    });


module.exports = CartItem;
