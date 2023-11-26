class AccountNameExistException extends Error {
    constructor(message) {
        super(message);
        this.name = 'AccountNameExistException';
    }
}

module.exports = AccountNameExistException;
