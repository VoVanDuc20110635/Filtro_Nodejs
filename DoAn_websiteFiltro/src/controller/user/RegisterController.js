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

let getRegisterPage = async (req, res) => {
    return res.render('../views/user/register.ejs');
}

let registerUser = async (req, res) => {
    try {
        const {userName, accountName, email, password, repeatPassword} = req.body;
        await userService.registerUser(userName, accountName, email, password, repeatPassword);
        return res.render('../views/user/register.ejs', { message: "Register Successfully! Login now!" });
    } catch (exception) {
        return res.render('../views/user/register.ejs', { errorMessage: exception.message });
    }
}


module.exports = {
    getRegisterPage,
    registerUser,

}