// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CartService from "../../services/CartService";

const FlavorService = require('../../services/FlavorService');
const flavorService = new FlavorService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const InputService = require('../../services/InputService');
const inputService = new InputService();


const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let getFlavorPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let flavorList = await flavorService.getListAllFlavor();
    if (message){
        res.render('../views/admin/flavor.ejs', { session: req.session, flavors: flavorList, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/flavor.ejs', { session: req.session, flavors: flavorList, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/flavor.ejs', { session: req.session, flavors: flavorList });
}

let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {flavorName, flavorDescription, status, flavorId} = req.body;
        if (await inputService.isValidComment(flavorName) == false||
            await inputService.isValidComment(flavorDescription) == false||
            await inputService.isValidComment(status) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/flavor");
            }
        await flavorService.updateFlavor(flavorName, flavorDescription, status, flavorId);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/flavor");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/flavor");
    }
    
}
let create = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {flavorName, flavorDescription, status} = req.body;
        if (await inputService.isValidComment(flavorName) == false||
            await inputService.isValidComment(flavorDescription) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/flavor");
            }
        await flavorService.createFlavor(flavorName, flavorDescription, status);
        message = "Cập nhật thành công!";
        return res.redirect("/admin/flavor");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/flavor");
    }
    
}

module.exports = {
    getFlavorPage,
    update,
    create
}