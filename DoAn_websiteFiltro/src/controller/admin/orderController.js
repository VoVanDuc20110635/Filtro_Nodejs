// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CartService from "../../services/CartService";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();


const OrderService = require('../../services/OrderService');
const orderService = new OrderService();

const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let getOrderPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let orderList = await orderService.getListAllOrder();
    if (message){
        res.render('../views/admin/order.ejs', { session: req.session, orders: orderList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/order.ejs', { session: req.session, orders: orderList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/order.ejs', { session: req.session, orders: orderList });
}

let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {status, orderId} = req.body;
        await orderService.updateOrder(status, orderId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/order");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/order");
    }
    
}

module.exports = {
    getOrderPage,
    update
}