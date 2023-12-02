// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CartService from "../../services/CartService";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();



const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');

let getCategoryPage = async (req, res) => {
    return res.render('../views/admin/category.ejs', { session: req.session });
}


module.exports = {
    getCategoryPage,
}