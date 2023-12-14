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
let getStaffPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    if (req.session.account.roleNumber !== 1){
        return res.render('../views/admin/dashboard.ejs', {session: req.session,errorMessage: "Bạn không có quyền truy cập trang này!"});
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
                return res.redirect("/admin/staff");
            }
        try{
            let tempDob = moment(dob).toDate(); // Convert dob to a Date object
            let revertedDob = new Date(Date.UTC(tempDob.getFullYear(), tempDob.getMonth(), tempDob.getDate()));
            if(isNaN(tempDob)){
                errorMessage = "Ngày sinh không đúng định dạng, yyyy-MM-dd (năm, tháng , ngày)";
                return res.redirect('/admin/staff');
            }
        } catch(err){
            errorMessage = "Ngày sinh không đúng định dạng, yyyy-MM-dd (năm, tháng , ngày)";
            return res.redirect('/admin/staff');
        }
        await userService.updateUser(userId, name, address, zip, city, email, phoneNumber, dob, sex);
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
