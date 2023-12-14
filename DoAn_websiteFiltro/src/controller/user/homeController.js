// import pool from "../configs/connectDB";
import session from "express-session";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import Category from "../../model/Category";
// import OrderDetail from "../../model/OrderDetail";
// import InvoiceDetail from "../../model/InvoiceDetail";
// import Feedback from "../../model/Feedback";
const Associations = require('../../model/Associations');

const Account = require('../../model/Account'); // Import the User model
const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

const Cart = require('../../model/Cart');
const CartItem = require('../../model/CartItem');
const User = require('../../model/User');
const GuestCart = require('../../model/GuestCart');
const Product = require('../../model/Product');
const Category = require('../../model/Category');
const Flavor = require('../../model/Flavor');
const OrderDetail = require('../../model/OrderDetail');
const InvoiceDetail = require('../../model/InvoiceDetail');
const Feedback = require('../../model/Feedback');


const UserService = require('../../services/UserService');
const userService = new UserService();

const ProductService = require('../../services/ProductService');
const productService = new ProductService();
let getHomepage = async (req, res) => {
    let ipAddress = req.headers['X-FORWARDED-FOR'] || req.connection.remoteAddress;
    console.log(ipAddress);
    // let userId = parseInt( req.session.user.userId, 10);
    const categories = await categoryService.get5Categories();
    let product6thList = await productService.getSixthProducts();
    let productTopSellingList = await productService.getTop8SellingProducts();
    // console.log(productTopSellingList[0].ProductDetails[0]);
    let productTop4DiscountList = await productService.getTopDiscountProducts();

    return res.render('../views/user/index.ejs', { session: req.session, product6thList, productTopSellingList, productTop4DiscountList,
        categories: categories});
}

let testAccountModel = async (req, res) => {
    // try {
    //     const account = await Account.findOne({
    //         where: {
    //             accountName: 'duc77'
    //         },
    //     });

    //     if (account) {
    //         return res.send(JSON.stringify(account));
    //     } else {
    //         return res.send("Account not found");
    //     }
    // } catch (error) {
    //     return res.send('Error finding account:', error);
    // }

    // let account = await accountService.authenticateUser('duc77', '12345');
    // console.log("user id cua account: ", account.User);
    // // console.log(account);
    // return res.send(account.toJSON());

    // let listUser = await userService.getAllUser();
    // return res.send(JSON.stringify(listUser[0]));

    // try {
    //     console.log("before findOne");
    //     const cart = await Cart.findOne({
    //         where: {
    //             userId: '1064'
    //         },
    //     });
    //     console.log("After findONe");
    //     if (cart) {
    //         return res.send(JSON.stringify(cart));
    //     } else {
    //         return res.send("Cart not found");
    //     }
    // } catch (error) {
    //     return res.send('Error finding account:', error);
    // }

    // console.log("before findOne");
    const cart = await Cart.findOne({
        include: [
            { model: User },
            { model: CartItem },
        ],
        where: {
            userId: '1025'
        },
    });
    // console.log("After findONe");
    if (cart) {
        return res.send(cart.toJSON());
    } else {
        return res.send("Cart not found");
    }

    // console.log("before findOne");
    // const guestCart = await GuestCart.findOne({
    //     include: [
    //         { model: CartItem },
    //     ],
    //     where: {
    //         id: 54
    //     },
    // });
    // console.log("After findONe");
    // if (guestCart) {
    //     return res.send(guestCart.toJSON());
    // } else {
    //     return res.send("guest cart not found");
    // }

    // const product = await Product.findOne({
    //     include: [
    //         { model: Category },
    //         { model: Flavor },
    //         { model: CartItem },
    //         { model: OrderDetail },
    //         { model: InvoiceDetail },
    //         { model: Feedback }
    //     ],
    //     where: {
    //         productId: 1
    //     },
    // });
    // if (product) {
    //     return res.send(product.toJSON());
    // } else {
    //     return res.send("guest cart not found");
    // }

}

module.exports = {
    getHomepage,
    testAccountModel
}