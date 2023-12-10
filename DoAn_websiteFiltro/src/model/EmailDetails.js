class EmailDetails {
    constructor(recipient, msgBody, subject, attachment) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
        this.attachment = attachment;
    }
}

module.exports = EmailDetails;