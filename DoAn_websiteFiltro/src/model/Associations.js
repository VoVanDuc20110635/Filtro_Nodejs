const Account = require('../model/Account'); // Import the User model
const User = require('../model/User');
const Cart = require('../model/Cart');
const CartItem = require('../model/CartItem');
const GuestCart = require('../model/GuestCart');
const Flavor = require('../model/Flavor');
const Category = require('../model/Category');
const OrderDetail = require('../model/OrderDetail');
const InvoiceDetail = require('../model/InvoiceDetail');
const Feedback = require('../model/Feedback');
const Product = require('./Product');
const Invoice = require('../model/Invoice');
const Order = require('./Order');
const PaymentMethod = require('./PaymentMethod');
const Role = require('./Role');
const Staff = require('./Staff');
const Salary = require('./Salary');
const ProductDetail = require('./ProductDetail');
// User.hasOne(Account, { foreignKey: 'id', as: 'account' });
// Account.belongsTo(User, { foreignKey: 'id', as: 'user' });

// Account and User
Account.hasOne(User, { foreignKey: 'accountId' });
User.belongsTo(Account, {foreignKey: 'accountId'});

//Cart and User
User.hasOne(Cart, {foreignKey: 'userId'});
Cart.belongsTo(User, {foreignKey: 'userId'});

//Cart and CartItem
Cart.hasMany(CartItem, {foreignKey: 'cartId'});
CartItem.belongsTo(Cart, {foreignKey: 'cartId'});

//GuestCart and CartItem
GuestCart.hasMany(CartItem, {foreignKey: 'tempCartId'});
CartItem.belongsTo(GuestCart, {foreignKey: 'tempCartId'});



// Product and Category
Category.hasMany(Product, {foreignKey: 'categoryId'});
Product.belongsTo(Category, {foreignKey: 'categoryId'});

// Product and Flavor
Flavor.hasMany(Product, {foreignKey: 'flavorId'});
Product.belongsTo(Flavor, {foreignKey: 'flavorId'});

// Product Detail and CartItem
ProductDetail.hasMany(CartItem, {foreignKey: 'productDetailId'});
CartItem.belongsTo(ProductDetail, {foreignKey: 'productDetailId'});

// Product and CartItem
Product.hasMany(CartItem, {foreignKey: 'productId'});
CartItem.belongsTo(Product, {foreignKey: 'productId'});

// Product and OrderDetails
ProductDetail.hasMany(OrderDetail, {foreignKey: 'productDetailId'});
OrderDetail.belongsTo(Product, {foreignKey: 'productDetailId'});

// Product and InvoiceDetails
Product.hasMany(InvoiceDetail, {foreignKey: 'productId'});
InvoiceDetail.belongsTo(Product, {foreignKey: 'productId'});

// Product and Feedback
Product.hasMany(Feedback, {foreignKey: 'productId'});
Feedback.belongsTo(Product, {foreignKey: 'productId'});

//Product Detail and Product
Product.hasMany(ProductDetail, {foreignKey: 'productId'});
ProductDetail.belongsTo(Product, {foreignKey: 'productId'});

// Feedback and User
User.hasMany(Feedback, {foreignKey: 'userId'});
Feedback.belongsTo(User, {foreignKey: 'userId'});

// Invoice and User
User.hasMany(Invoice, {foreignKey: 'userId'});
Invoice.belongsTo(User, {foreignKey: 'userId'});

// Invoice and InvoiceDetail
Invoice.hasMany(InvoiceDetail, {foreignKey: 'invoiceId'});
InvoiceDetail.belongsTo(Invoice, {foreignKey: 'invoiceId'});

// User and Order
User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsTo(User, {foreignKey: 'userId'});

// Order and PaymentMethod
PaymentMethod.hasMany(Order, {foreignKey: 'paymentMethod'});
Order.belongsTo(PaymentMethod, {foreignKey: 'paymentMethod'});

// Order and OrderDetail
Order.hasMany(OrderDetail, {foreignKey: 'orderId'});
OrderDetail.belongsTo(Order, {foreignKey: 'orderId'});

// Role and Account
Role.hasMany(Account, {foreignKey: 'roleNumber'});
Account.belongsTo(Role, {foreignKey: 'roleNumber'});

// Staff and Account
Staff.belongsTo(Account, {foreignKey: 'accountId'});
Account.hasOne(Staff, {foreignKey: 'accountId'});

// Salary and Staff
Salary.hasMany(Staff, {foreignKey: 'salaryId'});
Staff.belongsTo(Salary, {foreignKey: 'salaryId'});


module.exports = {
    User,
    Account,
    Cart, 
    CartItem,
    GuestCart,
    Product
};