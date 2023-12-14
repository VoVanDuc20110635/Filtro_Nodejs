// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CartService from "../../services/CartService";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const InputService = require('../../services/InputService');
const inputService = new InputService();



const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let getAccountPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    let accountList;
    if (req.session.account.roleNumber == 1){
        accountList = await accountService.getListAllUser();
    } else {
        accountList = await accountService.getListAllUserByStatus(3);
    }
    
    if (message){
        res.render('../views/admin/account.ejs', { session: req.session, accounts: accountList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/account.ejs', { session: req.session, accounts: accountList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/account.ejs', { session: req.session, accounts: accountList });
}
let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {accountName, password, status, role, accountId} = req.body;
        if (await inputService.isValidComment(accountName) == false||
            await inputService.isValidComment(status) == false||
            await inputService.isValidComment(role) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/account");
            }
        if ( await inputService.isValidPassword(password) == false){
            errorMessage =  "Mật khẩu với dài ít nhất 8 ký tự, có ít nhất một chữ hoa, có ít nhất 1 số tự nhiên và chỉ có 1 ký tự đặc biệt:@#$%^&+=.! "
            return res.redirect("/admin/account");
        }
        await accountService.updateAccount(accountName, password, status, role, accountId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/account");
    } catch(err){
        errorMessage = err;
    }
    
}


module.exports = {
    getAccountPage,
    update,
}