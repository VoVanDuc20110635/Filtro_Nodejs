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

const moment = require('moment'); // Import the moment library

const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let getUserPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    
    let userList;
    if (req.session.account.roleNumber == 1){
        userList = await userService.getListAllUser();
    } else {
        userList = await userService.getAllUserByRoleNumber(3);
    }
    if (message){
        res.render('../views/admin/user.ejs', { session: req.session, users: userList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/user.ejs', { session: req.session, users: userList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/user.ejs', { session: req.session, users: userList });
}
let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {name, dob, sex, address, zip, city, email, phoneNumber, status, userId} = req.body;
        if (await inputService.containsUTF8(name) == false||
            await inputService.isValidComment(dob) == false||
            await inputService.isValidComment(sex) == false||
            await inputService.isValidComment(address) == false||
            await inputService.isValidComment(zip) == false||
            await inputService.isValidComment(city) == false||
            await inputService.isValidComment(email) == false||
            await inputService.isValidComment(phoneNumber) == false||
            await inputService.isValidComment(status) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/user");
            }
        try{
            let tempDob = moment(dob).toDate(); // Convert dob to a Date object
            let revertedDob = new Date(Date.UTC(tempDob.getFullYear(), tempDob.getMonth(), tempDob.getDate()));
            if(isNaN(tempDob)){
                errorMessage = "Ngày sinh không đúng định dạng, yyyy-MM-dd (năm, tháng , ngày)";
                return res.redirect('/admin/user');
            }
        } catch(err){
            errorMessage = "Ngày sinh không đúng định dạng, yyyy-MM-dd (năm, tháng , ngày)";
            return res.redirect('/admin/user');
        }
        await userService.updateUser2(name, dob, sex, address, zip, city, email, phoneNumber, status, userId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/user");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/user");
    }
    
}

module.exports = {
    getUserPage,
    update
}