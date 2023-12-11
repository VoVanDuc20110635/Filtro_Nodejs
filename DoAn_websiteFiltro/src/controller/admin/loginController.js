// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CartService from "../../services/CartService";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const CartService = require('../../services/CartService');
const cartService = new CartService();


const GuestCartService = require('../../services/GuestCartService');
const guestCartService = new GuestCartService();

const InputService = require('../../services/InputService');
const inputService = new InputService();


const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');

let getLoginPage = async (req, res) => {
    return res.render('../views/admin/login.ejs', { session: req.session });
}
let getDashBoardPage = async (req, res) => {
    return res.render('../views/admin/dashboard.ejs', { session: req.session });
}

let login = async (req, res) => {
    try {
        const { accountName, password } = req.body;
        if (await inputService.isValidComment(accountName) == false){
            res.render('../views/admin/login.ejs', {session: req.session, message: "AccountName chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự."});
            return;
        }
        // if ( await inputService.isValidPassword(password) == false){
        //         res.render('../views/admin/login.ejs', {session: req.session, message: "Mật khẩu với dài ít nhất 8 ký tự, có ít nhất một chữ hoa, có ít nhất 1 số tự nhiên và chỉ có 1 ký tự đặc biệt:@#$%^&+=.! "});
        //         return;
        // }
        const account = await accountService.authenticateAdmin(accountName, password);
        const user = await userService.getUserById(account.User.userId);
        
        // console.log(user);
        req.session.authenticated = true;
        req.session.account = account;
        req.session.user = user;

        return res.redirect("/admin");
    } catch (exception) {
        return res.render('../views/admin/login.ejs', { message: exception.message });
    }




    // console.log("username and password: ", req.body.accountName, " ", req.body.password);
    // let accountName = req.body.accountName;
    // let password = req.body.password;
    // let account = await accountService.authenticateUser(req.body.accountName, req.body.password);
    // console.log("account in controller: ", account);
    // console.log("account name and password: ", account.TaiKhoan, " ", account.MatKhau);
    // if (account !== null && account.length !== 0) {
    //     req.session.authenticated = true;
    //     req.session.user = { accountName, password };
    //     console.log("session user: ", req.session);
    //     // return res.redirect('/');
    //     return res.render('../views/user/index.ejs', { session: req.session });
    // }
    // return res.render('404.ejs');

}

let logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/login'); // Redirect to the login page or any other desired page
        }
    });
};


module.exports = {
    getLoginPage,
    login,
    logout,
    getDashBoardPage,
    
}