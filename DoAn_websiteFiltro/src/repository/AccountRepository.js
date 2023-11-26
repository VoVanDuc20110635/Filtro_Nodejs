import pool from "../configs/connectDB";
const { Sequelize } = require('sequelize');
const sequelize = require('../model/sequelize');

class AccountRepository {
    constructor() { }

    async authenticate(accountName, password) {
        console.log("hihi welcome to authenticate in AccountRepository ", accountName, " ", password);
        let account = await pool.
            execute(`select * from taikhoan where TaiKhoan = ? and MatKhau=? and MaVaiTro=3`, [accountName, password]);
        console.log("in repository: account: ", account[0]);
        return account[0];
    }

    async findAccountByName(accountName) {
        sequelize.query('SELECT * FROM Account WHERE roleNumber = :roleNumber', {
            replacements: { roleNumber: 3 }, // Replace placeholders with actual values
            type: Sequelize.QueryTypes.SELECT,
        })
            .then((results) => {
                console.log(results);
                return results;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }
}

module.exports = AccountRepository;