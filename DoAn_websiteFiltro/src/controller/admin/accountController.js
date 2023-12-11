// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CartService from "../../services/CartService";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();



const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');

let getAccountPage = async (req, res) => {
    let accountList = await accountService.getListAllUser();
    return res.render('../views/admin/account.ejs', { session: req.session, accounts: accountList });
}


module.exports = {
    getAccountPage,
}