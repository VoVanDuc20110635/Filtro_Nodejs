const Associations = require('../model/Associations');
const Account = require('../model/Account'); 
const User = require('../model/User');
const AccountService = require('../services/AccountService');
const accountService = new AccountService();
const bcrypt = require('bcrypt');
const AccountNameExistException = require('../Exception/AccountNameExistException');
const PasswordDoNotMatchException = require('../Exception/PasswordDoNotMatchException');
const UserNotFoundException = require('../Exception/UserNotFoundException');
const CartService = require('../services/CartService')
const cartService = new CartService();
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
    async getUserByEmail(email) {
        return await User.findOne({
            where: {
                email: email
            }
        })
    }
    async getUserById2(id) {
        return await User.findOne({
            where: {
                userId: id
            },
            include: Account
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

        // Check if email exist
        let tempUser = await this.getUserByEmail(email);
        if (tempUser) {
            throw new PasswordDoNotMatchException("Email exist!");
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

        // create cart
        let cart = await cartService.createCart(user);
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
    async changePassword(oldPassword, newPassword, userId){
        
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
        const userDatabase = await User.findOne({
            where: {
                userId: userId
            },
            include: Account
        })
        const passwordMatches = await bcrypt.compare(oldPassword, userDatabase.Account.password);
        if (passwordMatches === false ){
            return false;
        }
        const accountDatabase = await Account.findOne({
            where: {
                id: userDatabase.accountId
            }
        })
        accountDatabase.password = hashNewPassword;
        accountDatabase.save();
        return true;
    }   
    async changePasswordWithoutLogin(newPassword, userId){
        
        const saltRounds = 10; // You can adjust the number of salt rounds
        const hashNewPassword = await bcrypt.hash(newPassword, saltRounds);
        const userDatabase = await User.findOne({
            where: {
                userId: userId
            },
            include: Account
        })
        const accountDatabase = await Account.findOne({
            where: {
                id: userDatabase.accountId
            }
        })
        accountDatabase.password = hashNewPassword;
        accountDatabase.save();
    }    
}
module.exports = UserService;