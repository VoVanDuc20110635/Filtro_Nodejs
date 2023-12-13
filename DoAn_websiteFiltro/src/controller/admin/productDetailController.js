// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
// import multer from 'multer';
// import CartService from "../../services/CartService";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const ProductService = require('../../services/ProductService');
const productService = new ProductService();

const FlavorService = require('../../services/FlavorService');
const flavorService = new FlavorService();

const CategoryService = require('../../services/CategoryService');
const categoryService = new CategoryService();

const InputService = require('../../services/InputService');
const inputService = new InputService();



const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let getProductDetailPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let productList = await productService.getListAllProduct();
    let productDetailList = await productService.getListAllProductDetail();
    if (message){
        res.render('../views/admin/productDetail.ejs', { session: req.session, products: productList, productDetails: productDetailList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/productDetail.ejs', { session: req.session, products: productList, productDetails: productDetailList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/productDetail.ejs', { session: req.session, products: productList, productDetails: productDetailList });
}

let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {productDetailId, productId, weight, price, stock, discount, sold, status} = req.body;
        if (isStrictlyNumeric(productDetailId) == false||
            isStrictlyNumeric(productId) == false||
            isStrictlyNumeric(weight) == false||
            isStrictlyNumeric(price) == false||
            isStrictlyNumeric(stock) == false||
            isStrictlyNumeric(discount) == false||
            isStrictlyNumeric(sold) == false||
            await inputService.isValidComment(status) == false){
                errorMessage = "Chỉ được nhập số tự nhiên";
                return res.redirect("/admin/productDetail");
            }
        await productService.updateProductDetail(productDetailId, productId, weight, price, stock, discount, sold, status);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/productDetail");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/productDetail");
    }
    
}

let create = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {productId, weight, price, stock, discount, sold, status} = req.body;
        if ( isStrictlyNumeric(productId) == false||
            isStrictlyNumeric(weight) == false||
            isStrictlyNumeric(price) == false||
            isStrictlyNumeric(stock) == false||
            isStrictlyNumeric(discount) == false||
            isStrictlyNumeric(sold) == false||
            await inputService.isValidComment(status) == false){
                errorMessage = "Chỉ được nhập số tự nhiên";
                return res.redirect("/admin/productDetail");
            }
        await productService.createProductDetail(productId, weight, price, stock, discount, sold, status);
        message = "Tạo thành công!";
        return res.redirect("/admin/productDetail");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/productDetail");
    }
    
}

function isStrictlyNumeric(str) {
    return /^\d+$/.test(str);
}


module.exports = {
    getProductDetailPage,
    update,
    create
}