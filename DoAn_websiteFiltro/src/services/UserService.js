const Associations = require('../model/Associations');
const Account = require('../model/Account'); 
const User = require('../model/User');
const AccountService = require('../services/AccountService');
const accountService = new AccountService();
const bcrypt = require('bcrypt');
const AccountNameExistException = require('../Exception/AccountNameExistException');
const PasswordDoNotMatchException = require('../Exception/PasswordDoNotMatchException');
const UserNotFoundException = require('../Exception/UserNotFoundException');
class UserService {
    constructor() { };
    async getAllUser() {
        const listUser = await User.findAll();
        return listUser;
    }

    async getUserById(id) {
        return await User.findOne({
            where: {
                userId: id
            }
        })
    }
    async registerUser(userName, accountName, email, password, repeatPassword) {
        const existingAccount = await accountService.checkAccountName(accountName);
        if (existingAccount) {
            throw new AccountNameExistException("This account name is set!");
        }

        // Check if the passwords match
        if (password !== repeatPassword) {
            throw new PasswordDoNotMatchException("Repeat password isn't correct!");
        }

        

        // Hash the password
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create a new Account record
        const account = await Account.create({
            accountName: accountName,
            password: hashPassword,
            createdDate: new Date(),
            roleNumber: 3,
            status: 1,
        });

        // Create a new User record
        const user = await User.create({
            name: userName,
            email: email,
            accountId: account.id
        });
    }

    async updateUser(userId, name, address, zip, city, email, phoneNumber, dob, sex){
        console.log(userId);
        const user = await User.findByPk(userId);
        if (!user) {
            throw new UserNotFoundException(`Can't find this user!`);
        }
        user.name = name;
        user.dob = dob;
        user.sex = sex;
        user.address = address;
        user.zip = zip;
        user.city = city;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await user.save();
    }
}
module.exports = UserService;