const ContactService = require('../../services/ContactService');
const contactService = new ContactService();

const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

const InputService = require('../../services/InputService');
const inputService = new InputService();
const SendMailService = require('../../services/SendMailService');
const sendMailService = new SendMailService();

let successMessage;
let errorMessage;

let getContactPage = async (req, res) => {
    console.log(successMessage, errorMessage);
    const categories = await categoryService.get5Categories();
    if (successMessage){
        res.render('../views/user/contact.ejs', {session: req.session, categories: categories, message: successMessage});
        successMessage = null;
        errorMessage = null;
        return;
    }
    if (errorMessage){
        res.render('../views/user/contact.ejs', {session: req.session, categories: categories ,errorMessage: errorMessage});
        successMessage = null;
        errorMessage = null;
        return;
    }
    return res.render('../views/user/contact.ejs', {session: req.session, categories: categories});   
}

let addContact = async(req, res) => {
    let {name, email, subject, message} = req.body;
    if (await inputService.isValidComment(name) == false||
        await inputService.isValidComment(email) == false||
        await inputService.isValidComment(subject) == false||
        await inputService.isValidComment(message) == false){
            errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
            return res.redirect('/contact');
            }
    let isEmailExist = await sendMailService.isEmailValid(email);
    if(!isEmailExist.valid){
        errorMessage = "Email không tồn tại!";
        return res.redirect('/contact');
    }
    let contactData = {
        customerName: name,
        email: email,
        topic: subject,
        message: message,
    };
    contactService.createContact(contactData);
    successMessage = "Gửi phản hồi thành công!";
    return res.redirect('/contact');
}

module.exports = {
    getContactPage,
    addContact,
}