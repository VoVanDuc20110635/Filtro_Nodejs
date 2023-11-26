import pool from "../configs/connectDB";
// import accountRepository from "../repository/AccountRepository";
const Associations = require('../model/Associations');
const bcrypt = require('bcrypt');
const AccountRepository = require('../repository/AccountRepository');
const accountRepository = new AccountRepository();
const Account = require('../model/Account'); // Import the User model
const User = require('../model/User');
const AuthenticationAccountException = require('../Exception/AuthenticationAccountException');
// const { User, Account } = require('../model/Associations'); // Import associations
class AccountService {
    constructor() { };
    async authenticateUser(accountName, password) {
        const tempAccount = await Account.findOne({
            include: User,
            where: {
                accountName: accountName,
            },
        });

        if (!tempAccount) {
            throw new AuthenticationAccountException('Incorrect AccountName!');
        }

        if (tempAccount.roleNumber !== 3) {
            throw new AuthenticationAccountException('Incorrect Account');
        }



        const passwordMatches = await bcrypt.compare(password, tempAccount.password);
        if (passwordMatches === false) {
            throw new AuthenticationAccountException('Incorrect Password!');
        }

        return tempAccount;
    }

    async getAccountByName(accountName) {
        let listAccount = await accountRepository.findAccountByName(accountName);

        if (listAccount === 0) {
            return 1;
        }
        return listAccount;
    }

    async checkAccountName(accountName) {
        try {
            const account = await Account.findOne({
                where: {
                    accountName: accountName,
                },
            });
            if (account != null){
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error finding account by accountName:', error);
            throw error;
        }
    }

}

module.exports = AccountService;