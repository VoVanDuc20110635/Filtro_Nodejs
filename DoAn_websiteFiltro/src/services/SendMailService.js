const EmailDetails = require('../model/EmailDetails');
const nodemailer = require('nodemailer');
const emailValidator = require('deep-email-validator');
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'voduc0100@gmail.com',
        pass: 'arozojkhspxuuxeg'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);
class SendMailService {
    constructor() { };
    
    async sendMail(details) {
        
        // Create a nodemailer email message
        const mailOptions = {
            from: '2k2lmhtlol@gmail.com', // Sender's email address
            to: details.recipient,
            subject: details.subject,
            text: details.msgBody,
            // You can add attachments as needed
            // attachments: [
            //   {
            //     filename: 'attachment.txt',
            //     content: details.attachment,
            //   },
            // ],
        };
    
        // Try block to check for exceptions
        try {
        // Sending the email
            await transporter.sendMail(mailOptions);
            return 'Mail Sent Successfully...';
        } catch (error) {
            // Catch block to handle the exceptions
            console.error('Error while sending mail:', error);
            return 'Error while sending mail!!!';
        }
    }

    async isEmailValid(email) {
        return emailValidator.validate(email)
    }

    // async verifyEmail(email, callback){
    //     const verifier = new smtpVerify.SMTPVerify({
    //         from: 'voduc0100@gmail.com', // Your email address
    //       });
    //       verifier.verify(email, (err, info) => {
    //         if (err) {
    //           console.error(err);
    //           callback(false);
    //         } else {
    //           console.log(info);
    //           // Check the info.success property to determine if the email exists
    //           callback(info.success);
    //         }
    //       });
    // }

}

module.exports = SendMailService;