class PasswordDoNotMatchException extends Error {
    constructor(message) {
        super(message);
        this.name = 'PasswordDoNotMatchException';
    }
}

module.exports = PasswordDoNotMatchException;
