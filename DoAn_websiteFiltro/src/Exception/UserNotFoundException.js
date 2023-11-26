class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundException';
    }
}

module.exports = UserNotFoundException;
