const Associations = require('../model/Associations');
const Sequelize = require('sequelize');
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
    async getListAllContact() {
        const listContact = await Contact.findAll({
            
        });
        return listContact;
    }
    async getListAllRespondedContact() {
        const listContact = await Contact.findAll({
            
        });

        const respondedContacts = listContact.filter(contact => contact.response.length > 0);

        return respondedContacts;
        
    }
    async getListAllNonRespondedContact() {
        const listContact = await Contact.findAll({
            
        });

        const NonRespondedContacts = listContact.filter(contact => contact.response.length == 0);

        return NonRespondedContacts;
    }
    async updateContact(response, contactId) {
        try {
            const tempContact = await Contact.findOne({
                where: {
                    contactId: contactId,
                },
            });
            // Hash the password
            tempContact.response = response;
            await tempContact.save();
        } catch (err){
            throw new NotExecuteException('Không thể cập nhật!');
        }
        
    
      }
}
module.exports = ContactService;