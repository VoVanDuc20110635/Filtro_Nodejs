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

const SendMailService = require('../../services/SendMailService');
const sendMailService = new SendMailService();

const bcrypt = require('bcrypt');


const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');

let getLoginPage = async (req, res) => {
    return res.render('../views/user/login.ejs', { session: req.session });
}

let getForgotPasswordPage = async (req, res) => {
    return res.render('../views/user/forgotPassword.ejs', { session: req.session });
}

let processForgotPassword = async(req, res) => {
    let {email} = req.body;
    let oldUser = await userService.getUserByEmail(email);
    if (!oldUser){
        return res.render('../views/user/forgotPassword.ejs', { session: req.session, errorMessage: "Email không tồn tại!" });
    }
    const saltRounds = 10; // You can adjust the number of salt rounds
    let inputToken = email + oldUser.name;
    console.log(email + oldUser.name);
    const hashToken = await bcrypt.hash(inputToken, saltRounds);

    const emailDetails = {
        recipient: email,
        msgBody: 'Nhấn vào liên kết này để đặt lại mật khẩu: http://localhost:8080/resetPassword?token='+hashToken+'&email='+email,
        subject: 'Lấy lại mật khẩu Coffee Store',
        // attachment: 'Attachment content', // Uncomment this line if you have an attachment
    };
    await sendMailService.sendMail(emailDetails).then((result) => {
        console.log(result);
      });
    return res.render('../views/user/forgotPassword.ejs', { session: req.session, successMessage: "Gửi mail thành công! Vui lòng kiểm tra email để nhận đường link thay đổi mật khẩu!" });
}

let getLinkChangePasswordPage = async (req, res) => {
    let {token, email} = req.query;
    let oldUser = await userService.getUserByEmail(email);
    if (!oldUser){
        return res.render('../views/user/forgotPassword.ejs', { session: req.session, errorMessage: "Email không tồn tại!" });
    }
    const tokenMatches = await bcrypt.compare(email + oldUser.name, token);
    if (tokenMatches === false ){
        return res.render('../views/user/forgotPassword.ejs', { session: req.session, errorMessage: "Token không đúng" });
    }
    req.session.email = email;
    req.session.token = token;
    return res.redirect('/resetPasswordPage');
}

let getChangePasswordPage = async (req, res) => {
    return res.render('../views/user/passwordReset.ejs', { session: req.session });
}




let processChangePassword = async (req, res) => {
    let email = req.session.email;
    let token = req.session.token;
    let {newPassword, repeatPassword} = req.body;
    console.log(newPassword, repeatPassword);
    if (newPassword !== repeatPassword){
        return res.render('../views/user/passwordReset.ejs', { session: req.session, errorMessage: "RepeatPassword không đúng" });
    }
    if (!email || ! token){
        return res.render('../views/user/forgotPassword.ejs', { session: req.session, errorMessage: "Token không đúng" });
    }
    let oldUser = await userService.getUserByEmail(email);
    if (!oldUser){
        return res.render('../views/user/forgotPassword.ejs', { session: req.session, errorMessage: "Email không tồn tại!" });
    }
    try{
        await userService.changePasswordWithoutLogin(newPassword, oldUser.userId);
        delete req.session.email;
        delete req.session.token;
        return res.render('../views/user/passwordReset.ejs', { session: req.session, successMessage: "Thay đổi mật khẩu thành công" });
    } catch(err){
        console.log(err);
        return res.render('../views/user/passwordReset.ejs', { session: req.session, errorMessage: "Thay đổi mật khẩu không thành công" });
    }
    
}

let login = async (req, res) => {
    try {
        const { accountName, password } = req.body;
        const account = await accountService.authenticateUser(accountName, password);
        const user = await userService.getUserById(account.User.userId);
        const cart = await cartService.getCurrentCartByUserId(user.userId);
        
        // console.log(user);
        req.session.authenticated = true;
        req.session.account = account;
        req.session.user = user;
        req.session.cart = cart;

        if (req.session.guestCart){
            guestCartService.changeGuestCartToCart(cart.id, req.session.guestCart.id );
        }

        return res.redirect("/");
    } catch (exception) {
        return res.render('../views/user/login.ejs', { message: exception.message });
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
    getForgotPasswordPage,
    processForgotPassword,
    getLinkChangePasswordPage,
    getChangePasswordPage,
    processChangePassword
}