class AuthenticationAccountException extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationAccountException';
    }
}

module.exports = AuthenticationAccountException;
