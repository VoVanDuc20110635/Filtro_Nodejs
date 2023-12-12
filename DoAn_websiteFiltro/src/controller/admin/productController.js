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

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: 'public/image/upload', // Choose the directory for uploaded files
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


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
        let {productName, quantity, sold, description, createdDate,status, flavorId,  categoryId, productId} = req.body;
        if (await inputService.isValidComment(productName) == false||
            await inputService.isValidComment(description) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/product");
            }
        await productService.updateProduct(productName, description,status, flavorId,  categoryId, productId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/product");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/product");
    }
    
}

let create = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {productName, description, status,flavorId, categoryId} = req.body;
        if (await inputService.isValidComment(productName) == false||
            await inputService.isValidComment(description) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/product");
            }
        await productService.createProduct(productName, description, status,flavorId, categoryId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/product");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/product");
    }
    
}

let changeImage = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {productId} = req.body;
        const image = req.file;
        const destinationPath = 'upload' + image.filename;
        // await fs.rename(image.path, destinationPath, (err) => {
        //     if (err) {
        //       console.error('Error moving file:', err);
        //       return handleError(err, res);
        //     }
        //     console.log('File moved successfully.');
        //   });
        await productService.changeImage(image.filename, productId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/product");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/product");
    }
    
}

module.exports = {
    getProductPage,
    update,
    changeImage,
    create
}