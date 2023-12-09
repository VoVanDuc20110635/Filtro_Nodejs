const OrderService = require('../../services/OrderService');
const orderService = new OrderService();
const UserService = require('../../services/UserService');
const userService = new UserService();
const InputService = require('../../services/InputService');
const inputService = new InputService();
const bcrypt = require('bcrypt');
let errorMessage;
let message;
let showProfile = async (req, res) => {
    let temp = req.session.user;
    if (!temp){
        res.render('../views/user/user-profile.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    let user = await userService.getUserById(temp.userId);
    if (message){
        return res.render('../views/user/user-profile.ejs', { session: req.session, user: user, message: message });    
    }
    if (errorMessage){
        return res.render('../views/user/user-profile.ejs', { session: req.session, user: user, errorMessage:errorMessage });    
    }
    message = null;
    errorMessage = null;
    return res.render('../views/user/user-profile.ejs', { session: req.session, user: user });
}

let processProfile = async (req, res) => {
    let userId = req.params.userId;
    userId = parseInt(userId,10);
    // console.log(userId);
    let {name, address, zip, city, email, phoneNumber, dob, sex} = req.body;
    // console.log(name, address, zip, city, email, phoneNumber, dob, sex);
    await userService.updateUser(userId, name, address, zip, city, email, phoneNumber, dob, sex);
    message = "Cập nhật thành công!";
    return res.redirect('/user/profile');
}

let showBilling = async (req, res) => {
    let user = req.session.user;
    if (!user){
        res.render('../views/user/user-profile.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    let orderList;
    try {
        orderList = await orderService.getOrderByUserId(user.userId);
    }
    catch (Exception){
        orderList = [];
    }

    return res.render('../views/user/user-billing.ejs', { session: req.session, orderList: orderList });
}

let showSecurityPassword = async (req, res) => {
    let user = req.session.user;
    if (!user){
        res.render('../views/user/user-security.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    return res.render('../views/user/user-security.ejs', { session: req.session });
}
let changePassword = async (req, res) => {
    let user = req.session.user;
    let userId = user.userId;
    if (!user){
        res.render('../views/user/user-security.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    let {oldPassword, newPassword,repeatPassword} = req.body;
    if (await inputService.containsAllowedCharacters(oldPassword) == false||
        await inputService.containsAllowedCharacters(newPassword) == false||
        await inputService.containsAllowedCharacters(repeatPassword) == false){
            res.render('../views/user/user-security.ejs', {session: req.session, errorMessage: "Your input is not valid!"});
            return;
        }
    if (newPassword !== repeatPassword){
        res.render('../views/user/user-security.ejs', {session: req.session, errorMessage: "Your repeat password doesn't match!"});
        return;
    }
    if (await inputService.isValidPassword(newPassword) == false){
        res.render('../views/user/user-security.ejs', {session: req.session, errorMessage: "Your password is not valid. The password must have a minimum length of 8 characters, including at least one uppercase letter, at least one digit, and exactly one special character:@#$%^&+=.!"});
        return;
    }
    
    try{
        let result = await userService.changePassword(oldPassword, newPassword, userId);
        if (result == false){
            return res.render('../views/user/user-security.ejs', { session: req.session,errorMessage: "Your current password is not correct!" });
        }
        return res.render('../views/user/user-security.ejs', { session: req.session,successMessage: "Update Successfully!" });

    } catch(err){
        console.log(err);
        return res.render('../views/user/user-security.ejs', { session: req.session,errorMessage: "Update Failed!" });
    }
}

module.exports = {
    showProfile,
    processProfile,
    showBilling,
    showSecurityPassword,
    changePassword
}