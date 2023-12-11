class NotExecuteException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotExecuteException';
    }
}

module.exports = NotExecuteException;
