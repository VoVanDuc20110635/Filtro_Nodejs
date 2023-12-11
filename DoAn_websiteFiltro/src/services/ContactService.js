const Associations = require('../model/Associations');
const Contact = require('../model/Contact');
class ContactService {
    constructor() { };
    async createContact(contactData) {
        try {
            const newContact = await Contact.create(contactData);
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    }
}
module.exports = ContactService;