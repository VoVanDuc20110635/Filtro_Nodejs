// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
// import CategoryService from "../../services/CategoryService";
// import CartService from "../../services/CartService";

const CategoryService = require('../../services/CategoryService');
const categoryService = new CategoryService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const InputService = require('../../services/InputService');
const inputService = new InputService();

const ContactService = require('../../services/ContactService');
const contactService = new ContactService();

const SendMailService = require('../../services/SendMailService');
const sendMailService = new SendMailService();



const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');
let message;
let errorMessage;
let numberOfNonRespondedContact = 0;
let getContactPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let contactList = await contactService.getListAllContact();
    let temp = await contactService.getListAllNonRespondedContact();
    numberOfNonRespondedContact = temp.length;
    if (message){
        res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList,numberOfNonRespondedContact: numberOfNonRespondedContact, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact, });
}
let getRespondedContactPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let contactList = await contactService.getListAllRespondedContact();
    let temp = await contactService.getListAllNonRespondedContact();
    numberOfNonRespondedContact = temp.length;
    if (message){
        res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList,numberOfNonRespondedContact: numberOfNonRespondedContact, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact });
}
let getNonRespondedContactPage = async (req, res) => {
    if (!req.session.user){
        return res.redirect("/admin/login");
    }
    
    let contactList = await contactService.getListAllNonRespondedContact();
    numberOfNonRespondedContact = contactList.length;
    if (message){
        res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact, message: message });
        message = null;
        errorMessage = null;
        return;
    } 
    if (errorMessage){
        res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact, errorMessage: errorMessage });
        message = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/admin/contact.ejs', { session: req.session, contacts: contactList, numberOfNonRespondedContact: numberOfNonRespondedContact });
}
let update = async (req, res) => {
    try{
        if (!req.session.user){
            return res.redirect("/admin/login");
        }
        let {email,topic, response, contactId} = req.body;
        console.log(email, topic, response, contactId);
        if (await inputService.isValidComment(response) == false){
                errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
                return res.redirect("/admin/nonRespondedContact");
            }
        const emailDetails = {
            recipient: email,
            msgBody: response,
            subject: 'Cửa hàng Filtro phản hồi: ' + topic,
            // attachment: 'Attachment content', // Uncomment this line if you have an attachment
        };
        await sendMailService.sendMail(emailDetails).then((result) => {
            console.log(result);
            });
        await contactService.updateContact(response, contactId);
        message = "Gửi mail và cập nhật thành công!";
        return res.redirect("/admin/RespondedContact");
    } catch(err){
        errorMessage = err;
        return res.redirect("/admin/nonRespondedContact");
    }
    
}

module.exports = {
    getContactPage,
    getRespondedContactPage,
    getNonRespondedContactPage,
    update
    
}