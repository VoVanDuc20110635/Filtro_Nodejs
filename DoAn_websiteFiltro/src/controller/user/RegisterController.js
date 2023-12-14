const AccountService = require('../../services/AccountService');
const accountService = new AccountService();
const bcrypt = require('bcrypt');
const UserService = require('../../services/UserService');
const userService = new UserService();

const Account = require('../../model/Account'); 
const User = require('../../model/User');
const AccountNameExistException = require('../../Exception/AccountNameExistException');
const PasswordDoNotMatchException = require('../../Exception/PasswordDoNotMatchException');

const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
const InputService = require('../../services/InputService');
const inputService = new InputService();
const SendMailService = require('../../services/SendMailService');
const sendMailService = new SendMailService();
let getRegisterPage = async (req, res) => {
    return res.render('../views/user/register.ejs');
}

let registerUser = async (req, res) => {
    try {
        const {userName, accountName, email, password, repeatPassword} = req.body;
        if (await inputService.containsUTF8(userName) == false||
        await inputService.isValidComment(accountName) == false||
        await inputService.isValidComment(email) == false){
            return res.render('../views/user/register.ejs', { errorMessage: "Tên không được viết số, những thông tin khác chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự." });
            }
        if ( await inputService.isValidPassword(password) == false||
            await inputService.isValidPassword(repeatPassword) == false){
            return res.render('../views/user/register.ejs', { errorMessage: "Mật khẩu với dài ít nhất 8 ký tự, có ít nhất một chữ hoa, có ít nhất 1 số tự nhiên và chỉ có 1 ký tự đặc biệt:@#$%^&+=.! " });
            }
        let isEmailExist = await sendMailService.isEmailValid(email);
        if(!isEmailExist.valid){
            return res.render('../views/user/register.ejs', { errorMessage: "Email không tồn tại!" });
        }
        await userService.registerUser(userName, accountName, email, password, repeatPassword);
        return res.render('../views/user/register.ejs', { message: "Đăng ký thành công! Đăng nhập ngay bây giờ!" });
    } catch (exception) {
        return res.render('../views/user/register.ejs', { errorMessage: exception.message });
    }
}


module.exports = {
    getRegisterPage,
    registerUser,

}