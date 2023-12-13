const OrderService = require('../../services/OrderService');
const orderService = new OrderService();
const UserService = require('../../services/UserService');
const userService = new UserService();
const InputService = require('../../services/InputService');
const inputService = new InputService();
const bcrypt = require('bcrypt');
const moment = require('moment'); // Import the moment library
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
        res.render('../views/user/user-profile.ejs', { session: req.session, user: user, message: message });    
        message = null;
        errorMessage = null; 
        return;
    }
    if (errorMessage){
        res.render('../views/user/user-profile.ejs', { session: req.session, user: user, errorMessage:errorMessage }); 
        message = null;
        errorMessage = null;   
        return;
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
    if (await inputService.isValidComment(name) == false||
        await inputService.isValidComment(address) == false||
        await inputService.isValidComment(zip) == false||
        await inputService.isValidComment(city) == false||
        await inputService.isValidComment(email) == false||
        await inputService.isValidComment(phoneNumber) == false||
        await inputService.isValidComment(dob) == false||
        await inputService.isValidComment(sex) == false){
        errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
        return res.redirect('/user/profile');
        }
    try{
        let tempDob = moment(dob).toDate(); // Convert dob to a Date object
        let revertedDob = new Date(Date.UTC(tempDob.getFullYear(), tempDob.getMonth(), tempDob.getDate()));
        if(isNaN(tempDob)){
            errorMessage = "Ngày sinh không đúng định dạng, yyyy-MM-dd (năm, tháng , ngày)";
            return res.redirect('/user/profile');
        }
    } catch(err){
        errorMessage = "Ngày sinh không đúng định dạng, yyyy-MM-dd (năm, tháng , ngày)";
        return res.redirect('/user/profile');
    }
        
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
    if (await inputService.isValidPassword(oldPassword) == false||
        await inputService.isValidPassword(newPassword) == false||
        await inputService.isValidPassword(repeatPassword) == false){
            res.render('../views/user/user-security.ejs', {session: req.session, errorMessage: "Mật khẩu với dài ít nhất 8 ký tự, có ít nhất một chữ hoa, có ít nhất 1 số tự nhiên và chỉ có 1 ký tự đặc biệt:@#$%^&+=.! "});
            return;
        }
    if (newPassword !== repeatPassword){
        res.render('../views/user/user-security.ejs', {session: req.session, errorMessage: "Repeat password không đúng!"});
        return;
    }
    
    try{
        let result = await userService.changePassword(oldPassword, newPassword, userId);
        if (result == false){
            return res.render('../views/user/user-security.ejs', { session: req.session,errorMessage: "Mật khẩu hiện tại không đúng!" });
        }
        return res.render('../views/user/user-security.ejs', { session: req.session,successMessage: "Cập nhật thành công!" });

    } catch(err){
        console.log(err);
        return res.render('../views/user/user-security.ejs', { session: req.session,errorMessage: "Cập nhật thất bại!" });
    }
}

module.exports = {
    showProfile,
    processProfile,
    showBilling,
    showSecurityPassword,
    changePassword
}