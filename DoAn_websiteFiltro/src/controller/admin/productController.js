// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
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
let getProductPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let productList = await productService.getListAllProduct();
    let flavorList = await flavorService.getListAllFlavor();
    let categoryList = await categoryService.getListAllCategory();
    if (message){
        res.render('../views/admin/product.ejs', { session: req.session, products: productList, flavors: flavorList, categories: categoryList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/product.ejs', { session: req.session, products: productList, flavors: flavorList, categories: categoryList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/product.ejs', { session: req.session, products: productList, flavors: flavorList, categories: categoryList, });
}

let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {productName, quantity, sold, description, createdDate,status, flavorId,  categoryId} = req.body;
        console.log(productName, quantity, sold, description, createdDate,status, flavorId,  categoryId);
        const image = req.file;
        if (await inputService.isValidComment(productName) == false||
            await inputService.isValidComment(description) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/product");
            }
        // await categoryService.updateCategory(categoryName, status, categoryId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/product");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/product");
    }
    
}

module.exports = {
    getProductPage,
    update
}