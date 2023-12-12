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
let getStaffPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let staffList = await userService.getListAllStaff();
    if (message){
        res.render('../views/admin/staff.ejs', { session: req.session, users: staffList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/staff.ejs', { session: req.session, users: staffList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/staff.ejs', { session: req.session, users: staffList });
}
let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {name, dob, sex, address, zip, city, email, phoneNumber, status, userId} = req.body;
        if (await inputService.isValidComment(name) == false||
            await inputService.isValidComment(dob) == false||
            await inputService.isValidComment(sex) == false||
            await inputService.isValidComment(address) == false||
            await inputService.isValidComment(zip) == false||
            await inputService.isValidComment(city) == false||
            await inputService.isValidComment(email) == false||
            await inputService.isValidComment(phoneNumber) == false||
            await inputService.isValidComment(status) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/staff");
            }
        await userService.updateUser(name, dob, sex, address, zip, city, email, phoneNumber, status, userId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/staff");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/staff");
    }
    
}


module.exports = {
    getStaffPage,
    update
}
