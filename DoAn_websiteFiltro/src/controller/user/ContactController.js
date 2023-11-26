const ContactService = require('../../services/ContactService');
const contactService = new ContactService();

const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

let getContactPage = async (req, res) => {
    const categories = await categoryService.get5Categories();
    return res.render('../views/user/contact.ejs', {session: req.session, categories: categories});
}

let addContact = async(req, res) => {
    let {name, email, subject, message} = req.body;
    console.log(name, email, subject, message);
    let contactData = {
        customerName: name,
        email: email,
        topic: subject,
        message: message,
    };
    contactService.createContact(contactData);
    res.redirect("/contact");
}

module.exports = {
    getContactPage,
    addContact,
}