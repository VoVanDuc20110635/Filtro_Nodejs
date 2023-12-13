class InputService {
    constructor() { };
    // Contains only allowed characters
    async containsAllowedCharacters(input) {
        // Regular expression to match strings containing only allowed characters
        const pattern = /^[a-zA-Z0-9@()\s.]+$/;

        // Check for a match
        return pattern.test(input);
    }

    // Contains UTF-8 characters
    async containsUTF8(input) {
        // Regular expression to match strings containing only allowed UTF-8 characters
        const pattern = /^[a-zA-Z\p{L}@().,!'"\s-]{1,500}$/u;

        // Check for a match
        return pattern.test(input);
    }

    // String length is less than 50
    async isStringLengthLessThan50(input) {
        return input.length < 50;
    }

    // Valid comment
    async isValidComment(input) {
        // Regular expression to match valid comments (1 to 100 characters)
        const pattern = /^[a-zA-Z0-9\p{L}@().,!'"\s-]{1,500}$/u;
    
        // Check for a match
        return pattern.test(input);
    }
    

    async isValidPassword(password) {
        // Regular expression to match the password requirements
        const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    
        // Check for a match
        return pattern.test(password);
    }

}
module.exports = InputService;