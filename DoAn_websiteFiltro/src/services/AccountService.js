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
    async getListAllUser() {
        const listAccount = await Account.findAll({
            include: User,
        });
        return listAccount;
    }
    async authenticateUser(accountName, password) {
        const tempAccount = await Account.findOne({
            include: User,
            where: {
                accountName: accountName,
            },
        });

        if (!tempAccount) {
            throw new AuthenticationAccountException('AccountName không đúng!');
        }

        // if (tempAccount.roleNumber !== 3) {
        //     throw new AuthenticationAccountException('Tài khoản không có quyền truy cập!');
        // }



        const passwordMatches = await bcrypt.compare(password, tempAccount.password);
        if (passwordMatches === false) {
            throw new AuthenticationAccountException('Mật khẩu không đúng');
        }

        return tempAccount;
    }

    async authenticateAdmin(accountName, password) {
        const tempAccount = await Account.findOne({
            where: {
                accountName: accountName,
            },
            include: User,
        });

        if (!tempAccount) {
            throw new AuthenticationAccountException('AccountName không đúng!');
        }

        if (!(tempAccount.roleNumber == 1 || tempAccount.roleNumber == 2)) {
            throw new AuthenticationAccountException('Tài khoản không có quyền truy cập!');
        }



        const passwordMatches = await bcrypt.compare(password, tempAccount.password);
        if (passwordMatches === false) {
            throw new AuthenticationAccountException('Mật khẩu không đúng');
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