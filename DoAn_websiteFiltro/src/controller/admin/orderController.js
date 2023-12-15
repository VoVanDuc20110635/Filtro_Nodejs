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

let getOrderPageByStatus = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    let status = req.params.status;
    
    let orderList;
    if (status == 0){
        orderList = await orderService.getListAllOrder();
    } else {
        orderList = await orderService.getListAllOrderByStatus(status);
    }
    let list1 = await orderService.getListAllOrderByStatus(1);
    let list2 = await orderService.getListAllOrderByStatus(2);
    let list3 = await orderService.getListAllOrderByStatus(3);
    let list4 = await orderService.getListAllOrderByStatus(4);
    let list5 = await orderService.getListAllOrderByStatus(5);
    let list6 = await orderService.getListAllOrderByStatus(6);
    let numberPending = list1.length;
    let numberCanceled = list2.length;
    let numberDelivering = list3.length;
    let numberReceived = list4.length;
    let numberExchange = list5.length;
    let numberProcessed = list6.length;
    if (message){
        res.render('../views/admin/order.ejs', { numberPending, numberCanceled,numberDelivering,numberReceived, numberExchange, numberProcessed,  session: req.session, orders: orderList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/order.ejs', {numberPending, numberCanceled,numberDelivering,numberReceived, numberExchange, numberProcessed, session: req.session, orders: orderList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/order.ejs', {numberPending, numberCanceled,numberDelivering,numberReceived, numberExchange, numberProcessed, session: req.session, orders: orderList });
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

let updateStatusOrder = async(req, res) => {
    try{
        let orderId = req.params.orderId;
        let status = req.params.status;
        let user = req.session.user; 
        if (user){
            await orderService.updateOrderUser(status, orderId);
        } else{
            return res.redirect('/admin/login');
        }
        return res.redirect('/admin/order/0');
    }
    catch(err){
        errorMessage = err;
        return res.redirect('/admin/order/0');
    }
    
}

module.exports = {
    getOrderPage,
    update,
    updateStatusOrder,
    getOrderPageByStatus
}