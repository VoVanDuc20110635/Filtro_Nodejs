// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CategoryService from "../../services/CategoryService";
// import CartService from "../../services/CartService";

const CategoryService = require('../../services/CategoryService');
const categoryService = new CategoryService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const InputService = require('../../services/InputService');
const inputService = new InputService();



const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let getCategoryPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let categoryList = await categoryService.getListAllCategory();
    if (message){
        res.render('../views/admin/category.ejs', { session: req.session, categories: categoryList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/category.ejs', { session: req.session, categories: categoryList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/category.ejs', { session: req.session, categories: categoryList });
}
let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {categoryName, status, categoryId} = req.body;
        if (await inputService.isValidComment(categoryName) == false||
            await inputService.isValidComment(status) == false||
            await inputService.isValidComment(categoryId) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/category");
            }
        await categoryService.updateCategory(categoryName, status, categoryId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/category");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/category");
    }
    
}

let create = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {categoryName, status} = req.body;
        if (await inputService.isValidComment(categoryName) == false||
            await inputService.isValidComment(status) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/category");
            }
        await categoryService.createCategory(categoryName, status);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/category");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/category");
    }
    
}

module.exports = {
    getCategoryPage,
    update,
    create
}